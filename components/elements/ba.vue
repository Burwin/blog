<script setup lang="ts">
defineProps<{
  href: string;
}>();
</script>

<template>
  <a
    :href="href"
    class="text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
  >
    <slot />
  </a>
</template>
