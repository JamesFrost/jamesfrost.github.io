---
layout: post
title: "Sky Sports Social Team of the Week"
subtitle: "I know nothing about football, but I can analyse Twitter data."
bigimg: "/img/sky-sports-team-of-the-week/ssn-2.png"
share-img: "/img/sky-sports-team-of-the-week/ssn-2.png"
tags: [event, blurrt]
---

The idea of a 'Team of the Week' is simple; choose a team of players to highlight the best performances of the past week. Usually, this team is chosen by a pundit. However, Sky Sports have teamed up with Blurrt to produce the 'Social Team of the Week', decided by Twitter conversation.

The players rating is calculated using Blurrt Score, a metric that measures audience reaction by looking at sentiment expressed as well as the volume of the conversation. From this rating, a team is formed by selecting the highest scoring players in their respective positions.

<img src="/img/sky-sports-team-of-the-week/team-14.png" class="img-responsive center-block">
<img src="/img/sky-sports-team-of-the-week/ssn-1.gif" class="img-responsive center-block">

We also provided support throughout the 18 hour ‘Deadline Day’ live program, providing social snapshots of how people were reacting to all the day’s breaking and biggest stories.

<img src="/img/sky-sports-team-of-the-week/ssn-3.gif" class="img-responsive center-block">

I was the developer responsible for building the reporting system that powered these visuals. A key requirement of the system was that it was automated. There are ~500 players in the league, with each player participating in 38 matches, resulting in ~19,000 reporting periods. Fixture times can also change as matches are postponed, players can be transferred across teams and over the course of the season match times change from GMT to BST. Needless to say, this took considerable effort to maintain by hand. I was able to integrate third party APIs that provided the Premier League schedule to automate the generation and subsequent updates of these reports.

Another requirement of the system was speed; initially, the system took up to 2 minutes to load a report. By leveraging multiple levels of caching, I was able to reduce this time to less than 0.5 seconds.

That being said, the main challenge I faced on this project was the fact that I have no interest at all in football.
