<template>
  <div style="padding: 0px 30px;">
    <h2 style="color: white">{{ $t("ScanQrcodepage.qrcodescan") }}</h2>
    <label for="cameraSelect" style="color: white">
      {{ $t("ScanQrcodepage.selectcamera") }} :
    </label>
    <select id="cameraSelect" v-model="selectedDeviceId" :disabled="scanning">
      <option
        v-for="device in videoInputDevices"
        :key="device.deviceId"
        :value="device.deviceId"
      >
        {{ device.label || $t("ScanQrcodepage.unknowncamera") }}
      </option>
    </select>

    <div style="margin: 10px 0">
      <button @click="startScan" :disabled="scanning" style="color: white">
        {{ $t("ScanQrcodepage.startscan") }}
      </button>
      <button @click="stopScan" :disabled="!scanning" style="color: white">
        {{ $t("ScanQrcodepage.stopscan") }}
      </button>
    </div>

    <video
      id="video"
      width="100%"
      height="300"
      style="border: 1px solid #ccc"
    ></video>

    <p style="color: white">
      <strong> {{ $t("ScanQrcodepage.scanresult") }} : </strong>
      {{ result || $t("ScanQrcodepage.noresult") }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { chargePileOperationStore } from "@/stores/chargePileOperation";
import { ResultStore } from "@/stores/result";
const result = ref("");
const scanning = ref(false);
const videoInputDevices = ref([]);
const selectedDeviceId = ref(null);
let codeReader = null;
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
onMounted(async () => {
  codeReader = new BrowserMultiFormatReader();

  try {
    // 先取得相機權限（不指定鏡頭）
    await navigator.mediaDevices.getUserMedia({ video: true });

    // 再列出所有攝影機裝置
    const devices = await codeReader.listVideoInputDevices();
    videoInputDevices.value = devices;

    if (devices.length > 0) {
      selectedDeviceId.value = devices[0].deviceId;
    }
  } catch (err) {
    console.error("取得攝影機失敗", err);
  }
});

function startScan() {
  if (!selectedDeviceId.value) {
    let str = t("ScanQrcodepage.pleaseSelectACamera");
    let Result = ResultStore();
    Result.errorres(str);
    return;
  }
  scanning.value = true;
  codeReader.decodeFromVideoDevice(
    selectedDeviceId.value,
    "video",
    (resultData, err) => {
      if (resultData) {
        result.value = resultData.getText();
        const chargePile = chargePileOperationStore();
        chargePile
          .QrcodeStartTransaction(result.value)
          .then((res) => {
            let Result = ResultStore();
            if (res.success === true) {
              let data = JSON.parse(res.data);
              if (data.status === "Rejected") {
                Result.errorres(res.message);
              } else {
                Result.successres();
              }
            } else {
              Result.errorres(res.message);
            }
          })
          .catch((ex) => {
            let Result = ResultStore();
            let str = t("ScanQrcodepage.launchFailed");
            Result.errorres(str);
          });
        stopScan();
      } else if (err && !(err instanceof NotFoundException)) {
        console.error(err);
      }
    }
  );
}

function stopScan() {
  scanning.value = false;
  if (codeReader) {
    codeReader.reset();
  }
}

onBeforeUnmount(() => {
  if (codeReader) {
    codeReader.reset();
  }
});
</script>

<style scoped>
button {
  margin-right: 10px;
}
</style>
