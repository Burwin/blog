<script setup lang="ts">
useSeoMeta({
  title: "Thoughtful Coding",
  description: "on life and work",
});

useHead({
  link: [
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "RSS",
      href: "/rss.xml",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
});
</script>

<template>
  <NuxtPage />
</template>
