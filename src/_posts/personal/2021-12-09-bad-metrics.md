---
layout: post
title: Bad Metrics For Agile Development
subtitle: How to Make Things Worse With Measurements
date: 2021-12-09
year: 2021
category: personal
permalink: /personal/bad-metrics.html
published: true
description: The text of an internal talk I gave at Nava PBC on how the misuse of metrics can make things worse than not having metrics at all.
image: /images/writing/bad-metrics/bad-metrics.001.jpg
---

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.001.jpg" data-lightbox="bad-metrics" width="100%" data-title="Slide 1">
            <img src="/images/writing/bad-metrics/bad-metrics.001.jpg" alt="Bad Metrics: How to Make Things Worse With Measurements by Jacob Harris">
        </a>
    </div>
    <div class="five columns">
        Welcome to my talk.
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.002.jpg" data-lightbox="bad-metrics" data-title="Slide 2">
            <img src="/images/writing/bad-metrics/bad-metrics.002.jpg" alt="Metric = Measure divided by Time > Target. We want to be able to optimize something that is qualitative with a quantitative value that we can track and optimize for over time. Useful for: Agile course corrections, Targets for scaling and performance optimizations, Test coverage and defect monitoring, Quality Assurance Surveillance Plans (QASPs), Service Level Agreements (SLAs), Objectives and Key Results (OKRs)">
        </a>
    </div>
    <div class="five columns">
        <p>English is fuzzy. Metric is technically the same as a measurement, but I want to declare a definition for the purpose of this talk. So when I say metric I am referring to a measure we can make, a target goal for that measurement and the passage of time with opportunities for us to take that measurement multiple times and see how we are doing.</p>

        <p>We encounter metrics in a variety of places and contexts. For the purpose of this talk I'm going to focus mainly on the types on metrics we see about software, usually represented in contract QASPs or other internal team targets like code coverage. But metrics are used all over the organization and products.</p>
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.003.jpg" data-lightbox="bad-metrics" data-title="Slide 3">
            <img src="/images/writing/bad-metrics/bad-metrics.003.jpg" alt="Measures. We can't directly measure "good," so we find proxies we can measure that reflect good qualities in the system: Unambiguously and easily measurable; Directly related to a change; Directly related to success; Under your control; Understood by everyone">
        </a>
    </div>
    <div class="five columns">
    <p>The first component of a metric is a measure.</p>

    <p>In most cases, what we are using the metric for is not what it provides directly but as a proxy for something that can't be easily measured itself. For instance, gross domestic product (GDP) is a common proxy for comparing the estimating the size of a country's economy and its growth rate.</p>

    <p>In software development, we often use metrics as a proxies for quality of the overall product. I'll present some examples of what I mean in a little bit, but in general, these are the properties of a good proxy measurement.</p>

    <p>Picking a bad proxy is usually the first way a metric can go wrong. No proxy is perfect, but the assumptions of a wrong proxy can skew our view of reality.</p>
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.004.jpg" data-lightbox="bad-metrics" data-title="Slide 4">
            <img src="/images/writing/bad-metrics/bad-metrics.004.jpg" alt="Time. Almost every metric is a rate, so pay attention to time units specified: Months, Days, Hours, etc.,  Sprints, Program Increments, Quarters Releases, Deployments, etc.">
        </a>
    </div>
    <div class="five columns">
    <p>The second component of a metric is time.</p>

    <p>We usually express metrics as a rate, some measure that is counted or added or accumulated that is divided by a denominator which is almost always a measure of time. In some cases, you will see metrics use direct units of time like hours, or minutes or days or months. In some cases, it's indirect via a proxy for time like sprints or program increments or quarter.</p>

    <p>We could also theoretically have denominators that aren't directly tied to time (like "per release") but those are usually less useful because it's harder to compare two measurements of such metrics because the real time intervals might be different for each of them.</p>
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.005.jpg" data-lightbox="bad-metrics" data-title="Slide 5">
            <img src="/images/writing/bad-metrics/bad-metrics.005.jpg" alt="Targets indicate a success state for the metric: Single threshold (boolean); Multiple threshold (e.g., red/yellow/green); Percentile (be careful of this); Relative to Past Targets (be really careful of this); None (seriously?)">
        </a>
    </div>
    <div class="five columns">
<p>Targets are how you define success for the metric and picking a bad target is usually another way in which metrics go wrong. Targets should be realistic to reach (although the value may depend on the context. Targets in contracts may be lower than internal team targets) and fit naturally into a measure of success for the product.</p>

<p>Most metrics define a single threshold, but other variations are possible like red-yellow-green or New Relic's appdex. Most metrics are usually defined in absolute terms, but it is possible I suppose to have metrics that are relative to an entire population rather than fixed (like grading on a curve) or relative to past targets (10% growth every quarter!). These are more likely to go wrong than a fixed and absolute threshold.</p>

<p>In any event, it's usually important to have some target. Otherwise you are just stuck on a vicious feedback loop of endless and increasingly difficult optimization.</p>
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.006.jpg" data-lightbox="bad-metrics" data-title="Slide 6">
            <img src="/images/writing/bad-metrics/bad-metrics.006.jpg" alt="Reason. You should never measure things just because you can. Metrics should be in service of a reason: To record quality; To demonstrate continuous improvement; To incentivize desired outcomes; To disincentivize negative outcomes, etc.; Eg, "We capture this metric because it confirms for our product owners that our API is adequately responsive to most user requests"">
        </a>
    </div>
    <div class="five columns">
<p>The final unstated aspect of a metric is its reason. You should always be able to know in plain language what the stated reason for an metric is, since that is often the best way to understand why a metric succeeds and where it fails short.</p>

<p>For instance, if the we say a metric is to measure developer productivity and the proxy it is using is lines-of-code committed, we can understand it's not a good metric to measure developer productivity because of a poor proxy.</p>

<p>All metrics should either have an explicitly stated reason or one that you can easily determine. Otherwise, it's hard to know how effective a metric proxy or not is</p>
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.007.jpg" data-lightbox="bad-metrics" data-title="Slide 7">
            <img src="/images/writing/bad-metrics/bad-metrics.007.jpg">
        </a>
    </div>
    <div class="five columns">
<p>Anyhow, let's look at some good metrics first</p>
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.008.jpg" data-lightbox="bad-metrics" data-title="Slide 8">
            <img src="/images/writing/bad-metrics/bad-metrics.008.jpg" alt="Slide: The 95th percentile of all service response times should be within 500 msec.">
        </a>
    </div>
    <div class="five columns">
<p>Here's an example of a good metric for an API.</p>

<ul>
<li>You see a measure: 95th percentile of all service response times</li>
<li>Target: 500 msec</li>
<li>Time: we could use this metric for multiple timeframes. For instance, we might want to have NewRelic use short time intervals so it will let us know if the API is slow over the last hour. But we might compute this for a QASP on a monthly basis</li>
<li>Reason: To assess if the API is fast and responsive to most user requests</li>
</ul>

<ul>
<li>Unambiguously and easily measurable? Yes, we can use tools like NewRelic or Splunk to compute</li>
<li>Directly related to a change? Yes, we can assess coding tweaks by how they improve performance</li>
<li>Directly related to success? Yes, this metric is often used as a way of specifying that the API is responsive</li>
<li>Under your control? Teams usually have control over the software and systems to be able to consistently achieve this performance</li>
<li>Understood by everyone? This definition is standard and precisely described as a measure</li>
</ul>

    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.009.jpg" data-lightbox="bad-metrics" data-title="Slide 9">
            <img src="/images/writing/bad-metrics/bad-metrics.009.jpg" alt="Slide: The service should have >99% uptime in production and developer preview environments.">
        </a>
    </div>
    <div class="five columns">
<p>Similarly, here is another proxy for a good API that is focusing on overall availability instead of responsiveness. It is often the case multiple metrics covering the same component like this.</p>

<p>I mentioned early that value of the target might vary based on the context of its use. For contractual obligations like a QASP, a team might define a target of 99% as an easily achievable baseline. But internally, the team could potentially have a target of 99.9% or 99.99%. The challenge is to not set too high a target that people are frustrated they are unable to hit it</p>
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.010.jpg" data-lightbox="bad-metrics" data-title="Slide 10">
            <img src="/images/writing/bad-metrics/bad-metrics.010.jpg" alt="Slide: All endpoints should return fewer than 1% 5xx HTTP errors in all responses per day.">
        </a>
    </div>
    <div class="five columns">
<p>Metrics can also represent events that we want to avoid. For instance, we might want to declare that the errors we get are relatively low.</p>

<p>Once again we could consider this metric under multiple timeframes. For monitoring in New Relic, we likely will want to alert if this threshold is hit within a 5-minute interval. But for monthly reporting, we might consider just measuring this metric on a daily or monthly basis. That does create a question though: if we measure it daily and report in monthly, do we fail the metric if one single day has a problem? If most of them have a problem? Or do we just compute the rate over the entire month? These ambiguities are especially good to resolve when you have to report data to contracting officers, etc.</p>

<p>Some of you might say that this proxy has problems because it's not completely under our control. If AWS has failures, that could create errors in our systems we can't resolve ourselves. True, but in general there are things in our control that we could do and should do to address issues there (like multi-region support)</p>
    </div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.011.jpg" data-lightbox="bad-metrics" data-title="Slide 11">
            <img src="/images/writing/bad-metrics/bad-metrics.011.jpg" alt="Slide: 100% of services and products comply with governing regulations, standards and agency directives as determined by audit findings.">
        </a>
    </div>
    <div class="five columns">
<p>Sometimes metrics are used to represent things that just must always be true. Like, we will build software that complies with legal requirements and agency goals. That all data is encrypted in transit and in rest. That no PII is ever sent to external parties</p>

<p>While this approach can be useful in QASPs, I do wonder how often these things should just be listed as our basic operating principles without encoding as a formal boolean metric. We could say "100% of team sprints should include a retro" for instance, but this feels like overkill.</p>
</div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.012.jpg" data-lightbox="bad-metrics" data-title="Slide 12">
            <img src="/images/writing/bad-metrics/bad-metrics.012.jpg" alt="Slide: 100% of security findings are remediated within the designated time period for their severity level.">
        </a>
    </div>
    <div class="five columns">
<p>There is nothing that restricts metrics to quantitative measures of the product. Here is a QASP metric that enforces a required behavior for a team. OKRs similarly are usually about team or organizational outcomes rather than assessing what those teams build.</p>

<p>Similarly, a metric like 90% of code has test coverage is a metric that is about more than just the quality of the product but also the team processes.</p>
</div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.013.jpg" data-lightbox="bad-metrics" data-title="Slide 13">
            <img src="/images/writing/bad-metrics/bad-metrics.013.jpg" alt="Slide: Some Bad Metrics">
        </a>
    </div>
    <div class="five columns">
<p>But this isn't a talk about good metrics; it's one about bad ones. So let's look at some.</p>

<p>And I want to stress that all of these metrics are real and most of them were in the QASPs of a single contract even.</p>
</div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.014.jpg" data-lightbox="bad-metrics" data-title="Slide 14">
            <img src="/images/writing/bad-metrics/bad-metrics.014.jpg" alt="The team should add or change >100 lines of code to the software repository each week. (FAILED for Directly Related to Success)">
        </a>
    </div>
    <div class="five columns">
<p>So here's one example of a bad proxy. It hits a lot of the goals, but the problem here is that its definition of success is only tangentially related to the quality of the team's software development process. And it's even further removed from the quality of the product itself.</p>
</div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.015.jpg" data-lightbox="bad-metrics" data-title="Slide 15">
            <img src="/images/writing/bad-metrics/bad-metrics.015.jpg" alt="There should be no more than 2 security incidents reported in each quarter. (FAILED for Directly related to a change, Directly related to success. Under your control)">
        </a>
    </div>
    <div class="five columns">
<p>This is a fun example of a proxy going awry. This metric was trying to discourage teams deploying insecure code to production. What it instead discouraged was honestly reporting when insecure code was deployed to production, especially when the cause of a specific security incident is not directly the fault of the team affected (ie, there is a new vulnerability reported in an NPM package)</p>
</div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.016.jpg" data-lightbox="bad-metrics" data-title="Slide 16">
            <img src="/images/writing/bad-metrics/bad-metrics.016.jpg" alt="Code should adhere to the industry standard of < 1 defect per 1000 LOC for each deployment (FAILED for Unambigously measurable, Directly related to success, Easily understood)">
        </a>
    </div>
    <div class="five columns">
<p>This one seems like it would be a good metric. It just spells out a threshold for bugs! But it always has been confounding to me.</p> 

<p>The target is an unclear definition of success. Since it is often reliant on QA or bug reports, it's not usually unambiguously measurably, especially for the short timeframes of continuous delivery. And it's not directly related to success. If I use a terse programming language like Python or Ruby, does that get penalized compared to a verbose language like C or Java?</p>

<p>And despite hours of searching I have yet to find where exactly this metric was defined as an industry standard, so its stated reason is somewhat suspect.</p>
</div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.017.jpg" data-lightbox="bad-metrics" data-title="Slide 17">
            <img src="/images/writing/bad-metrics/bad-metrics.017.jpg" alt="The company should give financial bonuses to software developers for every software defect they find and fix in each quarter. (FAILED for Directly related to change, Directly related to success, No success target specified)">
        </a>
    </div>
    <div class="five columns">
<p>Sometimes there is a temptation to tie a metric to a reward like this one. In the idea that financial or other incentives are a good way to motivate people to fix bugs. I'll admit this isn't necessarily a proper metric, but if you look closely, you can discern the outlines of one:</p>

<ul>
<li>Measure: software defects</li>
<li>Time: per quarter</li>
<li>Target: none</li>
<li>Reason: who doesn't want to eliminate bugs?</li>
<li>Reward: money</li>
</ul>

<p>Where this goes wrong is in several ways. For starters, there is no target or circuit breaker for this metric. And bugs reported is not necessarily a good proxy for a lack of bugs in the product. In fact, it often becomes an increasingly disconnected proxy when people are gaming the system.</p>

<p>This is also called a perverse incentive or the Cobra effect. The original story is that the British government in Delhi offered bounties for every dead cobra that was brought in. This initially was a successful strategy to reduce the cobra population, but eventually enterprising people started breeding cobras just to turn them in…</p>

<p>You can probably guess what developers have done with this metric</p>
</div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.018.jpg" data-lightbox="bad-metrics" data-title="Slide 18">
            <img src="/images/writing/bad-metrics/bad-metrics.018.jpg" alt="The team should complete an average of greater than 5 points of ticketed work per developer in each sprint. (FAILED for Unambiguously measurable, Directly related to success, Under your control, understood by everyone)">
        </a>
    </div>
    <div class="five columns">
<p>If you asked me what bad metric I loathe the most, it would be this one. On the surface it seems relatively innocuous, but it is the most corrosive metric I have ever encountered. The main problem is that it isn't a measure of software quality, it's a measure of software process reflected poorly:</p>

<ul>
<li>Points are used to estimate future capacity. They are NOT a measure of time it took to get the work done.</li>
<li>This ticket rewards teams for sticking to the plan and delivering features even if they aren't needed, which is the opposite goal of agile</li>
<li>There is no fixed value to a point from sprint to sprint. Teams can game the metric to pass without necessarily improving in their process simply by scaling their pointing up. It's pointless to compare the points cleared per developer in 2 different sprints because the value of the point might not be the same for both sprints. Remember: It's for forecasting capacity, not measuring performance</li>
</ul>

<p>I've seen arguments against this metric in multiple software engineering books, so I think it's unfortunately widespread among managers. And they make it even work by abusing this metric as a reward/punishment system. On one contract I was on, the prime demanded that we provided a listing of points completed by every developer in every sprint so they could see if developers weren't hitting their quotas. This takes a bad metric and makes it worse in multiple ways</p>

<ul>
<li>Developers are people who take vacations or get sick</li>
<li>Tickets and points are only assigned to a single developer but software development is often a team effort</li>
<li>Tech leads almost always have fewer points because they are often involved in unpointed work like planning or meetings</li>
</ul>

<p>Basically, it's a lot like picking a soccer team based on only who scores the most goals. You wind up with a collection of players who refuse to pass the ball and with no defense or goalie. And a coach who is constantly yelling for everybody to shoot on goal</p>

<p>And yet, management sometimes cites hitting these metrics as a sign of success!</p></div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.019.jpg" data-lightbox="bad-metrics" data-title="Slide 19">
            <img src="/images/writing/bad-metrics/bad-metrics.019.jpg" alt="Some theory">
        </a>
    </div>
    <div class="five columns">
<p>Believe it or not, there is theory about what not to do with metrics</p></div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.020.jpg" data-lightbox="bad-metrics" data-title="Slide 20">
            <img src="/images/writing/bad-metrics/bad-metrics.020.jpg" alt="Goodhart's Law: Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes.">
        </a>
    </div>
    <div class="five columns">
<p>The most famous is Goodhart's Law which is an economics theory that basically expresses the idea that the problem with most metrics is when they are overly relied upon</p></div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.021.jpg" data-lightbox="bad-metrics" data-title="Slide 21">
            <img src="/images/writing/bad-metrics/bad-metrics.021.jpg" alt="Goodhart's Law rephrased: When a measure becomes a target, it ceases to be a good measure.">
        </a>
    </div>
    <div class="five columns">
<p>I prefer it in this rephrased version</p>

<p>In some cases, the problem with overuse is that errors caused by the proxy or other flaws in the approach are amplified over time. More commonly though, it's a result of how people enact policy or changes to exclusively optimize those metrics</p></div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.022.jpg" data-lightbox="bad-metrics" data-title="Slide 22">
            <img src="/images/writing/bad-metrics/bad-metrics.022.jpg" alt="Campbell's Law: The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures and the more apt it will be to distort and corrupt the social processes it is intended to monitor.">
        </a>
    </div>
    <div class="five columns">
<p>We collect metrics so we can know if there are things to change. To change those things often involves putting teams and people under pressure (both those being asked to change and those who feel forced to enforce change). And people under pressure will do things they wouldn't normally do to relieve it.</p>

<p>This is a particular risk for any metrics designed to measure and optimize team behaviors and processes.</p>
</div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.023.jpg" data-lightbox="bad-metrics" data-title="Slide 23">
            <img src="/images/writing/bad-metrics/bad-metrics.023.jpg" alt="The first step is to measure whatever can be easily measured. This is OK as far as it goes. The second step is to disregard that which can't be easily measured or to give it an arbitrary quantitative value. This is artificial and misleading. The third step is to presume that what can't be measured easily really isn't important. This is blindness. The fourth step is to say that what can't be easily measured really doesn't exist. This is suicide.">
        </a>
    </div>
    <div class="five columns">
<p>Taken to extremes, uncritical reliance on metrics can lead to a feedback loop of failure known as the McNamara Fallacy. This combo is how teams might feel they are doing great on all the metrics when nothing is actually improving</p>

<p>This quote is from Daniel Yankelovich, "Corporate Priorities: A continuing study of the new demands on business" but it is commonly also known as the McNamara Fallacy after Robert McNamara optimizing for metrics like kill counts and tonnage of bombs dropped as proof that the US was winning the war in Viet Nam.</p>

<p>I do want to pause to say that data about war is the most extreme example of a problem that often also plagues metrics about business and policy. <a href="{% post_url published/2015-01-15-connecting-with-dots %}">It's easy to forget the data points are almost always about people.</a> But I could give a whole talk about that…</p></div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.024.jpg" data-lightbox="bad-metrics" data-title="Slide 24">
            <img src="/images/writing/bad-metrics/bad-metrics.024.jpg" alt="Some Suggestions">
        </a>
    </div>
    <div class="five columns">
<p>So what is there to do?</p></div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.025.jpg" data-lightbox="bad-metrics" data-title="Slide 25">
            <img src="/images/writing/bad-metrics/bad-metrics.025.jpg" alt="Don't Give Up! Metrics aren't perfect but they're still the best tools we have. For software: Are we producing quality work? Does this improvement have its intended effect? Do all stakeholders have same perspective? For teams/organizations: Can we easily see how we are doing? Can we easily see how we are changing? Can we give transparency into our current state?">
        </a>
    </div>
    <div class="five columns">
<p>First, don't give up!</p>

<p>Just because there can be problems with metrics in the wrong circumstances does not mean that metrics re entirely useless either! Indeed, I would argue they are really the only tool we have to rigorously ascertain both the continuous quality of our work and the effects of improvements to the underlying code. Every change we make to a system is a hypothesis that it improves the quality in some way and metrics are how we test that hypothesis. </p>

<p>Metrics tell us our API is fast which is important to know! Metrics are something we can share with stakeholders so they see our work is good</p>

<p>I've been focused on product metrics, but the right metrics can also be used for organizations. Think of OKRs for instance. In a similar vein, the book "Accelerate" identifies 4 key metrics that differentiate high-performers in devops from low-performers. Not because they ruthlessly optimize only against those metrics, but because those metrics reflect wide-ranging organizational changes in a simple snapshot. This is the power of good metrics.</p>

<p>It's also the peril of bad metrics that present a distorted picture of reality of course.</p></div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.026.jpg" data-lightbox="bad-metrics" data-title="Slide 26">
            <img src="/images/writing/bad-metrics/bad-metrics.026.jpg" alt="Know your limits! Always be aware of how a proxy's imperfections might distort your view. Keep your targets reasonable and know when to stop optimizing. Set targets lower if the consequences for missing them are higher. Get a sense for what stakeholders think about metric hits and misses. Understand all the factors that can change a metric. Metrics that are easily changed are easily gamed. Measure the team as a whole and never individuals. Assess all your metrics and do not focus exclusively on one. Understand the reasoning behind all your metrics. Treat metric misses as a prompt for further exploration or growth">
        </a>
    </div>
    <div class="five columns">
<p>But it's also important to be a little skeptical of your metrics.</p></div>
</div>

<hr/>

<div class="row">
    <div class="seven columns">
        <a href="/images/writing/bad-metrics/bad-metrics.027.jpg" data-lightbox="bad-metrics" data-title="Slide 27">
            <img src="/images/writing/bad-metrics/bad-metrics.027.jpg" alt="Consider Bad Interpretations. What are the limits of your metric as a proxy for reality? What are all the ways your metric could be misinterpreted? Problems with your proxy? Troubles with your target? How vicious can your feedback cycles get? Does your metric penalize good behaviors? Does your metric reward bad behaviors? What are some unexpected ways your metric could be abused? What are some ways success might look like failure? What are some ways failure might look like success? How might others use your metrics against you?">
        </a>
    </div>
    <div class="five columns">
<p>And it helps to know how metrics can turn bad. Thank you.</p></div>
</div>
