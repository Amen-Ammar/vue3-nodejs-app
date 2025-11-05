<template>
    <q-dialog v-model="show">
        <q-card class="w-full max-w-md">
            <div class="q-pa-lg">
                <h2 class="text-xl font-bold mb-6">Create New User</h2>
                <div class="q-gutter-md">
                    <q-input v-model="form.first_name" label="First Name" outlined />
                    <q-input v-model="form.last_name" label="Last Name" outlined />
                    <q-input v-model="form.email" label="Email" type="email" outlined />
                    <q-input v-model="form.password" label="Password" type="password" outlined />
                    <q-select v-model="selectedRole" :options="roles" option-value="id" option-label="roleName" label="Select Role" outlined />
                    <q-input outlined v-model="displayJoinDate" label="Joined Date" readonly>
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy v-model="calendarOpen" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.join_date"
                                        @update:model-value="val => displayJoinDate = val ? moment(val, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>

                <div class="flex justify-end gap-2 mt-6">
                    <q-btn flat label="Cancel" color="gray" @click="close()" />
                    <q-btn color="primary" label="Create" @click="submit()" />
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRoleStore } from '@/stores/roleStore'
import { Notify } from 'quasar'
import moment from 'moment'

const show = ref(false)
const form = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    roleId: null,
    join_date: ''
})

const userStore = useUserStore()
const roleStore = useRoleStore()
const roles = ref([])
const selectedRole = ref(null)
const calendarOpen = ref(false)
const displayJoinDate = ref('')

onMounted(async () => {
    await roleStore.fetchRoles()
    roles.value = roleStore.roles
})

const open = () => {
    form.value = { first_name: '', last_name: '', email: '', password: '', roleId: null, join_date: '' }
    selectedRole.value = null
    show.value = true
}

const close = () => {
    show.value = false
}

const submit = async () => {
    if (!form.value.first_name || !form.value.last_name || !form.value.email || !form.value.password || !selectedRole.value || !form.value.join_date) {
        Notify.create({
            type: 'warning',
            message: 'Please fill in all fields',
            timeout: 3000,
            position: 'top-right'
        })
        return
    }

    form.value.roleId = selectedRole.value

    try {
        await userStore.createUser({ ...form.value, roleId: selectedRole.value.id })
        await userStore.getUsers()
        Notify.create({
            type: 'positive',
            message: 'User Created Successfully',
            timeout: 5000,
            position: 'top'
        })
        close()
    } catch (err) {
        const message = err.response?.data?.result?.error || 'Failed to create user'
        Notify.create({
            type: 'negative',
            message,
            timeout: 5000,
            position: 'top'
        })
    }
}

defineExpose({ open, close })
</script>
