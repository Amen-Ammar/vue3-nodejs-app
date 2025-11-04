<template>
  <q-dialog v-model="show" persistent>
    <q-card class="q-pa-md" style="min-width: 320px; max-width: 400px;">
      <!-- Header -->
      <q-card-section class="row items-center justify-center q-mb-md">
        <q-avatar size="80px" rounded>
          <img :src="user.avatar || 'https://ui-avatars.com/api/?name=User&background=random'" />
        </q-avatar>
      </q-card-section>

      <q-card-section class="text-center q-mb-md">
        <div class="text-h6">{{ user.first_name }} {{ user.last_name }}</div>
        <div class="text-subtitle2 text-grey-7">{{ user.email }}</div>
      </q-card-section>

      <q-separator />

      <!-- Info List -->
      <q-list bordered padding>
        <q-item>
          <q-item-section>Name</q-item-section>
          <q-item-section side>{{ user.first_name }} {{ user.last_name }}</q-item-section>
        </q-item>

        <q-item>
          <q-item-section>Email</q-item-section>
          <q-item-section side>{{ user.email }}</q-item-section>
        </q-item>

        <q-item>
          <q-item-section>Join Date</q-item-section>
          <q-item-section side>{{ user.join_date || user.createdAt }}</q-item-section>
        </q-item>

        <q-item v-if="user.role">
          <q-item-section>Role</q-item-section>
          <q-item-section side>{{ user.role.roleName }}</q-item-section>
        </q-item>
      </q-list>

      <!-- Footer -->
      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" @click="close()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
const user = ref({})

const open = (data) => {
  user.value = data
  show.value = true
}

const close = () => {
  show.value = false
}

defineExpose({ open, close })
</script>
