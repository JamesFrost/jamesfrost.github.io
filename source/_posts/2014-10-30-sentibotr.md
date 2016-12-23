---
layout: post
title: "sentiBotr"
date: 2014-10-30
comments: true
description: "Twitter bot that analyses and tweets the sentiment of trending topics in the UK."
keywords: ""
category: project
projectlinks: 
  github : "https://github.com/JamesFrost/sentiBotr"  
picture: "/assets/sentibotr/sentibotr.png"
tags:
- project
- program
---

<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=desert"></script>

<p>Twitter bot that analyses and tweets the sentiment of trending topics in the UK.</p>

<img src="{{ site.baseurl | append: '/assets/sentibotr/sentibotr.png' }}" class="hero container">

<a class="twitter-timeline hero container" href="https://twitter.com/sentiBotr" data-widget-id="527892912952967168">Tweets by @sentiBotr</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<h2>Configuration</h2>
To configure sentiBotr for use, add your Twitter OAuth credentials to the twitter4j.properties file. This will allow twitter4j to connect to the Twitter API.
You can further configure the bot by changing the values in the constants interface.

An hourly cron job runs the bot every hour.

<pre class="prettyprint">
	#!/bin/bash
	exec java -jar /storage/twitterBot/twitterSentimentBot.jar &
</pre>
<br>
<h2>Logs</h2>
The log updates everytime the program is run; if no tweets are sent, a warning is logged.

<pre class="prettyprint">
	Oct 30, 2014 10:18:41 AM twitterSentimentBot log
	WARNING: No tweets sent.
	Oct 30, 2014 11:18:42 AM twitterSentimentBot log
	INFO: Tweets sent: 1. Trends tweeted about: #ChuckleLounge.
	Oct 30, 2014 12:18:42 PM twitterSentimentBot log
	INFO: Tweets sent: 3. Trends tweeted about: #ssnhqaguero, Lee Clark, Halloween.
	Oct 30, 2014 1:18:43 PM twitterSentimentBot log
	WARNING: No tweets sent.
	Oct 30, 2014 2:18:43 PM twitterSentimentBot log
	WARNING: No tweets sent.
	Oct 30, 2014 3:18:42 PM twitterSentimentBot log
	INFO: Tweets sent: 2. Trends tweeted about: #MarvinsHalloweenMixtape, Tom Ince.
</pre>