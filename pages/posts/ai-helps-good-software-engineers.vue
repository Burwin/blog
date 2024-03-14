<script setup lang="ts">
const post = {
  date: "2024-03-14",
  title: "AI Helps Good Software Engineers",
  excerpt:
    "The hardest part of software projects is organizing the messiness of real life. AI/Devin can't touch that.",
};
</script>

<template>
  <BlogPost
    :date="new Date(post.date)"
    :title="post.title"
    :excerpt="post.excerpt"
  >
    <ElementsBp>
      When the printing press came along, storytellers didn't lose their jobs...
      scribes did. Storytellers, on the contrary, saw their influence surge to
      new heights.
    </ElementsBp>
    <ElementsBp>
      AI replaces the scribes of coding, not the storytellers.
    </ElementsBp>
    <ElementsBp>
      I can't wait for advancements in AI tooling to help me write bigger and
      better software stories more efficiently than before.
    </ElementsBp>
  </BlogPost>
</template>
