---
layout: writing_layout
title: Using Varnish So News Doesn't Break Your Server
image: /images/writing/varnish/big-board-screenshot.png
date: 2010095
year: 2010
description: A technical explanation of the reverse proxy cache tool Varnish and how we used it at the Interactive Newsroom Technologies server to keep high request rates from melting our servers.
category: published
pub_permalink: https://archive.nytimes.com/open.blogs.nytimes.com/2010/09/15/using-varnish-so-news-doesnt-break-your-server/
publisher: NYT Open
---
A month ago, the [City Room blog](https://archive.nytimes.com/cityroom.blogs.nytimes.com/) ran a call for photos, asking readers to [submit their photos of New York City's waterfront.](https://archive.nytimes.com/cityroom.blogs.nytimes.com/2010/08/06/the-waterfront-covered/) Thanks to the [Stuffy photo submission system](https://archive.nytimes.com/open.blogs.nytimes.com/2010/05/25/building-a-better-submission-form/), The Times can run these requests for user photos on a regular basis, and I generally remain unaware of them. In this case, though, my colleague and I were testing out a general traffic monitoring screen we're calling "the big board." At that moment, a web producer placed a Flash promo in the center well of the NYTimes.com home page. The promo pulled a data file directly from our application servers instead of using a static version saved to the Content Delivery Network.

![An example of the big board showing cached and uncached traffic ><](/images/writing/varnish/big-board-screenshot.png)
_A screenshot of the "big board" in action. The blue represents cached web traffic served by Varnish, red is uncached requests going directly to our server and yellow indicates HTTP 500 server errors. On election nights, the blue part would be 100s of requests a second._

This mix-up resulted in a sudden burst of more than 300 requests per second to our machines - and we saw this burst all too clearly on our screens, because every home page load was hitting our machines (thankfully, it was a Friday afternoon and not election night). Three months earlier, I would have been swearing profusely at this point, trying to spin up new servers in time to avoid watching all my application servers groan and die. But that day I watched as all of the application servers remained unperturbed. The difference? Varnish.

## Varnish: Cache Power
[Varnish](https://varnish-cache.org/) is an HTTP cache. Simply put, it sits between your web servers and the outside world (we also have a few load balancers in the mix) and looks for [HTTP Cache-Control](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html) headers in the responses returned from your applications. If Varnish sees something like this `Cache-control: public, max-age=300` - it knows it can cache that page for 5 minutes. When any other requests come in for that page in that window, it serves them directly from the cache. That means your web servers see less traffic and your scalability goes through the roof.

Furthermore, when the cached entry expires, Varnish is smart enough to condense multiple simultaneous requests for the pager into a single back-end request, avoiding the [dog-pile effect](https://kovyrin.net/2008/03/10/dog-pile-effect-and-how-to-avoid-it-with-ruby-on-rails-memcache-client-patch/) of stampeding requests on a cache bust. Finally, Varnish allows us to also delete cached pages by regexp patterns, meaning we can explicitly clear part of the cache when deploying a new version of an application.

We used to cache pages by using Rails' page caching or by ["baking" pages on a regular schedule](https://archive.nytimes.com/open.blogs.nytimes.com/2008/02/12/election-night-at-nytimescom/).The problem with such approaches is that cache clearing requires file-system commands; Varnish does it instantaneously. Add in support for ["saint modes"[(https://varnish-cache.org/wiki/VCLExampleSaintMode) that can tolerate back-end downtime, [edge-side includes](https://varnish-cache.org/wiki/ESIfeatures) and a dynamic configuration language, and you have a pretty powerful piece of middleware.

## Who Can Use Varnish?
Web caching is not for everybody. If your site serves unique pages to each user, Varnish is not the best fit for you (although you could use edge-side includes to cache most of a page). Varnish is a natural fit for us because our content is well suited for high cache hit rates. If you are serving wildly dynamic content, Varnish's HTTP caching layer is not for you. But most of our content is the same for all readers, and some of it never changes once it is published (we can cache document viewer pages for weeks in Varnish). For instance, that specific surge for the Waterfront flash graphic was for a single data file that was the same for each reader. So, although we try to optimize our controller actions to return quickly, we can feel a little less guilty if the result is cached for several hours in Varnish. And we can even tweak the behavior of Varnish with some custom configurations, described in the next section.</p>

## The Varnish Configuration Language
The [Varnish Configuration Language](https://varnish-cache.org/wiki/VCL) (VCL) is both powerful and maddening, allowing you to control in very fine ways the behavior of Varnish for web requests, but also forcing you to work with an obscure syntax with limited capabilities (the truly adventurous can add C extensions). But it does let us do some pretty neat things on top of a base Varnish configuration.

VCL models a web request through the cache with a series of callbacks, of which two are the most important. The first of these is `vcl_recv`, which is invoked to process incoming web requests to Varnish.

Here's an example of how we use it:
```vcl
sub vcl_recv {
    # Use HAproxy as back end for all requests
    set req.backend = backend_director;
 
    # Pass any requests that Varnish does not understand straight to the back end.
    if (req.request != "GET" && req.request != "HEAD" &&
        req.request != "PUT" && req.request != "POST" &&
        req.request != "TRACE" && req.request != "OPTIONS" &&
        req.request != "DELETE") {
      return(pipe);
    }     /* Non-RFC2616 or CONNECT which is weird. */
 
    # Pass anything other than GET and HEAD directly.
    if (req.request != "GET" && req.request != "HEAD") {
      return(pass);      /* We deal only with GET and HEAD by default */
    }
 
    # Allow expired objects to be served for 10m
    set req.grace = 10m;
 
    # Stripping certain params
    # x - from clicking on a submit image
    # y - from clicking on a submit image
    if (req.url ~ "\?") {
       set req.url = regsub(req.url, "\?(api\-key|ref|scp|sq|st|src|x|y)(\=[^&]*)?", "?");
       set req.url = regsuball(req.url, "&(api\-key|ref|scp|sq|st|src|x|y)(\=[^&]*)?(?=&|$)", "");
       set req.url = regsub(req.url, "\?&", "?");
       set req.url = regsub(req.url, "\?$", "");
    }
 
    # Override default behavior and allow caching for requests w/ cookies
    if ( req.http.Cookie ) {
       return (lookup);
    }
}
```

The other important method is `vcl_fetch`, which is triggered on responses from the back end (in the case of cache misses). This example illustrates using C extensions in a VCL. By default, Varnish just follows the same time-outs specified in the Cache-Control directive for downstream browsers. However, we have many cases where we want to keep something in Varnish for a long time, but still tell the downstream browser to cache for a short period. So, our VCL looks for a special `X-VARNISH-TTL` header in responses from our web applications. If it finds that, it uses that for the TTL; otherwise, it falls back to the Cache-Control header.

```vcl

sub vcl_fetch {
    set beresp.grace = 2m;
 
    # Process ESIs if X-RUN-ESI is set. This will be stripped before being sent down to client.
    if ( beresp.http.X-RUN-ESI ) {
        esi;
        remove beresp.http.X-RUN-ESI;
    }
 
    # cache 404s and 301s for 1 minute
    if (beresp.status == 404 || beresp.status == 301 || beresp.status == 500) {
       set beresp.ttl = 1m;
       return (deliver);
    }
 
    # If X-VARNISH-TTL is set, use this header's value as the TTL for the varnish cache.
    # Expires, cache-control, etc. will be passed directly through to the client
    # Cribbed from //www.lovelysystems.com/configuring-varnish-to-use-custom-http-headers/
    if (beresp.http.X-VARNISH-TTL) {
      C{
        char *ttl;
        /* first char in third param is length of header plus colon in octal */
        ttl = VRT_GetHdr(sp, HDR_BERESP, "\016X-VARNISH-TTL:");
        VRT_l_beresp_ttl(sp, atoi(ttl));
      }C
      remove beresp.http.X-VARNISH-TTL;
      return (deliver);
    }
 
    # If response has no Cache-Control/Expires headers, Cache-Control: no-cache, or Cache-Control: private, don't cache
    if ( (!beresp.http.Cache-Control && !beresp.http.Expires) || beresp.http.Cache-Control ~ "no-cache" || beresp.http.Cache-Control ~ "private" ) {
      return (pass);
    }
}
```

## Edge-Side Includes
Finally, a word about edge-side includes (ESIs). Long a feature of content-delivery networks like Akamai, edge-side includes allow your web apps to specify parts to be stitched in by the cache and delivered downstream to the user. This allows you to break down complex pages into simpler actions. For instance, the [Congress votes overview page](https://politics.nytimes.com/congress/votes) has these ESI directives for the sidebars on the right:

```html
<div id="party">esi :include src="//politics.nytimes.com/congress/superlatives/vsparty/111" /></div>
<div id="missers">esi :include src="//politics.nytimes.com/congress/superlatives/missers/111" /></div>
<div id="loneno">esi :include src="//politics.nytimes.com/congress/superlatives/loneno/111" /></div>
```

When Varnish receives this page (or serves it from the cache), it'll insert ESI content into the page by finding the content of those URLs in its cache (or by calling the back-end server). The user sees only the final page (unlike with JS callbacks). Not only can this help break down complicated pages into simple modules, but it can also help serve mostly static pages with some private dynamic content. Of course, using ESI does impose some performance costs, so as our VCL above illustrates, we execute ESI only if the response includes an `X-RUN-ESI` header.

That's a look at how Varnish helps us (and Rails) scale. If you're intrigued, explore the [Varnish source, documentation and community](https://varnish-cache.org/) - and let us know whether it helps you too.