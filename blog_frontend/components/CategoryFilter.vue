<template>
  <select v-model="selectedCategory" class="border rounded px-3 py-2 mb-4">
    <option value="">All Categories</option>
    <option v-for="category in categories" :key="category" :value="category">
      {{ category }}
    </option>
  </select>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  categories: Array,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const router = useRouter()

const selectedCategory = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    router.push({ query: { ...router.currentRoute.value.query, category: value } })
  }
})
</script>