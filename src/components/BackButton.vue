<template>
  <router-link to="/" class="back-button">
    <div class="jao-icon" v-html="backIcon"></div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from 'jao-icons';

const backIcon = computed(() => {
  const svg = Icon('small/chevron-left-fat');
  return svg.outerHTML;
});
</script>

<style>
.back-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.back-button:hover .jao-icon-cell[v='1']{
  fill: var(--circle-color, currentColor);
}

.back-button .jao-icon {
  width: 48px;
  height: 48px;
  color: #333;
}

.back-button .jao-icon-cell {
    transition: fill 0.2s ease;
}

.back-button .jao-icon-cell[v='0'] {
  fill: transparent;
}

.back-button:hover .jao-icon {
  color: #000;
}
</style> 