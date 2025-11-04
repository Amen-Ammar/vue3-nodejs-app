<template>
    <q-dialog v-model="show">
        <q-card class="w-full max-w-md p-6">
            <h2 class="text-xl font-bold mb-4">Create New User</h2>

            <q-input v-model="form.first_name" label="First Name" outlined class="mb-3" />
            <q-input v-model="form.last_name" label="Last Name" outlined class="mb-3" />
            <q-input v-model="form.email" label="Email" type="email" outlined class="mb-3" />
            <q-input v-model="form.password" label="Password" type="password" outlined class="mb-3" />

            <div class="flex justify-end gap-2 mt-4">
                <q-btn flat label="Cancel" color="gray" @click="show = false" />
                <q-btn color="primary" label="Create" @click="submit" />
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const show = ref(false)
const form = ref({ first_name: '', last_name: '', email: '', password: '' })
const userStore = useUserStore()

function open() {
    show.value = true
}

function close() {
    show.value = false
}

async function submit() {
    try {
        await userStore.createUser(form.value)
        await userStore.getUsers()
        close()
    } catch (err) {
        console.error(err)
    }
}

defineExpose({ open, close })
</script>
