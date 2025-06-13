---
layout: writing_layout
title: How Often Is the Times Tweeted?
date: 20100415
year: 2010
category: published
display_description: A post I wrote up summarizing a talk about the twitter account that I gave at Twitter's Chirp conference. For more details on @nytimes, check out the [@nytimes twitter account]({% link _projects/nytimes-twitter %})
description: A post I wrote up summarizing a talk about the twitter account that I gave at Twitter's Chirp conference.
pub_permalink: https://archive.nytimes.com/open.blogs.nytimes.com/2010/04/15/how-often-is-the-times-tweeted/
publisher: NYT Open
---
I recently had the honor of speaking at the [Chirp](https://chirp.twitter.com/) conference, where I got to stammer nervously about [@anywhere](https://dev.twitter.com/anywhere) and share a fun statistic I figured out a few days earlier: **Someone tweets a link to a New York Times story once every 4 seconds.** That is the sound-bite reduction of an interesting process, so this post explains how I figured that out using the [Twitter streaming API](https://dev.twitter.com/pages/streaming_api)

The difficulty with link tracking on Twitter is URL shorteners. To accurately count links to your site on Twitter, you theoretically have to expand any URL you see and then select the links to your site. This could be a daunting task, since it seems like a link is posted to Twitter every millisecond. Luckily, I can cheat.

The New York Times is a customer of the [bit.ly Pro](https://bitly.pro/) service. That means NYT-shortened links are assigned under the [nyti.ms](https://nyti.ms/bbZkLH) domain - and this behavior holds true for anybody shortening a link to NYTimes.com. Now, it is also true that bit.ly is not the only URL-shortening service out there, but it remains the predominant shortener. At the very worst, my choice to limit this to bit.ly means I'm underestimating and thus erring a bit on the conservative side (although I do not know how to measure how big of a margin of error that is).

As a result, measuring how much people tweet New York Times links was as simple as using the Twitter streaming API to look for the keywords `nyti` and `ms`. I used the [TweetStream Ruby gem](https://github.com/intridea/tweetstream) to search Twitter and added some logic to ensure I was only collecting tweets where those keywords appear in that order. Tweets were logged to a [MongoDB database](https://mongodb.com/) for several hours, with a minute time stamp attached to each one. Then it was a simple matter of grouping the tweets per each minute, sorting the values, and taking the median to see the average number of tweets per minute - which could then be inverted to get seconds per tweet.

The data ranged from a minimum of 4 to a maximum of 57 (that is, from once every 15 seconds to almost once a second), as the following chart of minute-by-minute counts demonstrates.

![Minute-by-minute tweet counts ><](/images/writing/times-tweeted/tweets-per-minute.png)

From there, it is simple to calculate the median number of tweets per minute: 17, or roughly once every 4 seconds.

Of course, a few hours' worth of tweets on a Monday afternoon is perhaps not the most representative dataset, and I encourage further study by anybody who wants to explore it further. But this was a surprising look at how people share (and share and share) the news online.
