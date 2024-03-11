<script setup lang="ts">
import { ba } from "../elements";
defineProps<{
  quote: string;
  name?: string;
  contextText?: string;
  contextUrl?: string;
}>();
</script>

<template>
  <figure class="mt-10 border-l border-indigo-600 pl-9">
    <blockquote class="font-semibold text-gray-900">
      <p>“{{ quote }}”</p>
    </blockquote>
    <figcaption
      v-if="name || contextText || contextUrl"
      class="mt-6 flex gap-x-4"
    >
      <div class="text-sm leading-6">
        <strong class="font-semibold text-gray-900">{{ name }}</strong>
        <template v-if="contextText && !contextUrl">
          - {{ contextText }}
        </template>
        <template v-else-if="contextText && contextUrl">
          <ba :href="contextUrl"> - {{ contextText }}</ba>
        </template>
        <template v-else-if="!contextText && contextUrl">
          <ba :href="contextUrl"> - {{ contextUrl }}</ba>
        </template>
      </div>
    </figcaption>
  </figure>
</template>
