---
layout: post
title: "Better Performing Location Clustering with GeoHashing"
share-img: "/img/geohash/example-map.png"
tags: [report]
---

In the reports that we provide at Blurrt, we often deal with location based data in the form of social media users that have geotagged their posts. Location based data can be difficult to work with; the specific problem we had at Blurrt was that running a clustering algorithm at report time was far too slow, and simply not scalable to larger datasets. Here's how we solved these problems by using GeoHashing.

# The Problem with Clustering

As previously mentioned, clustering algorithms can be slow for large datasets. This is made even worse by the fact that our (slightly outdated) ElasticSearch cluster doesn't have any inbuild support for clustering.

This meant that we would have to implement a clustering algorithm ourselves in code. However, as any developer will know, loading a large amount of data from a database into memory and then performing complex operations on it is inefficient and doesn't scale.

# Introducing GeoHashing

The short explanation of GeoHashing is that it’s a way to put locations into groups that represent varying sizes of grids on a map. It does this by transforming a latitiude/longditude coordinate into a hash, which corresponds to a grid square. The longer the hash, the more granular the grid size. 

For example, this is the least granular grid, shown with each grid squares GeoHash:

<img src="{{ '/img/improving-location-queries-with-geohashing/geohash-grid-1.jpg' | prepend: site.url }}" class="img-center">

This is the second least granular GeoHash grid (limited to squares with a GeoHash starting with 'D'):

<img src="{{ '/img/improving-location-queries-with-geohashing/geohash-grid-2.jpg' | prepend: site.url }}" class="img-center">

The key aspect of GeoHashing is that, *for any coordinate, the GeoHashes of all the grid squares that contain the coordinate is known*.

# Implementing GeoHashing

As ElasticSearch [supports GeoHashing natively](https://www.elastic.co/guide/en/elasticsearch/guide/current/geohashes.html), implementing it was very easy. However, the underlying details are simple and can be generalised to any other database.

When a location is ingested, all the GeoHashes that contain the location are indexed (leveraging the fact that all containing GeoHashes for a location are known). Once indexed, they can be easily queried.

## Results

<img src="{{ '/img/improving-location-queries-with-geohashing/example-map.png' | prepend: site.url}}" class="img-center">

# Advantages

## Performance

Grouping locations based on GeoHash has far better performance than grouping locations by dynamic clustering algorithm. As all GeoHashes are indexed upon ingestion, a GeoHashing query is simply doing a 'group by' GeoHash.

## Drill Down Support

Another advantage of indexing GeoHashes when a location is ingested means that location groups can easily be searched/filtered. An example of how we've used this in our application 

A dynamic clustering algorithm would struggle with drill down support. 

# Drawbacks

## Grid Pattern

Unsuprisingly, as GeoHashing groups locations based on grid squares, when visualising a graph generated by GeoHashing the resulting points *can* form an obvious grid formation, which looks very odd. This is the biggest drawback of GeoHashing, and in my experience the hardest to explain to non-technical people; they cannot see the advantages, but they can see this.

The grid pattern can be made less obvious by using a more accurate GeoHash, although performance will suffer slightly due to the finer granularity. If the map needs to support multiple zoom levels, blah.

## Fixed Borders

Again unsuprisingly, another drawback of GeoHashing is that the grouping of locations is done based on fixed borders, giving a lack of dynamic grouping.

For example, take the map below; the marked points would be put into two different groups, despite the fact that they are closer to each other than they are to the center of there respective groups.

<img src="{{ '/img/improving-location-queries-with-geohashing/geohash-grid-3.png' | prepend: site.url }}" class="img-center">

<!-- 
# An Alternative - Carto



### Trump vs Clinton Over Time
<img src="{{ '/img/improving-location-queries-with-geohashing/clinton-trump-carto.gif' | prepend: site.url}}" class="img-center">

### Trump vs Clinton Heatmap
<img src="{{ '/img/improving-location-queries-with-geohashing/clinton-trump-heatmap-carto.png' | prepend: site.url}}" class="img-center">

Apparently Canada and Australia weren't that interested in the American Presidential elections.
 -->
Geohashing is a very useful concept, and this post just scratches the surface of what GeoHashing allows you to do.