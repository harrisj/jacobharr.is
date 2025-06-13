---
layout: writing_layout
title: The Right Kind of Stupid
date: 20070911
year: 2007
category: published
display_description: A technical look at the specific code I used to setup the @nytimes Twitter account. Little did I know it would lead to years of tinkering around. For more details, check out the [@nytimes twitter account]({% link _projects/nytimes-twitter %}) project page.
description: A technical look at the specific code I used to setup the @nytimes Twitter account.
pub_permalink: https://archive.nytimes.com/open.blogs.nytimes.com/2007/09/11/the-right-kind-of-stupid/
publisher: NYT Open
---
Utter the seemingly innocuous phrase “mobile messaging platform,” and you quickly descend into a world of increasing complexity, filled with issues like carrier agreements, access controls, message size restrictions, subscription support, making the multimedia people happy, and the surprisingly hard problem of making sure the right messages get to the right people all of the time. All of which means that it’s months before you have even a basic system in place that you can use, much less one you can really enjoy enough to hack around with. Which is why I find myself posting today to sing the praise of silly hacks, or
what would be called [kludges](https://www.clueless.com/jargon3.0.0/kluge.html) in the classical programmer jargon.

> n. A clever programming trick intended to solve a particular nasty case in an expedient, if not clear, manner. Often used to repair bugs. Often involves ad-hockery and verges on being a crock. In fact, the TMRC Dictionary defined ‘kludge’ as “a crock that works”.

Specifically, this ability to do clever if stupid hacks in the name of expediency is why I came to love twitter, one of the fun new Web 2.0 tools for the coding tool bag that’s taken a fair share of knocks from the “grown-up” crowd. On the face of it, twitter is pretty easy to mock. For starters, it’s not much of a messaging platform: users are limited to text messages of 140 characters or less. This medium tends to influence the message; because messages are so short, most tend more towards the pedestrian (eg, “Sitting down to breakfast, eating toast” or “looking at code while watching a movie”) rather than the profound. Messages are also usually broadcast to all your friends (and often the general public), making it seem like a cavalcade of inanity to the skeptical.
And until very recently the site itself has been plagued by slowness and outages. Small wonder, then, that some columnists see the very ruin of civilization in it:

> Why do we think we’re so important that we believe other people want to know about what we’re having for lunch, how bored we are at work or the state of inebriation we happen to be at this very moment
in time? How did society get to the point that we are constantly improving technology so that this non-news can reach others even faster than a cell phone, a text message, a blog, our Facebook profiles? — Helen Popkin, [Twitter Nation](https://www.msnbc.msn.com/id/18445274/)

But twitter has some magical properties that make it wonderful for hacking around: [a simple, well-documented API](https://groups.google.com/group/twitter-development-talk/web/api-documentation), support for a variety of data formats, and the ability of any user to designate that tweets are sent to his or her cell phone as SMS messages. Put them together and you suddenly have a rather kludgey mobile message platform on the cheap. Or as I instead chose to phrase it to Mallary Tenore in her excellent article on [news organizations using twitter](https://www.poynter.org/column.asp?id=101&amp;aid=128918): _the right kind of stupid._

Far from dismissive, “the right kind of stupid” is high praise. Using twitter’s APIs, I was able to get headlines from the New York Times feeds to my cell phone with only an idle afternoon and a few lines of Ruby. For instance, here is the basic code for posting a new message to twitter (from the [Twitterize gem](https://nycrb.rubyforge.org/twitterize/))

```ruby
post_args = {
  'status' => status
}
 
url = URI.parse('//twitter.com/statuses/update.xml' )
url.user = user
url.password = password
 
response = Net::HTTP::post_form url, post_args
```

All you need to add is some code to parse feeds, a database to keep track of posted items, and a crontab to schedule it, and you have the makings of a truly Simple Messaging Service (although not always a reliable one). For newcomers, a complete service like [Twitterfeed](https://www.twitterfeed.com/) makes the process even simpler. I put up the main New York Times feed in early March 2007; today, it has 625 viewers, although we had a surge of 100+ subscriptions in the last few days due to Mallary’s article and Twitter featuring us on the front page. In addition, I added [other specific New York Times feeds](https://www.twitter.com/nytimes/friends) a month or so later. The most popular of them has only 40 or so subscribers however, so it’s clear that the general mix of stories the front page feed has is the most appealing to readers. More interesting still, the [official New York Times twitter feed](https://www.twitter.com/nytimes) is not the only New York Times account on Twitter. RSS and Blogging Guru [Dave Winer](https://www.scripting.com/) set up his own independent [NYT River of News account](https://www.xcancel.com/nyt) a week or so after my first one that aggregates all of our major public feeds into one place. Far from being displeased, we here at Open are _openly_ thrilled at these sort of third-party projects, especially since we still have only begun to [scratch the surface of the public feeds we have here at the New York Times](https://archive.nytimes.com/open.blogs.nytimes.com/2007/08/15/rss-you/).

Simple is powerful. Feeds and twitter are a natural fit, but with Twitter’s simple API and cron you can turn any sort of data API into a twitter event stream (with event listeners, you could even stream irregular events like subversion checkins or server failures into twitter). To give another example, I wrote a simple weatherbot that calls the New York Times weather API and posts the current conditions for New York City to the [nyt_weather](https://www.twitter.com/nyt_weather) twitter account. At the time I wrote it, I was working in a cubicle that only had a view of a dimly lit ventilation shaft, so it was very important to get the weather before I stumbled out to lunch without an umbrella. As an added twist, the program updates the avatar image for the twitter user, so I can see the weather at a glance as well. Doing this is surprisingly easy with the [Mechanize](https://mechanize.rubyforge.org/mechanize/) gem in Ruby; we can script the actions to upload a new photo in Twitter’s web forms:

```ruby
def upload_img(icon, user, password)
  agent = WWW::Mechanize.new
 
  # Login
  page  = agent.get('//twitter.com/account/create')
 
  # Fill out the login form
  form  = page.forms.action('/login').first
  form.username_or_email = user
  form.password = password
  page  = agent.submit(form)
 
  # Go to the upload page
  page  = agent.click page.links.text('Settings')
  page  = agent.click page.links.text('Picture')
 
  # Fill out the form
  form  = page.forms.action('/account/picture').first
 
  puts form.file_uploads.inspect
  form.file_uploads.name('user[profile_image]').first.file_name = "/data/weather_imgs/#{icon}.gif" 
  agent.submit(form)
end
```
So, there you have two simple examples of taking a seemingly “stupid” technology to do really interesting things. And there are possibilities far beyond this even (eg, interactive twitter bots, visualizations like [Twittervision](https://www.twittervision.com/) or [Twitter Blocks](https://explore.twitter.com/blocks/), or even just new content streams). But that’s the beauty of the right kind of stupid — it can lead to some pretty smart ideas.
