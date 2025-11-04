<template>
    <AdminLayout>
        <q-page class="q-pa-md">
            <div class="text-h5 q-mb-md">Users</div>
            <q-btn color="primary" label="Add User" @click="openModal" class="q-mb-md" />
            <UserTable :users="users" />
            <UserModal v-model="showModal" @save="addUser" />
        </q-page>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../layouts/AdminLayout.vue'
import UserTable from '../components/UserTable.vue'
import UserModal from '../components/UserModal.vue'
import { ref } from 'vue'

const showModal = ref(false)
const users = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
])

const openModal = () => (showModal.value = true)

const addUser = (user) => {
    users.value.push({ id: users.value.length + 1, ...user })
}
</script>
