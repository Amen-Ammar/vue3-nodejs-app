<template>
    <AuthLayout>
        <q-card class="w-96 p-4">
            <q-card-section>
                <div class="text-h6 text-center">Login</div>
            </q-card-section>
            <q-card-section>
                <q-input filled v-model="email" label="Email" />
                <q-input filled type="password" v-model="password" label="Password" />
            </q-card-section>
            <q-card-actions align="center">
                <q-btn color="primary" label="Login" @click="handleLogin" />
            </q-card-actions>
        </q-card>
    </AuthLayout>
</template>

<script setup>
import AuthLayout from '../layouts/AuthLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')
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
