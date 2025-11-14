<template>
  <BlogHeaderLeading :text="format(date, 'yyyy-MM-dd')" />
</template>

<script setup lang="ts">
import { format } from "date-fns";

defineProps<{
  date: Date;
}>();
</script>
