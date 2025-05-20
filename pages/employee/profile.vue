<template>
  <div class="employee-profile">
    <h1 class="text-h5 font-bold mb-4">Employee Profile</h1>
    <v-skeleton-loader v-if="loading" type="card" class="mb-4" />
    <v-card v-else class="pa-4">
      <v-row align="center" class="profile-section mb-4">
        <v-col cols="auto">
          <v-avatar size="120">
            <img :src="employee.avatarUrl" alt="Profile Picture" />
          </v-avatar>
        </v-col>
        <v-col>
          <h2 class="mb-2">{{ employee.name }}</h2>
          <div class="mb-1">
            <strong>Position:</strong> {{ employee.position }}
          </div>
          <div class="mb-1"><strong>Email:</strong> {{ employee.email }}</div>
          <div class="mb-1"><strong>Phone:</strong> {{ employee.phone }}</div>
          <div class="mb-1">
            <strong>Department:</strong> {{ employee.department }}
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="profile-actions mt-4 text-right">
        <v-btn color="primary" @click="editProfile">Edit Profile</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const loading = ref(true);
const employee = ref({
  name: "",
  position: "",
  email: "",
  phone: "",
  department: "",
  avatarUrl: "",
});

function fetchEmployeeProfile() {
  setTimeout(() => {
    employee.value = {
      name: "Jane Doe",
      position: "Software Engineer",
      email: "jane.doe@example.com",
      phone: "+1 234 567 890",
      department: "Engineering",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    };
    loading.value = false;
  }, 1000);
}

function editProfile() {
  alert("Edit profile clicked!");
}

onMounted(fetchEmployeeProfile);
</script>

<style scoped>
.employee-profile {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.profile-section {
  display: flex;
  align-items: center;
  gap: 24px;
}
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
}
.profile-details h2 {
  margin: 0 0 8px 0;
}
.profile-details p {
  margin: 4px 0;
}
.profile-actions {
  margin-top: 24px;
  text-align: right;
}
@media (max-width: 768px) {
  .employee-profile {
    padding: 12px;
  }
}
</style>
