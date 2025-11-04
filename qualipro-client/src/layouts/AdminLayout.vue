<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>Admin Panel</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container class="p-4 bg-grey-1">
            <slot />
        </q-page-container>
    </q-layout>
</template>
