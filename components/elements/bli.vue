<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <li class="flex gap-x-3">
    <CheckCircleIcon
      class="mt-1 h-5 w-5 flex-none text-indigo-600"
      aria-hidden="true"
    />
    <span>
      <slot />
    </span>
  </li>
</template>
