import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'fight'
  },
  {
    path: '/fight',
    name: 'fight',
    component: () => import('../views/Fight.vue')
  },
  {
    path: '/random-loot',
    name: 'loot',
    component: () => import('../views/RandomLoot.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
