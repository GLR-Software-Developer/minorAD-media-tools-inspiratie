import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import "./assets/fonts.css"

// Routes definiëren
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue')
  },
  {
    path: '/audio',
    name: 'Audio',
    component: () => import('./views/Audio.vue')
  },
  {
    path: '/visueel',
    name: 'Visueel',
    component: () => import('./views/Visueel.vue')
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('./views/Data.vue')
  }
]

// Router instantie maken
const router = createRouter({
  history: createWebHistory(),
  routes
})

// App maken en router toevoegen
const app = createApp(App)
app.use(router)
app.mount('#app')
