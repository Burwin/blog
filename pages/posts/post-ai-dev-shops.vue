<!-- GENERATED FROM content/posts/post-ai-dev-shops.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-07-28",
  title: "Post-AI Dev Shops",
  excerpt: "AI dramatically changes how small dev shops operate; what do I think is one of the future paths for guys like me?",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>&quot;I'm a software craftsman.&quot;</ElementsBp><ElementsBp>A lot of us took pride in this identity. Like a watchmaker from a couple hundred years ago, we expertly and paintstakingly took great pride in the details of the code that we produced, ultimately resulting in software that worked (most of the time).</ElementsBp><ElementsBp>But AI has thrown our entire industry into a deep existential time of reflection.</ElementsBp><ElementsBp>Claude can write code really fast. Most of the time, it's really good, too! People who don't know software can use it to build non-trivial things. Where do guys like us fit in this new world?</ElementsBp><ElementsBp>Instead of the &quot;craftsman&quot; tinkering in his shop, making really great stuff with love, many of us will evolve into &quot;engineers&quot; building the factories that domain experts will use to build software that suits their needs - safely and reliably.</ElementsBp><ElementsBp>I've already started working with people who are brilliant, and have deep expertise in their business, and who are dedicated enough to use Claude to build some really great prototypes of software that can help automate substantial parts of their businesses.</ElementsBp><ElementsBp>&quot;But now, when I add new stuff, I keep breaking old things.&quot;</ElementsBp><ElementsBp>Ahhh... yes, you need guardrails: automated testing, deployment pipelines, scripted DB migrations, etc.</ElementsBp><ElementsBp>We can build &quot;software factories&quot; that have different machines in them that make sense to your business, generally, and enough guardrails to keep your experiments from breaking existing functionality. This is a part of what good software engineers have been doing since before AI, it's just easier now to some degree, but it also requires us to build them a little differently now that we have electricity (AI) instead of just coal fire (automation).</ElementsBp><ElementsBp>So this is my prediction. Those of us who stick around will focus more and more on building the software factories that the domain experts will use.</ElementsBp><ElementsBp>I know how to build the factory, you know how to build your product. Here's the factory, now go to town on your production!</ElementsBp><ElementsBp>What do we do, when building the factory?</ElementsBp><ElementsBul><ElementsBli>Keep production safe</ElementsBli><ElementsBli>Optimize production costs</ElementsBli><ElementsBli>Improve the factory's reliability</ElementsBli><ElementsBli>Incorporate systematic quality control</ElementsBli><ElementsBli>Monitor operations and alert when issues + fix issues as they arise (with the factory, not the product)</ElementsBli><ElementsBli>Report on the operations of the factory</ElementsBli><ElementsBli>Add new &quot;cells&quot; and &quot;lines&quot; to the factory as needed for pivots in your production processes</ElementsBli><ElementsBli>etc.</ElementsBli></ElementsBul><ElementsBp>But you're the expert in your product. We simply set you up with a more solid foundation than vanilla Claude to help you produce your internal software stuff better, faster, and cheaper.</ElementsBp>
  </BlogPost>
</template>
