<script setup lang="ts">
import CircleOverlap from '../components/CircleOverlap.vue';
</script>

<template>
  <div class="home">
    <h1 class="kopje">Media overzicht</h1>
    <CircleOverlap :radius="30" />
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.kopje {
  margin: 0;
  padding: 2rem 0 1rem 0;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  color: #222;
  letter-spacing: 0.01em;
  z-index: 2;
  position: relative;
}

.circle-square {
  position: relative;
  width: 70vmin;
  height: 70vmin;
  background: none;
}
</style> 