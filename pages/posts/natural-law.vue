<!-- GENERATED FROM content/posts/natural-law.md — DO NOT EDIT -->
<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2026-08-05",
  title: "Natural Law vs. Constitution vs. Legislation vs. Case Law vs. Regulations",
  excerpt: "Am I overcomplicating this?",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>I've been calling this thought process of mine - for defining specs for software and letting the AI do whatever it wants as long as those defined specs are enforced - as <em>constitution</em>. Stuck in this law framework, I wonder if all criteria make sense to be in the application's <em>constitution</em>, or should there be different layers with different properties?</ElementsBp><ElementsBp>Where do we put rules defining code quality expectations? Users don't care about these, but they're important to stakeholders maintaining the codebase (and indirectly to customers, of course). Are these <em>regulations</em> (down the chain) or <em>natural law</em> (up the chain)?</ElementsBp><ElementsBp><em>Natural law</em> should be those rules that are immutable. They're ingrained. Murder is bad. Men are not women. What does it mean for software? Maybe this is the layer of the software factory itself... the built-in algorithms that are hardcoded into the factory, providing the water in which all our agents unknowingly swim while doing their work.</ElementsBp><ElementsBp>Maybe it doesn't make sense in most cases to add the complexity of a separate <em>constitution</em> from <em>legislation</em>. But in the case where it does make sense, I guess the factory (or the constitution itself) should make it a lot harder to mutate the consititution than legislation, or at least have legislation sit at a layer subsidiary to the rules in the consitutitional layer.</ElementsBp><ElementsBp>See? Overcomplicating, right?</ElementsBp><ElementsBp>No clue how <em>case law</em> applies here, but I wrote it down, anyway. I suppose this is just repo convention and/or maybe some suggestions in the AGENTS.md files or whatever.</ElementsBp><ElementsBp>The entire purpose of this is to make things transparent to the users and primary stakeholders, but mostly the users. But there are other types of constraints that are important to track, especially technical constraints that matter to the engineers. Maybe these go in the <em>regulations</em> category. Or maybe they get a piece of the <em>legislation</em>. These are things like &quot;integration tests should finish in under 5 minutes on CI&quot;, which is only important to the engineering team.</ElementsBp><ElementsBp>Lots of thoughts. Gradually moving toward clarity. Thanks for reading (you're the one!).</ElementsBp>
  </BlogPost>
</template>
