<template>
    <div class="bg-white shadow-md rounded-lg p-4">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Users</h2>
            <q-btn color="primary" @click="openCreateModal">
                Create User
                <font-awesome-icon class="q-ml-sm" :icon="['fas', 'plus']" />
            </q-btn>
        </div>

        <q-table flat bordered :rows="users" :columns="columns" row-key="id" :loading="loading" :pagination="pagination"
            @request="onRequest">
            <template #body-cell-avatar="props">
                <q-td class="text-center space-x-2">
                    <img :src="props.row.avatar || 'https://ui-avatars.com/api/?name=default%20avatar&background=random'"
                        class="w-10 h-10 rounded-full object-cover" />
                </q-td>
            </template>

            <template #body-cell-name="props">
                <q-td>{{ props.row.first_name }} {{ props.row.last_name }}</q-td>
            </template>

            <template #body-cell-actions="props">
                <q-td class="text-center space-x-2">
                    <q-btn dense flat round color="info" @click="openViewModal(props.row)">
                        <font-awesome-icon :icon="['fas', 'eye']" />
                    </q-btn>

                    <q-btn dense flat round color="primary" @click="openEditModal(props.row)">
                        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                    </q-btn>

                    <q-btn dense flat round color="negative" @click="deleteUser(props.row)">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </q-btn>
                </q-td>
            </template>
            <template v-slot:bottom>
                <div class="q-pa-sm row items-center">
                    <div class="col-auto row items-center q-mr-md">
                        <span class="text-subtitle2 q-mr-sm">Rows per page:</span>
                        <q-select v-model="pagination.rowsPerPage" :options="[5, 10, 20, 50]" dense outlined
                            style="width: 70px" @update:model-value="onRowsPerPageChange" />
                    </div>
                    <div class="col row justify-center">
                        <q-pagination v-model="pagination.page" :max="totalPages" boundary-numbers direction-links
                            @update:model-value="onPageChange" />
                    </div>
                </div>
            </template>
        </q-table>

        <CreateUserModal ref="createModal" @saved="refreshUsers" />
        <ViewUserModal ref="viewModal" :user="selectedUser" />
        <EditUserModal ref="editModal" :user="selectedUser" @updated="refreshUsers" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { Notify, Dialog } from 'quasar'
import CreateUserModal from '@/components/modals/CreateUserModal.vue'
import ViewUserModal from '@/components/modals/ViewUserModal.vue'
import EditUserModal from '@/components/modals/EditUserModal.vue'
import moment from 'moment'

const userStore = useUserStore()

const createModal = ref(null)
const viewModal = ref(null)
const editModal = ref(null)

const openCreateModal = () => createModal.value.open()
const openViewModal = (user) => { selectedUser.value = user; viewModal.value.open(user) }
const openEditModal = (user) => { selectedUser.value = user; editModal.value.open(user) }

const columns = [
    { name: 'avatar', label: 'Avatar', field: 'avatar', align: 'center' },
    { name: 'name', label: 'Full Name', field: row => `${row.first_name} ${row.last_name}`, align: 'left' },
    { name: 'email', label: 'Email', field: 'email', align: 'left' },
    { name: 'join_date', label: 'Join Date', field: row => row.join_date ? moment(row.join_date).format('DD/MM/YYYY') : '', align: 'left' },
    { name: 'actions', label: 'Actions', align: 'center' },
]

const selectedUser = ref(null)

const refreshUsers = () => fetchUsers(pagination.value.page, pagination.value.rowsPerPage)

const deleteUser = (user) => {
    Dialog.create({
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${user.first_name} ${user.last_name}?`,
        cancel: true,
        persistent: false,
    }).onOk(async () => {
        try {
            await userStore.deleteUser(user.id)
            Notify.create({ type: 'positive', message: 'User deleted successfully' })
            refreshUsers()
        } catch (err) {
            Notify.create({ type: 'negative', message: 'Failed to delete user' })
        }
    })
}

const pagination = ref({
    page: 1,
    rowsPerPage: 10,
    rowsNumber: userStore.total,
})

const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)

const totalPages = computed(() =>
    Math.ceil(userStore.total / pagination.value.rowsPerPage)
)

const fetchUsers = async (page = 1, limit = 10) => {
    await userStore.getUsers({ page, limit })
    pagination.value.rowsNumber = userStore.total
}

const onRequest = async (params) => {
    pagination.value.page = params.pagination.page
    pagination.value.rowsPerPage = params.pagination.rowsPerPage
    await fetchUsers(pagination.value.page, pagination.value.rowsPerPage)
}

const onPageChange = async (page) => {
    pagination.value.page = page
    await fetchUsers(page, pagination.value.rowsPerPage)
}

const onRowsPerPageChange = async () => {
    pagination.value.page = 1
    await fetchUsers(pagination.value.page, pagination.value.rowsPerPage)
}

onMounted(() => fetchUsers())
</script>
