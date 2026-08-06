<!-- GENERATED FROM content/posts/what-about-visual-stuff.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-08-06",
  title: "What about visual stuff?",
  excerpt: "It makes sense to write textual specs (rules) for logical requirements, but what about visual requirements?",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>If I want to assert that my system calculates loan amortization schedules correctly, I can have a series of rules in my <em>constitution</em> that are textual and logical and perfectly constrain the mathematical side of things.</ElementsBp><ElementsBp>But software doesn't just <strong>do</strong> things. It also <strong>displays</strong> stuff.</ElementsBp><ElementsBp>To a degree, we can describe the high-level visual requirement of some thing:</ElementsBp><ElementsBp>&quot;V-14: the loan amortization results table includes columns Start, Interest, End&quot;</ElementsBp><ElementsBp>But the subset of possible designs satisfying <em>that</em> requirement is inifinite, and most of them are terrible.</ElementsBp><ElementsBh2>Pin UI mockups?</ElementsBh2><ElementsBp>One technique we've found useful for significant UI work - in the context of AI generation - is to just do a bunch of quick prototype rounds, iteratively converging on a final design that's acceptable to the stakeholders.</ElementsBp><ElementsBol><ElementsBli>Give vague requirements to AI</ElementsBli><ElementsBli>AI generates 3 prototypes and posts them somewhere for us to review</ElementsBli><ElementsBli>If we want changes, we clarify #1 and restart the loop</ElementsBli><ElementsBli>When we're satisfied, we lock in the final choice and then behavioral implementation continues from that point</ElementsBli></ElementsBol><ElementsBp>It's a relatively cheap and rapid mechanism, much cheaper than implementing the full code for the feature, and stakeholders really like it because it's visual (pictures are really key for meatheads like us non-clankers).</ElementsBp><ElementsBp>Something like this would fit into a <em>constitution-centric iterative workflow</em> quite naturally. Depending on how strict the implemented UI elements must match the pixels of the prototype designs, our pinning mechanism can vary how it verifies the implemented design. Maybe we just have an agent check for &quot;looks about right based on foo-123.png&quot;. Maybe we have a full automated test that checks all pixels are in the exact right position. Maybe we check CSS classes.</ElementsBp><ElementsBp>I'm not a pro UI guru, so I defer to those guys on the specifics of this. What I do know, is that a good-enough system for incorporating some form of UI elements into the <em>constitutional</em> spec-driven flow is definitely possible, and I think would even fit the spirit of being almost joyful to work with for human stakeholders.</ElementsBp>
  </BlogPost>
</template>
