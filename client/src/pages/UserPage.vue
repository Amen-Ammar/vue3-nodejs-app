<template>
    <AdminLayout>
        <q-page class="q-pa-md">
            <UserTable />
        </q-page>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '../layouts/AdminLayout.vue'
import UserTable from '../components/tables/UserTable.vue'
</script>
