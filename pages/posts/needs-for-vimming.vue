<script setup lang="ts">
import { addHours } from 'date-fns';
const post = {
  date: "2025-11-04",
  title: "Needs for vim-ming",
  excerpt:
    "If I wanted to switch to vim, these are some things I think I'd need.",
};
</script>

<template>
  <BlogPost
    :date="addHours(new Date(post.date), 12)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp
      >I've been playing around with ideas in my head. Crazy stuff. Linux...
      vim...</ElementsBp
    >
    <ElementsBp
      >DHH is mostly to thank/blame, but he's not the sole
      influence.</ElementsBp
    >
    <ElementsBp
      >Vim sounds super cool, especially relative to the way I like to work:
      ultra-lean, intentional, simple, hard.</ElementsBp
    >
    <ElementsBp
      >It has a sexy hacker allure. Raw. Elite. Exclusive. Everything in the
      terminal. Low memory and CPU footprint.</ElementsBp
    >
    <ElementsBp
      >However, I'm a dotnet guy. Visual Studio is the single greatest piece of
      software ever built by Microsoft, and one of the greatest pieces of
      software to ever exist. If I switched to Vim, what would I be giving
      up?</ElementsBp
    >
    <ElementsBp>What would make it worth it?</ElementsBp>
    <ElementsBp>These are the things I use in VS often:</ElementsBp>

    <ElementsBul>
      <ElementsBli>Debugging</ElementsBli>
      <ElementsBli>Intellisense</ElementsBli>
      <ElementsBli>Tests (especially NCrunch real-time tests)</ElementsBli>
      <ElementsBli
        >Refactoring tools (especially renaming, but also extract method and
        occasionally extract interface or file)</ElementsBli
      >
      <ElementsBli>Code snippets</ElementsBli>
      <ElementsBli>File and Solution explorer (obviously)</ElementsBli>
      <ElementsBli>Red and green squiggles for errors and warnings</ElementsBli>
      <ElementsBli>Autoformat and other quick actions via Ctrl+.</ElementsBli>
    </ElementsBul>

    <ElementsBp>But that's probably it.</ElementsBp>
    <ElementsBp
      >What would I need in Vim to make it worth switching? Keeping in mine that
      the experience in Vim should be different to a degree, especially seeking
      greater simplicity and focus on intentionality.</ElementsBp
    >
    <ElementsBp>This might be a flow:</ElementsBp>

    <ElementsBul>
      <ElementsBli>File explorer (can forgo solution explorer)</ElementsBli>
      <ElementsBli>Auto test runner in another pane</ElementsBli>
      <ElementsBli>Intellisense is a must</ElementsBli>
      <ElementsBli
        >Debugger feels essential, but could maybe be below essential
        priorities</ElementsBli
      >
      <ElementsBli
        >Refactoring and code snippets should be reproducible via plugins, third
        party or custom</ElementsBli
      >
      <ElementsBli
        >Error and warning highlighting could be handled by linting plugins and
        build messages</ElementsBli
      >
      <ElementsBli
        >Theoretically, same for autoformatting (do we have things that already
        hook into .editorconfig files?)</ElementsBli
      >
    </ElementsBul>

    <ElementsBp
      >So the big question marks are the following: debugging, intellisense, and
      auto test runner.</ElementsBp
    >
    <ElementsBp>Anybody know good setups for these?</ElementsBp>
  </BlogPost>
</template>
