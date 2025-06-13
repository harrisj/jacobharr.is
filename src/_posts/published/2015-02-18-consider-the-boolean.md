---
layout: writing_layout
title: Consider the Boolean
tagline: The Challenge of Using Binary Data Structures in a Complicated World
description: >
    I remain fascinated by how data types work because they constrain how the software sees the world. Even representing reality with something as simple as a boolean can lead to tradeoffs that shape how we model things.
display_description: >
    I remain fascinated by how data types work because they constrain how the software sees the world. Even representing reality with something as simple as a boolean can lead to tradeoffs that shape how we model things. This was also referenced in the book [Living in Data](https://us.macmillan.com/books/9780374720513/livingindata/) by Jer Thorp.
date: 20150218
year: 2015
category: published
permalink: /published/consider-boolean.html
pub_permalink: https://source.opennews.org/articles/consider-boolean/
publisher: Source
---
I generally prefer to write about big picture subjects for my Learning pieces at Source. But today, let’s start from something small that illuminates the way even simple choices affect what we can represent and the stories we can tell.

Let’s talk about the most basic datatype we often build our databases from: Boolean fields. Deeply familiar to programmers, the concept of [Boolean logic](http://en.wikipedia.org/wiki/Boolean_algebra) is often seen as esoteric by people who don’t program for a living and who aren’t set theorists. I’ve confirmed this with many of my friends. I used to find that extremely mystifying; after all, the basic nature of Boolean algebra is pretty simple. A Boolean variable can only have one of two values—true or false—and all operations on them can only result in true or false as well. For instance, a and b is true only if both a and b are true, while a or b is true if either a or b is true. This matches how we understand the words and and or to mean, so that’s easy enough, but then it gets complicated. For instance, what spoken language has an intuitive equivalent to _a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b_, which is true only when a is true and b isn’t or vice versa? And every language quickly gets confusing if you attempt to describe the types of nested conditionals we use in our code where we want to execute a loop if and only if _a_ is true and _b_ or _c_ is not true if _a_ is a String and _b_ is a…

Ultimately though, I think the confusing thing about Boolean logic to most people is its strict precision in a world that is anything but. If I asked you “Are you interested in this essay or not?” and you answered “Yes,” that response is genuinely annoying, even though that is technically always the correct answer according to Boolean algebra. Ultimately, what things in this world are absolutely and precisely true? Not as many as we might think. This is a journalism tutorial and not a philosophical treatise, but the point still stands. As programmers, we often use Boolean values to represent conditional elements in our databases, but sometimes the ways we use them obscure and confuse the nuances of reality.

## The Prisoners of Zenda
It’s far easier to explain what I’m talking about through an example. So, let’s imagine we are creating a database to track the status of political prisoners confined to the prison of Zenda in [the imaginary country of Ruritania](http://en.wikipedia.org/wiki/Ruritania). This hypothetical example got dark really fast, but reality is often darker still; welcome to the world of journalism.

There are no open-records laws in Ruritania, so all the data on detainees must be pieced together in a database by our own researchers. We need to design the schema for them to enter the relevant data about each prisoner as they discover it. So, we start by figuring out some basic fields for the `prisoners` table. A plausible first cut might look like this:

```sql
prisoner_id varchar(255),
name varchar(255),
birth_date date,
high_value bool,
held bool,
convicted bool,
released bool,
notes text
...
```

We usually start the modeling process by figuring out the important information we might want to track about our subjects. In many cases, those are simple yes/no questions, meaning we can represent them with `boolean` type fields in our database. It’s easy to just define a bunch of Boolean fields like this in our schema, but it’s also easy to make mistakes. For instance, we have inadvertently created two columns `held` and `released` that are just two inverted ways of representing the same thing. What does it mean if both are checked? Or neither? Neither scenario makes sense in reality, but the existence of two separate fields combined with [Murphy’s Law](https://en.wikipedia.org/wiki/Murphy%27s_law) makes such logically impossible representations inevitable; all it takes is one researcher to accidentally check two columns in the admin. There is no error correction for these fields in our database.

Granted, we can fix that pretty easily by removing one of those fields without reducing the quality of our data. It somehow feels a bit better to use a field that is usually false with occasional true values than the reverse, so we might change our database to only use `released`, with the assumption that if it is false, the person is still imprisoned. But what if it is [null](https://en.wikipedia.org/wiki/Null_(SQL)) though? Given the lack of open records in Ruritania, our researchers might need to record the name of a prisoner before they fill in the rest of the record, so they’d leave that field null to indicate that information is yet to be entered. Which is fine until we run our SQL query to calculate the number of prisoners in captivity by calculating `where released != 1` and wonder why that count is off by 1 from what we expect. In programming, it’s impossible for a Boolean field to have any value besides true or false. But in the world of data, it’s often important to be able to express that a value is unknown or unknowable. But if your code thinks that Boolean columns in your database can only be true or false, you’re destined for some errors whenever that bit of ambiguity is encountered.

Of course, we do have the option of disallowing NULLs in our database’s Boolean fields. Suppose we decide to be bit more formal about a prisoner’s status and declare it can be only one of these possible states:
- held
- released
- approved_for_release
- charged
- convicted
- died_in_custody (_yep, this example is still dark_)
- unknown

These categories are mutually exclusive. We assume that any prisoner’s status can only be set to one of these categories. So, we decide to implement this as a collection of Boolean values.

```sql
released bool NOT NULL,
approved_for_release bool NOT NULL,
charged bool NOT NULL,
convicted bool NOT NULL,
died_in_custody bool NOT NULL,
unknown bool NOT NULL
```

We’ve eliminated the potential problems with null values by not allowing them at all. And we might feel good that we’ve sidestepped the “held”-“released” confusion by making “held” the default state if none of these Booleans are checked. Yet by adding more Booleans, we’ve just made possible errors even more likely. There are still problems where a researcher might accidentally check two checkboxes in an admin. There might also be well-intentioned accidents; imagine a later developer were maintaining this code and didn’t realize these fields were supposed to be mutually exclusive — so when an inmate is convicted, they leave charged set to true, because the inmate was obviously charged before they were convicted. Suddenly, the application is crashing and nobody knows why.

Ultimately, it makes much more sense to just create a single string field named something like `prisoner_status` and set its value to only one of a few specific keyword values like `held`, `released`, or `charged`. This not only clarifies your intentions for these categories but makes it impossible to create conflicting states in the database, provided that you ensure the string values stay correct. This might seem obvious, and yet I’ve seen so much code that uses a collection of connected booleans instead. Trying to coordinate a passel of checkboxes so that only one of them is checked seems like an exercise in futility, but it’s one that programmers perform again and again.

## Being and Change
As a native English speaker, I am slightly envious that Spanish includes two distinct verbs for “to be”: _estar_ and _ser._ The first of these is used to express transitory conditions (“I am hungry”); the second is for describing essential and unchanging qualities (“I am human”). In English, we use the same verb for both uses, even if in some cases it might not always be clear just how transitory or essential the condition is (“I am curious”).

I sometimes wonder if Spanish speakers employ a similar clear naming distinction for their database schema, because we English speakers generally make a complete mess of it. Sometimes, we use Booleans to represent essential constants; sometimes we use them to represent the current status of a changeable situation. But most of the time, we aren’t entirely sure which of these situations we want our Boolean fields to be.

For instance, suppose we decide to be less rigorous about defining a prisoner’s status. In this case, we just have a Boolean field named `charged` that is set to true when a prisoner is charged with a crime. This sounds pretty straightforward, but what happens if those charges are dropped? Presumably we would just set `charged=false` for that prisoner since they are no longer currently charged with any crimes. This is correct, but it also means that it’s impossible for our database to distinguish if a prisoner was charged with a crime and later cleared or was never charged at all with anything. We can’t use a single Boolean to represent both what is currently true and what was once true. One way to do this might be to add a charges_dropped field that is set to true for prisoners for whom that is the case. But if we are interested in properly tracking the history of a prisoner’s case, it might make more sense to add some additional metadata fields like `date_charges_dropped` or `dismissal_type`. Which is how we soon end up with 50 or 60 columns in our database table, each saving a date and other metadata linked to our various Boolean fields. It seems that we have both cases covered, but what if something unexpected happens in the future? For instance, what if an inmate is charged with a crime, those charges are dropped and then they are later charged with another crime? Ruritanian Law is not always predictable. So what do we do then? We could set both `charged` and `charges_dropped` to true, but doesn’t that look more like a possible bug than a valid outcome?

The problem here is like we’ve confused ser and estar. When we are first defining our schema, we’re often not sure if any specific Boolean field means that something is currently true or simply that it was true at some point, which is a pretty important distinction. Admittedly, this is not the fault of the Boolean datatype, but rather of how poorly we describe the data we want to collect (for instance, if instead of `charged`, imagine we named the field `currently_charged` or `was_charged`). Ultimately though, we should not distill important events in a prisoner’s life into simple true/false conditionals. A far better approach would be to create an auxiliary table that’s joined to the prisoners table:

```sql
CREATE TABLE events (
    id int(11) NOT NULL AUTO_INCREMENT,
    prisoner_id int(11) NOT NULL,
    event_type varchar(255) NOT NULL,
    event_date date NOT NULL,
    metadata text
)
```

A prisoner would have many events associated with them. Here, the `event_type` is limited to a set of keywords like `held`, `charged` or `released` defined and enforced by our code. Then, we can record the history we have for any inmate as a series of events rather than a muddle of ambiguous Booleans. To find all the prisoners who were ever charged with a crime, we can join against this table on the `charged` event_type. We will have no problem representing the hapless prisoner who was charged, then cleared, then charged again, since we can use 3 event records to represent that. To figure out the current status of any inmate, we might simply just look at the most recent event in their timeline. To store additional metadata about specific events, we could either save arbitrary JSON metadata as a text field (if we do not need to search any of it in the database) or use [single table inheritance](http://www.martinfowler.com/eaaCatalog/singleTableInheritance.html). Using a separate events table would also simplify our main prisoners table by eliminating the need for multiple redundant columns like `release_date`, `charged_date`, `conviction_date`, etc.

This approach is not effortless; for instance, it’s a lot more work to create a web admin for editing an arbitrary number of events than it is to just add a bunch of checkboxes to a single detainee record. And to keep our SQL queries simple, we might want to still define Booleans that express the current status of a prisoner. We just should be clear in naming those Booleans something like `currently_charged`. And we should only compute them based on the prisoner’s timeline, rather than allowing them to be edited manually in an admin, to make sure they are never out of sync with what the events record.

## To Boolean or Not to Boolean
For such a simple datatype, Booleans enable a lot of complicated confusion. These types of errors are not hypothetical; I’ve changed the specifics, but every single one of the problematic schema designs I’ve presented in this piece were taken from real databases I have worked with and sometimes created. The problem usually lies not in Boolean values, but in us, for implicitly assuming their strict true-false definitions are enough to depict an often ambiguous reality. For instance, we might expect to know definitively if a prisoner has been charged with a crime or not, but we’ve seen there are sometimes compelling reasons why we might need to record that as a null instead. Nor are these problems specific to just Booleans; imagine trying to record the birthday of a person in a full date field when you only know his birth year. Do you pick an arbitrary day of that year, and if so how do you distinguish this limited information about the date from dates we know exactly? Do you not record it at all? Or do you redesign your database so every date is now represented with three separate day, month, and year fields?

Unfortunately, the revision histories of many news-related database schemas reveal a similar unraveling of the ideal view of the data in the face of murky reality the data is trying to describe. Worse still, this process is usually unavoidable; in many cases, you need to build the database first to later realize all of the assumptions you built it on. Hindsight is a harsh data architect. Still, it seems that we should be able to better design in advance for the problems we expect to see in our data. First, before we start creating database tables we should stop and take a moment to contemplate what might not be as simple to represent as we think it should be. And we should start sharing the best ways to represent a complicated world.

There are already sites that [cover design patterns in code](https://en.wikipedia.org/wiki/Software_design_pattern) and [basic DB schema designs](http://dbpatterns.com/), but it would be interesting to document various techniques we might use to correctly represent murky data succinctly and resiliently against errors. Once we truly consider the Boolean (or the datetime or the string), we can design our databases to be a little more adaptable to all the weirdness this world can throw at them.