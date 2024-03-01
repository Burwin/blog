<template>
  <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
