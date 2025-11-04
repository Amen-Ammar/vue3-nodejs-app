import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'

import App from './App.vue'
import router from './router'

import quasarSetup from './quasar'

const app = createApp(App)
quasarSetup(app)

app.use(createPinia())
app.use(router)

const auth = useAuthStore()
auth.loadFromStorage()

app.mount('#app')
