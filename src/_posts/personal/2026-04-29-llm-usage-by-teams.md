---
layout: post
title: The LLM Is Not a Junior Engineer
subtitle: and some other thoughts about incorporating LLMs into software development teams
date: 2026-04-29
year: 2026
category: personal
permalink: /personal/llm-not-junior-engineer.html
published: true
description: A collection of different thoughts about how LLMs might be thoughtfully incorporated into modern software development practices.
image: 
---
In the wake of [my last essay on why I don't vibe
code](/personal/i-dont-vibe-code.html), I heard from various people on the
Internet who read it (or the Bluesky skeets that inspired it). Some had adopted
similar stances on their own, often for overlapping reasons. Others were
dedicated vibe coders who wanted to share what practices they used that made
things manageable for them. I appreciate the feedback! I'm not going to change
my stance, but it's good to get perspective on how actual developers (and not
senior executives or corporate marketing materials) have engaged with this
technology.

Contrary to how I might seem at times, I do think there could be a place for
LLM models in modern software development. I do understand why
some developers are entranced with the ability to create applications in hours
and turn prototypes into products. I see how it could be highly useful for home
hobbyists, back-office bureaucrats and expert engineers to build the low-stakes software
they've never had the time or skill for.

But I think it's also incredibly dangerous to assume these same benefits apply
equally for large software engineering teams or more sensitive software
applications. It might be one thing if your vibe-coded personal recipe app
mangles a measurement conversion; it's entirely different if it [destroys your
production
database](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/)
(even if it pretends to be really sorry afterwards). It's one thing if you stay
up late coding on your personal project ([I can't
criticize](https://dogetrack.info)), but another if your team is just merging in
code without testing or reviews because you're too afraid to be the person who
is slowing the team down. And I haven't seen many public example where teams have set
explicit bounds on how and where they want to use AI.

I haven't been able to find many good examples of how teams are using Generative
AI (GenAI) effectively. Much of the literature is still very much in the early
phase of the AI lifecycle, with many articles exulting more in [how AI replaces
the need for software teams](https://every.to/search?query=teams) rather than
how it might boost them. Perhaps, there are people figuring it out, but it feels
like we're going to continue to see a new [land-speed records in
self-owning](https://startupfortune.com/cursors-claude-agent-wipes-production-database-and-backups-in-9-seconds/)
before we learn how to do it right.

And that's probably how it will be. Software development as a practice has been
informed by decades of experience of how to do things terribly wrong, and many
of the standard practices we follow today were learned the hard way. Maybe we
need a few more years of companies deleting their entire code base or shipping
with critical errors (perhaps with a few high-profile outages or bankruptcies in
the mix) before the industry figures out how to sustainably work with these new
tools. These are some of the things I've been thinking about though.

## The LLM is Not a Junior Engineer

First, I need to get something off my chest. It's fairly common in our industry
to anthropomorphize GenAI products and describe them as junior engineers or
similar low-level coworkers. Stop it! While it [may be useful to think of LLMs
as interns instead of
gods](https://www.dbreunig.com/2024/10/18/the-3-ai-use-cases-gods-interns-and-cogs.html),
this framing still grants AI a conceptual personhood that makes it seem more
capable and reliable than it actually is. And it's highly insulting to the
actual junior engineers in the industry, who are usually some of the most
talented and hard-working individuals you will find.

An AI model is not a person or even sentient. It has no long-term memory. It has
no internalized morality of what are good or bad behaviors (apart from what
might be implicitly reflected in its training data and reinforced in
post-training calibration). It doesn't learn from any of its actions itself.
Instead, developers make it "learn" by carefully crafting introductory texts
which tell the LLM how to act and what things to avoid. And it seems to work
mostly, as long as someone [remembers to tell the AI to stop talking about
goblins so
much](https://www.wired.com/story/openai-really-wants-codex-to-shut-up-about-goblins/).
It is indeed impressive and little magical that it does work so well most of the
time, but [there are no
guarantees](https://www.pcmag.com/news/copilot-terms-claim-microsofts-ai-is-for-entertainment-purposes-only)
that it won't go wrong either. To help the LLM build on previous steps, many
coding agents will write to and read from a working memory file. This memory
itself is also included as part of the inputs into the model for each new step,
which means the longer the LLM is used on a single problem, the slower and more
expensive each successive query gets, to the point where some engineers have
reported hitting their weekly usage quotas within a single day. And when the LLM
finally fills out its limited context window, all sorts of wrong things will
happen, from API errors to selective amnesia as well as "lost-in-the-middle"
confusion and issues inferring responses to new prompts. To mitigate this, some
agentic models will include processes to summarize and compact their own
memories; this is a lossy compression by its very nature, so there is some risk
of distortion and loss there. Others will regularly just start over with new
agents that can stumble into the same mistakes and suggestions as their
predecessors without active intervention.

All of which is to say, if an LLM were a person (_to be clear, he is not._), he
would be an absolute nightmare to work with. Every LLM agent is essentially a
combination of [Amelia Bedelia](https://en.wikipedia.org/wiki/Amelia_Bedelia)
and [Leonard Shelby from
_Memento_](https://en.wikipedia.org/wiki/Memento_(film)). It is up to you to
tell him precisely what he should or should not do. And it is also your
responsibility to keep a written memory that he will need to reference
constantly to know how to make sense of his world. Also, he doesn't know or care
about anything else outside of his written notes, and you will feel intense
pressure to keep his notes as concise as possible without messing up. And when
you do mess up, other developers will blame you and not him. Your corporate
culture and values? Your general approach to architecture and testing? Your
long-term product road map? He doesn't know it and doesn't care. He doesn't care
about how well the company is doing financially or its biggest challenges. He
will face no legal liability or professional consequences when he screws up
something. You know nothing about his background before he walked into the door
(and the secret instructions that his temp agency handed him before that so he
wouldn't talk about the goblins). You do know he sometimes lies about things,
but it's not always clear how much he's lying beyond the very obvious whoppers
you've already caught. He can make recommendations and write code, but he has no
idea where it came from and how easy it is to support. He acts like a friend,
but at his core, he has no loyalty or empathy. He has no shared experiences with
you or fun weekend plans. He's a perfectly impenetrable black box.

Junior engineers do learn, however. And unlike the hypothetical LLM-as-a-person,
they arrive at your company laden with context on how to work with your team.
They've grown up in a culture, learned the rules of society, have probably gone
to school for many years and likely learned some important things there. They
belong to families and possibly have heir own. They've put down roots in the
community. To work at your company, they've provided a resume and have gone
through multiple stages of your interview process. They've worked hard to land
this job and they want to keep it! They know that malicious behavior or neglect
will lead to real and painful consequences -- being fired, litigation or even
criminal charges -- that could potentially derail their entire careers. And even
without considering the threat of consequences or possibility reward, they will
still strive to do things the best they can. Because it just _matters_ to them
in a way they might not always fully articulate but feel innately.

Of course, junior engineers do not move as fast as AI models, because they do
not come prepackaged with knowledge and must live in a world more complicated
than a stream of data. It is true that junior engineers will often make
mistakes, but they also generally learn from those too. And yes, genuinely
malicious engineers can cause real damage of their own as "[insider
threats](https://en.wikipedia.org/wiki/Insider_threat)," but there is at least
the possibility of consequences -- being fired, litigation or even criminal
prosecution -- including the fear of never being able to work in the industry
again. I don't claim that junior engineers are perfect or infallible, but I do
believe that it's also unfair to compare the worst of junior engineers to the
best of Generative AI models. And most junior engineers are simply
phenomenal.

Best of all, junior engineers will mature with time into highly competent senior
engineers, engineering managers, directors and architects. But the GenAI models
will simply be replaced with new black boxes. Your investment of time and money
in them will earn dividends as they become more capable members of your staff.

## 'Magic' and 'More Magic'

In a recent profile of vibe coders, [the New York Times included a tip from one
developer to tell his agent to not do things that would be
embarrassing](https://www.nytimes.com/2026/03/12/magazine/ai-coding-programming-jobs-claude-chatgpt.html),
leading the author to wonder how that would even work:

> Embarrassing? Did that actually help, I wondered, telling the A.I. not to
> “embarrass” you? Ebert grinned sheepishly. He couldn’t prove it, but prompts
> like that seem to have slightly improved Claude’s performance.

This could of course be [another fine example of pranking the
_Times_](https://en.wikipedia.org/wiki/Grunge_speak), but I've seen enough
similar guidance from other developers to believe this advice is genuine. That
doesn't make it real however. Despite claims about their effectiveness,
these prompting instructions are often little more than ["prompting
folklore"](https://arxiv.org/abs/2504.01205) that seem to work, but we lack an
explanation of why they would work or if any particular prompts are more
effective (maybe asking please would help? Or making threats to a machine that
will never truly feel threatened?). In some cases, other helpful prompting
strategies like asking the model to pretend to be an expert might [improve the
odds of the AI agreeing with you, but actually damage its
accuracy](https://arxiv.org/abs/2603.18507). My point here is that it is going
to be a while before we understand what prompts and usage patterns are effective
and even longer before we understand _why_ they work. How much should we
continue to share these superstitions as useful?

I am reminded of an anecdote in the [Jargon File](http://www.catb.org/jargon/html/index.html) about [a
"magic" switch at the MIT AI
lab](http://www.catb.org/jargon/html/magic-story.html). As the story begins, an
early programmer (or ["hacker" in MIT
parlance](http://www.catb.org/jargon/html/meaning-of-hack.html)) was roaming the
halls of the AI lab when they noticed a curious switch bolted on to a
[PDP-10](https://en.wikipedia.org/wiki/PDP-10):

> You don't touch an unknown switch on a computer without knowing what it does,
> because you might crash the computer. The switch was labeled in a most
> unhelpful way. It had two positions, and scrawled in pencil on the metal
> switch body were the words ‘magic' and ‘more magic'. The switch was in the
> ‘more magic' position.
>
> I called another hacker over to look at it. He had never seen the switch
> before either. Closer examination revealed that the switch had only one wire
> running to it! The other end of the wire did disappear into the maze of wires
> inside the computer, but it's a basic fact of electricity that a switch can't
> do anything unless there are two wires connected to it. This switch had a wire
> connected on one side and no wire on its other side.
>
> It was clear that this switch was someone's idea of a silly joke. Convinced by
> our reasoning that the switch was inoperative, we flipped it. The computer
> instantly crashed.
>
> Imagine our utter astonishment. We wrote it off as coincidence, but
> nevertheless restored the switch to the ‘more magic’ position before reviving
> the computer.

The author related the story to someone else a year later who insisted on going
back to look at the switch. They flipped it and the machine crashed yet again.
Obviously, this switch wasn't actually controlling _magic_ inside the computer,
but it was doing something, even if there were no satisfying actual explanations
of what that might be.

Not everything in the world needs an explanation, and many of us have certain
superstitions that let us pretend that we have some control over the arbitrary
randomness of the universe. A superstition like the gambler blowing on his dice
before shooting craps is harmless enough until the gambler starts to really
believe that his superstitions are real and that failing to follow them will
result in disastrous consequences. This phenomenon is called [the illusion of
control](https://en.wikipedia.org/wiki/Illusion_of_control), and it is common
for people to feel this when faced with completely random processes.

Large Language Models (LLMs) are not as simple as a game of craps, but they are
random at their core. Instead of a game of craps, we could consider an LLM as an
inordinately complicated [pachinko
machine](https://aaaslotgamedevelopment.com/blog/pachinko-machine-gambling) that
uses snippets of text instead of ricocheting ball bearings. Most LLMs include a
_temperature_ parameter that injects a specific amount of randomness into how
the LLM selects its next generative response because this can jostle the model's
completions onto a different pathway and make it seem more creative. This is
great for open-ended conversations, but not ideal for tools; I don't imagine
you'd like to use a hammer that every so often would spray you in the face with
confetti. But, even when the temperature is set to 0, [LLMs remain innately
nondetermistic](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)
because of how floating point operations work. And, of course, companies can
also tweak the operating parameters for their models at any time, which could
have its own unexpected effects on model behavior for your applications (_hey,
have you heard about the goblins?_).

As a programmer, this nondeterminism makes me queasy. Suppose that I give an LLM
a prompt, notice an obvious error, rephrase my prompt and get a second correct
response in turn. In a purely deterministic model, I can be certain that my
modification to the prompt was the thing that fixed the model's response because
it was the only thing that changed. Software is generally deterministic, because
it allows us to live in a world of cause and effect, where flipping the switch
away from "more magic" always causes a crash. It also lets us repeat the
circumstances that cause bugs to occur (and know that our fixes work). For
instance, a certain LLM model might [always miscount the letter 'r' in
strawberry](https://www.secwest.net/strawberry) and we can figure out why
because it uses a deterministic model for tokenization.

Under the nondeterministic model, I can no longer be sure. Maybe my change to
the system's input did fix its output. But it's also possible that what simply
happened is that the odds of the LLM producing erroneous output that I would
notice twice in a row were just suitably low. It's possible that my prompt
modification had perhaps only a subtle effect on the system's behavior or maybe
even no effect at all. Was it real or a
[Heisenbug](https://en.wikipedia.org/wiki/Heisenbug)? When the system deletes my
production DB and backups, is it because I have a skill issue or was I just
particularly unlucky? I'll never know.

Of course, we can build systems to handle unpredictability and bad luck. One
common approach is to use multiple computations and then check them against each
other. Indeed, one way to reduce the risks of individual LLM errors is to ask
the same question multiple times against multiple models or use judges to assess
output. The challenge is that this approach will both dramatically increase
costs as well as reduce the responsiveness of LLM models in specific
applications. It reminds me, in a way, of error correction code (ECC) memory
that protects [against the relatively rare soft error bit flips caused by cosmic
rays](https://en.wikipedia.org/wiki/Soft_error) This technology has been around
since the 1980s but it is not everywhere, because those memory correction
techniques increase costs and decrease system performance. And so, it makes
sense for a computer system controlling a nuclear reactor, but it might be
something [you might not need for a graphics processing
unit](https://techxplore.com/news/2025-09-gpu-vulnerability-threaten-ai.html)
that normally would just power video games. It goes without saying that the risk
of LLM-induced failures is exponentially higher than those caused by an errant
cosmic ray, but many developers are still stumbling in the dark on the best ways
to handle error correction and when to use it. Maybe we can start by accurately
thinking about risks.

## Clarifying Risks

As an experienced software engineer, you learn to always anticipate that [danger
can happen](https://kaijubigbattel.org/). Instead of dissolving into a puddle of
anxiety, a software development team learn to manage the fear and quantify
uncertainties into a document that outlines all the important risks. A specific
risk could be something technical ("[an entire data center that we are using for
our cloud provider goes
offline](https://www.tomshardware.com/tech-industry/iranian-missile-blitz-takes-down-aws-data-centers-in-bahrain-and-dubai-amazon-declares-hard-down-status-for-multiple-zones)")
or more broadly existential ("we miss our launch deadline"), and it will often
include things that are not entirely in the team's control. For every risk, the
team will determine if there is a suitable mitigation that allows the team to
recover from the risk (ideally, the best mitigation will prevent the risk
entirely) and if the team "owns" the risk mitigation and response. It's also
highly useful to estimate the likelihood and impact of a given risk. Typically,
these are both estimated on a scale from 1 to 5 and multiplied to generate an
overall severity estimate -- under this approach, low-impact but highly common
risk might turn out to have a higher severity than a more dangerous risk that is
extremely rare. Severity gives teams the ability to prioritize which risks to
address first and calibrate how much they should worry about specific problems.
To avoid being overwhelmed by a world filled with danger, teams will also
generally limit the number of risks they track at a given moment (usually to 20
or fewer) and will regularly review the list to add or remove items or
recalculate their severity.

There is an art to this approach, of course, and its estimates are more of a
heuristic than a precise calculation of what dangers might occur. And that's
fine. The main point of the exercise is the process where the entire team
discusses the risk and not the just the risk register that they create. Everyone
contributes to the discussion of what risks should be tracked and how to point
them, and it benefits immensely from multiple perspectives that can look at the
technical stack with a critical eye. It is also is informed by decades of
failures and fixes in how software is built and deployed to infrastructure.

I don't know how to properly consider risks for GenAI usage. I think the
industry is still figuring out the failure patterns and mitigations for them. I
have observed that developers (and other team members) vary wildly in how they
assess the impact and severity of AI-related risks (boosters are excited and
skeptics are cautious), and I believe that this makes it harder for teams to
come to a realistic consensus of risks in AI usage in their products and
processes. I've also noticed that much of the existing discussion about GenAI
risks has been at a relatively high-level (_e.g.,_ "should we use this for
purpose X or industry Y?") and it's harder to find more granular examples
exploring the risks and benefits of using AI for very specific purposes in your
very specific context (e.g., "should we use this LLM model to generate synthetic
data for our testing environment?"). Many AI users and companies are actively
learning how these tools can go wrong and what to do about it, but this is a
case where risk assessments should skew pessimistically while they figure it
out. Perhaps a risk checklist to work through might make sense here.
And maybe we should make a regular practice of asking "what is the worst that
can happen?" and identifying scenarios where "it gets worse than that" if we
don't feel confident we're pessimistic enough.

## Human in the Loop

Last year, Amazon's retail operations suffered several outages that directly
caused by the Kiro LLM tool. Amazon angrily retorted that the news reports were
wrong and [the outages were actually caused by solitary developers making
changes under the advice of
AI](https://www.pcmag.com/news/amazon-links-2-aws-outages-to-autonomous-kiro-ai-coding-agent).
That's not much more reassuring. As I've mentioned above, we've had decades of
mistakes that inform modern DevOps practices for maintaining software
architecture. This includes best practices like "don't let a single engineer
make tweaks to production" or "code changes should be reviewed by at least one
other engineer before being merged" or even "people (and the AI models using
their credentials) should have only the [minimum amount of access
privileges](https://en.wikipedia.org/wiki/Principle_of_least_privilege) they
need for their job." It's common for companies to ritualistically invoke the
phrase "human in the loop" to answer concerns about LLM safety. But how
effective is that guarantee?

Much has already been written about how extensive GenAI usage can create not
just cognitive displacement but even ["cognitive
surrender"](https://arstechnica.com/ai/2026/04/research-finds-ai-users-scarily-willing-to-surrender-their-cognition-to-llms/),
where people defer unthinkingly to the judgment of the LLM. Some go willingly,
but many are being pushed into it by management pressures. It seems like no
coincidence that the same Amazon retail division that has suffered several
AI-related outages is also [heavily monitoring GenAI usage among
staff](https://archive.ph/hRqWn) and setting ambitiously high targets for
adoption:

> The effort calls for more than 2,100 engineering teams in the retail arm to
> triple software code release velocity using what Amazon calls "AI-native"
> practices, while a smaller group of at least 25 teams is expected to boost
> output tenfold this year. Progress against these goals is closely tracked by
> Amazon's senior leadership team, known as the S-Team, according to the
> document.

This model of setting targets before considering their effectiveness is how you
repeatedly take down production and create problems that are hard to unwind.
This not only creates cognitive surrender but also a moral abdication, where
engineering teams abandon their sense of duty to a vague hope that the AI won't
err too badly. These metrics are very specific about what tools teams should use
and how they should act, but they don't consider how this might affect the
product that the teams are working on (in this case, Amazon's retail operations
and website) and which might be negatively impacted by this change. I will talk
more about the absurdity of these velocity metrics below, but I wanted to note
here how it is simply impossible for a "human in the loop" to act meaningfully
under these circumstances: direct action against GenAI usage that might stop
bugs will be penalized for making your team miss the target, but letting stuff
through that might take down production can be conveniently blamed on the AI (or
the single engineer we can scapegoat for using it). And so, the teams will hit
their targets, the executives will chalk this up as a success, and the website will just start
acting more erratically because that's not as high a priority.

I think it's essential for teams and organizations to firmly define what they
mean by a "human in the loop" and stick to that definition. Here's a possible
place to start: any person on the team can hit the imaginary big red button that
stops the assembly line at any time for any reason (no shaming nor penalties
allowed). **Never replace a person with an AI model**, especially if that person
contributes necessary friction (product managers, accessibility testers,
security compliance); if you must, instead work with that role on ways that LLMs
might supplement their activities. Explicitly ask at team retrospective meetings
if people felt pressured or rushed into approving AI-generated work. Audit all
AI usage to ensure there are no places where an AI model is taking both sides of
a working relationship for quality control. For instance, an AI model should
never be allowed to write both code and the tests for that code, or to write
both design documents and implementations. These restrictions should be enforced
even if we are using two different agents of the same Large Language Model or
two different AI products to evaluate the model. Define the line and hold firm
to it.

And it may be that the line is not to us AI at all. Perhaps, you work in an area
where the legal or ethical risks are too great. Perhaps, you don't want to help
support AI as it currently exists, where the choice is among several different
large organizations with terrible environmental practices, huge influence over
certain swaths of society and decidedly flexible approaches to morality. I feel
the same way. This isn't politicizing AI, but it is recognizing that how you use
AI is an inherently political choice (as is basically everything else), and your
team should be making that choice willingly rather than feeling coerced.

The goal here is to be intentional about using LLMs where they might fit best
while reducing exposure to the risks of cognitive surrender and professional
laxity. For me, a good breakdown would be to use LLMs for situations where there
is accidental complexity (something that can be solved by better tooling) vs.
problems with essential complexity (how to architecture precise software models
to reflect the messy nuances of reality). I do think AI models potentially show a lot of
promise for building tests and fuzz testing, synthetic data generation, static
analysis to identify bugs, code exploration and summarization. But, I also think
a person should always be checking their work.

## The LLM Budget Bomb

I've already mentioned [that I'm a
cheapskate](/personal/i-dont-vibe-code.html), so admittedly I'm overly
sensitive to this, but it's shocking to me how little discussion there is about
the [inevitable substantial rate hikes that will hit LLM usage as soon as this
year](https://www.theverge.com/ai-artificial-intelligence/917380/ai-monetization-anthropic-openai-token-economics-revenue).
Over the past few years, AI companies have been drastically discounting their
products in the hopes of increasing market-share and gaining advantages against
their rivals. At the same time, they have been dramatically expanding their
capital expenditures by building out new data centers. At some point, investors
are going to want to see returns, and some changes to AI pricing have already
started to show:

> Everyone I spoke to had some version of this problem — their token usage has
> gone up, so their usage-based billing cost has gone up, or the tier they were
> on no longer has the same cap, and now they’re having to go to a more
> expensive tier to try to keep the same amount of usage per month as part of
> their flat rate.

Many personal AI users have been using tiered products that come with usage
quotas which obscure the true cost of their activities (unless you hit your
weekly limit). But as costs increase, even those users might find themselves
forced to move to higher tiers. For instance, Anthropic recently [removed Claude
Code from its $20/month tier and made it exclusive to the $100/month tier or
higher](https://simonwillison.net/2026/apr/22/claude-code-confusion/). The
company reversed course after facing widespread outrage from developers suddenly
contemplating a 5x increase in their monthly AI bill, but I think an price
increase for this feature is inevitable. Similarly, GitHub Copilot has announced
it is [moving all customers to a metered model based on token
usage](https://letsdatascience.com/news/github-copilot-moves-to-token-based-billing-6e9a94d1),
and that model is how Enterprise users of all the major LLM platforms are
already paying for that usage. Under this model, it's up to developers to track
and manage and budget their AI costs by tracking their usage and setting
budgets. The problem is that those costs are essentially impossible to budget
for.

Some of you might be wondering what these tokens actually are. [Generative LLMs
work by taking inputs of text to generate more text which is then fed in as more
text into the LLM to generate more
text](https://jalammar.github.io/illustrated-gpt2/) until either it hits some
sort of stop condition or character limit. A Large Language Model roughly works
in a similar fashion to text autocomplete, but instead of suggesting the most
likely next letter, it suggests the next possible token that is the most
semantically likely continuation (with a bit of randomness thrown in). It does
that by calculating the probability of every possible completion based on the
data it was trained with and then usually (this is where temperature comes into
play) picking the most likely one. Whole words would be the best unit of text for making
these semantic associations, but there are just too many of them (especially
when you factor in spelling mistakes, etc.) to make the models feasible.
Instead, a given LLM reads its input as a sequence of multi-character tokens
rather than characters -- for instance, "strawberry" might be read as "str"
"awb" "erry" by one model and "straw" "berry" by another. Tokens are an
engineering compromise that invisibly shapes how each model sees the world. And
since they are the basic unit of processing, they are also naturally the basic
unit for any metered billing (or usage quotas for different tiers in an flat
pricing model). Costs scale linearly with token usage, but this token usage is
hard to predict.

One problem is that it's impossible to know in advance how many tokens even a
single LLM query will actually consume. It _is_ possible to set hard limits so
that a session will not churn indefinitely, but that limit essentially acts like
a proctor for an exam telling students to put their pencils down; the LLM is not
able to strategically analyze and plan against its token budget. Some guides
suggest handling this through prompts that tell the LLM to be more terse in its
responses, but this is just another example of prompting folklore.

It is also worth remembering that LLMs produce plausible output (usually the
most likely responses). That is not the same as correct output. Unfortunately,
many LLM techiques to increase accuracy -- [chain of thought
prompting](https://www.ibm.com/think/topics/chain-of-thoughts) or [using another
LLM as a judge](https://eugeneyan.com/writing/llm-evaluators/) -- will
themselves increase token usage, pushing teams into the dilemma of balancing the
risks of errors against increasing costs. For instance, a team might find that
it has to add guardrails in the form of regular expressions and analysis by
another LLM model to check the output of an AI chat agent that has been acting a
little too helpful to hackers. They probably didn't consider those costs at
first.

And we shouldn't forget that LLM companies still control two different means to
shift more token costs onto user. First, companies will set a fixed rate on
their per-token cost. For instance, Anthropic's Claude Opus 4.6 model charge $5
per million input tokens and $25 per million output tokens, while the older and
less powerful 3.5 Sonnet model is $3/$15 per million tokens respectively. These
rates are not regulated and could change at any time. In addition, token usage
can vary. Anthropic recently announced an upgrade to Opus 4.7 to better handle
certain agentic coding tasks. The company guaranteed it would have the same
per-token cost as Opus 4.6, but users have still seen dramatically higher usage
costs because the new model has a different tokenizer implementation, leading to
much higher token utilization for identical queries. Anthropic itself has
conceded that some tasks might require [35% more tokens, but developers have
seen increases of up to 46% in token
usage](https://www.linkedin.com/posts/arcolano_weve-all-had-a-week-to-sit-with-opus-47-share-7452406301739118592-T-xt/)
and corresponding costs. There will always be a trade-off between accuracy and
costs; at some point, a 1% improvement in model performance might not seem worth
if it leads to a 10% increase in costs. But, the LLM provider is the one making
that decision, while you are the one footing the bill. At some point, you might
need to decide if the benefits still outweigh the costs, but how do you figure
out the benefits anyway?

## Productivity Metrics Are a Scam

As companies have moved to mandate LLM usage for their teams, they have
increasingly relied on metrics to track how their employees are using the tool
and to brag about how fast their development velocity has become. In the example
of Amazon from above, they have stated their expectations is for teams to
**triple their software code release output,** which could possibly mean they
either want to triple the number of times they deploy something to production or
triple the lines of code they write every week or triple the number of work
tasks they complete. Google's CEO has recently bragged that their AI development
tools have led to a [**10% increase in developer
velocity**](https://www.businessinsider.com/ai-google-engineers-coding-productive-sundar-pichai-alphabet-2025-6?op=1)
that sounds impressive, but how do they even measure that? Investigating this
question led me down a rabbit hole. First, I waded through a lot of useless slop
explaining the importance of measuring developer productivity without providing
any direction on how. Eventually, an astute reader tipped me of to a [DX article
about measuring LLM
impact](https://getdx.com/research/measuring-ai-code-assistants-and-agents/)
that clarified they were indeed measuring an increase in developer-hours to make
this declaration. Great! Now, how do we measure developer hours then?

And this is where I ran into a wall. DX is a commercial product for measuring
Developer Experience metrics, and [that documentation is behind a
paywall](https://docs.getdx.com/). So, it's possible they are actually measuring
developer time. This likely doesn't mean measuring the overall time of
developers working in the office (since I doubt the Google CEO would be bragging
about developers leaving work almost an hour early each day. Instead, it likely
is a complicated melange of various automated surveillance observations
(corporations are a big market for spyware) that are blended at different
weights into deriving a measure of overall developer time for each feature being
developed. As always, it's important to ask what gets counted and what doesn't.
Does typing time count even though it's just people typing comments into Stack
Overflow? Do meetings not count, even if they're important to coordinate what
the team is building? And then it's important to ask how AI changing team
behavior might possibly change the output of these statistics. For example, it's
pretty clear that developers in teams that are heavily using LLMs have to shift
more time into waiting for responses and reviewing pull requests; this
translates to much less typing and more scrolling and staring at screens for
minutes. It's possible that the LLM is really reducing the overall time per
feature, but it's also possible that LLM usage is just skewing how the metric is
calculated without any real improvement to developer productivity. I simply
don't have enough info to say, but I'm innately suspicious about a metric that
is conveniently obscure.

Of course, most places don't have the time or energy to invest in a platform to
collect Developer Experience metrics and instead they just wing it with what
they have. Returning to Amazon's productivity goals, I'm not sure what metrics
they mean to measure for this. Obviously, just tripling the lines of code is not
necessarily a sign of quality, and it's also unclear to me why tripling the
number of deployments would be better, since I assume Amazon has already been
following [modern DevOps practices for frequent
deployments](https://dora.dev/guides/dora-metrics/). Instead, I assume they are
just committing the cardinal sin of agile development: [using estimation points
as a metric](/personal/bad-metrics.html). For those of you who don't know what I
mean, many teams doing agile development grapple with the problem of estimating
how long the work will take by using a points-based approach. Under this model,
we divide the work into discrete tasks that can be assigned to individual
developers and then estimate the work it will take to do such tasks. So, fixing
a simple typo on an admin screen might be 1 point, while a complex redesign of a
testing harness might be 8 points (many teams use a [Fibonacci-based
scale](https://www.scrum.org/resources/blog/practical-fibonacci-beginners-guide-relative-sizing)
of _1, 2, 3, 5, 8, 12_, but it's not essential). Once we have pointed all the
tickets, we can then use this to estimate how much work the team can fit into a
single sprint of 2 weeks (or usually 10 working days) by adding up the number of
points that the team was able to complete in a few prior sprints and deriving a
points-per-developer-day rolling average you can use to figure out a target for
an upcoming sprint with only 9 working days and one of the developers out on
vacation. It's definitely still an approximation rather than an exact science,
but the goal here is for the team to be realistic about how much work it can
reasonably do in the next two weeks and defer remaining work for later sprints.
The problem is that the organizational leadership doesn't want to know "are we
able to somewhat reliably estimate work for the next sprint?" What they care
about is "can we publish a statistic to show how our corporate bet on AI is
paying off?"

Absent a crystal ball and intensive measures to track productivity, companies
will try to get a "good enough" answer out of the team metrics they do have, and
points seem like a natural choice. After all, if a given team now is doing 33
points in a sprint with LLM tools and it was doing 30 points six months ago,
that's a 10% velocity gain! Except for all the ways it which it goes wrong. For
starters, we should check that the team isn't achieving this gain by skipping
important safeguards like code reviews or passing tests. Furthermore, team
practices for estimation can drift over time, as the team compositions changes
or developers become better about underestimating the work. And of course, teams
might actively cheat, if there are incentives to be top performers or penalties
meted out to laggards -- one way to get a 10% boost might be just to point a
bunch of 1-point tickets to 2 points. Sure, it'll make it harder to estimate the
work of future sprints in the short term, but eventually the rolling averages
will reflect the new normal. Simply put, points are just a terrible way to track
team velocity and productivity. They're just so inconsistent, unreliable, easily
manipulated and totally uncalibrated, that I would hesitate about making broad
inferences from comparing totals a year apart. But, they do let you do easy
math, and that's good enough for people who just need to say they had a 23.7%
improvement in developer speed.

To be fair, this is not a new problem that is unique to LLM-assisted teams.
[Most metrics are bad](/personal/bad-metrics.html), but the ones that measure
team productivity or speed have always been especially deficient, as the example
above shows. They are so tempting though! This is because they are super easy to
compute and directly responsive to changes, letting you cite an instant
improvement or reduction as a quick win for the next all-hands meeting. For
instance, a company can tweak a setting and directly measure "40% more customers
are interacting with our AI agent" just by counting the API calls from its
front-end web interface. More customer-AI interactions doesn't necessarily mean
better interactions or happier customers however! And the metrics which reflect
the real quality measures -- customer satisfaction, site reliability, revenue --
that dictate whether the business succeeds or fails are often lagging indicators
that take a while to manifest and are harder to diagnose. If a team is hitting
high velocity scores by not reviewing any LLM code before merging it, that will
eventually be reflected in a product quality metric like uptime showing that the
system is crashing more frequently. The truth will out, but sometimes it takes a
while; by the time the company realizes that the increase in AI chats is leading
to a 23% surge in subscription cancellations, the damage might already be locked
in.

The main points from this section? Most AI-related statistics are potentially
suspicious and you should be wary before citing any of them uncritically (even
for ones reporting damaging effects from LLM usage). It is easy to measure an
action, but much harder to measure the effects of an action or gauge its
quality.

## What if the AI Goes Away?

There is a joke from the "Two Dozen and One Grayhounds" episode in the sixth
season of the Simpsons where technical difficulties force the local TV station
off the air and it airs this disclaimer:

> Your cable TV is experiencing difficulties. Do not panic. Resist the urge to
> read or talk to loved ones. Do not attempt sexual relations as years of TV
> radiation exposure have left your genitals withered and useless.

Lying in bed with his wife, Chief Wiggum lifts up the sheets and looks before
uttering "Well, I'll be damned." I do sometimes wonder if a similar moment of
reckoning is coming for companies that have leaned heavily into LLM usage and
eliminated large numbers of its staff as redundant. Will they find themselves
trapped in a spending cycle, locked into a particular vendor? What happens if
that vendor goes bankrupt?

I don't particularly think there will be a catastrophic moment where all AI
companies are destroyed, although I do think it's likely one of the major
vendors will implode into bankruptcy, with profound effects on the economy and
the software industry. For many companies, their AI usage will not end with a
bang, but with a series of whimpers, when they need to make strategic decisions
about their budgets and usage of the technology. As risks go, this is a pretty
important one to prepare for.

If you are on a software team using AI in your processes or products, it might
be worth regularly asking yourself what it would mean if the LLM went away?
Would this be a critical failure that would doom your operations or something
that you can fix? Is the LLM being used for production products that would break
instantly or just for development practices like automated testing which can be
revised? How much is this usage locked in to a particular provider or model? If
you are using the LLM to generate code, how much do other developers understand
that code? You wouldn't abide a situation where everything broke because only
one developer understood that code and she's on vacation this week, are you
accepting that for AI-generated code?

## What Next?

I wrote this essay because I wanted to work through some thoughts about how LLMs
might be incorporated into teams working on software, in the hope that such a
future is possible to achieve and a thing worth having. I hoped to see something
in this that would make me feel more comfortable about AI usage in the craft of
software development, as an alternative to the [grim future that Silicon Valley
is intent on building
now](https://www.nytimes.com/2026/04/30/opinion/ai-labor-work-force-silicon-valley.html).
Perhaps, a better AI future is possible. For instance, I'm particularly
intrigued by the idea that a smaller and slightly-less-accurate-but-still-good-enough Medium Language
Model (MLM) that can run on a server or even your laptop might just be good
enough for many teams, and it's certainly a lot cheaper! Maybe we will enter an
era of [open-source and more ethical choices for AI
tools](https://www.anildash.com/2026/04/28/one-good-ai-is-here/). I'm not
convinced, but I sincerely hope I'm wrong on this. For all of our futures.
