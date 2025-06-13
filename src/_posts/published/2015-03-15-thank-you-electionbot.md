---
layout: writing_layout
title: Thank You, Electionbot
tagline: A friendly bot that will shoulder the burden of monitoring offers peace of mind as well as efficient notifications.
description: >
  I was doing "ChatOps" before it was cool. This piece looked at how we used Slack webhooks and posting to keep track of the election loading bot via Slack without needing to login to dedicated systems to monitor.
display_description: >
  I was doing "ChatOps" before it was cool. This piece looked at how we used Slack webhooks and posting to keep track of the election loading bot via Slack without needing to login to dedicated systems to monitor. More details on the entire system and other screenshots are located on the [New York Times election loader]({% link _projects/nytimes-election-loader %}) project page. 
date: 20150315
year: 2015
category: published
permalink: /published/thank-you-electionbot.html
pub_permalink: https://source.opennews.org/articles/thank-you-electionbot/
publisher: Source
---
Reporting election results is a bit like flying a blimp through windmill country: hours of tedium punctuated by minutes of terror. Generally most of your night filled with the boring hours of waiting for polls to close or watching the remaining votes trickle in after the important races have been called. But in between those spans are usually several important events for key races:
- The polls close in the state (get ready to show votes)
- First votes are reported (good time to check your results)
- The race is called for a winner (sometimes 2 winners or a runoff)

What makes things complicated is that each newsworthy race we might care about might reach these moments at different points during the night. Furthermore, each state will close its polls at different times, and some states will report votes immediately after polls close while others may take a half hour or more. On the night of the 2014 midterm election, there were 9 different poll closing times across all the states and 52 races the New York Times considered especially newsworthy. Those are a lot of balls in the air at once. Previously, the only recourse was to eyeball the loader's console output as it scrolled past and to send messages to reporters whenever the races they cared about were called. This can mean some stressful interruptions when you are trying to track down a bug in your code. In 2014, it was time for Electionbot to shoulder part of the load.

![Typical Electionbot chatter in our Slack channel ><](/images/writing/thank-you-electionbot/typical-chatter.jpg)

At its core, what we called Electionbot consisted of two separate pieces of code. The first of these was a notifier that would be called by the loader after it completed every load and post messages to a [Slack](https://slack.com/) channel where the election team was gathered. This used Slack's [incoming webhooks API](https://api.slack.com/incoming-webhooks) to send alerts when an important race was called or a state's polls had closed. The code for something like this is pretty straightforward but its utility is immense:

```ruby
class SlackNotifier
  def self.notify(load_id)
    notify_first_votes(load_id)
    notify_calls(load_id)
    notify_runoffs(load_id)
    notify_uncalls(load_id)
    notify_ap_uncalls(load_id)
  end
  
  def self.notify_calls(load_id)
    warnings = Warning.called.for_load(load_id)

    if warnings.any?
      uncontested,contested = warnings.partition {|w| w.race.uncontested? }
      // uncontested alerts elided
      
      if contested.any?
        important, unimportant = contested.partition {|w| w.nyt_race.important? }

        if important.any?
          payload = {
            "attachments" => [{
            "fallback" => "CALLS: #{important.map{|w| "#{w.nyt_race_id}: #{w.ap_candidate.name_with_party}"}.join("; ")}",
            "color" => "warning",
            "pretext" => "RACE CALLS",
            "fields" => important.map do |w|
              {
                "title" => w.nyt_race_id,
                "value" => w.ap_candidate.name_with_party,
                "short" => true
              }
            end
            }]
          }
          post_to_slack(payload)
        end
      end
    end
  end
```

The election loader already had a decently sophisticated mechanism for generating warnings about newsworthy changes. All that was necessary was to add these hooks to format and post warnings to Slack. In 2012, I built a system to mail me whenever delegate counts changed. Posting to the Slack worked so much better though, since we were all in the channel on election nights already, and any missed notifications would be sent out to me by email anyway.

The next step was to enable communication with the loader from our Slack channel. I built a minimalist backend written in [Sinatra](http://sinatrarb.com/) that [replied to slash commands triggered in the election channel](https://api.slack.com/slash-commands) for some common administrative tasks. For instance, there was a command to report the upcoming poll closing times to the channel to remind us all when to time our bathroom breaks.

![Poll closing notifications ><](/images/writing/thank-you-electionbot/poll-closings.jpg)

Another command toggled certain races as _important_, so that the notifier would tell us when they had their first votes or were called. Again, the code was pretty straightforward:

```ruby
def exec
  check_auth
  check_channel_name

  case params["text"]
  when /^poll[\s_]closings/
    report_poll_closings
  when /^important\s?(.*)$/
    important_races($1)
  when /^load/
    load_status
  when /^uncalled/
    uncalled
  else
    render :text => help_text
  end
end

def important_races(arg_str)
  arg_str = arg_str.strip
  payload = nil

  if arg_str.blank?
    races = NytRace.upcoming.important.all

    if races.any?
      payload = {"text" => "Current important races: #{races.map {|x| "`#{x.id}`"}.join(",")}"}
    else
      payload = {"text" => "No current races marked as important"}
    end

    post_to_slack(@channel, payload)
  elsif arg_str =~ /(on|off) (.+)$/
    verb = $1

    race_ids = $2.split(/,/)
    race_ids.each do |id|
      race = NytRace.find(id)

      if verb == "on"
        race.update_attribute(:important, true)
      elsif verb == "off"
        race.update_attribute(:important, false)
      end
    end

    payload = {"text" => "Setting *important* to *#{verb}* for #{race_ids.map {|x| "`#{x}`"}.join(",")}"}
    post_to_slack(@channel, payload)
  end

  render :text => '', :status => 200 
end
```

With these two components, we theoretically could've replaced much more of the election loader's admin interface with interactive commands, but I was too nervous to allow users to call races directly from Slack. All requests to and from Slack include a security token you can check to eliminate basic spoofing, but they still are going over the public internet between Slack's servers and ours (even if within HTTPS), and I'd rather not explain man-in-the-middle attacks to an executive editor on an election night. So, we kept its capabilities simple on purpose.

Still, I can't overstate how great it was to have Electionbot with us in the Slack. It wasn't particularly advanced as bots might go, being just a simple interface into a much more complicated realm of code. Yet I began to think of it like another coworker, always on the lookout for problems we should know about. During a late-night primary from home, I'd feel comfortable leaving my laptop downstairs to check on the sleeping children, because I knew Electionbot would tell me if anything was going wrong. And sometimes I even ran some election night commands to make a state's results visible from my phone just because I could.

The best moments were when Electionbot transcended a mere shell script and informed us all of an uncalled race we probably wouldn't have noticed otherwise. Even though I knew better, I found myself reflexively thanking it in the chat for the save. We form bonds with even the simplest of tools, and Electionbot was there with me on every night there were votes being tabulated somewhere in America. I know it's just a dumb framework of Ruby code, but still I have to say it.

![A screenshot of an uncalled race ><](/images/writing/thank-you-electionbot/uncalled_race.png)

Thank you, electionbot!