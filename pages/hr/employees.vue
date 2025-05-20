<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold mb-2">Employee Management</h1>
    <v-btn color="primary" class="mb-4" @click="openAddModal">
      <PlusIcon class="w-5 h-5 mr-2" /> Add Employee
    </v-btn>
    <v-card class="bg-white rounded-xl p-4 shadow">
      <v-table>
        <thead>
          <tr class="table-header">
            <th>Name</th>
            <th>Staff ID</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id">
            <td>{{ emp.name }}</td>
            <td>{{ emp.staffId }}</td>
            <td>{{ emp.branch }}</td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.role }}</td>
            <td>{{ emp.email }}</td>
            <td>
              <span :class="getStatusClass(emp.status)">{{ emp.status }}</span>
            </td>
            <td>
              <v-btn icon color="warning" @click="openEditModal(emp)">
                <PencilIcon class="w-5 h-5" />
              </v-btn>
              <v-btn icon color="error" @click="openDeleteModal(emp)">
                <TrashIcon class="w-5 h-5" />
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Add/Edit Modal -->
    <v-dialog v-model="showModal" max-width="600">
      <v-card>
        <v-card-title class="text-lg font-bold mb-4">
          {{ isEdit ? "Edit Employee" : "Add Employee" }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="isEdit ? updateEmployee() : addEmployee()">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="modalData.name" label="Name" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalData.staffId"
                  label="Staff ID"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="modalData.branch"
                  :items="branches"
                  label="Branch"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="modalData.departmentId"
                  :items="departments"
                  item-title="name"
                  item-value="id"
                  label="Department"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="modalData.roleId"
                  :items="roles"
                  item-title="title"
                  item-value="id"
                  label="Role"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalData.email"
                  label="Email"
                  type="email"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalData.phone"
                  label="Phone"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="modalData.status"
                  :items="statusOptions"
                  label="Status"
                />
              </v-col>
            </v-row>
            <v-card-actions class="justify-end mt-4">
              <v-btn text @click="closeModal">Cancel</v-btn>
              <v-btn color="primary" type="submit">{{
                isEdit ? "Update" : "Add"
              }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Delete Modal -->
    <v-dialog v-model="showDeleteModal" max-width="400">
      <v-card>
        <v-card-title class="text-lg font-bold mb-4"
          >Delete Employee</v-card-title
        >
        <v-card-text>
          Are you sure you want to delete
          <strong>{{ modalData.name }}</strong> ({{ modalData.staffId }})?
        </v-card-text>
        <v-card-actions class="justify-end mt-4">
          <v-btn text @click="closeDeleteModal">Cancel</v-btn>
          <v-btn color="error" @click="deleteEmployee">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  UserCircleIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "vue-tabler-icons";

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
const statusOptions = ["Active", "Inactive", "Suspended"];

// Fetch departments and roles from the structure page (simulate API or shared store)
const departments = ref([
  { id: 1, name: "Retail Banking" },
  { id: 2, name: "Corporate Banking" },
]);
const roles = ref([
  { id: 1, title: "Branch Manager", departmentId: 1 },
  { id: 2, title: "Relationship Officer", departmentId: 2 },
]);

const employees = ref([
  {
    id: 1,
    name: "Ama Mensah",
    staffId: "NIB001",
    branch: "Accra Main",
    department: "Retail Banking",
    role: "Branch Manager",
    email: "ama.mensah@nibghana.com",
    phone: "+233201234567",
    status: "Active",
  },
  {
    id: 2,
    name: "Kwame Boateng",
    staffId: "NIB002",
    branch: "Kumasi",
    department: "Corporate Banking",
    role: "Relationship Officer",
    email: "kwame.boateng@nibghana.com",
    phone: "+233201234568",
    status: "Active",
  },
  {
    id: 3,
    name: "Akosua Owusu",
    staffId: "NIB003",
    branch: "Takoradi",
    department: "Retail Banking",
    role: "Branch Manager",
    email: "akosua.owusu@nibghana.com",
    phone: "+233201234569",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Yaw Mensimah",
    staffId: "NIB004",
    branch: "Tamale",
    department: "Corporate Banking",
    role: "Relationship Officer",
    email: "yaw.mensimah@nibghana.com",
    phone: "+233201234570",
    status: "Suspended",
  },
  {
    id: 5,
    name: "Efua Sarpong",
    staffId: "NIB005",
    branch: "Tema",
    department: "Retail Banking",
    role: "Branch Manager",
    email: "efua.sarpong@nibghana.com",
    phone: "+233201234571",
    status: "Active",
  },
]);

const showModal = ref(false);
const showDeleteModal = ref(false);
const isEdit = ref(false);
const modalData = reactive({
  id: null as number | null,
  name: "",
  staffId: "",
  branch: "",
  departmentId: null as number | null,
  roleId: null as number | null,
  email: "",
  phone: "",
  status: "Active",
});

function openAddModal() {
  isEdit.value = false;
  Object.assign(modalData, {
    id: null,
    name: "",
    staffId: "",
    branch: "",
    departmentId: null,
    roleId: null,
    email: "",
    phone: "",
    status: "Active",
  });
  showModal.value = true;
}

function openEditModal(emp: any) {
  isEdit.value = true;
  Object.assign(modalData, {
    ...emp,
    departmentId:
      departments.value.find((d) => d.name === emp.department)?.id ?? null,
    roleId: roles.value.find((r) => r.title === emp.role)?.id ?? null,
  });
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function addEmployee() {
  employees.value.push({
    id: Date.now(),
    name: modalData.name,
    staffId: modalData.staffId,
    branch: modalData.branch,
    department:
      departments.value.find((d) => d.id === modalData.departmentId)?.name ||
      "",
    role: roles.value.find((r) => r.id === modalData.roleId)?.title || "",
    email: modalData.email,
    phone: modalData.phone,
    status: modalData.status,
  });
  closeModal();
}

function updateEmployee() {
  const idx = employees.value.findIndex((e) => e.id === modalData.id);
  if (idx !== -1) {
    employees.value[idx] = {
      id: modalData.id as number,
      name: modalData.name,
      staffId: modalData.staffId,
      branch: modalData.branch,
      department:
        departments.value.find((d) => d.id === modalData.departmentId)?.name ||
        "",
      role: roles.value.find((r) => r.id === modalData.roleId)?.title || "",
      email: modalData.email,
      phone: modalData.phone,
      status: modalData.status,
    };
  }
  closeModal();
}

function openDeleteModal(emp: any) {
  Object.assign(modalData, emp);
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}

function deleteEmployee() {
  employees.value = employees.value.filter((e) => e.id !== modalData.id);
  closeDeleteModal();
}

function getStatusClass(status: string) {
  if (status === "Active") return "text-green-500 font-semibold";
  if (status === "Suspended") return "text-yellow-500 font-semibold";
  return "text-gray-400 font-semibold";
}
</script>

<style scoped>
.table-header {
  background: linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%);
}
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 6px;
  padding: 0.25rem 0.75rem;
  transition: background 0.2s;
}
.action-btn.edit {
  background: #fbbf24;
  color: #fff;
}
.action-btn.delete {
  background: #ef4444;
  color: #fff;
}
.action-btn.add {
  background: #2563eb;
  color: #fff;
}
.action-btn:hover {
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
