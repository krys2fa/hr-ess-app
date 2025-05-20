<template>
  <div class="max-w-lg mx-auto">
    <h1 class="text-h5 font-bold mb-4">Apply for Leave</h1>
    <div class="mb-2 text-grey-darken-2">
      Leave available: <span class="font-semibold">{{ available }}</span> day(s)
    </div>
    <v-form @submit.prevent="submitLeave">
      <v-text-field
        v-model="form.type"
        label="Leave Type"
        class="mb-4"
        variant="outlined"
        density="comfortable"
      />
      <v-row class="mb-4" dense>
        <v-col cols="6">
          <v-text-field
            v-model="form.start"
            label="Start Date"
            type="date"
            variant="outlined"
            density="comfortable"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="form.end"
            label="End Date"
            type="date"
            variant="outlined"
            density="comfortable"
          />
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary" class="mb-2" block> Submit </v-btn>
    </v-form>
    <v-alert v-if="message" type="info" class="mt-2" variant="tonal">
      {{ message }}
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

// Simulated employee info (in a real app, get from auth/user store)
const employee = {
  name: "Chris A.",
  role: "Branch Manager",
};

// Leave entitlements by role
const leaveEntitlements: Record<string, number> = {
  "Branch Manager": 30,
  "Relationship Officer": 25,
  Clerk: 20,
  Teller: 18,
  Default: 15,
};

// Track leave taken (simulate, in real app fetch from API)
const leaveTaken = ref(5); // e.g. 5 days already taken

const form = reactive({
  type: "",
  start: "",
  end: "",
});

const message = ref("");

function calcLeaveDays(start: string, end: string) {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  return Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

const available = computed(() => {
  const entitled =
    leaveEntitlements[employee.role] || leaveEntitlements["Default"];
  return entitled - leaveTaken.value;
});

function submitLeave() {
  const days = calcLeaveDays(form.start, form.end);
  if (days <= 0) {
    message.value = "Please select a valid date range.";
    return;
  }
  if (days > available.value) {
    message.value = `You only have ${available.value} leave days available.`;
    return;
  }
  // In a real app, send request to API here
  leaveTaken.value += days;
  message.value = `Leave request for ${days} day(s) submitted!`;
  form.type = "";
  form.start = "";
  form.end = "";
}
</script>

<style scoped>
.max-w-lg {
  max-width: 32rem;
}
.font-semibold {
  font-weight: 600;
}
@media (max-width: 768px) {
  .max-w-lg {
    max-width: 100%;
    padding: 0 8px;
  }
}
</style>
