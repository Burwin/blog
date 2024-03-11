<script setup lang="ts">
const post = {
  date: "2021-02-18",
  title: "Must-do Lists",
  excerpt:
    "Todos are great, but I have a habit of letting them slip over time.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>
      I'm going to try something new: keeping a daily must-do list of only 1-3
      items.
    </ElementsBp>
    <ElementsBp>
      My fiancee recently mentioned something she'd heard, probably on NPR (she
      listens on her commutes) about "your house or boat is taking on water
      until you do these things", or something to that effect. The idea was that
      there are some things that you really must do, and do them first, because
      they're that important.
    </ElementsBp>
    <ElementsBp>
      A must-do list needs to be very small each day so that it's very likely
      that I can maintain the integrity of the exercise. I MUST get these 1-3
      items done before I end my day. But unexpected things happen, and other
      things matter, too. So the must-dos should be clearly less than 50% of my
      day.
    </ElementsBp>
    <ElementsBp>
      But they help me prioritize the most important items, and keep those items
      visible. If I don't see something, I forget about it.
    </ElementsBp>
    <ElementsBp> Today's list: </ElementsBp>
    <ElementsBul>
      <ElementsBli>Write this blog post</ElementsBli>
      <ElementsBli>Pay an invoice</ElementsBli>
      <ElementsBli>Provide an estimate to a client</ElementsBli>
    </ElementsBul>
    <ElementsBp>
      I should get more than this done. There are other items on my todo lists,
      but these are items I'm guaranteed to do.
    </ElementsBp>
  </BlogPost>
</template>
