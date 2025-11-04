<template>
    <q-card flat bordered>
        <q-card-section>
            <div class="text-h6">Users List</div>
        </q-card-section>

        <q-separator />

        <q-table :rows="users" :columns="columns" row-key="id" flat bordered separator="cell"
            :pagination="{ rowsPerPage: 5 }">
            <template #body-cell-actions="props">
                <q-td align="center">
                    <q-btn dense flat round icon="edit" color="primary" @click="editUser(props.row)" />
                    <q-btn dense flat round icon="delete" color="negative" @click="deleteUser(props.row.id)" />
                </q-td>
            </template>
        </q-table>
    </q-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    users: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['edit', 'delete'])

const columns = [
    { name: 'id', label: 'ID', field: 'id', align: 'left' },
    { name: 'name', label: 'Name', field: 'name', align: 'left' },
    { name: 'email', label: 'Email', field: 'email', align: 'left' },
    { name: 'actions', label: 'Actions', align: 'center' }
]

const editUser = (user) => emit('edit', user)
const deleteUser = (id) => emit('delete', id)
</script>
