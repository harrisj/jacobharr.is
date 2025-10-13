---
layout: project
category: project
title: Sky Gradients
description: From 2015-2024, I often would take a photo of a clear sky and post it to Instagram. It helped me in many ways. This archive collects all the gradients in one place without any trackers or ads. Enjoy!
start_year: 2015
end_year: 2024
template_engine: liquid
years: 2015-2024
image: /images/thumbnails/sky-gradients.png
thumbnail: /images/thumbnails/sky-gradients.png
permalink: /projects/sky-gradients.html
---
One of my personal little hobbies has been to take a photo of the clear blue sky and post it to Instagram with no other context or explanation. I find it soothing, but I have fallen out of using it since I no longer use Instagram. So, I decided to instead collect all of the images here! Click on any image to view it in its original size and scale. All images are in the public domain [Creative Commons Zero](https://creativecommons.org/public-domain/cc0/); it's the sky, I don't own it!

I also wrote an article in _The Atlantic_ [explaining the whole thing with some possible artistic antecedents]({% post_url published/2016-03-04-instagram-sky %}) as well. There also is a [zip archive](/images/projects/sky-gradients.zip) (8.2MB) if you want to use them for your own projects. If you make something cool, please let me know!

{% assign grouped = site.data.gradients | sort: "date" | group_by: "year" %}

{% for group in grouped %}
  {% assign year = group.name %}
  {% assign gradients = group.items %}

  <h2 class="h2 mb-0 mt-5">{{ year }}</h2>
  <!--grid-cols-2 md:grid-cols-3 lg:grid-cols-4  -->
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 not-prose">
      {% for grad in gradients %}
        <div>
            <a class="object-scale-down" onclick="modal_{{ grad.id }}.showModal()"><img src="/images/projects/sky-gradients/thumbnails/{{ grad.filename | replace: '.jpg', '-400.jpg' }}" alt="{{ grad.caption }}"/></a>
            <dialog id="modal_{{ grad.id }}" class="modal modal-bottom sm:modal-middle">
              <div class="modal-box">
                  <figure>
                      <img class="w-full object-cover p-1" src="/images/projects/sky-gradients/{{ grad.filename }}"/>
                      <figcaption class="px-5 py-5 text-center text-md font-mono font-semibold">{{ grad.caption }}</figcaption>
                  </figure>
              </div>
              <form method="dialog" class="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
        </div>
      {% endfor %}
  </div>
{% endfor %}
