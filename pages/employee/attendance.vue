<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold mb-4">Attendance</h1>
    <div class="flex flex-col gap-4 items-center">
      <button class="action-btn add" @click="openScanner">
        Check In with QR Code
      </button>
      <div
        v-if="attendanceRecord"
        class="bg-green-100 text-green-800 rounded p-4 mt-4"
      >
        <div class="font-bold">Attendance Recorded!</div>
        <div>Date: {{ attendanceRecord.date }}</div>
        <div>Time: {{ attendanceRecord.time }}</div>
        <div>Location: {{ attendanceRecord.location }}</div>
      </div>
      <div v-if="error" class="bg-red-100 text-red-800 rounded p-4 mt-4">
        {{ error }}
      </div>
    </div>

    <!-- Vuetify Dialog for QR Scanner Modal -->
    <v-dialog v-model="showScanner" max-width="500">
      <template #default>
        <v-card>
          <v-card-title class="text-lg font-bold mb-4">
            Scan QR Code to Check In
          </v-card-title>
          <v-card-text>
            <div
              ref="videoContainer"
              class="w-full h-64 bg-gray-100 rounded flex items-center justify-center"
            >
              <video
                ref="video"
                class="w-full h-full object-cover rounded"
                autoplay
                muted
                playsinline
              ></video>
            </div>
            <div v-if="scanning" class="text-center mt-2 text-gray-500">
              Scanning...
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="grey-lighten-1" @click="closeScanner"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { BrowserQRCodeReader } from "@zxing/browser";

const showScanner = ref(false);
const scanning = ref(false);
const error = ref("");
const attendanceRecord = ref<any>(null);
const video = ref<HTMLVideoElement | null>(null);
const videoContainer = ref<HTMLDivElement | null>(null);
let codeReader: BrowserQRCodeReader | null = null;

function openScanner() {
  showScanner.value = true;
  error.value = "";
  startScanner();
}

function closeScanner() {
  showScanner.value = false;
  stopScanner();
}

async function startScanner() {
  scanning.value = true;
  codeReader = new BrowserQRCodeReader();
  try {
    const previewElem = video.value;
    if (!previewElem) return;
    const result = await codeReader.decodeOnceFromVideoDevice(
      undefined,
      previewElem
    );
    scanning.value = false;
    await handleScan(result.getText());
    closeScanner();
  } catch (e: any) {
    scanning.value = false;
    if (e && e.name !== "NotFoundException")
      error.value = "Failed to scan QR code.";
  }
}

function stopScanner() {
  // @ts-ignore: reset exists at runtime for BrowserQRCodeReader
  if (codeReader) {
    (codeReader as any).reset();
    codeReader = null;
  }
}

async function handleScan(qrText: string) {
  // Simulate QR code validation (e.g., QR contains today's date and branch info)
  const today = new Date().toISOString().slice(0, 10);
  if (!qrText.includes(today)) {
    error.value = "Invalid or expired QR code.";
    return;
  }
  // Get geolocation
  if (!navigator.geolocation) {
    error.value = "Geolocation not supported.";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      attendanceRecord.value = {
        date: today,
        time: new Date().toLocaleTimeString(),
        location: `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`,
      };
      error.value = "";
    },
    () => {
      error.value = "Could not get your location.";
    }
  );
}

onBeforeUnmount(() => {
  stopScanner();
});
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
  .max-w-lg {
    max-width: 100%;
    padding: 0 8px;
  }
  form {
    padding: 0;
  }
}
</style>
