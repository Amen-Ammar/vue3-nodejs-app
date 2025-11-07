import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        apiUrl: 'http://localhost:3000/api',
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
                const res = await axios.post(`${this.apiUrl}/auth/login`, { email, password })
                this.user = res.data.result.user
                this.token = res.data.result.accessToken
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
            return true
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
