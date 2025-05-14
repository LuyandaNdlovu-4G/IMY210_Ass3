<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- Header with Category Filter -->
    <header class="mb-8 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Blog Posts</h1>

      <!-- Category Filter -->
      <div class="w-48">
        <CategoryFilter v-model:model-value="selectedCategory" :categories="categories" />
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="text-center text-lg text-gray-600">Loading blog posts...</div>

    <!-- Blog Posts Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <!-- Card Body -->
        <div class="p-6 flex flex-col flex-grow">
          <!-- Category Tag -->
          <div class="mb-2">
            <span class="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              {{ post.category }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
            {{ post.title }}
          </h2>

          <!-- Post Snippet -->
          <p class="text-gray-600 mb-4 flex-grow line-clamp-3">
            {{ post.snippet }}
          </p>

          <!-- Read More Button-->
          <div class="mt-auto pt-2">
            <router-link
              :to="`/post/${post.slug}`"
              class="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-md shadow hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              Read More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import CategoryFilter from '~/components/CategoryFilter.vue'

const posts = ref([])
const loading = ref(true)
const selectedCategory = ref('')
const categories = ref([])

// Fetch blog posts
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:1337/api/blog-posts')
    if (!res.ok) throw new Error('Network response was not ok')
    const data = await res.json()

    // Extract unique categories
    const allCategories = data.data.map(post => post.category || 'Uncategorized')
    categories.value = [...new Set(allCategories)]

    // Map posts
    posts.value = data.data.map(post => {
      let snippet = ''
      if (post.content && Array.isArray(post.content)) {
        const firstParagraph = post.content.find(block => block.type === 'paragraph')
        if (firstParagraph?.children?.[0]?.text) {
          snippet = firstParagraph.children[0].text.slice(0, 150) + '...'
        }
      }

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        category: post.category || 'Uncategorized',
        createdAt: new Date(post.createdAt).toLocaleDateString(),
        snippet
      }
    })
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  } finally {
    loading.value = false
  }
})

// Filter posts based on selected category
const filteredPosts = computed(() => {
  if (!selectedCategory.value) return posts.value
  return posts.value.filter(post => post.category === selectedCategory.value)
})
</script>