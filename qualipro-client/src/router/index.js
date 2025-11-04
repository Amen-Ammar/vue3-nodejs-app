import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import UserPage from '../pages/UserPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/users', component: UserPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
