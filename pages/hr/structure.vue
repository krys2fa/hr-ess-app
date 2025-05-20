<template>
  <div class="space-y-8">
    <UiChildCard title="Departments, Roles & Reporting Structure">
      <!-- Departments Section -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-semibold">Departments</h2>
          <v-btn
            color="primary"
            @click="openAddDeptModal"
            size="small"
            variant="elevated"
          >
            <PlusIcon class="w-4 h-4 mr-1" /> Add Department
          </v-btn>
        </div>
        <v-table class="rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dept in departments" :key="dept.id">
              <td>{{ dept.name }}</td>
              <td>{{ dept.description }}</td>
              <td>
                <v-btn
                  color="warning"
                  size="small"
                  class="mr-2"
                  @click="openEditDeptModal(dept)"
                  variant="elevated"
                >
                  <PencilIcon class="w-4 h-4 mr-1" /> Edit
                </v-btn>
                <v-btn
                  color="error"
                  size="small"
                  @click="openDeleteDeptModal(dept)"
                  variant="elevated"
                >
                  <TrashIcon class="w-4 h-4 mr-1" /> Delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </section>
      <!-- Roles Section -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-semibold">Roles</h2>
          <v-btn
            color="primary"
            @click="openAddRoleModal"
            size="small"
            variant="elevated"
          >
            <PlusIcon class="w-4 h-4 mr-1" /> Add Role
          </v-btn>
        </div>
        <v-table class="rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <td>{{ role.title }}</td>
              <td>{{ getDeptName(role.departmentId) }}</td>
              <td>{{ role.description }}</td>
              <td>
                <v-btn
                  color="warning"
                  size="small"
                  class="mr-2"
                  @click="openEditRoleModal(role)"
                  variant="elevated"
                >
                  <PencilIcon class="w-4 h-4 mr-1" /> Edit
                </v-btn>
                <v-btn
                  color="error"
                  size="small"
                  @click="openDeleteRoleModal(role)"
                  variant="elevated"
                >
                  <TrashIcon class="w-4 h-4 mr-1" /> Delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </section>
      <!-- Reporting Structure Section -->
      <section>
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-semibold">Reporting Structure</h2>
          <v-btn
            color="primary"
            @click="openAddReportModal"
            size="small"
            variant="elevated"
          >
            <PlusIcon class="w-4 h-4 mr-1" /> Add Reporting
          </v-btn>
        </div>
        <v-table class="rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th>Role</th>
              <th>Reports To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in reporting" :key="report.id">
              <td>{{ getRoleTitle(report.roleId) }}</td>
              <td>{{ getRoleTitle(report.reportsToId) }}</td>
              <td>
                <v-btn
                  color="warning"
                  size="small"
                  class="mr-2"
                  @click="openEditReportModal(report)"
                  variant="elevated"
                >
                  <PencilIcon class="w-4 h-4 mr-1" /> Edit
                </v-btn>
                <v-btn
                  color="error"
                  size="small"
                  @click="openDeleteReportModal(report)"
                  variant="elevated"
                >
                  <TrashIcon class="w-4 h-4 mr-1" /> Delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </section>
    </UiChildCard>
    <!-- Department Modals -->
    <v-dialog v-model="showDeptModal" max-width="500">
      <UiChildCard :title="isEditDept ? 'Edit Department' : 'Add Department'">
        <v-form @submit.prevent="isEditDept ? updateDept() : addDept()">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="deptModalData.name"
                label="Name"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="deptModalData.description"
                label="Description"
              />
            </v-col>
          </v-row>
          <div class="flex justify-end mt-4">
            <BaseButtons
              :buttons="[
                { text: 'Cancel', color: 'default', onClick: closeDeptModal },
                {
                  text: isEditDept ? 'Update' : 'Add',
                  color: 'primary',
                  type: 'submit',
                },
              ]"
            />
          </div>
        </v-form>
      </UiChildCard>
    </v-dialog>
    <v-dialog v-model="showDeleteDeptModal" max-width="400">
      <UiChildCard title="Delete Department">
        <div class="mb-4">
          Are you sure you want to delete
          <strong>{{ deptModalData.name }}</strong
          >?
        </div>
        <div class="flex justify-end mt-4">
          <BaseButtons
            :buttons="[
              {
                text: 'Cancel',
                color: 'default',
                onClick: closeDeleteDeptModal,
              },
              { text: 'Delete', color: 'error', onClick: deleteDept },
            ]"
          />
        </div>
      </UiChildCard>
    </v-dialog>

    <!-- Role Modals -->
    <v-dialog v-model="showRoleModal" max-width="500">
      <UiChildCard :title="isEditRole ? 'Edit Role' : 'Add Role'">
        <v-form @submit.prevent="isEditRole ? updateRole() : addRole()">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="roleModalData.title"
                label="Title"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="roleModalData.departmentId"
                :items="
                  departments.map((d) => ({ title: d.name, value: d.id }))
                "
                label="Department"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="roleModalData.description"
                label="Description"
              />
            </v-col>
          </v-row>
          <div class="flex justify-end mt-4">
            <BaseButtons
              :buttons="[
                { text: 'Cancel', color: 'default', onClick: closeRoleModal },
                {
                  text: isEditRole ? 'Update' : 'Add',
                  color: 'primary',
                  type: 'submit',
                },
              ]"
            />
          </div>
        </v-form>
      </UiChildCard>
    </v-dialog>
    <v-dialog v-model="showDeleteRoleModal" max-width="400">
      <UiChildCard title="Delete Role">
        <div class="mb-4">
          Are you sure you want to delete
          <strong>{{ roleModalData.title }}</strong
          >?
        </div>
        <div class="flex justify-end mt-4">
          <BaseButtons
            :buttons="[
              {
                text: 'Cancel',
                color: 'default',
                onClick: closeDeleteRoleModal,
              },
              { text: 'Delete', color: 'error', onClick: deleteRole },
            ]"
          />
        </div>
      </UiChildCard>
    </v-dialog>

    <!-- Reporting Modals -->
    <v-dialog v-model="showReportModal" max-width="500">
      <UiChildCard :title="isEditReport ? 'Edit Reporting' : 'Add Reporting'">
        <v-form @submit.prevent="isEditReport ? updateReport() : addReport()">
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="reportModalData.roleId"
                :items="roles.map((r) => ({ title: r.title, value: r.id }))"
                label="Role"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="reportModalData.reportsToId"
                :items="roles.map((r) => ({ title: r.title, value: r.id }))"
                label="Reports To"
                required
              />
            </v-col>
          </v-row>
          <div class="flex justify-end mt-4">
            <BaseButtons
              :buttons="[
                { text: 'Cancel', color: 'default', onClick: closeReportModal },
                {
                  text: isEditReport ? 'Update' : 'Add',
                  color: 'primary',
                  type: 'submit',
                },
              ]"
            />
          </div>
        </v-form>
      </UiChildCard>
    </v-dialog>
    <v-dialog v-model="showDeleteReportModal" max-width="400">
      <UiChildCard title="Delete Reporting">
        <div class="mb-4">
          Are you sure you want to delete this reporting structure?
        </div>
        <div class="flex justify-end mt-4">
          <BaseButtons
            :buttons="[
              {
                text: 'Cancel',
                color: 'default',
                onClick: closeDeleteReportModal,
              },
              { text: 'Delete', color: 'error', onClick: deleteReport },
            ]"
          />
        </div>
      </UiChildCard>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { PencilIcon, TrashIcon, PlusIcon } from "vue-tabler-icons";
import UiChildCard from "@/components/shared/UiChildCard.vue";
import BaseButtons from "@/components/ui-components/button/BaseButtons.vue";

// Departments
const departments = ref([
  {
    id: 1,
    name: "Retail Banking",
    description: "Handles all retail banking operations.",
  },
  {
    id: 2,
    name: "Corporate Banking",
    description: "Manages corporate clients and services.",
  },
]);
const showDeptModal = ref(false);
const showDeleteDeptModal = ref(false);
const isEditDept = ref(false);
const deptModalData = reactive({
  id: null as number | null,
  name: "",
  description: "",
});
function openAddDeptModal() {
  isEditDept.value = false;
  Object.assign(deptModalData, { id: null, name: "", description: "" });
  showDeptModal.value = true;
}
function openEditDeptModal(dept: any) {
  isEditDept.value = true;
  Object.assign(deptModalData, dept);
  showDeptModal.value = true;
}
function closeDeptModal() {
  showDeptModal.value = false;
}
function addDept() {
  departments.value.push({
    id: Date.now(),
    name: deptModalData.name,
    description: deptModalData.description,
  });
  closeDeptModal();
}
function updateDept() {
  const idx = departments.value.findIndex((d) => d.id === deptModalData.id);
  if (idx !== -1) {
    departments.value[idx] = {
      id: deptModalData.id as number,
      name: deptModalData.name,
      description: deptModalData.description,
    };
  }
  closeDeptModal();
}
function openDeleteDeptModal(dept: any) {
  Object.assign(deptModalData, dept);
  showDeleteDeptModal.value = true;
}
function closeDeleteDeptModal() {
  showDeleteDeptModal.value = false;
}
function deleteDept() {
  departments.value = departments.value.filter(
    (d) => d.id !== deptModalData.id
  );
  closeDeleteDeptModal();
}

// Roles
const roles = ref([
  {
    id: 1,
    title: "Branch Manager",
    departmentId: 1,
    description: "Manages branch operations.",
  },
  {
    id: 2,
    title: "Relationship Officer",
    departmentId: 2,
    description: "Handles client relationships.",
  },
]);
const showRoleModal = ref(false);
const showDeleteRoleModal = ref(false);
const isEditRole = ref(false);
const roleModalData = reactive({
  id: null as number | null,
  title: "",
  departmentId: null as number | null,
  description: "",
});
function openAddRoleModal() {
  isEditRole.value = false;
  Object.assign(roleModalData, {
    id: null,
    title: "",
    departmentId: null,
    description: "",
  });
  showRoleModal.value = true;
}
function openEditRoleModal(role: any) {
  isEditRole.value = true;
  Object.assign(roleModalData, role);
  showRoleModal.value = true;
}
function closeRoleModal() {
  showRoleModal.value = false;
}
function addRole() {
  roles.value.push({
    id: Date.now(),
    title: roleModalData.title,
    departmentId: roleModalData.departmentId,
    description: roleModalData.description,
  });
  closeRoleModal();
}
function updateRole() {
  const idx = roles.value.findIndex((r) => r.id === roleModalData.id);
  if (idx !== -1) {
    roles.value[idx] = {
      id: roleModalData.id as number,
      title: roleModalData.title,
      departmentId: roleModalData.departmentId,
      description: roleModalData.description,
    };
  }
  closeRoleModal();
}
function openDeleteRoleModal(role: any) {
  Object.assign(roleModalData, role);
  showDeleteRoleModal.value = true;
}
function closeDeleteRoleModal() {
  showDeleteRoleModal.value = false;
}
function deleteRole() {
  roles.value = roles.value.filter((r) => r.id !== roleModalData.id);
  closeDeleteRoleModal();
}
function getDeptName(id: number | null) {
  const d = departments.value.find((d) => d.id === id);
  return d ? d.name : "";
}

// Reporting Structure
const reporting = ref([{ id: 1, roleId: 2, reportsToId: 1 }]);
const showReportModal = ref(false);
const showDeleteReportModal = ref(false);
const isEditReport = ref(false);
const reportModalData = reactive({
  id: null as number | null,
  roleId: null as number | null,
  reportsToId: null as number | null,
});
function openAddReportModal() {
  isEditReport.value = false;
  Object.assign(reportModalData, { id: null, roleId: null, reportsToId: null });
  showReportModal.value = true;
}
function openEditReportModal(report: any) {
  isEditReport.value = true;
  Object.assign(reportModalData, report);
  showReportModal.value = true;
}
function closeReportModal() {
  showReportModal.value = false;
}
function addReport() {
  reporting.value.push({
    id: Date.now(),
    roleId: reportModalData.roleId,
    reportsToId: reportModalData.reportsToId,
  });
  closeReportModal();
}
function updateReport() {
  const idx = reporting.value.findIndex((r) => r.id === reportModalData.id);
  if (idx !== -1) {
    reporting.value[idx] = {
      id: reportModalData.id as number,
      roleId: reportModalData.roleId,
      reportsToId: reportModalData.reportsToId,
    };
  }
  closeReportModal();
}
function openDeleteReportModal(report: any) {
  Object.assign(reportModalData, report);
  showDeleteReportModal.value = true;
}
function closeDeleteReportModal() {
  showDeleteReportModal.value = false;
}
function deleteReport() {
  reporting.value = reporting.value.filter((r) => r.id !== reportModalData.id);
  closeDeleteReportModal();
}
function getRoleTitle(id: number | null) {
  const r = roles.value.find((r) => r.id === id);
  return r ? r.title : "";
}
</script>

<style scoped>
@media (max-width: 900px) {
  .v-table th,
  .v-table td {
    padding: 8px 4px !important;
    font-size: 0.95rem;
  }
}
</style>
