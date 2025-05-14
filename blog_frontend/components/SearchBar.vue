<template>
  <form @submit.prevent="onSearch" class="flex items-center space-x-2">
    <input
      v-model="query"
      type="text"
      placeholder="Search by title or author"
      class="border px-4 py-2 rounded w-full"
    />
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      Search
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

const onSearch = () => {
  const trimmedQuery = query.value.trim()
  router.push({ name: 'search', query: { q: trimmedQuery } })
}
</script>