<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>Admin Panel</q-toolbar-title>
                <q-btn flat icon="logout" label="Logout" color="negative" @click="logout()" class="q-ml-auto" />
            </q-toolbar>
        </q-header>

        <q-page-container class="p-4 bg-grey-1">
            <slot />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()

const router = useRouter()

const logout = async () => {
    const success = await auth.logout()
    if (success) {
    Notify.create({
        type: 'positive',
        message: 'Logged out successfully',
        timeout: 3000
    })
        router.push('/login')
    } else {
        error.value = auth.error
    }
}
</script>