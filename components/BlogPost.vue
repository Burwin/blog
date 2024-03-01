<script setup lang="ts">
defineProps<{
  date: Date;
  title: string;
  excerpt?: string;
}>();
</script>

<template>
  <div class="bg-white pt-16 flex justify-center">
    <BlogNavBar />
  </div>
  <div class="bg-white px-6 py-16 lg:px-8">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <main>
        <article>
          <BlogDate :date="date" />
          <BlogTitle :title="title" />
          <BlogExcerpt v-if="excerpt">
            {{ excerpt }}
          </BlogExcerpt>
          <div class="mt-10 max-w-2xl">
            <slot />
          </div>
        </article>
      </main>
    </div>
  </div>
</template>
