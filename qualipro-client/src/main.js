import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'

import App from './App.vue'
import router from './router'

import { Quasar, Dialog, Notify } from 'quasar'
import quasarLang from 'quasar/lang/en-US'

import './assets/main.css'

import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: { Dialog, Notify },
  lang: quasarLang,
})

app.use(createPinia())
app.use(router)

const auth = useAuthStore()
auth.loadFromStorage()

app.mount('#app')
