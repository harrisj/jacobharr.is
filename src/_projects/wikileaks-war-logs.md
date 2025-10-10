---
layout: post
title: Wikileaks War Logs
description: A technical exploration in the data viewer I helped create for New York Times reporters to work on the Wikileaks War Logs.
date: 20101024
start_year: 2010
end_year: 2011
category: project
years: 2010-2011
permalink: /projects/wikileaks-war-logs.html
---
In 2010, the Wikileaks organization approached three news outlets - _The New York Times_, the British newspaper _The Guardian_ and the German _Der Spiegel_ - with a trove of military dispatches that were later revealed to be [leaked by the whistleblower soldier Chelsea Manning](https://en.wikipedia.org/wiki/Chelsea_Manning). This was the second of the big revelations from Wikileaks, following the earlier [Collateral Murder](https://collateralmurder.wikileaks.org/) release in April 2010 of cockpit footage from a US military helicopter that strafed a crowd in Iraq including Reuters journalists. It was later followed by a [leak of US Diplomatic cables](https://en.wikipedia.org/wiki/United_States_diplomatic_cables_leak) sent within the US State Department.

After a few months of reporting, all three organizations released their stories on the same day. _The New York Times_ package for these stories was called [The War Logs](https://archive.nytimes.com/www.nytimes.com/interactive/world/war-logs.html#the-afghanistan-documents), and it was updated in two batches: first for Afghanistan and then for Iraq. As a data journalist, I worked with a few other developers (primarily, the great Alan McLean) to make an internal tool that would allow the team of _Times_ journalists to search, map and visualize the data. We joked it was an admin for very few people, but its impact was large.

## Working with the Data
The War Logs were a collection of dispatches filed by American and allied forces all throughout Afghanistan and Iraq. Although they contained some metadata, the bulk of the contents were the messages, which could often be very dense with technical military jargon. The NYT published several redacted examples of these dispatches from both [Afganistan](https://archive.nytimes.com/www.nytimes.com/interactive/world/26warlogs.html) and [Iraq](https://archive.nytimes.com/www.nytimes.com/interactive/world/iraq-war-logs.html) if you want to get a taste for them, but many of them were like this report of an interpreter being attacked and killed by allied forces:

<pre class="not-prose font-mono text-xs overflow-auto">
BLUE ON WHITE BY 1ST RECON S OF NASSER WA AL SALEM: 1 CIV KILLED, 0 CF INJ/DAMA
AT 200100C FEB 06, A 1ST RECON SNIPER TEAM WHILE CONDUCTING CLANDESTINE SNIPER OPERATIONS
IVO HAJI RD IN THE ZAIDON ENGAGED (1) MAM WITH (4) 5.56MM ROUNDS IVO (38S MB 09971 79804)
4KM S OF NASSER WA AL SALEM. THE MAM WAS PID W/ AK-47 CREEPING UP BEHIND THEIR SNIPER
POSITION AND WAS SHOT IN THE CHEST W/ (2) 5.56MM ROUNDS AT 15M. QRF WAS LAUNCHED TO EXTRACT
THE SNIPER TEAM. THE MAM WAS SEARCHED BY TEAM AND RECOVERED (1) AK-47, (2) MAGAZINES OF
7.62MM, DOUBLE TAPED, (1) LARGE KNIFE, (1) ID CARD WITH "----- -----" WRITTEN ON CARD.
MAM WAS ALSO NOTED TO BE WEARING A TRACKSUIT AND SEVERAL WARMING LAYERS TO INCLUDE
(2) PAIRS OF SOCKS. THE BODY WAS LEFT BEHIND AT (38S MB 09971 79804) UPON EXTRACT OF
THE SST. PIONEER OBSERVING ON SITE W/ NSTR.

UPDATE: UPON FURTHER INVESTIGATION THE KIA TURNED OUT TO BE THE PLATOON'S INTERPRETER THAT
WAS SEPARATED FROM UNIT. THE BODY WAS RECOVERED AND IS CURRENTLY LOCATED AT FALLUJAH SURGICAL.
THIS ACTION IS NOW CONSIDERED A BLUE ON GREEN. IT RESULTED IN (1) IZ KIA (IRAQI INTERPRETER
EMPLOYED BY TITAN.
</pre>

There was some metadata attached to each of these dispatches, but a fair amount of it (beyond the date and time) was hand-entered and often unreliable. Much of my work was looking for metadata and details within the content of the messages themselves. This involved a few different threads of implementation:
- Building an API to support an web admin that was provided to journalists for searching the dispatches and making sense of their contents to relate it to their reporting and lines of investigation.
- Unpacking the jargon and acronyms: the _Times_ does have a few reporters on staff (like the [C.J. Chivers](https://www.nytimes.com/by/c-j-chivers)) who came from military backgrounds, but most of them were not familiar with it like me. I worked with people who knew to create jargon translations to map phrases liie "blue on white" (military vs. civilian attack) and "blue on green" (military vs. friendly forces) as well as acronyms like IVO (in vicinity of), QRF (quick reaction force) and NSTR (nothing significant to report). These would show as pop-ups in the admin (and you can see some of them on the public site if you [hover over underlined words](https://archive.nytimes.com/www.nytimes.com/interactive/world/iraq-war-logs.html#report/C8BAD3DC-EFC0-46D0-A5B9-5997CF9EFC1E))
- More importantly, these reports contained embedded geographic coordinates in the [MGRS system](https://en.wikipedia.org/wiki/Military_Grid_Reference_System) (`38S MB 09971 79804`), which could be converted to lat-long. While every dispatch had lat-lng in its metadata, that was usually tied to where the dispatch was filed (_e.g., back on base) vs. where things actually occurred. And most dispatches contained several or even dozens of distinct events with associated MGRS coordinates and sometimes internal timestamps too. [These details in the dispatches](https://archive.nytimes.com/www.nytimes.com/interactive/world/26warlogs.html#report/1892FD4E-1517-911C-C5601B60F44B345B) could be [used to reconstruct events](https://archive.nytimes.com/www.nytimes.com/2010/07/26/world/asia/26keating.html) as a basis for reporting to confirm and provide context.

This data also helped me to pitch an interactive graphic that would illustrate the horrors of Iraq post-occupation.

## A Deadly Day in Baghdad
Among the dispatches in the Iraq War Logs there were many that were just American troops documenting the aftermath of a city gripped by sectarian violence:

<pre class="not-prose font-mono text-xs overflow-auto">
(CRIMINAL EVENT) MURDER RPT BY NOT PROVIDED IVO BAGHDAD (ZONE 1)
(ROUTE UNKNOWN): 1 ISF KIA 27 CIV KIA
28X CORPSES WERE FOUND THROUGHOUT BAGHDAD:
2X HANDCUFFED, BLINDFOLDED, AND SHOT IN THE HEAD IN AL JIHAD (MB393859, MAHALAH #887, 1136 HRS, HY ALAMIL PS)
2X SHOT IN THE HEAD IN AL HURRIYA (MB367918, 1340 HRS, AL HURIYA PS)
1X SHOT IN THE HEAD IN AL ALAMIL (MB374824, 1400 HRS, HY ALAMIL PS)
1X SHOT IN THE HEAD IN AL JIHAD (MB332816, MAHALAH #895, 1245 HRS, HY ALAMIL PS)
1X SHOT IN THE HEAD IN SADR CITY (MB502242, 1500 HRS, AL RAFIDIAN PS)
6X SHOT IN THE HEAD IN SHEIKH MAARUF (MB425880, MAHALAH #212, 1620 HRS, AL JAAIFER PS)
</pre>

This is completely horrifying to read, but it felt vitally important to document. This violence wasn't directly inflicted by American forces, but it was a direct result of the American invasion and subsequent destabilization of the country. This blood was also on our hands. With the help of graphics editors and a reporter providing local context, I was able to present this data in an interactive graphic:

![A deadly day in Baghdad ><](/images/projects/wikileaks/1024-surge-graphic.jpg)

For more details, check out the following resources:
- [MGRS Explained](/images/projects/wikileaks/nicar_mgrs.pdf): a presentation I gave at a data journalism conference
- [Reporting Wikileaks](/images/projects/wikileaks/hh_wikileaks.pdf): an in-depth presentation on how this graphic came together
- [A Columbia Journalism Review interview on creating the visualization](https://www.cjr.org/the_news_frontier/visualizing_the_iraq_war_logs.php)
- My coworker Alan McLean's [presentation on Telling Stories With Data](https://www.slideshare.net/slideshow/data-driven-journalism-telling-stories-online/5057385)
- [Connecting With the Dots]({% post_url published/2015-01-15-connecting-with-dots %}): some thoughts on how we remind readers that the dots in our infographics are people
