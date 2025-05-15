<script setup lang="ts">
import menuItems from '../data/menuItems.json';
import '../assets/detailPage.css';
import TechnologieBlokken from '../components/TechnologieBlokken.vue';
import technologieData from '../data/technologieen.json';

// Zoek de visueel-item gegevens
const visueelItem = menuItems.find(item => item.slug === 'visueel') || { title: 'Visueel', color: '#F44336' };

// Filter technologieën met type 'visueel'
const technologieen = technologieData.filter(tech => {
  if (Array.isArray(tech.type)) return tech.type.includes('visueel');
  return tech.type === 'visueel';
});
</script>

<template>
  <div class="detail-page" id="visueel" :style="{ '--circle-color': visueelItem.color }">
    <div class="custom-circle" :style="{ backgroundColor: visueelItem.color }"></div>
    <span class="custom-circle-text">{{ visueelItem.title }}</span>
    <div class="jumbotron">
      <h1>{{ visueelItem.title }}</h1>
      <p>Op deze pagina vind je een overzicht van verschillende software tools en technieken voor het maken van visueel werk.</p>
    </div>
    
    <TechnologieBlokken :technologieen="technologieen" />
  </div>
</template>