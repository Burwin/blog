<script setup lang="ts">
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
    <ElementsBp> Eating food is good. </ElementsBp>
    <ElementsBp>
      Eating a lot of food is good
      <ElementsBa
        href="https://ftw.usatoday.com/2017/06/michael-phelps-diet-12000-calories-myth-but-still-ate-8000-to-10000-quote"
        >if you're Michael Phelps</ElementsBa
      >
      and use it all. Or anybody working very hard and using the calories in
      productive ways to improve the world.
    </ElementsBp>
    <ElementsBp>
      Eating a lot of food and not using it leads to obesity.
    </ElementsBp>
    <ElementsBp> Obesity is ElementsBad. </ElementsBp>
    <ElementsBquote
      name="Jordan Peterson"
      contextText="Biblical Series IV"
      contextUrl="https://www.jordanElementsBpeterson.com/transcripts/biblical-series-iv/"
    >
      Here's something that's even more cool: the food that's stable across the
      entire domain of food isn't food: it's information. It's information, and
      we use the same bloody circuits in our brain to forage for information
      that animals use to forage for food. It's the same circuit. Why is that?
      Because we figured out that knowing where the food is is more important
      than having the food. Knowing where the food is is a form of
      meta-food—information is a form of meta food, and that's why we're
      information foragers. That idea is embedded into the story of Adam and
      Eve: whatever it is that they ingest is a form of meta food. It's
      information.
    </ElementsBquote>
    <ElementsBp>
      Like almost all software developers, especially the self-taught ones, I
      love learning new things. It's proElementsBably even a coping mechanism
      for stress… the trick being to at least channel it toward learning useful
      things.
    </ElementsBp>
    <ElementsBp>
      Throughout life, one of my greatest character struggles has been
      converting knowledge into productivity. This blog is part of my attempt to
      burn off the fact-fat into chiseled apps and a more powerful bench(mark).
    </ElementsBp>
    <ElementsBp>I am intellectually obese. </ElementsBp>
    <ElementsBp>Learning new things is good. </ElementsBp>
    <ElementsBp>Learning new useful things is better. </ElementsBp>
    <ElementsBp
      >Learning a lot of new useful things is great, as long as the knowledge
      gets converted into productive actions.
    </ElementsBp>
    <ElementsBp
      >Learning a lot of new useful things and failing to use any of the
      knowledge gained leads to intellectual obesity.
    </ElementsBp>
    <ElementsBp>Intellectual obesity is ElementsBad. </ElementsBp>
  </BlogPost>
</template>
