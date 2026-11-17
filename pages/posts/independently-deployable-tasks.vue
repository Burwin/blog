<!-- GENERATED FROM content/posts/independently-deployable-tasks.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-11-17",
  title: "Independently Deployable Tasks",
  excerpt: "When you split work into smaller tasks, each one must be independently deployable, or it belongs back in its parent.",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>When breaking up work tasks into smaller tasks, in the context of shipping complex software, the smaller tasks MUST be independently deployable.</ElementsBp><ElementsBp>When this is not the case, it just creates a big ball of slop that’s now impossible to keep straight. When can we deploy task B? Does it need C? Does C need G? Ahhhh… I’m swimming.</ElementsBp><ElementsBp>If it’s not independently deployable, it can’t get split off.</ElementsBp><ElementsBp>If it’s split off and not independently deployable, then it needs to either be modified such that it can be safely deployed by itself, or merged back into the parent task.</ElementsBp>
  </BlogPost>
</template>
