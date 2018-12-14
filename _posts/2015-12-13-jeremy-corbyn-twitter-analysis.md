---
layout: post
title: "Analysing Twitter Conversation About Jeremy Corbyn"
subtitle: "Identifying and explaining areas of conversation around Jeremy Corbyn."
tags: [project, report]
---

Identifying trends in users expressing opinion about Jeremy Corbin, and explaining these trends through real world data. Originally done as coursework for a Data Mining module at University.

<h2>The Dataset</h2>
The dataset consisted of ~1000 geotagged Tweets about Jeremy Corbyn. The Tweets were collected from Twitter, and then sentiment scored. The analysis was done using SPSS. Sentiment is scored on a scale from -5 to 5, with 0 being neutral.

<h2>Data Preparation</h2>
<h3>Noise Removal</h3>
<p>After some initial testing, it became apparent that there were a significant number of neutral Tweets, i.e  the ‘sentiment_score’ attribute was 0.</p>

<img src="/img/jeremy-corbyn-twitter-analysis/histogram1.png" class="img-responsive center-block">

This disproportionate number of neutral Tweets was greatly affecting results. Tweets scored as neutral are generally objective - for example, ‘Corbyn's Momentum group moves to block influence of hard-left parties’ is objective and as such sentiment scored as neutral. As I aim to identify demographics and their opinions, it is more relevant to analyse subjective Tweets. As such, I chose to filter out all Tweets with neutral sentiment.

After removing the neutral tweets, the datasets sentiment score was far less skewed.

<img src="/img/jeremy-corbyn-twitter-analysis/histogram2.png" class="img-responsive center-block">

<h3>Anomaly/Outlier Removal</h3>
I used clustering in my data analysis, specifically K Means clustering, which is very sensitive to outliers. Therefore to get the best results I had to thoroughly remove outliers.

I first identified outliers based on the follower count of the Twitter user that posted the Tweet. I choose to analyse follower count as accounts that have a high number of followers are usually organisations, public figures or celebrities, whose opinions may not be representative of the opinion of the public, as they may be commercially influenced.

Further analysis of the data revealed that the vast majority of the Tweets were sent from one location (namely, the UK), with the rest being scattered throughout the world.

<img src="/img/jeremy-corbyn-twitter-analysis/scatter1.png" class="img-responsive center-block">

After removing location based outliers, the dataset was far less dispersed.

<img src="/img/jeremy-corbyn-twitter-analysis/scatter2.png" class="img-responsive center-block">

<h2>Data Analysis</h2>

<h3>Coordinate Clustering</h3>
To identify the initial key areas where the Tweets originated from, I did a K Means Clustering on both the latitude and longitude attributes.

<img src="/img/jeremy-corbyn-twitter-analysis/cluster1.png" class="img-responsive center-block">
<img src="/img/jeremy-corbyn-twitter-analysis/cluster1table1.png" class="img-responsive center-block">
<img src="/img/jeremy-corbyn-twitter-analysis/cluster1table2.png" class="img-responsive center-block">

Four out of the five cluster centers fall within the UK, with only cluster one falling on Paris. Cluster one also only has one member, which strongly suggests that the conversation around Jeremy Corbyn is concentrated to mainland United Kingdom. This is what you would expect to see for conversation about a UK member of parliament.

When comparing the number of cases in the cluster to the population of the locality the cluster falls on, we can see that the two are positively correlated. I have ignored cluster one here because it only contains one case. This suggests that when looking at coordinates alone, population density was more likely effect number of Tweets than location.

<table>
	<tr>
		<th>Cluster Number</th>
		<th>Number of Cases In Cluster</th>
		<th>Locality</th>
		<th>Population</th>
	</tr>
	<tr>
		<td>2</td>
		<td>191</td>
		<td>Greater London</td>
		<td>8,538,689</td>
	</tr>
	<tr>
		<td>4</td>
		<td>141</td>
		<td>West Yorkshire</td>
		<td>443,247</td>
	</tr>
	<tr>
		<td>3</td>
		<td>111</td>
		<td>Gloucestershire</td>
		<td>123,205</td>
	</tr>
	<tr>
		<td>5</td>
		<td>33</td>
		<td>Ayrshire </td>
		<td>366,800</td>
	</tr>
</table>

However, when looking at the spread of points from the centroid, it becomes clear that while clusters 2, 3 and 4 are approximately equally homogeneous, cluster number 5 is significantly less homogeneous. We can tell this as the cases in cluster 5 are more spread out along the vertical.

<img src="/img/jeremy-corbyn-twitter-analysis/cluster1scatter1.png" class="img-responsive center-block">

This means that the points that make up cluster 5 are dispersed over a greater area, potentially spanning a greater section of the population. This, coupled with the fact that cluster 5 had the smallest number of cases in the UK, suggests that England/Wales are more opinionated about Jeremy Corbyn than Scotland.

This small amount of Tweets about Corbyn from Scotland could be explained by the fact that in the 2015 elections the Labour party (the political party Jeremy Corbyn belongs to) lost 40 seats in Scotland, with only one seat remaining. This effectively wiped out the Labour party's presence in Scotland. Comparatively, the Labour party won 231 seats throughout England and Wales. The lack of Labour seats in Scotland could cause a lack of support and interest in the Labour party, and so therefore less Tweets about Corbyn.

<h3>Coordinate Clustering With Sentiment Score</h3>
To identify the locations where users are expressing the same sentiment, I did a K Means Cluster on latitude, longitude and sentiment score.

<img src="/img/jeremy-corbyn-twitter-analysis/cluster2.png" class="img-responsive center-block">
<p class="text-center">Note: Icons for clusters two and three overlap</p>
<img src="/img/jeremy-corbyn-twitter-analysis/cluster2table1.png" class="img-responsive center-block">
<img src="/img/jeremy-corbyn-twitter-analysis/cluster2table2.png" class="img-responsive center-block">

As shown by the map above, cluster 4 suggests that the north of the UK has a negative opinion about Jeremy Corbyn. Once again, this could be explained by the fact that Labour lost all of its support in the 2015 election. This lack of support could explain why it has the lowest sentiment out of all of the clusters (-4); you wouldn’t expect opposing parties to be expressing positive sentiment about each other.

Cluster 1 suggests that London has a positive opinion about Jeremy Corbyn (+3). This could be explained by the fact that London has a high concentration of Labour seats. London is also mostly surrounded by Conservative constituencies, which can be expected to express negative opinions about the opposition, potentially explaining why cluster 2 has a negative sentiment (-3).

<img src="/img/jeremy-corbyn-twitter-analysis/londonconstituencies.png" class="img-responsive center-block">
<p class="text-center">Map of London Constituencies - Red constituencies are Labour seats.</p>

Cluster five is positive, with a sentiment score of +3. A potential explanation for this is that the surrounding areas are Labour constituencies.

<img src="/img/jeremy-corbyn-twitter-analysis/constituencies.png" class="img-responsive center-block">

When we look at cluster density, we see that all clusters are approximately equally homogeneous, with the exception of cluster three which is denser. This may offer some explanation as to why cluster three is the only cluster with an overall neutral sentiment.

<img src="/img/jeremy-corbyn-twitter-analysis/cluster2scatter1.png" class="img-responsive center-block">

<h2>Conclusion</h2>
Overall I believe the analysis of the dataset has yielded quality results, as all conclusions drawn have mapped directly onto a plausible real world explanation, suggesting the analysis accurately reflects how people feel about Jeremy Corbyn, and that social media data can accurately reflect occurrences in the real world.
