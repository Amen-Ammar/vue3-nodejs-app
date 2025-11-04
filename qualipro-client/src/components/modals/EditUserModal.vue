<template>
    <q-dialog v-model="show">
        <q-card class="w-full max-w-md p-6">
            <h2 class="text-xl font-bold mb-4">Edit User</h2>

            <q-input v-model="form.first_name" label="First Name" outlined class="mb-3" />
            <q-input v-model="form.last_name" label="Last Name" outlined class="mb-3" />
            <q-input v-model="form.email" label="Email" type="email" outlined class="mb-3" />

            <q-select v-model="selectedRole" :options="roles" option-value="id" option-label="roleName"
                label="Select Role" outlined class="mb-3" />

            <div class="flex justify-end gap-2 mt-4">
                <q-btn flat label="Cancel" color="gray" @click="close" />
                <q-btn color="primary" label="Save" @click="submit" />
            </div>
        </q-card>
    </q-dialog>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRoleStore } from '@/stores/roleStore'
import { Notify } from 'quasar'

const show = ref(false)
const form = ref({})
const selectedRole = ref(null)
const roles = ref([])

const userStore = useUserStore()
const roleStore = useRoleStore()

onMounted(async () => {
    await roleStore.fetchRoles()
    roles.value = roleStore.roles
})

watch(
    () => roleStore.roles,
    (newRoles) => {
        roles.value = newRoles
    },
    { immediate: true }
)

function open(user) {
    form.value = { ...user }
    selectedRole.value = user.role ? user.role : null
    show.value = true
}

function close() {
    show.value = false
}

async function submit() {
    if (!form.value.first_name || !form.value.last_name || !form.value.email) {
        Notify.create({
            type: 'warning',
            message: 'Please fill in all fields',
            timeout: 3000,
            position: 'top'
        })
        return
    }

    if (!selectedRole.value) {
        Notify.create({
            type: 'warning',
            message: 'Please select a role',
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
        console.error(err)
    }
}

defineExpose({ open, close })
</script>
