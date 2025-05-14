<template>
  <div class="app-container">
    <Header />

    <main class="main-content">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
</script>

<style>
.app-container {
  min-height: 100vh;
  background-color: #fff;
  color: #333;
  font-family: sans-serif;
}

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
