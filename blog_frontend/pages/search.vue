<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Search Posts</h1>

    <!-- Search Bar -->
    <SearchBar />

    <!-- Category Filter -->
    <CategoryFilter v-if="categories.length" v-model:model-value="selectedCategory" :categories="categories" />

    <!-- Results -->
    <div v-if="filteredPosts.length" class="mt-6">
      <div v-for="post in filteredPosts" :key="post.id" class="mb-4 border p-4 rounded shadow-sm">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="text-sm text-gray-600">By {{ post.author }}</p>
        <NuxtLink :to="`/post/${post.slug}`" class="text-blue-600 hover:underline">Read more</NuxtLink>
      </div>
    </div>

    <p v-else class="text-gray-500 mt-6">No matching posts found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStrapi } from '~/composables/useStrapi'
import SearchBar from '~/components/SearchBar.vue'
import CategoryFilter from '~/components/CategoryFilter.vue'

// Define a type for blog posts
interface BlogPost {
  id: number
  title: string
  author: string
  slug: string
  category: string
}

// Reactive state
const query = ref('')
const selectedCategory = ref('')
const rawPosts = ref<BlogPost[]>([])
const categories = ref<string[]>([])

// Fetch data from Strapi
const route = useRoute()
onMounted(async () => {
  const res = await useStrapi().fetchFromStrapi('blog-posts?populate=*')

  if (res?.data) {
    // Map response to typed array
    const fetchedPosts: BlogPost[] = res.data.map((entry: any) => ({
      id: entry.id,
      title: entry.attributes.title,
      author: entry.attributes.author,
      slug: entry.attributes.slug,
      category: entry.attributes.category || 'Uncategorized',
    }))

    rawPosts.value = fetchedPosts

    // Extract unique categories and ensure they are strings
    const uniqueCategories: string[] = [
      ...new Set(fetchedPosts.map(p => p.category)),
    ]

    categories.value = uniqueCategories
  }
})

// Sync query with route
watchEffect(() => {
  query.value = (route.query.q as string) || ''
  selectedCategory.value = (route.query.category as string) || ''
})

// Filtered posts based on search and category
const filteredPosts = computed(() => {
  return rawPosts.value.filter(post => {
    const matchesQuery =
      !query.value ||
      post.title.toLowerCase().includes(query.value.toLowerCase()) ||
      post.author.toLowerCase().includes(query.value.toLowerCase())

    const matchesCategory =
      !selectedCategory.value || post.category === selectedCategory.value

    return matchesQuery && matchesCategory
  })
})
</script>