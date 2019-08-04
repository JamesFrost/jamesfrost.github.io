---
layout: post
title: "Exploring the Challenges of Entity Specific Sentiment Scoring"
share-img: "/img/more-meaningful-nlp/dependencies.png"
tags: [report]
---

A problem with traditional sentiment analysis is that it lacks context; it typically only gives an overall sentiment value for the text. This isn’t particularly insightful as people can express different opinions (positive/negative) about different subjects within one body of text. For example:

> I hate Cameron, but I love Corbyn.

In this example, two different opinions have been expressed, but the overall sentiment value would be neutral (the positive and negative sentiments cancelling each other out).

A more meaningful output would consider both of the different opinions. As mentioned previously, sentiment is expressed towards subjects or entities. A more meaningful result would reflect these different sentiments being expressed through entity specific sentiment scoring.

This is an additional layer of complexity in the NLP process; not only does the system have to identify what is a sentiment bearing word, but subsequently identify what subject the sentiment applies to.

<img data-normal="/img/more-meaningful-nlp/dependencies.png" class="img-responsive center-block">

Linking sentiment words to their directly related entities is relatively easy. What's more difficult is linking sentiment words to entities that they are indirectly associated with.

One example of this is Coreference Resolution, which is the process of finding all expressions that refer to the same entity. For example:

> I hate David. He is nasty.

The sentiment bearing word 'nasty' is directly related to the entity 'he', which is a coreference for the entity 'David'. As such, the sentiment bearing word 'nasty' is indirectly related to 'David', as 'he' and 'David' refer to the same entity.

Identifying what entities refer to each other becomes even more difficult when pronouns aren't involved. For example:

> David Cameron is terrible. I hate the Prime Minister.

Here you would need to identify that 'David Cameron' refers to the same entity as 'Prime Minister'. In my opinion, this level of disambiguation would have to be domain specific.

Lastly, it may be relevant to look at if the opinion is being expressed subjectively or objectively. For example, 'I hate Cameron' is subjective, as the author is expressing this opinion themselves, whereas 'Corbyn says that he hates Cameron' is objective, as it is stating what someone else said.

While entity specific scoring has significant challenges, it also has the potential to massively increase the value of the sentiment analysis.
