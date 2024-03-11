<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Thoughtful Coding
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">on life and work.</p>
        <div class="flex justify-start mt-4 space-x-2 text-gray-400">
          <a
            href="https://github.com/Burwin"
            target="_blank"
            class="hover:cursor-pointer hover:text-indigo-600"
          >
            <SvgGitHubLogo class="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/burwin/"
            target="_blank"
            class="hover:cursor-pointer hover:text-indigo-600"
          >
            <SvgLinkedInLogo class="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com/ParallelMike"
            target="_blank"
            class="hover:cursor-pointer hover:text-indigo-600"
          >
            <SvgXLogo class="w-4 h-4" />
          </a>
        </div>
        <div
          class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16"
        >
          <article
            v-for="post in posts"
            :key="post.id"
            class="flex max-w-xl flex-col items-start justify-between"
          >
            <div class="flex items-center gap-x-4 text-xs">
              <time
                :datetime="format(post.date, 'yyyy-MM-dd')"
                class="text-gray-500"
                >{{ format(post.date, "yyyy-MM-dd") }}</time
              >
            </div>
            <div class="group relative">
              <h3
                class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              >
                <a :href="post.href">
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ post.description }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/post";
import { format } from "date-fns";

defineProps<{
  posts: Post[];
}>();
</script>
