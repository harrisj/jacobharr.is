---
layout: post
title: Times Haiku
description: The history and inspiration behind the Times Haiku project which ran from 2012 - 2017
start_year: 2012
end_year: 2017
category: project
years: 2012-2017
permalink: /projects/times-haiku.html
---
This project largely happened because I was depressed and bored.

It was always a bit rough to end a season of election coverage. After spending almost more than a year testing, tweaking and [loading election results]({% link _projects/nytimes-election-loader.md %}), it's disorienting to suddenly have no more election stuff to do. In 2012, this shock was compounded with frustration from several significant technical bugs that had happened on election night itself. I needed an outlet. And that's when I decided to go hunting for haiku.

![An example of the visual Times Haiku presentation ><](/images/projects/times-haiku/symmetry.gif)

I had been inspired by the [Haiku Leaks](https://www.poetryfoundation.org/poetry-news/59602/leaks-come-in-all-shapes-and-sizes) project in late 2010, that combed the Wikileaks Cablegate corpus to find haiku hidden within the messages. And I had already written a few silly bots that acted on NYT article text. So, why not combine the two?

The initial seed of this project was a hackish selection of a few Ruby scripts and a database to assemble the following building blocks into a haiku-finding machine:
- First, I needed a database to store the haiku I found, but also to help me lookup the syllable counts for specific words. To seed that database, I wrote a script to pull words and count syllables in the [CMUdict](http://www.speech.cs.cmu.edu/cgi-bin/cmudict)
- I also had some handy code to pull out the text after retrieving a NYT article page.
- The next step was writing some code to scan the text for haikus. It did this first by breaking up the text into a series of sentences and then it went through each sentence counting syllables to see if we got exactly 5-7-5.
- Finally, I created some code to regularly check the homepage and when it found a URL it hadn't seen before, it would fetch the article, scan it for haikus and store any haiku it had seen as well as a record that it had processed the page.

Put that all togther and I had a little program I could run on my computer that would go searching for haiku and sharing them with me. When I showed this to some of my coworkers on the Interactive Newsroom Technologies team, they agreed it could be a fun project to create. To implement this, we tried a novel moderation approach where the Haiku bot would post haiku it found to a private moderation Tumblr blog. When moderators approved, they would the be published to [a public tumblr](https://timeshaiku.tumblr.com/). The design for the site was done by Heena Ko and the distinctive procedurally generated format for each haiku was built by Anjali Bhojani.

## Explainer that Appeared on the [Times Haiku Site](https://timeshaiku.tumblr.com/about)
_Whimsy is not a quality we usually associate with computer programs. We tend to think of software in terms of the function it fulfills. For example, a spreadsheet helps us do our work. A game of Tetris provides a means of procrastination. Social media reconnects us with our high school nemeses. But what about computer code that serves no inherent purpose in itself?_

<pre>
There is pleasure to
be had here, in flares of spice
that revive and warm.
</pre>

_This is a Tumblr blog of haikus found within The New York Times. Most of us first encountered haikus in a grade school, when we were taught that they are three-line poems with five syllables on the first line, seven on the second and five on the third. According to the Haiku Society of America, that is not an ironclad rule. A proper haiku should also contain a word that indicates the season, or "kigo," as well as a juxtaposition of verbal imagery, known as "kireji." That's a lot harder to teach an algorithm, though, so we just count syllables like most amateur haiku aficionados do._

<pre>
As dawn broke we warmed
strawberry Pop Tarts over
the dying embers.
</pre>

_How does our algorithm work? It periodically checks the New York Times home page for newly published articles. Then it scans each sentence looking for potential haikus by using an electronic dictionary containing syllable counts. We started with a basic rhyming lexicon, but over time we've added syllable counts for words like "Rihanna" or "terroir" to keep pace with the broad vocabulary of The Times._

_Not every haiku our computer finds is a good one. The algorithm discards some potential poems if they are awkwardly constructed and it does not scan articles covering sensitive topics. Furthermore, the machine has no aesthetic sense. It can't distinguish between an elegant verse and a plodding one. But, when it does stumble across something beautiful or funny or just a gem of a haiku, human journalists select it and post it on this blog._

<pre>
Stop the machine and
scrape down the sides of the bowl
with a spatula.
</pre>

_Finding the haikus is only the beginning. Because we want the poems to retain their visual integrity, even when people share them across social networks, we post them as images instead of text. On every image, you'll notice a seemingly random background pattern of colored lines. The different orientations of those lines are computer-generated according to the meter of the first line of the poem._

_So, what's next? This experiment in automated poetry detection has only just begun. We'll fine-tune the algorithm, expand the dictionary and see what treasures we find. We hope you'll follow along._

## Launch and Reception
After spending a few weeks refining the process, we decided to let the haiku generator run for a little bit so we could evaluate the bot and have a collection of dozens of haiku when the site was open. Since April is [National Poetry Month](https://poets.org/national-poetry-month), we picked April 1st, 2013 as the day to go live.

In hindsight, this was not a good idea.

Although much of the coverage was appreciative, [many also wondered if this was an elaborate April Fools' joke](https://www.niemanlab.org/2013/04/not-an-april-fools-joke-the-new-york-times-has-built-a-haiku-bot/). Oops. Others were just confused why we had spent time building this. Every few months, I would also receive an irate email from an American haiku poet who wanted to inform me that the syllable count is not what defines a haiku (I know), and that to truly be called that, these would need to include both a nature theme and a thematic cut in the middle (I know). Honestly, they probably aren't even good [senryū](https://en.wikipedia.org/wiki/Senry%C5%AB) (yes, I KNOW, it says all that in the intro!).

After the initial hubbub died down, it just became a little part of our days, monitoring the bot was running, moderating the best ones to publish on a timed cycle and seeing how people reacted on Tumblr and the Twitter account where they were reposted. I especially enjoyed seeing _Times_ reporters sometimes retweeting haiku they didn't realize they had written. Over the years, I myself would fix little bugs in things like sentence identification and add more info on syllable counts for unknown words. I also added checks to avoid sensitive stories or topics.

I left the _New York Times_ in 2015. But the site itself continued operating until December 19, 2017 - or over four-and-a-half years. Over that time it posted a lot of haiku (it looks like I need to pull them all down, but [here is data from the first year of operation](https://docs.google.com/spreadsheets/d/1L4G7HmuBE3M7O-YXTf4b449CzAHZ3yE1aNLeBczbjCo/edit?gid=0#gid=0))

## Later Years
I still have enjoyed playing with the concept and often when I am trying to learn a new programming language (like Elm or Clojure),I will try writing a haiku finder/validator for it. More recently, I revived the Haiku bot with a [new open-source version written in Python](https://github.com/harrisj/nyt-haiku-python) that posted haiku to the [@nythaikus](https://xcancel.com/nythaikus)) twitter account from September 14, 2020 (_you can guess what global event was making me depressed_ for this one) until November 18, 2022 (_when Elon Musk started charging bots for API access_).

<pre>
Ah well, that was fun.
Too bad Elon has to ruin
all that he touches
</pre>
