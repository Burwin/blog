<script setup lang="ts">
defineProps<{
  href: string;
  target?: string;
}>();
</script>

<template>
  <a
    :href="href"
    :target="target"
    class="text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
  >
    <slot />
  </a>
</template>
