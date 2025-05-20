<template>
  <div class="space-y-4">
    <UiChildCard title="Payroll">
      <div class="mb-4">
        <BaseButtons
          :buttons="[
            {
              color: 'primary',
              icon: PlusIcon,
              text: 'Add Payroll',
              onClick: openAddModal,
            },
          ]"
        />
      </div>
      <v-table class="rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th>Name</th>
            <th>Month</th>
            <th>Gross</th>
            <th>Net</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pay in payrolls" :key="pay.id">
            <td>{{ pay.name }}</td>
            <td>{{ pay.month }}</td>
            <td>${{ pay.gross }}</td>
            <td>${{ pay.net }}</td>
            <td>
              <v-btn
                color="warning"
                size="small"
                class="mr-2"
                @click="openEditModal(pay)"
                variant="elevated"
              >
                <PencilIcon class="w-4 h-4 mr-1" /> Edit
              </v-btn>
              <v-btn
                color="error"
                size="small"
                class="mr-2"
                @click="openDeleteModal(pay)"
                variant="elevated"
              >
                <TrashIcon class="w-4 h-4 mr-1" /> Delete
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </UiChildCard>

    <!-- Add/Edit Modal -->
    <v-dialog v-model="showModal" max-width="500">
      <UiChildCard :title="isEdit ? 'Edit Payroll' : 'Add Payroll'">
        <v-form @submit.prevent="isEdit ? updatePayroll() : addPayroll()">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="modalData.name" label="Name" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="modalData.month" label="Month" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="modalData.gross"
                label="Gross"
                type="number"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="modalData.net"
                label="Net"
                type="number"
                required
              />
            </v-col>
          </v-row>
          <div class="flex justify-end mt-4">
            <BaseButtons
              :buttons="[
                { text: 'Cancel', color: 'default', onClick: closeModal },
                {
                  text: isEdit ? 'Update' : 'Add',
                  color: 'primary',
                  type: 'submit',
                },
              ]"
            />
          </div>
        </v-form>
      </UiChildCard>
    </v-dialog>

    <!-- Delete Modal -->
    <v-dialog v-model="showDeleteModal" max-width="400">
      <UiChildCard title="Delete Payroll">
        <div class="mb-4">
          Are you sure you want to delete
          <strong>{{ modalData.name }}</strong
          >'s payroll for <strong>{{ modalData.month }}</strong
          >?
        </div>
        <div class="flex justify-end mt-4">
          <BaseButtons
            :buttons="[
              { text: 'Cancel', color: 'default', onClick: closeDeleteModal },
              { text: 'Delete', color: 'error', onClick: deletePayroll },
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

const payrolls = ref([
  { id: 1, name: "Chris A.", month: "May 2025", gross: 3000, net: 2500 },
  { id: 2, name: "Ama Mensah", month: "May 2025", gross: 2800, net: 2300 },
  { id: 3, name: "Kwame B.", month: "May 2025", gross: 3200, net: 2700 },
  { id: 4, name: "Linda O.", month: "May 2025", gross: 3100, net: 2600 },
  { id: 5, name: "Yaw K.", month: "May 2025", gross: 2950, net: 2450 },
]);

const showModal = ref(false);
const showDeleteModal = ref(false);
const isEdit = ref(false);
const modalData = reactive({
  id: null as number | null,
  name: "",
  month: "",
  gross: 0,
  net: 0,
});

function openAddModal() {
  isEdit.value = false;
  Object.assign(modalData, { id: null, name: "", month: "", gross: 0, net: 0 });
  showModal.value = true;
}

function openEditModal(pay: any) {
  isEdit.value = true;
  Object.assign(modalData, pay);
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function addPayroll() {
  payrolls.value.push({
    id: Date.now(),
    name: modalData.name,
    month: modalData.month,
    gross: modalData.gross,
    net: modalData.net,
  });
  closeModal();
}

function updatePayroll() {
  const idx = payrolls.value.findIndex((p) => p.id === modalData.id);
  if (idx !== -1) {
    payrolls.value[idx] = {
      id: modalData.id as number,
      name: modalData.name,
      month: modalData.month,
      gross: modalData.gross,
      net: modalData.net,
    };
  }
  closeModal();
}

function openDeleteModal(pay: any) {
  Object.assign(modalData, pay);
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}

function deletePayroll() {
  payrolls.value = payrolls.value.filter((p) => p.id !== modalData.id);
  closeDeleteModal();
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
