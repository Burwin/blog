<!-- GENERATED FROM content/posts/rapids-vs-waterfall.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-11-09",
  title: "Rapids vs. Waterfall",
  excerpt: "AI development works best with small, front-loaded plans cooking in parallel, faster than a lazy river and safer than a waterfall.",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>Lazy river &lt; rapids &lt; waterfalls</ElementsBp><ElementsBp>Waterfalls get you to a new location very quickly! But if you mess up anything, or even if it’s just too big, you won’t like the result when you arrive.</ElementsBp><ElementsBp>Lazy rivers are nice and calm, but you’re not doing much very quickly. Rapids are a nice middle ground. Intense, cognitively demanding, and a little dangerous… but you can go fast without dropping 50ft!</ElementsBp><ElementsBp>Waterfall does a ton of planning up front and then executes on that plan sequentially. Weeks to months. Plan changes are expensive.</ElementsBp><ElementsBp>Agile sought to get rid of this, since software should be cheap to change. So quick feedback and many pivots along the path toward a goal are more effective than going far out of the way over weeks to months with a poorly planned waterfall.</ElementsBp><ElementsBp>All waterfalls in software are poorly planned, because we learn a lot as we progress.</ElementsBp><ElementsBp>But AI seems to work best with a little bit of planning up front. It’s certainly more efficient at scale. AI takes time to “cook”, so working on a single feature at a time, in a single chat session, means the engineer spends most of his time watching Grok think.</ElementsBp><ElementsBp>More efficient is to front load a small plan. I ask Grok to drill me to flesh out the small plan that I’ve already started. If my scope is small enough, I’m able to keep straight every detail that matters, and Grok is able to clarify and confirm every decision about the plan that matters. When we’re done, I have a multi-step plan that I can hand off to Grok to cook for 1-8 hours typically. While it cooks, I begin prepping another batch.</ElementsBp><ElementsBp>Often this results in 3-10 different plans cooking at the same time. Each is well scoped: small, well understood, easy to stick a toothpick in to tell if it cooked well.</ElementsBp><ElementsBp>It’s still “upfront planning”, like waterfall. But more controlled. And the raft goes a lot faster than a lazy river canoe.</ElementsBp><ElementsBh2>Keys to “rapids development”</ElementsBh2><ElementsBol><ElementsBli>Small cycles</ElementsBli><ElementsBli>Safety</ElementsBli><ElementsBli>Big picture</ElementsBli><ElementsBli>Teamwork</ElementsBli></ElementsBol><ElementsBp>Cycles have to be big enough that they can cook for a bit of time to enable concurrent work, but otherwise as small as possible so we can keep from drowning ourselves with floods of changes.</ElementsBp><ElementsBp>Because we’re going a lot faster and rougher, being diligent about safety is critical. We can ride more rapids if we don’t drown.</ElementsBp><ElementsBp>Being able to keep our heads up to see the big picture is useful for safety, to make sure we don’t get stuck in a vortex or fall off a cliff.</ElementsBp><ElementsBp>Otherwise, safety is especially achieved in teamwork. If we kayak solo, it’s very easy to die if we flip over or hit our heads on a rock. With a team, we look out for each other. That doesn’t mean we won’t get hurt from time to time, but we can dramatically reduce the worst case scenarios.</ElementsBp>
  </BlogPost>
</template>
