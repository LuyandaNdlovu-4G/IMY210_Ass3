<template>
  <NuxtLink :to="`/post/${slug}`" class="block p-4 border rounded-lg hover:shadow transition">
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <p class="text-sm text-gray-500 mb-2">By {{ author }}</p>
    <p class="text-gray-700">{{ snippet }}</p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: String,
  author: String,
  slug: String,
  content: String
})

const snippet = computed(() => content.slice(0, 150) + '...')
</script>
