<script setup lang="ts">
import menuItems from '../data/menuItems.json';
import '../assets/detailPage.css';
import TechnologieBlokken from '../components/TechnologieBlokken.vue';
import BackButton from '../components/BackButton.vue';
import technologieData from '../data/technologieen.json';

// Zoek de data-item gegevens
const dataItem = menuItems.find(item => item.slug === 'data') || { title: 'Data', color: '#FFB300' };

// Filter technologieën met type 'data'
const technologieen = technologieData.filter(tech => {
  if (Array.isArray(tech.type)) return tech.type.includes('data');
  return tech.type === 'data';
});
</script>

<template>
  <div class="detail-page" id="data" :style="{ '--circle-color': dataItem.color }">
    <BackButton />
    <div class="custom-circle" :style="{ backgroundColor: dataItem.color }"></div>
    <span class="custom-circle-text">{{ dataItem.title }}</span>
    <div class="jumbotron">
      <h1>{{ dataItem.title }}</h1>
      <p>Op deze pagina vind je een overzicht van verschillende software tools en technieken voor het werken met teksten & cijfers.</p>
    </div>
    
    <TechnologieBlokken :technologieen="technologieen" />
  </div>
</template>
