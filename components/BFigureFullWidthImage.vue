<script setup lang="ts">
import { InformationCircleIcon } from "@heroicons/vue/20/solid";

defineProps<{
  src: string;
  caption?: string;
}>();
</script>

<template>
  <figure class="mt-16">
    <img
      class="aspect-video rounded-xl bg-gray-50 object-cover"
      :src="src"
      alt=""
    />
    <figcaption
      v-if="caption"
      class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500"
    >
      <InformationCircleIcon
        class="mt-0.5 h-5 w-5 flex-none text-gray-300"
        aria-hidden="true"
      />
      {{ caption }}
    </figcaption>
  </figure>
</template>
