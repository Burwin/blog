<script setup lang="ts">
const post = {
  date: "2025-11-12",
  title: "The hard way",
  excerpt:
    "Will Copilot (and AI coding agents) make me weak in the long-run? What about even just Intellisense (LSP) or working in a standard IDE?",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp
      >Taking cold showers. Taking the stairs. Lifting heavy things. Waking up
      early. Going to church (and confession). Fasting. Having children. Telling
      the truth instead of a kind lie. Eating healthy food. Reading (old) books
      instead of scrolling. Using a standing desk. Save money (avoid
      debt).</ElementsBp
    >
    <ElementsBp
      >There are a lot of things we do in life because they are hard. We know
      that the hard things make us better.</ElementsBp
    >
    <ElementsBp
      >They're hard in the moment, but make us stronger in the future.
      Investments, not debt.</ElementsBp
    >
    <ElementsBp
      >Will Copilot (and AI coding agents) make me weak in the long-run? What
      about even just Intellisense (LSP) or working in a standard
      IDE?</ElementsBp
    >
    <ElementsBp
      >Even typing this in VSCode, Copilot is suggesting entire lines and blocks
      of code for me. It's making me lazier already.</ElementsBp
    >
    <ElementsBp
      >(I just hit tab after typing '..., Copilot ') above.</ElementsBp
    >
    <ElementsBp
      >Should I use Vim, instead? Without an LSP? Definitely without Copilot (or
      Grok)? Without Visual Studio or Rider? Just the terminal and my
      keyboard?</ElementsBp
    >
    <ElementsBp
      >Will it actually make me better in the long run? Or am I glorifying the
      hard way too much, out of balance, such that it will sacrifice my total
      productivity (and value added to society)?</ElementsBp
    >
    <ElementsBp
      >Is it at least worth it for periods of time, similarly to periodic
      fasting?</ElementsBp
    >
    <ElementsBp>What's the coding equivalent to "autophagy"?</ElementsBp>
    <ElementsBp
      >I have a lot of questions and not a lot of answers. I just know that I've
      been obsessed with a lot of these thoughts the past couple weeks, so I'm
      going to have to try something soon.</ElementsBp
    >
    <ElementsBp>Until then, happy fasting!</ElementsBp>
  </BlogPost>
</template>
