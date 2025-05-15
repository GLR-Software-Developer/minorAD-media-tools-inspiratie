<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import type { Technologie } from '../services/TechnologieService';

const router = useRouter();
const props = defineProps<{
  technologie: Technologie;
  x: number; // x-positie binnen cirkel (in %)
  y: number; // y-positie binnen cirkel (in %)
}>();

const showPopup = ref(false);
const isHovered = ref(false);
const isPopupHovered = ref(false);
let closeTimer: number | null = null;

// Vertraging in milliseconden voor het sluiten van de popup
const CLOSE_DELAY = 100;

// Bereken of popup zichtbaar moet zijn
const popupVisible = computed(() => showPopup.value || isPopupHovered.value);

// Z-index aanpassen op basis van hover of popup zichtbaar
const zIndex = computed(() => (isHovered.value || popupVisible.value) ? 20 : 3);

// Bereken het anker ID voor de technologie
const techAnchorId = computed(() => props.technologie.naam.toLowerCase().replace(/ /g, '-'));

// Functie om naar het anker te navigeren
const navigateToTech = () => {
  console.log('Navigatie naar:', techAnchorId.value);
  const type = Array.isArray(props.technologie.type) 
    ? props.technologie.type[0].toLowerCase() 
    : props.technologie.type.toLowerCase();
  router.push(`/${type}#${techAnchorId.value}`);
};

// Functie om een eventuele lopende timer te annuleren
const clearCloseTimer = () => {
  if (closeTimer !== null) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
};

// Functie om de popup te sluiten met vertraging
const scheduleClose = () => {
  clearCloseTimer();
  closeTimer = setTimeout(() => {
    // Sluit de popup alleen als noch de stip, noch de popup gehovered zijn
    if (!isHovered.value && !isPopupHovered.value) {
      showPopup.value = false;
    }
  }, CLOSE_DELAY);
};

const handleMouseEnterDot = () => {
  clearCloseTimer(); // Annuleer eventuele sluit-timer
  isHovered.value = true;
  showPopup.value = true;
};

const handleMouseLeaveDot = () => {
  isHovered.value = false;
  // Sluit de popup met vertraging
  scheduleClose();
};

const handleMouseEnterPopup = () => {
  clearCloseTimer(); // Annuleer eventuele sluit-timer
  isPopupHovered.value = true;
};

const handleMouseLeavePopup = () => {
  isPopupHovered.value = false;
  // Sluit de popup met vertraging
  scheduleClose();
};

// Ruim de timer op als het component wordt vernietigd
onBeforeUnmount(() => {
  clearCloseTimer();
});
</script>

<template>
  <div 
    class="tech-dot" 
    :style="{ top: `${y}%`, left: `${x}%`, zIndex: zIndex }"
    @mouseenter="handleMouseEnterDot"
    @mouseleave="handleMouseLeaveDot"
    @click="navigateToTech"
  >
    <!-- Popup met meer informatie (nu boven de stip) -->
    <div v-if="popupVisible" 
      class="tech-popup"
      @mouseenter="handleMouseEnterPopup"
      @mouseleave="handleMouseLeavePopup"
    >
      <h3>{{ technologie.naam }}</h3>
      <p>{{ technologie.omschrijving }}</p>
      
      <div v-if="technologie.notitie" class="notitie">
        {{ technologie.notitie }}
      </div>
      
      <div class="popup-links">
        <a :href="technologie.links.website" target="_blank">Website</a>
        <a :href="technologie.links.documentatie" target="_blank">Docs</a>
      </div>
    </div>
    
    <div class="dot-circle" :class="{ active: isHovered || popupVisible }"></div>
    <div class="dot-label">{{ technologie.naam }}</div>
  </div>
</template>

<style scoped>
.tech-dot {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.dot-circle {
  width: 12px;
  height: 12px;
  background-color: #222;
  border-radius: 50%;
  margin-bottom: 4px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.dot-circle.active {
  transform: scale(1.3);
  background-color: #000;
}

.dot-label {
  font-size: 0.8rem;
  color: #333;
  font-weight: 500;
  white-space: nowrap;
  text-shadow: 0 0 5px white;
}

.tech-popup {
  position: absolute;
  bottom: calc(100% + 15px); /* Verplaatst naar boven */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 6px;
  padding: 1rem;
  width: 250px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 30;
  text-align: left;
}

.tech-popup::after {
  content: '';
  position: absolute;
  bottom: -8px; /* Driehoekje nu onderaan */
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white; /* Driehoekje wijst nu naar beneden */
}

.tech-popup h3 {
  margin: 0 0 0.5rem 0;
  color: #222;
  font-size: 1.1rem;
  font-weight: 600;
}

.tech-popup p {
  margin: 0 0 0.8rem 0;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
}

.notitie {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.8rem;
}

.popup-links {
  display: flex;
  gap: 10px;
}

.popup-links a {
  text-decoration: none;
  color: #0066cc;
  font-size: 0.8rem;
  font-weight: 500;
}

.popup-links a:hover {
  text-decoration: underline;
}
</style> 