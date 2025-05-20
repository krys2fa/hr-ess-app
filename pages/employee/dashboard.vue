<template>
  <div class="dashboard">
    <h1 class="text-h5 font-bold mb-4">Welcome to HR ESS Dashboard</h1>
    <v-row class="dashboard-cards" dense>
      <v-col
        v-for="item in dashboardItems"
        :key="item.title"
        cols="12"
        md="4"
        class="d-flex"
      >
        <v-card class="card flex-grow-1 d-flex align-center pa-4">
          <v-avatar class="card-icon mr-4" size="48">
            <component :is="item.icon" />
          </v-avatar>
          <div class="card-content">
            <h2 class="mb-1">{{ item.title }}</h2>
            <p class="mb-2">{{ item.description }}</p>
            <NuxtLink :to="item.link" class="card-link">
              Go to {{ item.title }}
            </NuxtLink>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  LayoutDashboardIcon,
  UserCircleIcon,
  TicketIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "vue-tabler-icons";

const dashboardItems = ref([
  {
    title: "My Profile",
    description: "View and update your personal information.",
    link: "/employee/profile",
    icon: UserCircleIcon,
  },
  {
    title: "Leave Requests",
    description: "Apply for leave and track your requests.",
    link: "/employee/leave",
    icon: TicketIcon,
  },
  {
    title: "Payslips",
    description: "Access your monthly payslips.",
    link: "/employee/payslip",
    icon: CurrencyDollarIcon,
  },
  {
    title: "Attendance",
    description: "Check in and view your attendance records.",
    link: "/employee/attendance",
    icon: CalendarIcon,
  },
  {
    title: "Dashboard",
    description: "Overview of your HR ESS activities.",
    link: "/employee/dashboard",
    icon: LayoutDashboardIcon,
  },
]);
</script>

<style scoped>
.dashboard {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}
.dashboard-cards {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  flex: 1 1 250px;
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.card-icon {
  font-size: 2.5rem;
}
.card-content h2 {
  margin: 0 0 0.5rem 0;
}
.card-link {
  color: #1976d2;
  text-decoration: underline;
  font-size: 0.95rem;
}
@media (max-width: 768px) {
  .dashboard-cards {
    flex-direction: column;
    gap: 1rem;
  }
  .card {
    min-width: 0;
    width: 100%;
    flex: 1 1 100%;
  }
}
</style>
