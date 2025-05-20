<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold mb-2">Leave Management</h1>
    <button class="action-btn add mb-4" @click="openAddModal">
      <PlusIcon class="w-5 h-5" /> Add Leave
    </button>
    <div class="bg-white rounded-xl p-4 shadow">
      <v-table class="rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Leave Entitled</th>
            <th>Leave Taken</th>
            <th>Leave Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in leaves" :key="leave.id">
            <td>{{ leave.employee }}</td>
            <td>{{ leave.type }}</td>
            <td>{{ leave.start }}</td>
            <td>{{ leave.end }}</td>
            <td>
              <span :class="getStatusClass(leave.status)">{{
                leave.status
              }}</span>
            </td>
            <td>{{ getEntitled(leave.employee) }}</td>
            <td>{{ getTaken(leave.employee) }}</td>
            <td>{{ getLeaveAvailable(leave.employee) }}</td>
            <td>
              <v-btn
                color="warning"
                size="small"
                class="mr-2"
                @click="openEditModal(leave)"
                variant="elevated"
              >
                <PencilIcon class="w-4 h-4 mr-1" /> Edit
              </v-btn>
              <v-btn
                color="error"
                size="small"
                class="mr-2"
                @click="openDeleteModal(leave)"
                variant="elevated"
              >
                <TrashIcon class="w-4 h-4 mr-1" /> Delete
              </v-btn>
              <v-btn
                color="primary"
                size="small"
                @click="showEmployeeLeaves(leave.employee)"
                variant="elevated"
              >
                View All
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <!-- Add/Edit Modal -->
    <v-dialog v-model="showModal" max-width="600">
      <v-card>
        <v-card-title class="text-lg font-bold mb-4">
          {{ isEdit ? "Edit Leave" : "Add Leave" }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="isEdit ? updateLeave() : addLeave()">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalData.employee"
                  label="Employee"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="modalData.type" label="Type" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalData.start"
                  label="Start"
                  type="date"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="modalData.end"
                  label="End"
                  type="date"
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
        <v-card-title class="text-lg font-bold mb-4">Delete Leave</v-card-title>
        <v-card-text>
          Are you sure you want to delete
          <strong>{{ modalData.employee }}</strong
          >'s leave ({{ modalData.type }})?
        </v-card-text>
        <v-card-actions class="justify-end mt-4">
          <v-btn text @click="closeDeleteModal">Cancel</v-btn>
          <v-btn color="error" @click="deleteLeave">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Employee Leave Days Modal -->
    <v-dialog v-model="showEmployeeLeavesModal" max-width="600">
      <v-card>
        <v-card-title class="text-lg font-bold mb-4"
          >Leave Days for {{ selectedEmployeeName }}</v-card-title
        >
        <v-card-text>
          <div v-if="employeeLeaves.length === 0" class="text-gray-500">
            No leave records found.
          </div>
          <v-table v-else>
            <thead>
              <tr>
                <th>Type</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="l in employeeLeaves" :key="l.id">
                <td>{{ l.type }}</td>
                <td>{{ l.start }}</td>
                <td>{{ l.end }}</td>
                <td>{{ l.status }}</td>
                <td>{{ calcLeaveDays(l.start, l.end) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions class="justify-end mt-4">
          <v-btn text @click="closeEmployeeLeavesModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { PencilIcon, TrashIcon, PlusIcon } from "vue-tabler-icons";

const leaves = ref([
  {
    id: 1,
    employee: "Chris A.",
    type: "Annual",
    start: "2025-05-01",
    end: "2025-05-05",
    status: "Approved",
  },
  {
    id: 2,
    employee: "Ama Mensah",
    type: "Sick",
    start: "2025-04-10",
    end: "2025-04-12",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Chris A.",
    type: "Casual",
    start: "2025-03-15",
    end: "2025-03-16",
    status: "Rejected",
  },
  {
    id: 4,
    employee: "Ama Mensah",
    type: "Annual",
    start: "2025-02-01",
    end: "2025-02-10",
    status: "Approved",
  },
  {
    id: 5,
    employee: "Chris A.",
    type: "Sick",
    start: "2025-01-20",
    end: "2025-01-22",
    status: "Approved",
  },
  {
    id: 6,
    employee: "Ama Mensah",
    type: "Casual",
    start: "2025-05-10",
    end: "2025-05-12",
    status: "Pending",
  },
]);

const showModal = ref(false);
const showDeleteModal = ref(false);
const showEmployeeLeavesModal = ref(false);
const isEdit = ref(false);
const modalData = reactive({
  id: null as number | null,
  employee: "",
  type: "",
  start: "",
  end: "",
  status: "Pending",
});
const selectedEmployeeName = ref("");
const employeeLeaves = ref<any[]>([]);

// Define leave entitlements by rank/role
const leaveEntitlements: Record<string, number> = {
  "Branch Manager": 30,
  "Relationship Officer": 25,
  Clerk: 20,
  Teller: 18,
  Default: 15,
};

// Example employees with roles/ranks
const employees = [
  { id: 1, name: "Chris A.", role: "Branch Manager" },
  { id: 2, name: "Ama Mensah", role: "Relationship Officer" },
  // ...add more as needed
];

// Track leave taken per employee (by employee id)
const leaveTaken = ref<Record<number, number>>({});

function openAddModal() {
  isEdit.value = false;
  Object.assign(modalData, {
    id: null,
    employee: "",
    type: "",
    start: "",
    end: "",
    status: "Pending",
  });
  showModal.value = true;
}

function openEditModal(leave: any) {
  isEdit.value = true;
  Object.assign(modalData, leave);
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function addLeave() {
  const emp = employees.find((e) => e.name === modalData.employee);
  if (emp) {
    const days = calcLeaveDays(modalData.start, modalData.end);
    const entitled =
      leaveEntitlements[emp.role] || leaveEntitlements["Default"];
    const taken = leaveTaken.value[emp.id] || 0;
    const available = entitled - taken;
    if (days > available) {
      window.alert("Cannot approve leave: not enough available leave days.");
      return;
    }
    leaveTaken.value[emp.id] = taken + days;
  }
  leaves.value.push({
    id: Date.now(),
    employee: modalData.employee,
    type: modalData.type,
    start: modalData.start,
    end: modalData.end,
    status: modalData.status,
  });
  closeModal();
}

function updateLeave() {
  const idx = leaves.value.findIndex((l) => l.id === modalData.id);
  if (idx !== -1) {
    const emp = employees.find((e) => e.name === modalData.employee);
    if (emp) {
      const days = calcLeaveDays(modalData.start, modalData.end);
      const entitled =
        leaveEntitlements[emp.role] || leaveEntitlements["Default"];
      const taken = leaveTaken.value[emp.id] || 0;
      const available = entitled - taken;
      if (days > available) {
        window.alert("Cannot approve leave: not enough available leave days.");
        return;
      }
    }
    leaves.value[idx] = {
      id: modalData.id as number,
      employee: modalData.employee,
      type: modalData.type,
      start: modalData.start,
      end: modalData.end,
      status: modalData.status,
    };
  }
  closeModal();
}

function openDeleteModal(leave: any) {
  Object.assign(modalData, leave);
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}

function deleteLeave() {
  const idx = leaves.value.findIndex((l) => l.id === modalData.id);
  if (idx !== -1) {
    const emp = employees.find((e) => e.name === leaves.value[idx].employee);
    if (emp) {
      const days = calcLeaveDays(
        leaves.value[idx].start,
        leaves.value[idx].end
      );
      leaveTaken.value[emp.id] = (leaveTaken.value[emp.id] || 0) - days;
    }
    leaves.value.splice(idx, 1);
  }
  closeDeleteModal();
}

function showEmployeeLeaves(employeeName: string) {
  selectedEmployeeName.value = employeeName;
  const emp = employees.find((e) => e.name === employeeName);
  if (emp) {
    employeeLeaves.value = leaves.value.filter(
      (l) => l.employee === employeeName
    );
  }
  showEmployeeLeavesModal.value = true;
}

function closeEmployeeLeavesModal() {
  showEmployeeLeavesModal.value = false;
  employeeLeaves.value = [];
}

// Utility functions
function calcLeaveDays(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  return dayDiff;
}

function getEntitled(employeeName: string) {
  const emp = employees.find((e) => e.name === employeeName);
  return emp ? leaveEntitlements[emp.role] || leaveEntitlements["Default"] : 0;
}

function getTaken(employeeName: string) {
  const emp = employees.find((e) => e.name === employeeName);
  return emp ? leaveTaken.value[emp.id] || 0 : 0;
}

function getLeaveAvailable(employeeName: string) {
  const emp = employees.find((e) => e.name === employeeName);
  if (emp) {
    const entitled =
      leaveEntitlements[emp.role] || leaveEntitlements["Default"];
    const taken = leaveTaken.value[emp.id] || 0;
    return entitled - taken;
  }
  return 0;
}

function getStatusClass(status: string) {
  switch (status) {
    case "Approved":
      return "text-green-500";
    case "Pending":
      return "text-yellow-500";
    case "Rejected":
      return "text-red-500";
    default:
      return "";
  }
}
</script>

<style scoped>
.action-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 0.375rem;
}
.action-btn.add {
  background: #2563eb;
  color: #fff;
}
.action-btn.edit {
  background: #fbbf24;
  color: #fff;
}
.action-btn.delete {
  background: #ef4444;
  color: #fff;
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
