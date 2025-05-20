<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold mb-4 flex items-center gap-2">
      <LayoutDashboardIcon
        style="width: 1.5em; height: 1.5em"
        class="inline-block"
      />
      HR Admin Dashboard
    </h1>
    <v-row class="mb-6" dense>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <div class="stat-title flex items-center gap-2">
            <UserCircleIcon
              style="width: 1.2em; height: 1.2em"
              class="inline-block"
            />
            Total Employees
          </div>
          <div class="stat-value">{{ stats.totalEmployees }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <div class="stat-title flex items-center gap-2">
            <TicketIcon
              style="width: 1.2em; height: 1.2em"
              class="inline-block"
            />
            On Leave Today
          </div>
          <div class="stat-value">{{ stats.onLeaveToday }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="stat-card">
          <div class="stat-title flex items-center gap-2">
            <CalendarIcon
              style="width: 1.2em; height: 1.2em"
              class="inline-block"
            />
            Pending Leave Requests
          </div>
          <div class="stat-value">{{ stats.pendingLeaves }}</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-8" dense>
      <v-col cols="12" md="6">
        <v-card class="bg-white rounded-xl p-6 shadow">
          <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChartIcon
              style="width: 1.2em; height: 1.2em"
              class="inline-block"
            />
            Leave Requests by Status
          </h2>
          <ApexChart
            type="bar"
            height="300"
            :options="leaveStatusOptions"
            :series="leaveStatusSeries"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="bg-white rounded-xl p-6 shadow">
          <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChartIcon
              style="width: 1.2em; height: 1.2em"
              class="inline-block"
            />
            Employees by Department
          </h2>
          <ApexChart
            type="pie"
            height="300"
            :options="departmentOptions"
            :series="departmentSeries"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ApexChart from "vue3-apexcharts";
import {
  LayoutDashboardIcon,
  UserCircleIcon,
  TicketIcon,
  CalendarIcon,
  BarChartIcon,
  PieChartIcon,
} from "vue-tabler-icons";

// Simulated stats (replace with API calls in real app)
const stats = ref({
  totalEmployees: 42,
  onLeaveToday: 3,
  pendingLeaves: 5,
});

const leaveStatusOptions = {
  chart: { type: "bar", height: 300, toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 6, columnWidth: "40%" } },
  dataLabels: { enabled: false },
  xaxis: { categories: ["Approved", "Pending", "Rejected"] },
  colors: ["#22c55e", "#fbbf24", "#ef4444"],
  legend: { show: false },
};
const leaveStatusSeries = [{ name: "Requests", data: [20, 5, 2] }];

const departmentOptions = {
  chart: { type: "pie", height: 300 },
  labels: ["Retail", "Corporate", "IT", "HR", "Operations"],
  legend: { position: "bottom" },
  colors: ["#2563eb", "#f59e42", "#10b981", "#a21caf", "#f43f5e"],
};
const departmentSeries = [12, 8, 7, 6, 9];
</script>

<style scoped>
.stat-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px #e0e7ef;
  padding: 2rem 1.5rem;
  text-align: center;
}
.stat-title {
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2563eb;
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
