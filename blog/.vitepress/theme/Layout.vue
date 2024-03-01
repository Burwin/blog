<script setup lang="ts">
import { useData } from "vitepress";
import PageHeader from "./components/PageHeader.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>
  <div v-if="frontmatter.home">
    <PageHeader :title="site.title" :subTitle="site.description" />
    <h1 class="underline">{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <ul>
      <li><a href="/markdown-examples.html">Markdown Examples</a></li>
      <li><a href="/api-examples.html">API Examples</a></li>
    </ul>
  </div>
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
