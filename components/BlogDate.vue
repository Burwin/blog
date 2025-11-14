<template>
  <BlogHeaderLeading :text="format(setHours(date, 12), 'yyyy-MM-dd')" />
</template>

<script setup lang="ts">
import { format, setHours } from "date-fns";

defineProps<{
  date: Date;
}>();
</script>
