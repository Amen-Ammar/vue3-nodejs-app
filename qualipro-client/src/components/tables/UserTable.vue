<template>
    <div class="bg-white shadow-md rounded-lg p-4">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Users</h2>
            <q-btn color="primary" icon="fa-solid fa-plus" label="Create User" @click="$emit('create')" />
        </div>

        <q-table flat bordered :rows="users" :columns="columns" row-key="id" :loading="loading" :pagination="pagination"
            @request="onRequest">
            <template #body-cell-avatar="props">
                <q-td>
                    <img :src="props.row.avatar || 'https://ui-avatars.com/api/?name=default%20avatar&background=random'"
                        class="w-10 h-10 rounded-full object-cover" />
                </q-td>
            </template>

            <template #body-cell-name="props">
                <q-td>{{ props.row.first_name }} {{ props.row.last_name }}</q-td>
            </template>

            <template #body-cell-actions="props">
                <q-td class="text-center space-x-2">
                    <q-btn dense flat round icon="fa-solid fa-eye" color="info" @click="$emit('view', props.row)" />
                    <q-btn dense flat round icon="fa-solid fa-pen-to-square" color="primary"
                        @click="$emit('edit', props.row)" />
                    <q-btn dense flat round icon="fa-solid fa-trash" color="negative"
                        @click="$emit('delete', props.row)" />
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const columns = [
    { name: 'avatar', label: 'Avatar', field: 'avatar', align: 'center' },
    { name: 'name', label: 'Full Name', field: row => `${row.first_name} ${row.last_name}`, align: 'left' },
    { name: 'email', label: 'Email', field: 'email', align: 'left' },
    { name: 'join_date', label: 'Join Date', field: 'createdAt', align: 'left' },
    { name: 'actions', label: 'Actions', align: 'center' },
]

const pagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: userStore.total,
})

const onRequest = async (params) => {
    await userStore.getUsers({
        page: params.pagination.page,
        limit: params.pagination.rowsPerPage,
    })
    pagination.value.page = params.pagination.page
    pagination.value.rowsNumber = userStore.total
}

onMounted(() => {
    userStore.getUsers()
})

const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)
</script>
