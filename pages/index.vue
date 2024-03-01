<template>
  <BlogList :posts="posts" />
</template>

<script setup lang="ts">
import rawPosts from "@/posts.json";
const posts = rawPosts.map((post) => {
  return {
    ...post,
    date: new Date(post.date),
  };
});
</script>
