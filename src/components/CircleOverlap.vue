<script setup lang="ts">
import { computed, ref } from 'vue';
import Circle from './Circle.vue';
import TechnologieDot from './TechnologieDot.vue';
import technologieService from '../services/TechnologieService';
import type { Technologie } from '../services/TechnologieService';

// Basisinstellingen voor cirkels
const props = defineProps<{ radius?: number }>();
const radius = props.radius ?? 20;
const diameter = computed(() => radius * 2.5);

// Hoeken voor de drie cirkels (in radialen)
const angles = [-90, 150, 30].map(a => a * Math.PI / 180);

// Functie om x/y te berekenen (midden = 50%, 50%)
function getPos(angle: number) {
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return { x, y };
}

const positions = angles.map(getPos);
const cirkelRadius = computed(() => diameter.value / 2);
const cirkelMiddelpunten = computed(() => [
  { x: positions[0].x, y: positions[0].y }, // Audio
  { x: positions[1].x, y: positions[1].y }, // Visueel
  { x: positions[2].x, y: positions[2].y }  // Data
]);

// Functie om te controleren of een punt binnen een cirkel ligt
function isPuntBinnenCirkel(puntX: number, puntY: number, cirkelX: number, cirkelY: number, cirkelRadius: number): boolean {
  const dx = puntX - cirkelX;
  const dy = puntY - cirkelY;
  return dx * dx + dy * dy <= cirkelRadius * cirkelRadius;
}

// Bepaal voor elk punt in welke cirkels het ligt
function bepaalCirkelOverlap(x: number, y: number): (0 | 1 | 2)[] {
  const overlappendeCirkels: (0 | 1 | 2)[] = [];
  
  for (let i = 0; i < 3; i++) {
    if (isPuntBinnenCirkel(x, y, cirkelMiddelpunten.value[i].x, cirkelMiddelpunten.value[i].y, cirkelRadius.value)) {
      overlappendeCirkels.push(i as 0 | 1 | 2);
    }
  }
  
  return overlappendeCirkels;
}

// Vind het middelpunt van een overlap tussen cirkels of van een enkele cirkel
function vindMiddelpunt(cirkelIndices: number[]): { x: number, y: number } {
  if (cirkelIndices.length === 1) {
    // Middelpunt van een enkele cirkel, met offset
    const cirkelIdx = cirkelIndices[0];
    const cirkelMidden = cirkelMiddelpunten.value[cirkelIdx];
    
    // Offset positie afhankelijk van cirkel
    let offsetX = 0;
    let offsetY = 0;
    
    if (cirkelIdx === 0) { // Audio (boven)
      offsetY = 10; 
    } else if (cirkelIdx === 1) { // Visueel (linksonder)
      offsetX = 8;
      offsetY = -8;
    } else { // Data (rechtsonder)
      offsetX = -8;
      offsetY = -8;
    }
    
    return {
      x: cirkelMidden.x + offsetX,
      y: cirkelMidden.y + offsetY
    };
  } else if (cirkelIndices.length === 2) {
    // Middelpunt tussen twee cirkels
    const c1 = cirkelMiddelpunten.value[cirkelIndices[0]];
    const c2 = cirkelMiddelpunten.value[cirkelIndices[1]];
    return {
      x: (c1.x + c2.x) / 2,
      y: (c1.y + c2.y) / 2
    };
  } 
  
  // Middelpunt van alle drie of fallback
  return { x: 50, y: 50 };
}

// Bepaal het startpunt voor een cirkel dat zo ver mogelijk van het midden (50,50) ligt
function bepaalStartpunt(cirkelIndex: number): number {
  // Bereken de hoek die van het middelpunt van het canvas naar het middelpunt van de cirkel wijst
  const middelpuntCanvas = { x: 50, y: 50 };
  const middelpuntCirkel = cirkelMiddelpunten.value[cirkelIndex];
  
  // Bepaal de hoek van het middelpunt van het canvas naar het middelpunt van de cirkel
  const dx = middelpuntCirkel.x - middelpuntCanvas.x;
  const dy = middelpuntCirkel.y - middelpuntCanvas.y;
  const hoekNaarCanvasMidden = Math.atan2(dy, dx);
  
  // Het startpunt is in tegenovergestelde richting (180 graden gedraaid)
  return hoekNaarCanvasMidden - Math.PI;
}

// Genereer posities voor technologieën
function genereeerSpiralePunten(): { tech: Technologie; x: number; y: number; categorie: string }[] {
  const alleStipPosities: { tech: Technologie; x: number; y: number; categorie: string }[] = [];
  const alleTechnologieen = technologieService.getAllTechnologieen();
  
  // Groepeer technologieën per categorie-combinatie
  const categorieGroepen: { [key: string]: Technologie[] } = {};
  
  for (const tech of alleTechnologieen) {
    const categorieën = Array.isArray(tech.type) ? tech.type : [tech.type];
    const key = categorieën.sort().join('-');
    
    if (!categorieGroepen[key]) {
      categorieGroepen[key] = [];
    }
    
    categorieGroepen[key].push(tech);
  }
  
  // Controleer of overlap geldig is voor cirkelindices
  function controleerGeldigeOverlap(overlap: (0 | 1 | 2)[], cirkelIndices: number[]): boolean {
    if (overlap.length !== cirkelIndices.length) {
      return false;
    }
    
    for (const idx of cirkelIndices) {
      if (!overlap.includes(idx as 0 | 1 | 2)) {
        return false;
      }
    }
    
    return true;
  }
  
  // Plaatst punten in een enkele cirkel exact op de rand, over 120 graden
  function plaatsPuntenOpRand(
    middelpunt: {x: number, y: number},
    cirkelIndex: number,
    maxRadius: number,
    aantalPunten: number,
    cirkelIndices: number[]
  ): {x: number, y: number}[] {
    const punten: {x: number, y: number}[] = [];
    if (aantalPunten === 0) return punten;
    const cirkelRadius = maxRadius;
    const startHoek = bepaalStartpunt(cirkelIndex) + 90;
    const boog = (Math.PI * 2) / 3.5; // 120 graden in radialen
    for (let i = 0; i < aantalPunten; i++) {
      // Verdeel de punten over 120 graden
      const hoek = startHoek + (i / Math.max(1, aantalPunten - 1)) * boog;
      let x = middelpunt.x + cirkelRadius * Math.cos(hoek) + Math.random() * 10;
      let y = middelpunt.y + cirkelRadius * Math.sin(hoek) + Math.random() * 10;
      // Controleer of het punt geldig is, anders probeer kleine variaties
      let overlap = bepaalCirkelOverlap(x, y);
      let isGeldig = controleerGeldigeOverlap(overlap, cirkelIndices);
      if (!isGeldig) {
        // Probeer ±2 graden variatie
        for (let j = 1; j <= 4 && !isGeldig; j++) {
          const variatie = j * Math.PI / 90;
          x = middelpunt.x + cirkelRadius * Math.cos(hoek + variatie);
          y = middelpunt.y + cirkelRadius * Math.sin(hoek + variatie);
          overlap = bepaalCirkelOverlap(x, y);
          isGeldig = controleerGeldigeOverlap(overlap, cirkelIndices);
          if (isGeldig) break;
          x = middelpunt.x + cirkelRadius * Math.cos(hoek - variatie);
          y = middelpunt.y + cirkelRadius * Math.sin(hoek - variatie);
          overlap = bepaalCirkelOverlap(x, y);
          isGeldig = controleerGeldigeOverlap(overlap, cirkelIndices);
        }
      }
      if (!isGeldig) {
        x = middelpunt.x + cirkelRadius * 0.95 * Math.cos(hoek);
        y = middelpunt.y + cirkelRadius * 0.95 * Math.sin(hoek);
      }
      punten.push({ x, y });
    }
    return punten;
  }
  
  // Plaatst punten in een kleinere cirkel in het overlapgebied
  function plaatsPuntenInOverlap(
    middelpunt: {x: number, y: number},
    maxRadius: number,
    aantalPunten: number
  ): {x: number, y: number}[] {
    const punten: {x: number, y: number}[] = [];
    if (aantalPunten === 0) return punten;
    const overlapRadius = maxRadius * 0.4
    const startHoek = -Math.PI / 2 + .2; // Start bovenaan
    for (let i = 0; i < aantalPunten; i++) {
      const hoek = startHoek + (i / Math.max(1, aantalPunten)) * Math.PI * 2;
      let x = middelpunt.x + overlapRadius * Math.cos(hoek);
      let y = middelpunt.y + overlapRadius * Math.sin(hoek);
      punten.push({ x, y });
    }
    return punten;
  }
  
  // Verbeterde sunflower algoritme voor optimale ruimtevulling
  function verdeelPuntenVolgensVerbeterdeSunflower(
    middelpunt: {x: number, y: number},
    maxRadius: number,
    aantalPunten: number,
    cirkelIndices: number[]
  ): {x: number, y: number}[] {
    const punten: {x: number, y: number}[] = [];
    const PHI = (1 + Math.sqrt(5)) / 2; // Gulden snede
    
    // Vergroot de maximale radius voor betere spreiding
    maxRadius = maxRadius * 0.92; // 92% van de maximale radius
    
    // Voor kleine aantallen punten, maak een specifieke verdeling
    if (aantalPunten <= 6) {
      if (aantalPunten === 1) {
        // Enkel punt: plaats in het midden
        punten.push({x: middelpunt.x, y: middelpunt.y});
      } else if (aantalPunten <= 3) {
        // 2-3 punten: plaats op een cirkel met offset
        const radius = maxRadius * 0.65;
        
        for (let i = 0; i < aantalPunten; i++) {
          const hoek = (i / aantalPunten) * Math.PI * 2 + Math.PI / aantalPunten;
          
          let x = middelpunt.x + radius * Math.cos(hoek);
          let y = middelpunt.y + radius * Math.sin(hoek);
          
          // Controleer geldigheid
          const overlap = bepaalCirkelOverlap(x, y);
          const isGeldig = controleerGeldigeOverlap(overlap, cirkelIndices);
          
          if (!isGeldig) {
            const kleinerRadius = radius * 0.75;
            x = middelpunt.x + kleinerRadius * Math.cos(hoek);
            y = middelpunt.y + kleinerRadius * Math.sin(hoek);
          }
          
          punten.push({x, y});
        }
      } else {
        // 4-6 punten: Plaats 1 in het midden, rest op een cirkel
        punten.push({x: middelpunt.x, y: middelpunt.y});
        
        const radius = maxRadius * 0.7;
        for (let i = 1; i < aantalPunten; i++) {
          const hoek = ((i - 1) / (aantalPunten - 1)) * Math.PI * 2;
          
          let x = middelpunt.x + radius * Math.cos(hoek);
          let y = middelpunt.y + radius * Math.sin(hoek);
          
          const overlap = bepaalCirkelOverlap(x, y);
          const isGeldig = controleerGeldigeOverlap(overlap, cirkelIndices);
          
          if (!isGeldig) {
            const kleinerRadius = radius * 0.8;
            x = middelpunt.x + kleinerRadius * Math.cos(hoek);
            y = middelpunt.y + kleinerRadius * Math.sin(hoek);
          }
          
          punten.push({x, y});
        }
      }
      
      return punten;
    }
    
    // Bereken optimale parameter voor ruimteverdeling
    const c = 0.8; // Parameter voor verdeling (0.5 - 1.0, hoger = meer naar buiten)
    
    // Voor grotere aantallen punten: geoptimaliseerd sunflower patroon
    for (let i = 0; i < aantalPunten; i++) {
      // Verdeel radius volgens een optimale verdeling voor gelijkmatige dichtheid
      // met nadruk op gebruik van buitenste gebieden
      const radius = maxRadius * Math.pow(i / aantalPunten, c);
      
      // Sunflower hoek met kleine variatie
      const hoek = i * 2 * Math.PI / (PHI * PHI) + (Math.random() * 0.08 - 0.04);
      
      let x = middelpunt.x + radius * Math.cos(hoek);
      let y = middelpunt.y + radius * Math.sin(hoek);
      
      // Controleer of het punt geldig is
      const overlap = bepaalCirkelOverlap(x, y);
      let geldigPunt = controleerGeldigeOverlap(overlap, cirkelIndices);
      
      if (!geldigPunt) {
        // Probeer eerst nabijgelegen hoeken
        for (let j = 1; j <= 6 && !geldigPunt; j++) {
          const rotatie = j * Math.PI / 30; // 6 graden
          
          // Met de klok mee
          const testHoek1 = hoek + rotatie;
          x = middelpunt.x + radius * Math.cos(testHoek1);
          y = middelpunt.y + radius * Math.sin(testHoek1);
          
          const overlap1 = bepaalCirkelOverlap(x, y);
          geldigPunt = controleerGeldigeOverlap(overlap1, cirkelIndices);
          
          if (geldigPunt) break;
          
          // Tegen de klok in
          const testHoek2 = hoek - rotatie;
          x = middelpunt.x + radius * Math.cos(testHoek2);
          y = middelpunt.y + radius * Math.sin(testHoek2);
          
          const overlap2 = bepaalCirkelOverlap(x, y);
          geldigPunt = controleerGeldigeOverlap(overlap2, cirkelIndices);
          
          if (geldigPunt) break;
        }
        
        // Als dat niet werkt, probeer kleinere radiussen
        if (!geldigPunt) {
          for (let r = 0.9; r >= 0.3 && !geldigPunt; r -= 0.15) {
            const nieuweRadius = radius * r;
            
            x = middelpunt.x + nieuweRadius * Math.cos(hoek);
            y = middelpunt.y + nieuweRadius * Math.sin(hoek);
            
            const overlapAlt = bepaalCirkelOverlap(x, y);
            geldigPunt = controleerGeldigeOverlap(overlapAlt, cirkelIndices);
            
            if (geldigPunt) break;
          }
        }
        
        // Als laatste optie, plaats dichter bij het middelpunt
        if (!geldigPunt) {
          x = middelpunt.x + (x - middelpunt.x) * 0.35;
          y = middelpunt.y + (y - middelpunt.y) * 0.35;
        }
      }
      
      punten.push({x, y});
    }
    
    return punten;
  }
  
  // Genereer posities voor elke groep
  for (const key in categorieGroepen) {
    const categorieën = key.split('-');
    const cirkelIndices = categorieën.map(cat => 
      cat === 'audio' ? 0 : cat === 'visueel' ? 1 : 2
    );
    
    const middelpunt = vindMiddelpunt(cirkelIndices);
    
    // Vergroot de maximale radius voor meer spreiding
    let maxRadius;
    if (cirkelIndices.length === 1) {
      maxRadius = cirkelRadius.value * 0.75; // Vergroot van 0.6 naar 0.75
    } else if (cirkelIndices.length === 2) {
      maxRadius = cirkelRadius.value * 0.45; // Vergroot van 0.35 naar 0.45
    } else {
      maxRadius = cirkelRadius.value * 0.25; // Vergroot van 0.2 naar 0.25
    }
    
    const techs = categorieGroepen[key];
    const aantalTechs = techs.length;
    
    // Kies het juiste algoritme op basis van categorieaantal
    let punten: {x: number, y: number}[];
    
    if (cirkelIndices.length === 1) {
      // Voor grote cirkels: plaats exact op de rand
      punten = plaatsPuntenOpRand(middelpunt, cirkelIndices[0], maxRadius, aantalTechs, cirkelIndices);
    } else {
      // Voor overlappende gebieden: plaats op een kleinere cirkel richting het midden
      punten = plaatsPuntenInOverlap(middelpunt, maxRadius, aantalTechs);
    }
    
    // Voeg technologieën toe aan posities
    for (let i = 0; i < aantalTechs; i++) {
        alleStipPosities.push({
        tech: techs[i],
        x: punten[i].x,
        y: punten[i].y,
        categorie: key
      });
    }
  }
  
  return alleStipPosities;
}

const alleStipPosities = genereeerSpiralePunten();
</script>

<template>
  <div class="circle-container">
    <div class="circle-square">
      <!-- De drie cirkels -->
      <Circle
        color="#4FC3F7"
        label="Audio"
        :diameter="diameter"
        :style="{ transform: 'translate(-50%, -50%)', top: `${positions[0].y }%`, left: `${positions[0].x}%` }"
      />
      <Circle
        color="#F44336"
        label="Visueel"
        :diameter="diameter"
        :style="{ transform: 'translate(-50%, -50%)', top: `${positions[1].y }%`, left: `${positions[1].x}%` }"
      />
      <Circle
        color="#FFB300"
        label="Data"
        :diameter="diameter"
        :style="{ transform: 'translate(-50%, -50%)', top: `${positions[2].y }%`, left: `${positions[2].x}%` }"
      />
      
      <!-- Technologie stippen -->
      <div class="stip-container">
        <TechnologieDot 
          v-for="(stip, index) in alleStipPosities" 
          :key="index" 
          :technologie="stip.tech"
          :x="stip.x"
          :y="stip.y"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.circle-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  overflow: hidden;
}
.circle-square {
  position: relative;
  width: 70vmin;
  height: 70vmin;
  background: none;
}
.stip-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
}
</style> 