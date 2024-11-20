<template>
  <q-select
    filled
    v-model="selectedOrganization"
    :options="organizationOptions"
    label="Select Organization"
    class="q-mt-md"
  />
</template>

<script setup>
import { ref } from 'vue'; // Import ref from Vue to create reactive variables

// Selected organization value
const selectedOrganization = ref('');

// Organization options for the dropdown
const organizationOptions = [
  { label: 'Doctors', value: 'doctors' },
  { label: 'Nurses', value: 'nurses' },
  { label: 'Physicians', value: 'physicians' },
];
</script>

<style scoped>
/* Optional styling */
.q-select {
  max-width: 300px;
  margin: 10px auto;
}
</style>
