<template>
  <BlogHeaderLeading :text="date.toLocaleDateString()" />
</template>

<script setup lang="ts">
defineProps<{
  date: Date;
}>();
</script>
