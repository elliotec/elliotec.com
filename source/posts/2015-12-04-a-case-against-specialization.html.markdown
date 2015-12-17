---
title: A Case For the Monolith
layout: post
date: 2015-12-04 20:06 MST
tags: specialization full-stack development rapid
---

_"Jack of all trades, master of none -- though oftentimes better than
master of one." - Someone_

##The Full Stack Developer

Those words are met with much controversy in the industry.

 A lot of developers are quite annoyed with the term. They argue that it
 isn't possible to be truly full stack, whatever their definition of
 "truly" might be.

 Frankly, I'm annoyed that they are annoyed with the term.

They often believe that mastery of a specific skill set within a software
stack is more valuable than being mediocre at all of it. This can be true,
especially in large corporations and enterprise systems with hundreds of
developers that are assigned specific tasks and siloed by their
specialization.

Mastering one specific language or piece of the stack certainly has many
benefits. Masters of JavaScript have tons of knowledge about the quirks of
the language and clever ways to get complex UIs to do their and the user's
bidding. Likewise with DBAs and data architects on the other side;
structuring huge amounts of data and connecting the data by its
relationships is quite an impressive feat.

But if the JavaScript master had to analyze and structure and join and
relate tables, she feels out of her element and may seize up citing
ignorance in all things non-JavaScript. The DBA might say, "this isn't
SQL." And leave.

Some people take the love and science of the craft very seriously and
aspire to reach sensei-level software mastery, and think this usually
requires a specialization to get anywhere.

But looking at examples like David Hienemer Hansson, Jack Dorsey, and
hundreds of other startup founders and programming legends, we can see
that gaining that level of knowledge of the full stack is attainable and
accessible (obviously DHH and Dorsey are inflated examples, but it
illustrates the point), and rewarding.

##The Full Stack Framework

This is why I still love Ruby on Rails, which turned 10 this year.

Rails created a layer of abstraction that eliminated much of
the monotony, repetition, and difficult integrations that web development
requires. Building, integrating, and distributing packages of
functionality (gems) became a breeze. It made developing rich applications
on the web much more accessible to people with or without programming
skills, and drastically increased the speed of doing so.

You still have to know a bit of HTML, CSS, and JavaScript to get your way
around Rails, but you can take shortcuts with those too, like templating
with ERB, using CSS frameworks like Bootstrap or Thoughtbot's Refills, and
jQuery.

Some proponents of the full stack JavaScript world are attracted to the
"one language to rule them all" idea, but most implementations of client
side frameworks lack any structure or standardization or convention and
take so much time to configure that shipping a product is arduous. (If you
like the idea of developing entirely in one language, I recommend looking
into Clojure and Luminus which is super fast and expressive and uses some
of my favorite Railsy ideas)

Stuff like Yeoman eases the pain a little bit sometimes, but the
fragmentation of the community and the enormous mess and sheer number of
JS frameworks destroy their accessibility and often require that one be an
expert in JavaScript in order to properly implement. Why?

##Effort For its Own Sake

Many JavaScript frameworks are implementing patterns like MV-star or MVVM
. They take the solid tried and true MVC pattern that most developers are
familiar with and start scrambling up the acronyms and implementing them
poorly and without conventions (I know MVVM was created before these JS
frameworks, but the creator of the pattern has himself criticized it as
a bad idea for these UI implementations).

Why are we spending time re-inventing the wheel under the guise of
innovation and re-solving solved problems for its own sake?

SQL for example. The problem of organizing data rationally and querying it
was solved decades ago, and any worthy modern framework can interact with
this data and create rich APIs if need be.

Yet the hot shit these days is NoSQL, which shuns decades of work for
a markedly worse solution.

My buddy shaine put it well - "i like react, but theoretically i like the
next big thing more""

full stack development is just combining "standing on the shoulders of
giants" and "strategic laziness"

the state of javascript 2015 post

##Shortcuts

Microservices, containers, and "anti-monolithic" approaches to
architecture make sense occasionally, like when you work for Netflix or
Spotify and have teams churning out features at enormous scale that needs
multi-threaded asynchronous load balancing and all the jazz.

But unless you're a specialist in whichever micro piece of the stack and
are sticking to it(or if you're an architect and setting this stuff up is
your specialty), this type of architecture is daunting and will
unquestionably turn into an unmaintainable spaghetti mess.

https://developer.atlassian.com/blog/2015/11/what-the-web-platform-can-learn-from-nodejs/

http://blog.circleci.com/its-the-future/


t-shaped.. I wanna have the business horizontal with engineering vertical.
lots of peeps want the engineering horizontal with the js vertical, or
some such

