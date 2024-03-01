<script setup lang="ts">
import BlogPost from "../../components/BlogPost.vue";
import { bp, ba, bquote } from "../../components/elements";

const post = {
  date: "2020-02-07",
  title: "Intellectual Obesity",
  excerpt:
    "Throughout life, one of my greatest character struggles has been converting knowledge into productivity. This blog is part of my attempt to burn off the fact-fat into chiseled apps and a more powerful bench(mark).",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <bp> Eating food is good. </bp>
    <bp>
      Eating a lot of food is good
      <ba
        href="https://ftw.usatoday.com/2017/06/michael-phelps-diet-12000-calories-myth-but-still-ate-8000-to-10000-quote"
        >if you're Michael Phelps</ba
      >
      and use it all. Or anybody working very hard and using the calories in
      productive ways to improve the world.
    </bp>
    <bp> Eating a lot of food and not using it leads to obesity. </bp>
    <bp> Obesity is bad. </bp>
    <bquote
      quote="Here's something that's even more cool: the food that's stable across the entire domain of food isn't food: it's information. It's information, and we use the same bloody circuits in our brain to forage for information that animals use to forage for food. It's the same circuit. Why is that? Because we figured out that knowing where the food is is more important than having the food. Knowing where the food is is a form of meta-food—information is a form of meta food, and that's why we're information foragers. That idea is embedded into the story of Adam and Eve: whatever it is that they ingest is a form of meta food. It's information."
      name="Jordan Peterson"
      contextText="Biblical Series IV"
      contextUrl="https://www.jordanbpeterson.com/transcripts/biblical-series-iv/"
    >
    </bquote>
    <bp>
      Like almost all software developers, especially the self-taught ones, I
      love learning new things. It's probably even a coping mechanism for
      stress… the trick being to at least channel it toward learning useful
      things.
    </bp>
    <bp>
      Throughout life, one of my greatest character struggles has been
      converting knowledge into productivity. This blog is part of my attempt to
      burn off the fact-fat into chiseled apps and a more powerful bench(mark).
    </bp>
    <bp>I am intellectually obese. </bp>
    <bp>Learning new things is good. </bp>
    <bp>Learning new useful things is better. </bp>
    <bp
      >Learning a lot of new useful things is great, as long as the knowledge
      gets converted into productive actions.
    </bp>
    <bp
      >Learning a lot of new useful things and failing to use any of the
      knowledge gained leads to intellectual obesity.
    </bp>
    <bp>Intellectual obesity is bad. </bp>
  </BlogPost>
</template>
