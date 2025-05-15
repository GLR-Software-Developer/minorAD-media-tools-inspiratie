<template>
  <div class="tech-blokken">
    <div v-for="tech in gesorteerdetechnologieen" :key="tech.naam" class="tech-blok" :id="tech.naam.toLowerCase().replace(/ /g, '-')">
      <div class="tech-header">
        <span v-for="type in (Array.isArray(tech.type) ? tech.type : [tech.type])" :key="type" class="type-dot" :class="type"></span>
        <span class="tech-title">{{ tech.naam }}</span>
      </div>
      <div v-if="tech.notitie" class="tech-note">{{ tech.notitie }}</div>
      <div class="tech-omschrijving">{{ tech.omschrijving }}</div>
      <div class="tech-links">
        <a v-if="tech.links && tech.links.website" :href="tech.links.website" target="_blank" title="Website" class="icon-link" v-html="circleIcon" />
        <a v-if="tech.links && tech.links.documentatie" :href="tech.links.documentatie" target="_blank" title="Documentatie" class="icon-link" v-html="documentIcon" />
      </div>
      <div v-if="tech.links && tech.links.tutorials && tech.links.tutorials.length" class="tech-tutorials">
        <span class="tutorials-label">Handige links:</span>
        <ul class="tutorials-list">
          <li v-for="(tut, i) in tech.links.tutorials" :key="i">
            <a v-if="tut.url" :href="tut.url" target="_blank">{{ tut.titel || tut.url }}</a>
            <span v-else>{{ tut.titel || 'Onbekende tutorial' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Icon } from 'jao-icons';

const props = defineProps({
  technologieen: {
    type: Array,
    required: true
  }
});

// Converteer de binary arrays naar SVG strings
const circleIcon = computed(() => {
  const svg = Icon('medium/external-link');
  return svg.outerHTML;
});

const documentIcon = computed(() => {
  const svg = Icon('medium/document');
  return svg.outerHTML;
});

const gesorteerdetechnologieen = computed(() => {
  return [...props.technologieen].sort((a, b) => {
    const aTypes = Array.isArray(a.type) ? a.type.length : 1;
    const bTypes = Array.isArray(b.type) ? b.type.length : 1;
    return aTypes - bTypes;
  });
});
</script>

<style>
.tech-blokken {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1280px;
  margin: auto;
  position: relative;
  z-index: 1;
  padding: 2rem;
}

.tech-blok {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: none;
  min-width: 0;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tech-blok:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
}

.tech-header {
  display: flex;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  align-items: center;
}

.type-dot {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.1rem;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.type-dot.audio { background: #4FC3F7; }
.type-dot.visueel { background: #F44336; }
.type-dot.data { background: #FFB300; }

.tech-title {
  vertical-align: middle;
}

.tech-note {
  font-size: 1rem;
  color: #6c757d;
  font-style: italic;
  margin: 0.2rem 0;
}

.tech-omschrijving {
  font-size: 1.1rem;
  color: #495057;
  line-height: 1.6;
}

.tech-links {
  display: flex;
  gap: 0.7rem;
  margin: 0.2rem 0 0.2rem 0;
}

.icon-link {
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
}

.icon-link:hover {
  color: #222;
}
.icon-link svg {
    width: 19px;
    height: 19px;
}

.icon-link .jao-icon-cell[v='0'] {
  fill: transparent;
}

  
/*   
rect["v=0"] {
    fill: #4FC3F7;
}

rect["v=1"] {
    fill: #F44336;
} */

.tech-tutorials {
  margin-top: 0.2rem;
}

.tutorials-label {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 0.1rem;
}

.tech-tutorials ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-tutorials li {
  margin-bottom: 0.1rem;
}

.tech-tutorials a {
  color: #1976d2;
  text-decoration: underline;
  font-size: 0.98rem;
}

.tutorials-list {
  line-height: 2;

  li::before {
    content: "•";
    display: inline-block;
    margin-right: 0.5rem;
  }
}
</style> 