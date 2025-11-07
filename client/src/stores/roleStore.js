import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useRoleStore = defineStore('roleStore', {
    state: () => ({
        roles: [],
        loading: false,
    }),

    actions: {
        async fetchRoles() {
            this.loading = true
            try {
                const res = await api.get('/roles')
                this.roles = res.data.result
            } catch (err) {
                console.error('Failed to fetch roles:', err)
            } finally {
                this.loading = false
            }
        }
    },
})
