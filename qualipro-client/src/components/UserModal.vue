<template>
    <q-dialog v-model="dialogVisible">
        <q-card style="min-width: 400px;">
            <q-card-section>
                <div class="text-h6">{{ editMode ? 'Edit User' : 'Add User' }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <q-input v-model="form.name" label="Full Name" filled class="q-mb-md" />
                <q-input v-model="form.email" label="Email" filled class="q-mb-md" />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="grey" @click="closeDialog" />
                <q-btn color="primary" :label="editMode ? 'Update' : 'Save'" @click="save" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { reactive, ref, watch, computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: Boolean,
    user: {
        type: Object,
        default: null
    }
})
const emit = defineEmits(['update:modelValue', 'save'])

const dialogVisible = ref(false)
const form = reactive({
    name: '',
    email: ''
})

const editMode = computed(() => !!props.user)

watch(
    () => props.modelValue,
    (val) => {
        dialogVisible.value = val
        if (val && props.user) {
            form.name = props.user.name
            form.email = props.user.email
        } else {
            form.name = ''
            form.email = ''
        }
    },
    { immediate: true }
)

watch(dialogVisible, (val) => emit('update:modelValue', val))

const save = () => {
    emit('save', { ...form })
    dialogVisible.value = false
}

const closeDialog = () => {
    dialogVisible.value = false
}
</script>
