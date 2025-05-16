<template>
  <div class="tech-blokken">
    <div v-for="tech in gesorteerdetechnologieen" 
         :key="tech.naam" 
         class="tech-blok" 
         :id="tech.naam.toLowerCase().replace(/ /g, '-')"
    >
      <div class="tech-header">
        <span v-for="type in (Array.isArray(tech.type) ? tech.type : [tech.type])" 
              :key="type" 
              class="type-dot" 
              :class="type"
        ></span>
        <span class="tech-title">{{ tech.naam }}</span>
      </div>
      <div v-if="tech.note" class="tech-note">{{ tech.note }}</div>
      <div class="tech-omschrijving">{{ tech.omschrijving }}</div>
      <div class="tech-links">
        <a v-if="tech.links && tech.links.website" :href="tech.links.website" target="_blank" title="Website" class="icon-link">
            <span v-html="circleIcon" /> &nbsp;
            <span>Officiele website</span>
        </a>
        <a v-if="tech.links && tech.links.documentatie" :href="tech.links.documentatie" target="_blank" title="Documentatie" class="icon-link">
            <span v-html="documentIcon" /> &nbsp;
            <span>Documentatie</span>
        </a>
      </div>
      <div v-if="tech.links && tech.links.tutorials && tech.links.tutorials.length" class="tech-tutorials">
        <span class="tutorials-label">Handige links:</span>
        <ul class="tutorials-list">
          <li v-for="(tut, i) in tech.links.tutorials" :key="i">
            <a v-if="tut.url" :href="tut.url" target="_blank">{{ tut.title || tut.url }}</a>
            <span v-else>{{ tut.title || 'Onbekende tutorial' }}</span>
          </li>
        </ul>
      </div>
      <div v-if="tech.examples && tech.examples.length" class="tech-examples">
        <span class="examples-label">Voorbeelden:</span>
        <div class="examples-carousel">
          <a v-for="(example, index) in tech.examples" 
               :key="index" 
               :href="example.url"
               target="_blank"
               class="example-card">
            <img :src="example.image" :alt="example.title" class="example-image">
            <div class="example-title">{{ example.title }}</div>
            <div class="example-note">{{ example.note }}</div>
        </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
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

// Scroll naar het element als er een hashtag in de URL staat
onMounted(() => {
  // Wacht even tot de DOM volledig is geladen
  setTimeout(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, 100);
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
  transform-origin: center;
  will-change: transform, opacity;
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
  text-decoration: none;
  color: #444;
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

.tech-examples {
  margin-top: 1rem;
}

.examples-label {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 0.8rem;
  display: block;
}

.examples-carousel {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

.examples-carousel::-webkit-scrollbar {
  height: 6px;
}

.examples-carousel::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.examples-carousel::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.example-card {
  flex: 0 0 auto;
  width: 320px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.4s;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.example-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.example-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.example-title {
  padding: 0.8rem;
  font-weight: 600;
  font-size: 1rem;
}

.example-note {
    padding:0 0.8rem 0.8rem;
  font-size: 0.9rem;
  color: #666;
}
</style> 