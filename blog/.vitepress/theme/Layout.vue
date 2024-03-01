<script setup lang="ts">
import { useData } from "vitepress";
import PageHeader from "./components/PageHeader.vue";
import PostCardContainer from "./components/PostCardContainer.vue";
import PostCard from "./components/PostCard.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>
  <div v-if="frontmatter.home">
    <PageHeader :title="site.title" :subTitle="site.description" />
    <PostCardContainer>
      <PostCard
        v-for="post in frontmatter.posts"
        :key="post.title"
        :date="new Date(post.date)"
        :title="post.title"
        :description="post.description"
        :href="post.path"
      />
    </PostCardContainer>
  </div>
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
