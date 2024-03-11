<script setup lang="ts">
defineProps<{
  code: string;
}>();
</script>

<template>
  <pre class="bg-gray-100 p-4 overflow-auto"><code>{{ code }}</code></pre>
</template>
