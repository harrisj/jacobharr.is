---
category: project
layout: project
title: Open Source Projects
description: My involvement with various open source projects over the years
image: /images/projects/open-source/openNYT-title.png
start_year: 2007
end_year: 2025
years: 2007-2025
thumbnail: /images/thumbnails/open-source.png
image: /images/projects/open-source/openNYT-title.png
permalink: /projects/open-source.html
---
I have contributed to Open Source software in a variety of places. It's not as substantial as I would like (sadly, some of my most best coding work has been for proprietary codebases), but it's been enough to make me happy. This page documents a few of the more prominent projects and work.

## TimesOpen
Early on at the _New York Times_, I was a cofounder of TimesOpen, a blog for announcing the various open-source efforts at the the newspaper. It was a new direction for the _Times_, both contributing to open-source but also opening up new APIs in the hopes of better engaging with the developer community. In the beginning, the focus was largely on DBSlayer, a connection-pooling layer for databases that could be used for different languages. I also wrote up a fair number of the early posts on the blog, where among other things I talked about the [@nytimes twitter account]({% post_url published/2007-09-11-right-kind-of-stupid %}) and how we used [Varnish to cache our service]({% post_url published/2010-09-15-using-varnish %}). We also used Open to launch various new APIs from the _Times_. We also organized a few events for developers at the _Times_ building, like [this one on the Real-Time Web in 2010](https://open.nytimes.com/timesopen-2-0-real-time-web-wrap-up-326cb178b6e2).

{% render 'image', src: '/images/projects/open-source/openNYT-title.png', caption: "The NYT Open logo features a finite-state-machine-like diagram", alt: 'A screenshot of the logo for NYT Open. On the left is a diagram with circles and arrows pointing flows. To the right it says Times Open with the subtitle of All The Code That's Fit to Printf', img_style: 'img-scaled-center', modal_style: 'max-w-2xl' %}

I was particularly proud of our logo, inspired by a finite-state machine diagram I had in the [Red Dragon compiler book](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools) I kept at my desk. I also am not sure who thought of the tagline "All The Code That's Fit to Print," but I recall the argument about making it _Printf_ instead before we decided that was too C-coded.

Today, the Open blog continues strong, now known as [NYT Open](https://open.nytimes.com/), and it's expanded in scope to include design, interviews with staffers, and deep dives into how the _Times_ uses modern technologies like [React Testing](https://open.nytimes.com/how-the-new-york-times-systematically-migrated-from-enzyme-into-react-testing-library-b3ea538d001c) or [Kafka](https://open.nytimes.com/publishing-with-apache-kafka-at-the-new-york-times-7f0e3b7d2077) or [how to design infrastructure for resilience on election nights](https://open.nytimes.com/failover-plans-outage-playbooks-and-resilience-gaps-35047aed6213)

## 18F Projects

In 2015, I left the _Times_ to go work for 18F, a consulting entity that operated from within the US government at the GSA. Besides all the wonderful people and the compelling mission, one of the really appealing aspects of working for 18F was its widespread use of open-source. Since we were government employees, every line of code we wrote belonged in the public domain, and creating open-source repositories were the first step for any project. It was the first time I had worked on a project that was open-source from the start, and I learned a lot from the process and really appreciated working in the open.

Some notable projects I worked on while at 18F:

- [**MyUSA**](https://github.com/18F/myusa): I joined this project while it was in progress and helped build out the user interface. MyUSA was a prototype system for single-sign-on that allowed users to sign in and control what information they share with various government websites.
- [**Micro-purchase**](https://micropurchase.18f.gov) The premise of the micro-purchase experiment was radical: government employees should be able to commission custom software development with the same ease as they can buy office supplies. The initial experiment was built in Google Docs; I helped create a robust web application in Ruby on Rails to successfully run all other auctions.
- [**Connect_VBMS**](https://github.com/18F/connect_vbms) - a Ruby gem for connecting to the VBMS system within the VA. Funnily enough, colleagues of mine at Nava PBC wound up using this code years later and realized I had contributed to it when they looked at the commit history.
- [**FBI Crime Data Explorer**](https://github.com/18F/crime-data-api) I am extremely interested in Open Data; when I learned that 18F would be building an interface for crime data from the FBI, I asked to be part of the project, especially since it also meant learning Python, a language I did not know that well. I have worked closely with another developer on the backend, building and optimizing an API used by the visual explorer website.
- [**Confidential Survey**](https://github.com/18f/confidential-survey) As part of my involvement with the Diversity Guild and a project to gather statistics on 18F's efforts at diversity and inclusion, I built a prototype for conducting surveys without collecting detailed records that could compromise a user's privacy

## Personal Projects

I also have done a few different serious and silly projects over the past few years on my own Github account. Many of these are abandonware and reflect technologies and interests from over a decade ago, but sharing just for fun:

- [harrisj.github.io jekyll site](https://github.com/harrisj/harrisj.github.io) this site! (2017 - preset)
- [Trump Data](https://github.com/harrisj/trump_data) - a collection of hand-curated datasets related to the second Trump presidency (2025)
- [Food Recalls Actions](https://github.com/harrisj/food-recalls-actions) - a rework of the food recalls scraper to use make and Github Actions (2022 - present)
- [NYT Haiku Python](https://github.com/harrisj/nyt-haiku-python) - a rework of the original Ruby NYT haiku code now in Python (and with a few more improvements) to [run on Twitter](https://xcancel.com/nythaikus) (2020 - 2022)
- [Luigi Scraper Demo](https://github.com/harrisj/luigi-scraper-demo) - using Luigi to orchestrate a scraper (2017)
- [Haiku Elm](https://github.com/harrisj/haiku-elm) - a haiku validator written in Elm to help me learn the language (2017)
- [Food Recalls](https://github.com/harrisj/food-recalls) - the original food-recalls scraper as described in [this article for OpenNews Source]({% post_url published/2013-03-28-data-sausage %}) (2015)
- [qrencoder](https://github.com/harrisj/qrencoder) - a Ruby gem for making qrcodes before they were cool (2011-2012)
- [airport_scraper](https://github.com/harrisj/airport_scraper) - some Ruby code to extract airport info from freeform text. I build and used in a personal art project that looked for people posting about their travels on Twitter (2009 - 2010)
-  [tweetftp](https://github.com/nytimes/tweetftp) - an April Fool's joke where I implemented a system for sending a file via Twitter as a serious of small tweets (2010)
- [lifeline](https://github.com/nytimes/lifeline) - a cron-based approach for launching and keeping daemons alive we used on some of our servers for Interactive Newsroom Technologies (2010)
