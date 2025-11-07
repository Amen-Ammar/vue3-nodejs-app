import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        total: 0,
        loading: false,
        selectedUser: null,
    }),

    actions: {
        /**
         * Fetch users with pagination (server-side)
         * @param {Object} params - { page, limit }
         */
        async getUsers({ page = 1, limit = 10 } = {}) {
            this.loading = true
            try {
                const res = await api.get(`/users?page=${page}&limit=${limit}`)
                this.users = res.data.result.users;
                this.total = res.data.result.total;
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                this.loading = false;
            }
        },

        async getUserById(id) {
            try {
                const res = await api.get(`/users/${id}`)
                this.selectedUser = res.data
                return res.data.result
            } catch (err) {
                console.error('Error fetching user:', err)
            }
        },

        async createUser(payload) {
            try {
                const res = await api.post(`/users`, payload)
                return res.data.result
            } catch (err) {
                console.error('Error creating user:', err)
                throw err
            }
        },

        async editUser(id, payload) {
            try {
                const res = await api.patch(`/users/${id}`, payload)
                return res.data.result
            } catch (err) {
                console.error('Error editing user:', err)
                throw err
            }
        },

        async deleteUser(id) {
            try {
                await api.delete(`/users/${id}`)
            } catch (err) {
                console.error('Error deleting user:', err)
                throw err
            }
        },
    },
})
