<script setup lang="ts">
import { computed } from 'vue';
import type { Technologie } from '../services/TechnologieService';
import Circle from './Circle.vue';
import TechnologieDot from './TechnologieDot.vue';

const props = defineProps<{
  color: string;
  label: string;
  x: number; // x positie in %
  y: number; // y positie in %
  diameter: number; // diameter in %
  technologieen: Technologie[];
}>();

// Functie om stippen random binnen de cirkel te plaatsen
const stipPosities = computed(() => {
  return props.technologieen.map((tech, index) => {
    // Gebruik een algoritme om punten gelijkmatig te verspreiden in een cirkel
    // We gebruiken de Fibonacci spiraal methode omdat deze goed werkt voor verschillende aantallen punten
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const theta = 2 * Math.PI * index / goldenRatio;
    
    // Random radius tussen 0.2 en 0.8 van de cirkelgrootte om niet te dicht bij de rand te komen
    // Sqrt zorgt voor een meer uniforme verdeling over het oppervlak
    const radius = Math.sqrt(Math.random() * 0.6 + 0.2) * 40; // 40% van de cirkelgrootte
    
    const x = 50 + radius * Math.cos(theta);
    const y = 50 + radius * Math.sin(theta);
    
    return { tech, x, y };
  });
});
</script>

<template>
  <div class="technologie-circle" :style="{ top: `${y}%`, left: `${x}%` }">
    <!-- Basiscomponent Circle voor de achtergrond -->
    <Circle :color="color" :label="label" :diameter="diameter" />
    
    <!-- Technologie stippen -->
    <div class="stip-container">
      <TechnologieDot 
        v-for="(stip, index) in stipPosities" 
        :key="index" 
        :technologie="stip.tech"
        :x="stip.x"
        :y="stip.y"
      />
    </div>
  </div>
</template>

<style scoped>
.technologie-circle {
  position: absolute;
  transform: translate(-50%, -50%);
}

.stip-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style> 