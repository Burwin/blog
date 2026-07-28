<!-- GENERATED FROM content/posts/trust-simplified.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-07-28",
  title: "Trust Simplified",
  excerpt: "What do I mean when I say that TRUST is what we should try to optimize for when building software, especially with AI in the loop?",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBul><ElementsBli>Users trust that the software behaves as expected</ElementsBli><ElementsBli>Product Owners trust that changes can be made without exorbitant cost, and without breaking existing functionality</ElementsBli><ElementsBli>Engineers trust that the changes they're making don't break existing functionality</ElementsBli><ElementsBli>Engineers trust that the agents are writing good-enough code</ElementsBli><ElementsBli>Engineers trust that the tests written by the agents are meaningful</ElementsBli></ElementsBul><ElementsBp>The most important one is the first. Users need to be able to trust that the software behaves as expected. Everything else is downstream from that, and can be optimized within that primary constraint.</ElementsBp><ElementsBp>In order to know whether or not the software behaves as expected, we have to clarify expectations. The product owner should be able to approximate user expectations up front, and then support tickets come in to clarify the edges.</ElementsBp><ElementsBp>User expectations follow existing idioms for working software (Google works like this, so why wouldn't this thing be similar?), and documentation for that specific software.</ElementsBp>
  </BlogPost>
</template>
