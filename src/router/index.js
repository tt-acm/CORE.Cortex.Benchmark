import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SliderView from '../views/SliderView.vue'
import SketchView from '../views/SketchView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/slider',
    name: 'slider',
    component: SliderView
  },
  {
    path: '/sketch',
    name: 'about',
    component: SketchView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
