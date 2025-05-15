<script setup lang="ts">
import menuItems from '../data/menuItems.json';
import '../assets/detailPage.css';
import TechnologieBlokken from '../components/TechnologieBlokken.vue';
import BackButton from '../components/BackButton.vue';
import technologieData from '../data/technologieen.json';

// Zoek de audio-item gegevens
const audioItem = menuItems.find(item => item.slug === 'audio') || { title: 'Audio', color: '#4FC3F7' };

// Filter technologieën met type 'audio'
const technologieen = technologieData.filter(tech => {
  if (Array.isArray(tech.type)) return tech.type.includes('audio');
  return tech.type === 'audio';
});
</script>

<template>
  <div class="detail-page" id="audio" :style="{ '--circle-color': audioItem.color }">
    <BackButton />
    <div class="custom-circle" :style="{ backgroundColor: audioItem.color }"></div>
    <span class="custom-circle-text">{{ audioItem.title }}</span>
    <div class="jumbotron">
      <h1>{{ audioItem.title }}</h1>
      <p>Op deze pagina vind je een overzicht van verschillende software tools en technieken voor het maken van audio.</p>
    </div>

    <TechnologieBlokken :technologieen="technologieen" />
  </div>
</template>