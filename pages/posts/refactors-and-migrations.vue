<!-- GENERATED FROM content/posts/refactors-and-migrations.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-08-04",
  title: "Refactors and Migrations are Tricky",
  excerpt: "The legislative method that's evolving in my head feels promising, but it's far from becoming a turnkey solution... major refactors and data migrations are a glaring red flag",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>Not a red flag that signals this is a bad overall approach... just that these types of operations pose a lot of potential danger - as they always have - and so still need to be approached with considerable caution and care from the human side of things.</ElementsBp><ElementsBp>Assume we're planning a major upgrade to a system, such that it overhauls the underlying core data model. If we just push the code changes through, it could sever the link between the current application and historical data, which in almost all business settings is horrible.</ElementsBp><ElementsBp>This is already a risk for software development, and many techniques exist around it to manage these types of migrations and changes. But they're complex. There are many steps that need properly orchestrated and ordered along the way to ensure things continue humming without issue. It's open heart surgery on software.</ElementsBp><ElementsBp>At small scale, we might be able to get AI to still handle a lot of these while following a legislative spec-driven approach using some techniques and constraints. Off the top of my head:</ElementsBp><ElementsBul><ElementsBli>Enforce development of 1-2 rule changes at a time, maximum... smaller changes are less risky and easier to ensure stability before and after</ElementsBli><ElementsBli>Eventually incorporate a special role (or set of roles) around the idea of auditing proposed rules (legislation?) for second and third-order effects</ElementsBli></ElementsBul><ElementsBp>That second point is important for managing spec-driven risk in any case.</ElementsBp><ElementsBp>The humans in charge might see that the next iteration in development calls for cancelling AC-13 and adding AC-52 to replace it, and that all looks well and good. But given what we touched on above, this change could have major second and third-order effects that aren't immediately obvious. This group of roles could highlight potential concerns, alert and halt dangerous work, and possibly propose alternative approaches to make sure things remain stable as the rules evolve.</ElementsBp><ElementsBp>It adds a lot more complexity, but if it starts as just a role to scream when it foresees issues, that's a good starting point. Eventually, it could evolve into something that can help craft migration plans from before/after rulesets, making sure the software isn't broken when we reach the final destination. Interim rule setters, or something...</ElementsBp><ElementsBp>More to be discovered!</ElementsBp>
  </BlogPost>
</template>
