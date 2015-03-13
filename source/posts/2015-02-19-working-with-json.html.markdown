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

Originally derived from JavaScript, JSON has become a wildly popular choice for data exchange on the web. It uses two base structures: name-value pairs called <em>objects</em> (Ruby or Python people might know these as hash tables or dictionaries), and arrays (also known as vectors or lists). The name is always a string followed by a colon, and valid types for the values (which can be comma-separated) are: string, number, boolean, null, object, and array. The structures can be nested within each other.

Some valid JSON for our example contact list could look like this:

```json
{"contacts" : [
    {
      "id" : 1,
      "firstName" : "Beff",
      "lastName" : "Jezos",
      "phone" : 8015557878,
      "email" : "beff@jesos.net",
      "favorites": true
    },
    {
      "id": 2,
      "firstName" : "Cim",
      "lastName" : "Took",
      "phone" : 2325558900,
      "email" : "cim@cook.net",
      "favorites" : true
    },
    {
      "id" : 3,
      "firstName" : "Zark",
      "lastName" : "Muckerberg",
      "phone" : 9885556734,
      "email" : "zark@muckerberg.net",
      "favorites" : false
    }
  ]
}
```

There will usually be a robust back end to your app crunching and serving the data to the client, but for mocking purposes I like to use [json-server](https://github.com/typicode/json-server). This gives us a REST API with whatever endpoints we want which starts up by simply typing ```$ json-server file.json``` in the command line.


