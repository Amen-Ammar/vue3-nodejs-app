<template>
    <AuthLayout>
        <q-card class="q-pa-lg shadow-2" style="width: 400px; max-width: 90vw;">
            <q-card-section>
                <div class="text-h6 text-center">Login</div>
            </q-card-section>

            <q-card-section>
                <q-input filled v-model="email" label="Email" class="q-mb-md" />
                <q-input filled type="password" v-model="password" label="Password" class="q-mb-md" />
                <div v-if="error" class="text-negative text-caption text-center q-mt-sm">{{ error }}</div>
            </q-card-section>

            <q-card-actions align="center">
                <q-btn color="primary" label="Login" :loading="loading" @click="handleLogin" class="q-px-xl" />
            </q-card-actions>
        </q-card>
    </AuthLayout>
</template>

<script setup>
import AuthLayout from '../layouts/AuthLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const email = ref('admin@example.com')
const password = ref('admin')
const router = useRouter()
const auth = useAuthStore()
const error = ref(null)
const loading = ref(false)

const handleLogin = async () => {
    loading.value = true
    const success = await auth.login(email.value, password.value)
    loading.value = false
    if (success) {
        router.push('/users')
    } else {
        error.value = auth.error
    }
}
</script>
