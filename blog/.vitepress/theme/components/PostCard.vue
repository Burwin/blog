<script setup lang="ts">
defineProps({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  href: { type: String, required: true },
});
</script>

<template>
  <article class="flex max-w-xl flex-col items-start justify-between">
    <div class="flex items-center gap-x-4 text-xs">
      <time :datetime="date" class="text-gray-500">{{
        date.toLocaleDateString()
      }}</time>
    </div>
    <div class="group relative">
      <h3
        class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
      >
        <a :href="href" class="hover:cursor-pointer" target="_self">
          <span class="absolute inset-0" />
          {{ title }}
        </a>
      </h3>
      <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        {{ description }}
      </p>
    </div>
  </article>
</template>
