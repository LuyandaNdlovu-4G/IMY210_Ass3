<template>
  <header class="bg-gray-900 text-white p-4 w-full flex justify-between items-center shadow-lg">
    <!-- Logo / Title -->
    <router-link to="/" class="text-xl font-bold hover:text-yellow-400 transition-colors">
      EX-Press
    </router-link>

    <!-- Search Bar -->
    <SearchBar class="w-full sm:w-1/2 lg:w-1/3" />
  </header>
</template>

<script setup>
import SearchBar from './SearchBar.vue'
</script>

<style scoped>
/* Header container - full width */
header {
  width: 100%;
}

/* Logo title style */
.router-link {
  color: white;
  text-decoration: none;
  font-size: 1.75rem;
  font-weight: bold;
}

.router-link:hover {
  transition: color 0.3s ease;
}

</style>