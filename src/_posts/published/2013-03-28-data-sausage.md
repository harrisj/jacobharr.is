---
layout: writing_layout
title: How the Data Sausage Gets Made
tagline: Jacob Harris on Turning Freeform Text into Journalism
description: A lengthy explainer on how I used simple code to scrape USDA and FDA food recalls to extract quantitative data.
date: 20130328
year: 2013
category: published
permalink: /published/data-sausage
pub_permalink: https://source.opennews.org/articles/how-sausage-gets-made/
publisher: Source
---
Let me start with a caution. This subject—both the food issues and the code issues—might make you queasy. Food safety is an issue that’s of critical importance. In the U.S., food safety is long on data and short on ways to make the data usable. Every few months, we get another multi-state outbreak that reminds us of the safety problems in our food supply and how significant they are. Sadly, these problems are largely inevitable; to keep food costs low as we expect them to be, companies cut corners or import more food from other countries with laxer food-safety laws. Meanwhile, federal regulatory agencies are unable to adequately police an increasingly complex food supply chain. Many people think about food poisoning in terms of meat. There is a reason for this; in 1993, there was a severe outbreak of food poisoning at 173 Jack-in-the-Box restaurants, caused by a relatively novel strain of the E. Coli bacteria (O157:H7). It hospitalized 171 victims and killed 4 people, 3 of whom were small children. Since then, we’ve come to expect regular problems with ground beef. But, [meat accounts just only 22% of food poisoning outbreaks](http://wwwnc.cdc.gov/eid/article/19/3/11-1866_article.htm); in the past few years, there have been several [major outbreaks stemming from cantaloupes, spinach, sprouts, and peanut butter](http://www.cdc.gov/outbreaknet/outbreaks.html).

However, when it comes to shockingly-large outbreaks, meat is still king. And E. Coli is a persistent problem. Many victims of E. Coli food poisoning will recover, but children and the elderly can develop Hemolytic-Uremic Syndrome (HUS), which can lead to kidney failure, paralysis, and death. In 2010, New York Times reporter Michael Moss won a Pulitzer Prize for his reporting on the beef processing industry. In one article, he told the story of [a dancer who became paralyzed from HUS after she ate a single tainted hamburger in 2007](http://www.nytimes.com/2009/10/04/health/04meat.html?pagewanted=all). I’ve always been interested in food safety, and I felt like there were many safety issues besides those affecting meat that were begging to be explored and many questions to be answered. I looked for the government data to answer them. The most obvious data to start with was food recalls.

1. What are the common causes of food recalls?
2. How frequent are food recalls? And how many of those are because of  E. Coli?
3. What is the typical volume and distribution of a food recall?
4. What data-driven picture could I build up about the food supply?

I am a software developer who works within the newsroom of the New York Times. I work on news-driven projects like our [Olympics](http://london2012.nytimes.com/) or [U.S. Elections](http://elections.nytimes.com/2012) websites. What we do is called [data journalism](http://source.mozillaopennews.org/en-US/) – it is also known by the quaintly dated moniker of [computer-assisted reporting](http://www.ire.org/nicar/) – because we often do similar things with data as journalists do with sources, such as:

1. Gathering the data we need to tell a story
2. “Interviewing” the data to find its strengths and limitations
3. Finding the specific narratives in the data we want to share and can support with data

As a computer science major, I’m far more experienced with data than the journalism aspect of my career, but food safety was an area I could get experience gathering the data and working with it in a narrative way. What do I mean by narrative? Narrative is what makes it data journalism. We could just put a large PDF or SQL dump online, but that’s not very informative to anyone but experts. The art is finding the stories in the data the way a sculptor finds a statue in the marble. Since we are turning data into a story, we also need to keep the data—and thus the story we make from it—accurate and objective. I wanted more practice working with data. So, I started by scraping food recalls.

In this case study, I’m going to just discuss a single type of data associated with food safety: food recalls. Along the way, I’ll illustrate some techniques I use for wresting data out of raw text and the limitations of the results. Finally, I’ll throw down the gauntlet and suggest ways in which you could explore making all of this better.
                
## Food Recalls                 
There are two agencies that regulate recalls in the USA: the [U.S. Department of Agriculture](http://www.usda.gov/) (USDA), which inspects meat and poultry; and the [Food and Drug Administration](http://www.fda.gov/) (FDA) which oversees seafood, processed food, and everything else – they also inspect medical devices and pharmaceuticals. Neither the FDA or the USDA are allowed to [forcibly mandate a recall](http://www.fsis.usda.gov/Fact_Sheets/FSIS_Food_Recalls/index.asp), but they help to find the sources of problems and issue the press releases from companies once they issue recalls. I have been parsing recalls from both the FDA and the USDA, but for the sake of brevity, I’m just going to talk about the USDA here. The [USDA Food Safety and Inspection Service website](http://www.fsis.usda.gov/fsis_recalls/index.asp) is where the USDA’s food recalls are posted. Recalls are posted as freeform text releases. Whatever data I needed, I would have to pull out of the text myself. The FSIS includes current recalls and an archive back to 1994 (although the format changes for recalls before 2003).

All recalls are posted as press releases, but they generally follow the same general format, as is apparent from [looking at a few of them](http://www.fsis.usda.gov/News_&amp;_Events/Recall_080_2012_Release/index.asp). At a glance, the following information seems to be present in all recalls:

- The title of the recall
- The reason for the recall
- The recalling company
- The category of food being recalled
- The date the recall was issued
- The volume of the recall (often but not always in pounds)
- The geographic range of the recall

This looks like a good start to a data schema. There is some other fascinating information in there too (product labels, UPC codes, retailer lists), but I needed to start somewhere, so I collected the only the data types in the list above.

## Modeling the Recalls                 
The first step was to create a place to store the data about recalls. I use the [Ruby On Rails](http://rubyonrails.org/) web framework, so I created a new Rails project. The next step was to define the appropriate models. Each recall has an associated reason and a category of food (more on that later). In the `ActiveRecord` framework for Object-Relational Mapping (ORM), a recall is described like this.

```ruby
class Recall < ActiveRecord::Base
    belongs_to :reason
    belongs_to :food_category
    belongs_to :company
```

There will likely be many recalls associated with a particular reason (eg, “E. Coli”) or in a particular food category (eg, “Ground Beef”), and creating separate tables for them is a common data approach. Here is the schema for creating the recalls table.

```ruby
create_table "recalls", :force => true do |t|
  t.string   "title"
  t.string   "url"
  t.string "type"     # USDA or FDA in my database
  t.text     "html_content",      :limit => 2147483647
  t.string   "parse_state",       :limit => 12
  t.string   "source_id",         :limit => 64
  t.integer  "reason_id"
  t.date     "recall_date"
  t.integer  "volume"
  t.string   "volume_unit",       :limit => 16
  t.string   "summary",           :limit => 512
  t.integer  "company_id"
  t.integer  "food_category_id"
end
```

In addition, I decided to create specific categories for the reasons and the type of food. This way, I could use a [controlled vocabulary](https://en.wikipedia.org/wiki/Controlled_vocabulary) of keywords for those categories, making it easier to find all the recalls of a specific type. For instance, “undeclared allergen” is one of my list of reasons regardless of whether it’s sulfites, eggs, nuts, or other unlisted allergens that triggered the recall. This approach requires me to devise the categories and reasons I want to tag with, but it makes searching for matches much easier than freeform text fields. I also decided to create a separate `companies` table in case I wanted to associate multiple recalls with a single company.
        
## Scraping the Pages
My first goal in this project was to grab the recalls from the USDA website. This sounds simple enough, but it’s actually a process with several steps.

### Fetching from Unreliable Sources

Modern programming languages make it painfully easy to read content from remote web pages. In Ruby, for instance, the `open-uri` library allows programmers to open remote web pages as easily as they would load files on their local filesystem. Which is great, except the Web is like an extremely unreliable hard disk. It seems like almost every government web server will crash under even moderate load, and it can take several runs to fetch all the pages of an archive. Even when the remote server is working, it can be painfully slow. I knew I would likely be tweaking my code to process the USDA recalls iteratively. Thus, it was important to cache the HTML of recalls locally. Scraping and analyzing the pages thus involves the following distinct steps:

1. Populate the Recalls table with one record for each recall URL we want to fetch.
2. For each initial recall, fetch the HTML and save it to the Recall record. Mark the recall as retrieved.
3. For each recall marked retrieved, run our analysis to extract the data fields. Mark the recall as analyzed.
4. Sometimes I just need to hand-edit the fields for a record. To keep it from being overwritten if I reparse all the records marked analyzed, I’ll mark those as verified.
5. Sometimes, I have records that aren’t actually recalls but have URLs that look like recalls. I could delete them, but they might get added again when I look for recalls. Instead, I’ll mark them rejected and ignore them in all other steps.

If you’ve been following along here, you’ll notice that I’ve described each `Recall` object as a [Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine). And the `parse_state` field above is where I track the state of each recall. This might seem like an overly mechanistic way of looking at things, but it works well for scraping websites. This way, when the retrieval script bombs out halfway through fetching recalls from the USDA, it’ll resume without fetching pages it already gathered. Similarly, analysis can be only rerun on small batches at a time and can recover from its own crashes.

### Populating the Recalls Table
Okay, I now had a plan. The first challenge was to figure out how to find the recalls on the USDA website. After spending a bit of time clicking around the FSIS site, there were clearly three types of pages where USDA recalls might be listed:

- The current recalls page: `http://www.fsis.usda.gov/fsis_recalls/Open_Federal_Cases/index.asp`
- The current year’s archived recalls: `http://www.fsis.usda.gov/FSIS_RECALLS/Recall_Case_Archive/index.asp`
- An archive page for an earlier year: `http://www.fsis.usda.gov/fsis_recalls/Recall_Case_Archive_2011/index.asp`

So, we can figure out the URLs of all recalls by loading these “index pages” and gathering the URLs of the recalls linked from those pages. Looking further at the recall index pages reveals that a Recall URL looks like one of the two types:

- `http://www.fsis.usda.gov/News_&amp;_Events/Recall_010_2013_Release/index.asp` (2007 onwards)
- `http://www.fsis.usda.gov/fsis_recalls/RNR_053_2005/index.asp` (before 2007)

To find the recalls linked off one of these index pages, I simply had to check if a URL matched either of these two regular expressions.

- `/http:\/\/www\.fsis\.usda\.gov\/News_&amp;_Events\/Recall_\d+_\d{4}_Release\/index\.asp/`
- `/http:\/\/www\.fsis\.usda\.gov\/FSIS_Recalls\/RNR_\d+-\d{4}\/index\.asp/`

My first step was thus to create pending Recalls by fetching each of the USDA’s archive pages and creating a record for each URL matching one of these regular expressions that it hadn’t seen before. I do this by fetching the HTML of each possible index page, finding all the URLs inside the page, and creating a new Recall record for each URL I haven’t seen. This code does not fetch the HTML for the recalls. That is done by a separate method that looks for all Recalls in the `initial` state and retrieves the HTML for each of them individually.

It would be okay if this process ran in batches or crashed halfway through. It’ll just continue from where it left off. Actually, it did crash a few times and it was really slow. Crawling all the recalls back to 2004 took 3-4 days. Good thing I’m saving the HTML locally. But I found 492 recalls in the process, which is a decent data set (if you are curious, I also collected 2,811 recalls from the FDA)

### Analyzing the HTML
Now, that I grabbed the raw HTML of the file locally, I could now extract the data I want from it. Were I a great programmer, I would have devised an elegant method for algorithmically understanding the data in the recall; natural-language processing or some machine-learning mechanism seem like promising approaches. I’m not a great programmer, however. Faced with a problem like this, my only tool is a rough sledgehammer: more regular expressions. This approach is crude but effective, as long as you remember the most important rule: Never use regular expressions to parse an HTML document. [Such is the path to madness.](http://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454)

A far better approach is to parse the HTML into the Document Object Model (if you are using Ruby, try the [Nokogiri](http://nokogiri.org/) library; Python coders can use [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/)). These libraries will allow you to select specific sub-elements of the document using XPath or CSS notation. Most modern websites use semantic HTML. This means they define their layout using descriptive classes named things like `class="summary"` rather than simple stylistic CSS classes like `class="bold larger-font justified"`. This approach makes it easier for designers to redesign a page later, but it conveniently also makes it much simpler for us to find the elements we want to scrape data from.

Unfortunately, the USDA FSIS recall site is not a modern website. The entire page is formatted using nested tables, and the only use of CSS classes is for basic text formatting; when you see a CSS class named `BodyTextBlack`, you know you are screwed. The following excerpt provides a taste of what awaited me

```html
<!-- BEGIN PAGE CONTENTS UNDER BANNER IMAGE -->
<tr>
  <td>
    <table width="368" border="0" cellpadding="6" cellspacing="0">
      <tr>
        <td class="BodyTextBlack">
          <table border="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="356">
            <tr>
              <td class="BodyTextBlack" width="213">Recall Release</td>
              <td class="BodyTextBlack" width="155"><strong>CLASS I RECALL</strong></td>
            </tr>
            <tr>
              <td class="BodyTextBlack" width="213">FSIS-RC-068-2012</td>
              <td class="BodyTextBlack" width="155"><strong>HEALTH RISK: HIGH</strong></td>
            </tr>
          </table>
```

Ooof. I think I’m going to be sick. Sadly, if you are planning to scrape government data, you should expect to be horrified on a regular basis.

### Going Meta
When faced with unpleasant HTML, there is often one other escape we can try before we’re plunged into the muck of nested tables. Many auto-generated files will often have `meta` tags defined, and it can be helpful to look at them to extract the information we need. Sure enough, in a USDA recall, there are the following meta tags:

```html
<meta name="description" content="Main Street Quality Meats, a Salt Lake City, UT, is recalling approximately 2,310 pounds of ground beef products that may be contaminated with E. coli O157:H7.">
<meta name="keywords" content="food recall, FSIS, beef, 068-2012, ground beef products, E. coli">
```

Here is some code in Nokogiri to pull the summary from the document by using the meta tag:

```ruby
meta = @html.xpath("//meta[@name = 'description']")
summary_text = meta.first.attributes["content"].to_s unless meta.nil? || meta.first.nil?

unless summary_text.blank?
      summary_text.squish!
end
```

This code grabs the meta tag summary and also uses Ruby’s `String#squish` method to remove extraneous whitespace in the summary.

### Brute Force and REGEXPs
Although each recall is hand-written, they follow enough of a general format that I could build regular expressions to extract what I needed from the document. The document summary is a great source for a lot of the information I need from a recall. Here is that description again that I plucked from the page’s `meta` tags:

> Main Street Quality Meats, a Salt Lake City, UT, is recalling approximately 2,310 pounds of ground beef products that may be contaminated with E. coli O157:H7.

Once you look at several recalls, it’s generally apparent they follow a particular form even though the exact phrasing may vary:

> Advance Pierre Foods, an Enid, Okla. establishment, is recalling approximately 1,200 pounds of chicken fried chicken breasts that may contain small pieces of metal, the U.S. Department of Agriculture's Food Safety and Inspection Service (FSIS) announced today.
>
> Pinnacle Foods Group LLC, a Fort Madison, Iowa, establishment, is recalling approximately 91,125 pounds of a canned chili with beans product because it was inadvertently packaged with an incorrect flag on the plastic over-wrap and may contain an undeclared allergen, wheat, the U.S. Department of Agriculture’s Food Safety and Inspection Service announced today.
>
> United Food Group, LLC, a Vernon, Calif., establishment, is voluntarily expanding its June 3 and 6 recalls to include a total of approximately 5.7 million pounds of both fresh and frozen ground beef products produced between April 6 and April 20 because they may be contaminated with E. coli O157:H7, the U.S. Department of AgricultureΓÇÖs Food Safety and Inspection Service announced today.

There are some variations, but it’s clear they generally follow the same format:

> COMPANY NAME, from LOCATION, is recalling N VOLUME of PRODUCT TYPE something something REASON something.

Knowing this, I devised some regular expressions to extract the fields I needed from the summary.

### Company Name
This is pretty simple to figure out.

```ruby
if !summary.blank? &amp;&amp; summary =~ /^(([A-Z0-9][0-9[:alpha:]\.]+\s*)+)/
  company_name = $1 
end
```

The recall summary always begins with the company name. This regular expression looks for one or more capitalized words at the beginning of the summary. It assumes that is the company name.

### Product Type and Reasons
Although the summaries generally put the reason at roughly the same place, the phrasing is often varied enough that it’s not simple to extract the reason from the text. Given that most of the reasons have their own specific terminology like “E. Coli” or “Salmonellosis”, it’s easier to invert the process and iterate through a list of possible reasons trying their regexps individually against the summary until one matches (otherwise, tag the recall’s reason as “Other”). Here are some typical reasons for a food recall and regexps that might be used.

|Reason|Regexp|Notes
|-|-|
|E. Coli|`/\bcoli/`||
|Salmonella|`/\bsalmonell/`|Sometimes it’s salmonella or salmonellosis|
|Undeclared Allergen|`/\b(undeclared\|allerg)\b/`|Sometimes the summary may not specify allergies specifically|
|Listeria|`/\b(listeria\|listeriosis)\b/`||
|Foreign Materials|`(foreign material)\|(may contain (\w+\s)?(pieces of\|fragments of)?\s?(glass\|metal\|plastic))`||

And so on. Similarly, I also look for specific phrasings to figure out the product type being recalled:

|Product|Regexp|Notes
|---|----|
|Ground Beef|`/ground beef\|hamburger/`||
|Chicken|`/chicken\|wings\|poultry/`||
|Beef|`/beef/`|This regexp needs to be run after the ground beef one|
|Sausage|`/sausage\|chorizo\|salami\|mortadella/`|Add more sausage types here<|

Generally, we will want to be careful of several things when devising regular expressions to fish for matches within text:

1. Make sure the text you are checking against is small. To run multiple regular expressions against the entire document will be slow and also prone to false matches.
2. You will want to make sure your regexps are case-insensitive and can run across line breaks.
3. Sometimes it might be useful to evaluate regexps in order of decreasing specificity. For instance, if you were curious about recalls of ground beef specifically as opposed to recalls of all beef, you’d want to run the more specific regexp first.

### Volume
One particularly fun thing about the USDA data is that many recalls are provided with an estimate of how much meat was affected. This could lead to some stomach-churning statistics, so let’s pull it out too:

```ruby
INDIVIDUAL_UNITS = %w(unit package packet can jar pint box)
UNITS = %w(pound case lot carton crate) + INDIVIDUAL_UNITS
unit_regex = /#{UNITS.join('|')}/

unless self.summary.blank?
  if self.summary =~ /([\d,\.]+)\smillion\s(#{unit_regex})s?/
    self.volume_unit = $2
    self.volume = $1.gsub(',','').to_f * 1_000_000
  elsif self.summary =~ /([\d,]+)\s(#{unit_regex})s?/
    self.volume_unit = $2
    self.volume = $1.gsub(',','').to_i
  end
end
```

## Hand-Correcting the Data                 
                    
So, I was able to take a collection of text recalls and turn them into a database. Time for a victory coffee while the computer parses all of the recalls (easy to do when I’ve saved the HTML locally). And voila! Here are the 10 most recent USDA recalls once they’ve been run through the processor

|Company|Product Type|Reason|Volume|
|-------|------------|------|------|
|Advance Pierre Foods|Poultry|Foreign Materials|1200 pounds|
|Gab Halal Foods|Ground Beef|Salmonell|550 pounds|
|Stallings Head Cheese Co.|Fish|Salmonella|4700 pounds|
|Jouni Meats|Ground Beef|Salmonella|500 pounds|
|Annie|Prepared Meals|Other|
|Global Culinary Investments|Poultry|Monosodium glutamate (MSG)|1331 pounds|
|LJD Holdings|Beef|Listeria|33500 pounds|
|Glenn|Ground Beef|E. Coli|2532 pounds|
||Prepared Meals|Undeclared Allergen|2764 pounds|
|Stehouwer’s Frozen Foods|Sausage|Undeclared Allergen|6039 pounds|

This is promising, but you might have noticed some gaps in the data here. And other cases where it looks like the regexp fell short. For instance, here is the summary for the “Annie” recall

> Annie’s Homegrown Inc., a Berkeley, Calif. establishment, is recalling an undetermined amount of frozen pizzas that may be contaminated with extraneous materials.

Here, our regexp for the company name ran headlong into the apostrophe. Time to fix that bug and run the parsing again. I probably have gone through 20 different tweaks to some regular expressions. Even after that, I found that it was sometimes necessary to just hand-edit the data I extracted from a recall instead of continually tweaking my parsers. To do this, I built an admin to search for recalls and edit them (screenshots attached). This is really easy to do in Rails, which I why I wrote the project in it. It’s important though that hand edits are _not_ overwritten later if I rerun all my regexp data extractors again. This is why I defined an additional `parse_state` called verified. Once I manually edit a recall, its state is set to verified, and I make sure to only rerun my regexps against Recalls that are just in the analyzed state.
        
## Interviewing the Data                 
 So, now that I had the data, it was time to ask it questions. In data journalism, we often refer to a process of “interviewing the data.” Let’s take this data out for a spin. While we often approach a data set looking for specific stories, sometimes there are other stories revealed by drilling down in the data.

### What Are the Biggest USDA recalls?
I’m curious, so the first thing I checked is what were the biggest recalls:

```sql
SELECT recall_date, reasons.title, food_categories.name, volume, companies.name
FROM recalls
INNER JOIN reasons ON reasons.id = recalls.reason_id
INNER JOIN companies ON companies.id = recalls.company_id
INNER JOIN food_categories ON food_categories.id = recalls.food_category_id
WHERE parse_state <> 'rejected'
  AND volume_unit = 'pound'
  AND type = 'UsdaRecall'
ORDER by volume DESC
LIMIT 15
```

|Date|Reason|Type|Volume|Company|
|----|------|----|------|------|
|2011-08-03|Salmonella|Poultry|36,000,000|Cargill Meat Solutions Corporation|
|2010-06-17|Underprocessing|Prepared Meals|15,000,000|Campbell Soup Supply Company|
|2012-09-05|E. Coli|Beef|2,500,000|XL Foods, Inc.|
|2012-10-22|Undeclared Allergen|Sausage|1,768,600|BEF Foods Inc.|
|2010-02-04|Salmonella|Sausage|1,240,000|Daniele International Inc.|
|2009-02-04|Salmonella|Poultry|983,700|Chester|
|2010-01-18|E. Coli|Beef|864,000|Huntington Meat Packing Inc.|
|2007-10-06|E. Coli|Ground Beef|845,000|Cargill Meat Solutions Corporation|
|2009-08-06|Salmonella|Ground Beef|825,769|Beef Packers|
|2009-01-30|Foreign Materials|Beef|676,560|Windsor Quality Food Co.|
|2009-06-10|Undeclared Allergen|Poultry|608,188|Pilgrim’s Pride Corp.|
|2009-10-31|E. Coli|Ground Beef|545,699|Fairbank Farms|
|2005-04-12|Undeclared Allergen|Prepared Meals|473,500|Campbell Soup Supply Company|
|2009-07-22|Salmonella|Ground Beef|466,236|King Soopers|
|2004-08-20|E. Coli|Beef|406,000|Quantum Foods</td>

There are a few repeat offenders in there. Let’s look and see how much Cargill has been recalled:

```sql
SELECT recalls.recall_date, food_categories.name, reasons.title, volume, recalls.title
FROM recalls
INNER JOIN reasons ON reasons.id = recalls.reason_id
INNER JOIN food_categories ON food_categories.id = recalls.food_category_id
INNER JOIN companies ON companies.id = recalls.company_id
WHERE parse_state <> 'rejected'
  AND companies.name LIKE 'cargill%'
  AND type = 'UsdaRecall'
ORDER BY recalls.recall_date DESC
```

|Date|Category|Reason|Volume|Title|
|2012-07-22|Ground Beef|Salmonella|29,339|Pennsylvania Firm Recalls Ground Beef Products Due To Possible Salmonella Contamination|
|2011-10-01|Poultry|Salmonella|185,000|Ohio Firm Recalls Chef Salads Containing Meat and Poultry Due to Possible Salmonella Contamination Of Tomatoes|
|2011-09-27|Poultry|Salmonella|185,000|Arkansas Firm Recalls Ground Turkey Products Due to Possible Salmonella Contamination|
|2011-08-03|Poultry|Salmonella|36,000,000|Arkansas Firm Recalls Ground Turkey Products Due to Possible Salmonella Contamination|
|2010-08-28|Ground Beef|E. Coli|8,500|Pennsylvania Firm Recalls Ground Beef Products Due to Possible E. coli O26 Contamination|
|2007-10-06|Ground Beef|E. Coli|845,000|Wisconsin Firm Recalls Ground Beef Products Due to Possible  E. coli O157:H7 Contamination|


Drilling down within the data reveals that the Cargill problems have been at different locations. But the Arkansas plant has been the largest offender. Reading the [text of the 8/3/2011 recall](http://www.fsis.usda.gov/News_&amp;_Events/Recall_060_2011_Release/index.asp) reveals it was triggered by an outbreak that hospitalized 22 people and killed 1 person. The 36 million pounds of turkey were produced over a six month period. Does this mean that all the turkey being recalled was tainted? It’s hard to say. How much of Cargill’s total output from that plant was affected by that recall? It’s hard to say. How did the USDA narrow down the outbreak to that source? The data doesn’t tell us. These are intriguing details that tell part of a story, but often we’ll have to look at other datasets, documents, or sources to figure out the story. Even if the data seems enough to tell the story, we’d want to verify against data and sources outside of the story.

### How many pounds of beef get recalled each year?
So, how have efforts to fight E. Coli in the food supply been going? We can look at the data and see.

```sql
SELECT YEAR(recalls.recall_date), count(*), sum(volume) AS pounds
FROM recalls
INNER JOIN reasons ON reasons.id = recalls.reason_id
INNER JOIN food_categories ON food_categories.id = recalls.food_category_id
WHERE parse_state <> 'rejected'
  AND food_categories.slug IN ('ground-beef', 'beef')
  AND reasons.slug = 'ecoli'
  AND type = 'UsdaRecall'
  AND volume_unit = 'pound'
GROUP BY YEAR(recalls.recall_date)
ORDER BY YEAR(recalls.recall_date) DESC
```

|Year|Recalls|Volume (lbs)|
|----|-----|----|
|2013|2|3792|
|2012|6|2,563,467|
|2011|13|773,799|
|2010|9|1,150,647|
|2009|9|804,804|
|2008|8|2,157,497|
|2007|11|1,247,385|
|2006|6|21,328|
|2005|1|63,850|
|2004|5|668,335|

It’s very easy to group columns and derive tables like this from data using SQL. You could easily envision this as a source for a story on food safety arguing the problem has not gotten better. But, it’s painfully easy to jump to the wrong conclusions when using this data for reporting. There are several big ways just presenting this table as journalism can go wrong:

1. Why are all the years before 2007 so sparse? Was that a golden age of food safety or is there something wrong with our data? (There was something wrong with the data parsing actually.)
2. Precision can be deceptive. It looks like we can say down to the pound how much meet was recalled in each year. But that number is bogus, since it’s a sum of fuzzy numbers from large recalls (e.g., “approximately 1.4 million”) and precise numbers from small recalls. When presenting totals like this, it’s better to forcibly round to fuzzier volumes, since higher precision suggests our data is more exact.
3. Double-counting is a problem. Companies will sometimes issue revised recalls with expanded product lists and new volume estimates. That this happens with very large recalls makes the possibility for major error even worse. If I wanted to report these trends, I’d have to double-check for duplicates.
4. Averages are even more deceptive. We might be tempted to view the recall trend each year by averaging the volume over the number of recalls in a given year. This is an even fuzzier number though. The problem is that recall volume doesn’t necessarily follow a random distribution. There is a power law in effect where a few single recalls are responsible for the bulk of the recall volume, making a measure of the average case pretty ludicrous.
5. Volumes for a single recall can be dizzying. But without knowing the total production volume from a facility, it’s hard to say how endemic the problems are. Similarly, not all meat recalled is necessarily tainted, it just might be.
6. The volumes for some years are dizzying too, but trends based on absolute values could be problematic too. For instance, 2012 might not be considered a worse year than 2010, if there was twice as much ground beef produced in 2012.
7. “Worse” is a loaded term. 2012 has much larger recall volume than 2011. Does this mean that 2011 was a safer year than 2012? Or does it just mean that food outbreaks in 2011 were not traced back to sources? It’s important to note what the data doesn’t include. Recalls are issued for food sold to the general public in stores. Fast food restaurants and public school cafeterias have their own supply networks and they will not issue recalls if they notice problems from a supplier.

That’s a pretty big list of caveats there. I’m not trying to discourage you from working with data. We just have to be careful and remember that we are trying to use the data to report the truth. This means we have to be skeptical of the data and never promise more than it can deliver.
        
## What We Can’t Learn from the Data                    
Unfortunately, food recalls reveal only so much about food safety. It’s always important to investigate outside the dataset to find what it lacks. For instance, the Center for Disease Control (CDC) estimates that the [norovirus](http://wwwnc.cdc.gov/eid/article/19/3/11-1866_article.htm) is responsible for 34% of recorded outbreaks</a>, but there is only a single food recall that mentions norovirus. Food recalls can be triggered by food poisoning outbreaks, but they are also often triggered by random inspections unrelated to reported illnesses, by state statutes, or by manufacturing problems – a large number of “undeclared allergen” recalls happen because a single batch of a product is put in the wrong box.

We could look at the CDC’s data on food outbreaks, but that has its own limitations we’d also have to check. Ultimately, some aspects of the problem might be unknowable. It’s hard enough to get a total view of a subject by collecting datasets; for instance, campaign finance data and TV ad spending give us additional insight into presidential elections, but imagine if they were the only way to report the story? Food safety is especially murky. Unless they result in hospitalizations or deaths, most outbreaks are not reported, because it’s often hard to say whether that queasy stomach is from the takeout you got last night or the “stomach flu” that’s going around. And only a small amount of food is preemptively inspected by food and health agencies.

This doesn’t mean we should give up. Indeed, there are still plenty of interesting things to explore in the food recalls data. But it’s an easy trap when working with any dataset to think it’s all you need to understand the story when the data itself reflects external limitations and assumptions you aren’t necessarily aware of. Always make time to figure out what you can’t figure out with the data.
        
## Please Solve Me
So, there you have it. A simple how-to on how I wrested some data on food safety from the raw text of food recalls. It wasn’t pretty, but it worked. There are things that could be done better, for this and similar problems where we have to find data in freeform text. That’s where you come in. I want to inspire you to get excited about solving these problems journalists have in working with large bodies of data to get important stories out of them. You can start here.

### A Good Consumer Tool for Food Recalls
The majority of food recalls involve food sold at grocery stores. Many stores will be attentive about pulling recalled products and putting signs in the store, but they can’t contact you at your home to let you know that box of ravioli in your freezer was recalled a few months ago. Recalls do provide some interesting information for consumers. USDA recalls provide package labels and retail locations; FDA recalls often provide labels and UPC codes. It seems like it could be possible to create a helpful app for consumers who want to be informed about recalls. It wouldn’t be necessary to scan barcodes and track inventory; just letting me know the recalls that might affect me as a Trader Joe’s and Safeway shopper in Maryland would be enough.

### Beyond Regular Expressions
It should be obvious by now how contrived regular expressions can be for understanding the contents of recalls. It only works as well as it does because recalls tend to follow standardized patterns and the vocabulary of reasons and food categories is specialized enough that it works. The regular expressions look for matching words, but they don’t understand what the text says. An approach using natural-language processing might work better, especially since the opening sentence for most recalls involves the same clauses in the same order. Natural language approaches might also be more robust than using meta tags to find some data; in older recalls, these were often blank or sometimes even for the wrong recall and had to be manually corrected.

Company names are the biggest source of confusion and duplication however. There are at least four variations on “Cargill” in the recalls database that reflect different divisions and locations of meat processing plants. Some sort of mechanism for normalizing corporate names might help to better identify repeat offenders with issues at multiple locations. The [OpenCorporates API](http://pics.lockerz.com/s/282651509) seemed like a strong possibility, but [using corporate registrations doesn’t seem to help with duplication and obfuscation](http://api.opencorporates.com/v0.2/companies/search?q=whole+foods+market&amp;order=score). We’d also want to scope to only companies working in the food sector (maybe using [NAICS](https://www.census.gov/eos/www/naics/) codes?). Whatever we used would have to work for large multinational conglomerates down to small delis recalling a single batch of premade meals. So, it would probably be bespoke, but this problem of normalizing companies is one that happens a lot in datasets, so it would be great to improve what is out there.

### Modeling the Supply Chain
One interesting aspect about food recalls is that they [inadvertently reveal hidden connections in the global food supply chain.](http://www.fsis.usda.gov/News_&amp;_Events/Recall_060_2011_Release/index.asp) A recall is usually issued by a single company, but there are often many companies involved playing various roles:

- The company issuing the recall
- They may be an importer and the manufacturer may be a separate company
- Distributors and institutional suppliers
- Suppliers. When a major producer of a component like roasted peanuts or processed meat issues a recall, there can be [many dozens of recalls made by companies downstream](http://www.fda.gov/Safety/Recalls/MajorProductRecalls/SunlandNutSeedProductRecalls/default.htm).
- Grocery stores. Sometimes they are just selling the recalled product. Sometimes the recalled product is a store brand produced by another company.

A case of related recalls wouldn’t produce a comprehensive means of illustrating the modern food supply chain in itself, but there are potentially interesting stories to be told in there about how food is produced these days. We just need tools to find those stories and visualizations to show them to journalists and the general public.

Get to work!