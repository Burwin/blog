<template>
  <p class="text-base font-semibold leading-7 text-indigo-600">
    {{ text }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>
