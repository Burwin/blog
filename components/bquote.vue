<script setup lang="ts">
defineProps<{
  quote: string;
  name: string;
  context?: {
    text?: string;
    url?: string;
  };
}>();
</script>

<template>
  <figure class="mt-10 border-l border-indigo-600 pl-9">
    <blockquote class="font-semibold text-gray-900">
      <p>“{{ quote }}”</p>
    </blockquote>
    <figcaption class="mt-6 flex gap-x-4">
      <div class="text-sm leading-6">
        <strong class="font-semibold text-gray-900">{{ name }}</strong>
        <template v-if="context && context.text && !context.url">
          – {{ context.text }}
        </template>
        <template v-else-if="context && context.text && context.url">
          <ba :href="context.url"> - {{ context.text }}</ba>
        </template>
        <template v-else-if="context && !context.text && context.url">
          <ba :href="context.url"> - {{ context.url }}</ba>
        </template>
      </div>
    </figcaption>
  </figure>
</template>
