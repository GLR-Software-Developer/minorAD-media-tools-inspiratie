<script setup lang="ts">
defineProps<{
  color: string;
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  diameter?: number | string;
}>();
</script>

<template>
  <div 
    class="circle" 
    :style="{
      backgroundColor: color,
      top,
      bottom,
      left,
      right,
      width: typeof diameter === 'number' ? diameter + '%' : diameter,
      height: typeof diameter === 'number' ? diameter + '%' : diameter,
      transform: 'translate(-50%, -50%)'
    }"
  >
    <span class="label">{{ label }}</span>
  </div>
</template>

<style scoped>
.circle {
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2.5rem;
  color: white;
  opacity: 0.7;
  mix-blend-mode: multiply;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
}

.label {
  font-family: Arial, sans-serif;
}

@media (max-width: 768px) {
  .circle {
    font-size: 1.8rem;
  }
}
</style> 