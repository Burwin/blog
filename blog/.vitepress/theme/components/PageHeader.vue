<template>
  <div class="bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {{ title }}
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        {{ subTitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  subTitle: String,
});
</script>
