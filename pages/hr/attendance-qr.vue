<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold mb-4 flex items-center gap-2">
      <CalendarIcon class="inline-block" style="width: 1.5em; height: 1.5em;" />
      Generate Attendance QR Code
    </h1>
    <v-form @submit.prevent="generateQR" class="flex flex-col gap-4 max-w-md">
      <v-select
        v-model="branch"
        :items="branches"
        label="Branch"
        variant="outlined"
        density="comfortable"
        required
        prepend-inner-icon="mdi-office-building"
      />
      <v-text-field
        v-model="date"
        label="Date"
        type="date"
        variant="outlined"
        density="comfortable"
        required
        prepend-inner-icon="mdi-calendar"
      />
      <v-btn class="action-btn add self-start" color="primary" type="submit">
        <QrcodeIcon class="mr-2" style="width:1.2em;height:1.2em;" />
        Generate QR Code
      </v-btn>
    </v-form>
    <div v-if="qrValue" class="mt-6 flex flex-col items-center gap-2">
      <qrcode-vue
        :value="qrValue"
        :size="220"
        background="#fff"
        foreground="#2563eb"
      />
      <div class="text-gray-500 text-sm">
        <QrcodeIcon class="inline-block mr-1" style="width:1em;height:1em;vertical-align:middle;" />
        Scan this QR code to check in for {{ branch }} on {{ date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { CalendarIcon, QrcodeIcon } from 'vue-tabler-icons';

const branches = [
  "Accra Main",
  "Kumasi",
  "Takoradi",
  "Tamale",
  "Tema",
  "Ho",
  "Sunyani",
  "Cape Coast",
  "Koforidua",
  "Wa",
  "Bolgatanga",
  "NIB HQ",
];
const branch = ref(branches[0]);
const date = ref(new Date().toISOString().slice(0, 10));
const qrValue = ref("");

function generateQR() {
  qrValue.value = `NIB-ATTENDANCE|${branch.value}|${date.value}`;
}
</script>

<style scoped>
.action-btn.add {
  background: #2563eb;
  color: #fff;
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.action-btn.add:hover {
  filter: brightness(0.95);
}
@media (max-width: 768px) {
  .space-y-4,
  .space-y-6 {
    padding: 0 8px;
  }
  .grid {
    grid-template-columns: 1fr !important;
    gap: 0.5rem;
  }
  .flex {
    flex-direction: column;
    gap: 0.5rem;
  }
  .rounded-xl,
  .rounded-lg {
    border-radius: 0.5rem;
  }
}
</style>
