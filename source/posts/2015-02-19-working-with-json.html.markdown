---
published: false
layout: post
title: "Working with JSON: jQuery vs. Angularjs vs. React"
date: 2015-02-19 22:52 MST
tags: JSON, jQuery, Angularjs, Reactjs, data, front end
---
##Presenting and Gathering Data

An integral part of front end development is working with data. The user interface is where data comes from in the first place, gathered by forms, user interaction, or other tools. It's also where most data ends up - what good is all this gathered data unless we see it after being parsed and analyzed?

In this post I'm going to explore working with JSON data - primarily gathering and presenting it - across a few different JavaScript frameworks: [jQuery](http://jquery.com/), [Angularjs](https://angularjs.org/), and [React](http://facebook.github.io/react/).

I'll be using the example of a contact list so as not to seem too contrived.

##JSON

[JSON.org](http://json.org) describes JSON like this:

>JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.

Originally derived from JavaScript, JSON has become a wildly popular choice for data exchange on the web. It uses two base structures: name-value pairs called<em>objects</em> (Ruby or Python people might know these as hash tables or dictionaries), and arrays (also known as vectors or lists). The name is always a string followed by a colon, and valid types for the values (which can be comma-separated) are: string, number, boolean, null, object, and array. The structures can be nested within each other.

Some valid and RESTful JSON for our example contact list could be like this:

```json
{"contacts" : [
    {
      "id" : 1,
      "first-name" : "Saul",
      "last-name" : "McHeartney",
      "phone" : 4415155558888,
      "email" : "thewalrus@theeggman.net",
      "favorites": true
    },
    {
      "id": 2,
      "firstName" : "Lon",
      "lastName" : "Jennon",
      "phone" : 4415199999999,
      "email" : "tangerinetrees@marmaladeskies.net",
      "favorites" : true
    },
    {
      "id" : 4,
      "firstName" : "Gringo",
      "lastName" : "Ztarr",
      "phone" : null,
      "email" : "octopussubmarine@igetby.net",
      "favorites" : false
    }
  ]
}
```
