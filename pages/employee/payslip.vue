<template>
  <div class="payslip-container">
    <h1 class="text-h5 font-bold mb-4">Employee Payslip</h1>
    <v-form class="payslip-form" @submit.prevent="fetchPayslip">
      <v-select
        v-model="selectedMonth"
        :items="months"
        item-title="text"
        item-value="value"
        label="Select Month"
        variant="outlined"
        density="comfortable"
        class="flex-grow-1"
      />
      <v-btn
        :loading="loading"
        :disabled="loading"
        color="primary"
        type="submit"
      >
        View Payslip
      </v-btn>
    </v-form>

    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

    <v-card v-if="payslip" class="payslip-details" variant="tonal">
      <v-card-title class="text-h6"
        >Payslip for {{ payslip.month }} {{ payslip.year }}</v-card-title
      >
      <v-card-text>
        <v-table>
          <tbody>
            <tr>
              <th>Employee Name</th>
              <td>{{ payslip.employeeName }}</td>
            </tr>
            <tr>
              <th>Employee ID</th>
              <td>{{ payslip.employeeId }}</td>
            </tr>
            <tr>
              <th>Basic Salary</th>
              <td>{{ currency(payslip.basicSalary) }}</td>
            </tr>
            <tr>
              <th>Allowances</th>
              <td>{{ currency(payslip.allowances) }}</td>
            </tr>
            <tr>
              <th>Net Pay</th>
              <td>
                <strong>{{ currency(payslip.netPay) }}</strong>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-btn color="primary" class="mt-4" @click="downloadPayslip"
          >Download PDF</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const months = [
  { value: "2024-06", text: "June 2024" },
  { value: "2024-05", text: "May 2024" },
  { value: "2024-04", text: "April 2024" },
  // Add more months as needed
];

const selectedMonth = ref(months[0].value);
const payslip = ref<any>(null);
const loading = ref(false);
const error = ref("");

function fetchPayslip() {
  loading.value = true;
  error.value = "";
  payslip.value = null;
  setTimeout(() => {
    if (selectedMonth.value) {
      const monthObj = months.find((m) => m.value === selectedMonth.value);
      payslip.value = {
        month: monthObj?.text.split(" ")[0],
        year: monthObj?.text.split(" ")[1],
        employeeName: "John Doe",
        employeeId: "EMP12345",
        basicSalary: 50000,
        allowances: 10000,
        deductions: 5000,
        netPay: 55000,
      };
    } else {
      error.value = "Payslip not found for the selected month.";
    }
    loading.value = false;
  }, 1000);
}

function downloadPayslip() {
  // Placeholder for PDF download logic
  alert("Payslip PDF download not implemented.");
}

function currency(value: number) {
  if (typeof value !== "number") {
    return value;
  }
  return "₦" + value.toLocaleString();
}
</script>

<style scoped>
.payslip-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #eee;
}
.payslip-form {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.payslip-details {
  margin-top: 24px;
}
@media (max-width: 768px) {
  .payslip-container {
    padding: 12px;
  }
  .payslip-details table,
  .payslip-details th,
  .payslip-details td {
    font-size: 0.95rem;
  }
}
</style>
