import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        apiUrl: 'http://localhost/api',
        user: null,
        token: null,
        loading: false,
        error: null,
    }),

    actions: {
        async login(email, password) {
            this.loading = true
            this.error = null
            try {
                const res = await axios.post(`${this.apiUrl}/login`, { email, password })
                this.user = res.data.user
                this.token = res.data.accessToken
                localStorage.setItem('token', this.token)
                localStorage.setItem('user', JSON.stringify(this.user))
                return true
            } catch (err) {
                this.error = err.response?.data?.message || 'Login failed'
                return false
            } finally {
                this.loading = false
            }
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },

        loadFromStorage() {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('user')
            if (token && user) {
                this.token = token
                this.user = JSON.parse(user)
            }
        }
    }
})
