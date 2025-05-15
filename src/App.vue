<script setup lang="ts">
import 'normalize.css';
import { useRoute } from 'vue-router';
import menuItems from './data/menuItems.json';

const route = useRoute();
</script>

<template>
  <div id="app">
    <main>
      <router-view/>
    </main>
    <nav class="bottom-nav">
      <div class="nav-content">
        <template v-for="item in menuItems" :key="item.slug">
          <router-link :to="`/${item.slug}`" :style="{ color: route.path === `/${item.slug}` ? item.color : undefined }">
            {{ item.title }}
          </router-link>
        </template>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  height: 100vh;
  position: relative;
}

main {
  width: 100%;
  height: 100%;
}

.bottom-nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #fafbfc;
  box-shadow: 0 -2px 12px 0 rgba(0,0,0,0.07), 0 1.5px 4px 0 rgba(0,0,0,0.03);
  z-index: 100;
  padding: 0.5rem 0;
  text-align: left;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 2rem;
  text-align: center;
}

.bottom-nav a {
  font-weight: normal;
  color: inherit;
  text-decoration: none;
  padding: 10px 8px 10px 0;
  transition: color 0.2s;

  + a::before {
    content: '| ';
    display: inline-block;
    padding-right: 0.5rem;
    color: #333;
  }
}
</style>
