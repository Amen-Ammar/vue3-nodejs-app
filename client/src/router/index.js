import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import UserPage from '../pages/UserPage.vue'
import { useAuthStore } from '../stores/authStore'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  {
    path: '/users',
    component: UserPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (!auth.token && localStorage.getItem('token')) {
    auth.loadFromStorage()
  }

  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else if (to.path === '/login' && auth.token) {
    next('/users')
  } else {
    next()
  }
})

export default router
