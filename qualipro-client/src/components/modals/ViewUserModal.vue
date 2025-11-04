<template>
    <q-dialog v-model="show">
        <q-card class="w-full max-w-md p-6">
            <h2 class="text-xl font-bold mb-4">User Details</h2>

            <div class="flex flex-col space-y-2">
                <img :src="user.avatar || 'https://via.placeholder.com/100'" class="w-24 h-24 rounded-full mx-auto" />
                <p><strong>Name:</strong> {{ user.first_name }} {{ user.last_name }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Join Date:</strong> {{ user.join_date }}</p>
            </div>

            <div class="flex justify-end mt-4">
                <q-btn flat label="Close" color="primary" @click="show = false" />
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
const user = ref({})

function open(data) {
    user.value = data
    show.value = true
}

function close() {
    show.value = false
}

defineExpose({ open, close })
</script>
