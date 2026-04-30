---
layout: post
title: Log-Based Architecture Done Cheap in PostgreSQL
date: 2026-04-06
year: 2026
category: personal
permalink: /personal/log-based-postgres.html
published: true
description: A post originally published on LinkedIn which documented a recent project where I built a log-based event architecture (normally implemented with systems like Kafka) on the cheap in PostgreSQL 
---
Recently, I worked on a project where I got to design a prototype for making eligibility determinations based on data about individuals. Although this work was just for a prototype, we wanted to explore a hypothesis that we could do verification with a very strong audit trail. We designed the system around receiving data from external sources as events. We wanted to be able to jump back to earlier states as well as replay events forward, since this would allow us to both track what data the system used to make past decisions as well as reconstruct the data we derive if we find a bug.

For those of you who know, this approach is called an event-driven architecture. And the idea of retaining all past data as a source of truth which can be replayed to reconstruct system state is called a [log-based architecture](https://jack-vanlightly.com/blog/2018/5/20/event-driven-architectures-the-queue-vs-the-log). You might know this concept through systems like [Apache Kafka](https://kafka.apache.org/) or [Amazon Kinesis](https://aws.amazon.com/pm/kinesis/). These systems are often the data backbone for ingesting and processing large amounts of data in systems that handle analytics, transaction information or other large streams of data that we commonly call "big data. These systems store records as immutable entities because it enables them to be much more performant and reliable than traditional database systems which allow records to be modified once they are saved. Conveniently, this also makes them great for situations where we might need to audit the data or replay it to reconstruct other systems derived from that data, just like we wanted for our prototype.

Unfortunately, big data requires big infrastructure and the corresponding big outlays of capital. We did not anticipate that our system would ever need to do intensive and large-scale data processing – although millions of rows might seem large, it's laughably tiny for modern systems to handle. We didn't have the budget nor did we have the agency approval or working experience to stand up a Kafka instance and processes. What we did have was a standard API stack with Python/FastAPI on the frontend and PostgreSQL on the backend. And that was more than enough!

To implement this, we needed simply two concepts, both of which are easy to implement. First, I needed to create a queue where one or more readers could grab messages (without two grabbing the same one by accident), process the message and then mark the message as processed. This is technically not a log-based system (for those, the readers store what they've processed) and it's not a traditional queue-based system where messages are removed once ingested; instead, it's a system to give us a log-based approach without too much abstraction and complexity there.

```python
stmt = (
  select(Message)
  .where(Message.status == MessageStatus.CREATED)
  .with_for_update(skip_locked=True)
  .order_by(Message.id)
  .limit(1)
)
db_obj = session.exec(stmt).first()
```

This little bit of Python code (in [SQLModel](https://sqlmodel.tiangolo.com/)) shows how message selection work. The [SKIP LOCKED](https://www.inferable.ai/blog/posts/postgres-skip-locked) method for selecting records is a remarkably simple and efficient way to coordinate work among multiple workers. One other fun thing you might notice is that I am ordering my query by the message ID, since I am using the convenient [ULID](https://github.com/ulid/spec) library which creates unique identities sortable by time created. 

When a worker gets a message, it then parses the message and then creates one or more records of data (I call them facts) that is pulled from the message. Here is some overly simplified Python describing that base fact model and a few other tables that were derived from that model (actual code also included DB table schemas as well as input schemas that inherited further from these base models)

```python
class FactBase(SQLModel):
    _id_prefix: str = "fact:"

    id: FactID = Field(
        default_factory=id_factory(_id_prefix),
        index=True,
        unique=True,
        primary_key=True,
        nullable=False,
    )
    message_id: MessageID = Field(foreign_key="message.id", nullable=False)
    beneficiary_id: BeneficiaryID = Field(nullable=False, index=True)

    created_at: datetime = Field(default_factory=now_timestamp)
    revoked_at: datetime | None = Field(default=None, index=True, nullable=True)


class IncomeFactBase(FactBase):
    employers: NonNegativeInt | None
    year: YearNum = Field(index=True)
    month: MonthNum = Field(index=True)
    amount_cents: NonNegativeInt | None = Field(default=None)


class BirthdateFactBase(FactBase):
    birth_date: date = Field(index=True)
...
```

In our system, we decided it would be better to have multiple fact tables for different types of facts (eg, income data, demographic info, disability status) because it would be useful to run aggregate queries against those, but a single fact table with a big JSON field in it would also work. The important fields of the fact table are:

* Each fact gets its own unique identifier also built using ULID
* Each fact is linked to a specific beneficiary_id
* Each fact links back to the message it was derived from (using the message's ID)
* Each fact has its own "unique" fields that indicate a single record. For a monthly income total, it would be the beneficiary_id, month and year. For a birth date, it's just the beneficiary_id.
* Each fact has a revoked_at timestamp which is initially NULL

Although we aren't structuring the fact tables like they are queues, we are treating them as immutable as well, since this lets us both link facts back to the message they were sourced from and it lets our eligibility decision log link back to facts that were consulted. It's our expectation that new data will come in that updates or corrects prior data (even permanent facts like birth dates might be updated if there are data quality errors); when these new facts are ingested, we set the revoked_at timestamp to indicate when a prior version of a fact was revoked by a newer one. This lets us keep the prior version of the fact and also makes it simple to determine the current state of things when we need to run a new eligibility determination (pull all facts where revoked_at is NULL).

To do the determinations, we created several other tables to record the overall determination as well as the status of specific checks and subchecks (more than a boolean, it can also include situations like missing data, errors or even evaluations being skipped). Each determination is also saved as an immutable record once created and is linked back to the facts used in making the determination (which in turn link back to the messages there were derived from). We stored this with several tables, but a single large JSON as an audit record would also work and might look like below

```json
{
  "timestamp": "...",
  "id": "...",
  "result": "PASSED",
  "beneficiary_id": "...",
  "checks": [
    "age": {
       "result": "NOT_PASSED",
       "subchecks": [
         {
           "id": "...",
           "title": "Age 19 or lower",
           "fact_ids": [".."],
           "result": "NOT_PASSED"
         },
         {
           "id": "...",
           "title": "Age 65 or higher",
           "fact_ids": [".."],
           "result": "NOT_PASSED"
         }
       ]
    },
    "income": {
      "result": "PASSED",
      "subchecks": [
         {
           "id": "...",
           "title": "Income minimum for April 2027",
           "fact_ids": [".."],
           "result": "NOT_PASSED"
         },
         {
           "id": "...",
           "title": "Income minimum for May 2027",
           "fact_ids": [".."],
           "result": "NO_DATA"
         },
         {
           "id": "...",
           "title": "Income minimum for June 2027",
           "fact_ids": [".."],
           "result": "PASSED"
         }
      ]
    }
  ]
}
```

Or similar. Of course, there are all sorts of enhancements we could build on top of this. For instance, eligibility determinations could be run either in a regular batch mode or triggered asynchronously when new data comes in (using a similar queue-driven approach where fact creation triggers the creation of a new determination record with a pending status that other workers process). Determinations can be rerun just for beneficiaries who have new data (or rerun for everybody regardless). Logging can be aggregated out as necessary to track what's changed and what sort of checks and subchecks are most applicable for the population.

This may be a simple architecture that was created in a few days for a prototype. It could be the basis for a production system, and I just think it's neat. Hopefully, you might find the concept useful too. You really can do [everything in Postgres](https://postgresforeverything.com/)! 

