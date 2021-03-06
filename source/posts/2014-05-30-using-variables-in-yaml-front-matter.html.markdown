---
layout: post
title: Using Variables in YAML Front Matter
date: 2014-05-30 09:08
tags: yaml, middleman
---

##What is Front Matter?

I didn't know this until just now, but [the name comes from book design](http://en.wikipedia.org/wiki/Book_design#Front_matter), where the front matter is just all the stuff before the actual body of the book. This includes the table of contents, title pages, copyright info, etc. It's essentially all the metadata of the book.

Likewise, the YAML front matter common in static-site generators like Middleman is the metadata of the current page. In my case that usually ends up being post pages where some of the dynamic data is defined:


```yaml
---
layout: post
title: Using Variables in YAML Front Matter
date: 2014-05-30 09:08
tags: yaml, middleman
---
```

This makes it super easy to have various HTML layouts that you can assign to any page on your site. It also gives us the date and title options which are useful for the index, file structure, and other obvious benefits. 

##Setting Custom Variables

I have 4 social media icon SVGs on my portfolio/main index page, and I'm currently using each of them twice - one for the contact drop-down menu, and another for the contact section at the bottom. 

As you can imagine, that clunked up the HTML pretty bad and it was immediately a giant pain to try and find or move anything. I wanted to DRY it up, and I knew that I could do that with Middleman. 

It only took 3 steps.

1) The first thing I did was list each of the icons by name in the front matter:

```yaml
---
github: 

linkedin:

twitter:

email:
---
```

2) Then I added the cumbersome svg codes to set the variables for each:

```yaml
---
github: <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="22" height="20" viewBox="0 0 99.441 99.44" enable-background="new 0 0 99.441 99.44" xml:space="preserve"><path id="github" fill="#fff" d="M64.507,95.749c-2.439,0.474-3.303-1.026-3.303-2.307c0-1.584,0.053-6.763,0.053-13.197
                c0-4.486-1.535-7.412-3.259-8.905c10.707-1.189,21.958-5.257,21.958-23.727c0-5.25-1.867-9.541-4.949-12.908
                c0.499-1.211,2.145-6.101-0.473-12.726c0,0-4.034-1.292-13.211,4.931c-3.844-1.065-7.96-1.601-12.047-1.619
                c-4.088,0.018-8.201,0.554-12.036,1.619c-9.189-6.222-13.228-4.931-13.228-4.931c-2.611,6.625-0.966,11.515-0.465,12.726
                c-3.079,3.368-4.957,7.658-4.957,12.908c0,18.428,11.228,22.55,21.91,23.767c-1.374,1.199-2.62,3.32-3.054,6.428
                c-2.745,1.23-9.705,3.356-13.993-3.996c0,0-2.543-4.615-7.373-4.956c0,0-4.69-0.061-0.329,2.923c0,0,3.152,1.479,5.339,7.036
                c0,0,2.824,8.585,16.202,5.675c0.02,4.019,0.065,7.808,0.065,8.953c0,1.27-0.881,2.758-3.286,2.312
                C14.968,89.396,1.188,71.37,1.188,50.125c0-26.56,21.533-48.089,48.089-48.089c26.558,0,48.088,21.529,48.088,48.089
              C97.364,71.366,83.604,89.382,64.507,95.749z"/></svg>
linkedin: <svg> ...
---
```

3) After that it was simply a matter of calling "current_page.data" and passing the custom variable in its place in Erb:


```erb
<a href="http://github.com/elliotec"><%= current_page.data.github %>Github</a>
```
Now the code base is much more DRY and modular, and the generated HTML is producing the expected behavior. 

You can do this in Jekyll too, but there are a few differences (basically just step 3) so [check out their docs if thats what you're into](http://jekyllrb.com/docs/frontmatter/). 

For more info on the Middleman front matter, [see the relavent section in the Middleman docs](http://middlemanapp.com/basics/frontmatter/).

-- Mike