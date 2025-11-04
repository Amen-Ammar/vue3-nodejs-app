<template>
    <q-dialog v-model="show">
        <q-card class="w-full max-w-md p-6">
            <h2 class="text-xl font-bold mb-4">Edit User</h2>

            <q-input v-model="form.first_name" label="First Name" outlined class="mb-3" />
            <q-input v-model="form.last_name" label="Last Name" outlined class="mb-3" />
            <q-input v-model="form.email" label="Email" type="email" outlined class="mb-3" />
            <q-select v-model="selectedRole" :options="roles" option-value="id" option-label="roleName" label="Select Role" outlined class="mb-3" />
            <q-input outlined v-model="displayJoinDate" label="Joined Date" class="mb-3" readonly>
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy v-model="calendarOpen" transition-show="scale" transition-hide="scale">
                            <q-date v-model="form.join_date" mask="YYYY-MM-DD" @update:model-value="onDateChange" />
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>

            <div class="flex justify-end gap-2 mt-4">
                <q-btn flat label="Cancel" color="gray" @click="close()" />
                <q-btn color="primary" label="Save" @click="submit()" />
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
const form = ref({})
const selectedRole = ref(null)
const roles = ref([])
const calendarOpen = ref(false)
const displayJoinDate = ref('')

const userStore = useUserStore()
const roleStore = useRoleStore()

onMounted(async () => {
    await roleStore.fetchRoles()
    roles.value = roleStore.roles
})

const onDateChange = (val) => {
    form.value.join_date = val
    displayJoinDate.value = val ? moment.utc(val, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
}

const open = (user) => {
    form.value = { ...user }
    selectedRole.value = user.role ? user.role : null
    displayJoinDate.value = form.value.join_date
        ? moment.utc(form.value.join_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
        : ''
    calendarOpen.value = false
    show.value = true
}

const close = () => {
    show.value = false
}

const submit = async () => {
    if (!form.value.first_name || !form.value.last_name || !form.value.email || !selectedRole.value || !form.value.join_date) {
        Notify.create({
            type: 'warning',
            message: 'Please fill in all fields',
            timeout: 3000,
            position: 'top'
        })
        return
    }

    try {
        await userStore.editUser(form.value.id, { ...form.value, roleId: selectedRole.value.id })
        await userStore.getUsers()
        Notify.create({
            type: 'positive',
            message: 'User Edited Successfully',
            timeout: 5000,
            position: 'top'
        })
        close()
    } catch (err) {
        const message = err.response?.data?.result?.error || 'Failed to edit user'
        Notify.create({
            type: 'negative',
            message,
            timeout: 5000,
            position: 'top'
        })
        console.error(err)
    }
}

defineExpose({ open, close })
</script>
