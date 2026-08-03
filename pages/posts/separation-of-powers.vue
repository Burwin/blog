<!-- GENERATED FROM content/posts/separation-of-powers.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-08-03",
  title: "Separation of Powers",
  excerpt: "Adversarial collaboration might work well for AI development when following the CONSTITUTION model",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>I've been playing around with adding a &quot;constitution&quot; to an existing small internal project, and I like it a lot so far! Went pretty smoothly, and simplified quite a bit in my own mind about my own software. This shows promise.</ElementsBp><ElementsBp>But to do it at scale, we need a system... ideally something with as much done with AI as reasonable.</ElementsBp><ElementsBp>What would the minimum set of roles be?</ElementsBp><ElementsBp>I don't like reinventing the wheel, so let's just stick to the Founding Fathers as inspiration, and land on the following for an initial attempt:</ElementsBp><ElementsBul><ElementsBli><strong>Legislators</strong>: write laws (acceptance criteria)</ElementsBli><ElementsBli><strong>Governors</strong>: enforce laws (by writing automated tests against the laws)</ElementsBli><ElementsBli><strong>Judges</strong>: interpret laws (blurriest so far, but probably starts by reviewing laws and their implementations for validity and coherence)</ElementsBli><ElementsBli><strong>Engineers</strong>: writes code to implement laws (is this the deep state?)</ElementsBli></ElementsBul>
  </BlogPost>
</template>
