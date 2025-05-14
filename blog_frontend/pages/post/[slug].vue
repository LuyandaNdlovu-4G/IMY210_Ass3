<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div v-if="loading" class="text-center text-lg text-gray-500">Loading post...</div>
    <div v-else-if="!post" class="text-center text-lg text-red-500">No content found for this post.</div>

    <article v-else class="prose prose-lg prose-slate max-w-none">
      <header class="mb-6 border-b pb-4">
        <h1 class="text-4xl font-bold text-gray-900">{{ post.title }}</h1>
        <p class="mt-2 text-black-600">By: <span class="font-medium">{{ post.author }}</span></p>
      </header>

      <!-- Content Blocks -->
      <section>
        <div v-for="(block, index) in post.content" :key="index">
          <!-- Paragraph -->
          <p v-if="block.type === 'paragraph'" class="my-4 text-lg leading-relaxed text-gray-700">
            {{ block.children[0].text }}
          </p>

          <!-- List -->
          <ul v-if="block.type === 'list'" class="list-disc ml-6 my-4 space-y-2 text-gray-700">
            <li v-for="(item, idx) in block.children" :key="idx" class="text-lg">
              {{ item.children[0].text }}
            </li>
          </ul>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const route = useRoute()
const config = useRuntimeConfig()

// Loading state
const loading = ref(true)
const post = ref(null)

// Fetch the post data based on the slug
onMounted(async () => {
  try {
    const { data, error } = await useFetch(
      `${config.public.strapiBaseURL}/api/blog-posts?filters[slug][$eq]=${route.params.slug}&populate=*`
    )

    console.log("Raw response:", JSON.stringify(data.value, null, 2))

    if (error.value) {
      console.error("Error loading post:", error.value)
      post.value = null
    } else {
      // ✅ Correctly access the first item — NO .attributes needed!
      post.value = data.value?.data?.[0] || null
    }
  } catch (err) {
    console.error("Unexpected fetch error:", err)
    post.value = null
  } finally {
    loading.value = false
  }
})
</script>
