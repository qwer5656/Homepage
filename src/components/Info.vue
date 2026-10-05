<template>
  <div class="infowrap" v-if="isReady">
    <div class="info-container">
      <h2 class="info-title">{{ $t("InfoPage.title") }}</h2>
      <p class="info-subtitle">{{ $t("InfoPage.subtitle") }}</p>

      <div class="info-grid">
        <div class="info-card">
          <h3>{{ $t("InfoPage.deviceSerial") }}</h3>
          <p>{{ data.chargePointSerialNumber }}</p>
        </div>

        <div class="info-card">
          <h3>
            {{ $t("InfoPage.firmwareversion") }} (
            {{ canUpdate ? $t("InfoPage.canUpdate") : $t("InfoPage.isLatest") }}
            )
          </h3>

          <p>{{ $t("InfoPage.currentVersion") }}{{ data.firmwareVersion }}</p>

          <p v-if="canUpdate">
            {{ $t("InfoPage.latestVersion") }}{{ data.latestVersion }}
            <span class="fw-status" :class="canUpdate ? 'ok' : 'update'">
            </span>
          </p>
        </div>

        <div class="info-card">
          <h3>{{ $t("InfoPage.deviceStatus") }}</h3>
          <p>
            {{
              data.isOnline == false
                ? $t("InfoPage.offline")
                : $t("InfoPage." + data.lastStatus)
            }}
          </p>
        </div>
      </div>
      <button class="update-btn" :disabled="!canUpdate" @click="UpdateFireware">
        {{ $t("InfoPage.updateFirmware") }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { chargePointStore } from "@/stores/chargePoint";
import { chargePileOperationStore } from "@/stores/chargePileOperation";
import { ResultStore } from "@/stores/result";
const isReady = ref(false);
let timer = null;

const data = ref("");

const canUpdate = computed(() => {
  const parseVersion = (v) => {
    if (!v) return [0];

    return v
      .replace(/^V/i, "")
      .trim()
      .split(".")
      .map((x) => parseInt(x, 10) || 0);
  };

  const current = parseVersion(data.value?.firmwareVersion);
  const latest = parseVersion(data.value?.latestVersion);

  console.log("current", current);
  console.log("latest", latest);

  const maxLength = Math.max(current.length, latest.length);

  for (let i = 0; i < maxLength; i++) {
    const c = current[i] ?? 0;
    const l = latest[i] ?? 0;

    if (c < l) return true;
    if (c > l) return false;
  }

  return false;
});
const UpdateFireware = () => {
  let chargePile = chargePileOperationStore();
  chargePile.ClientUpdateFirmware().then((res) => {
    try {
      let result = JSON.parse(res.data);
      let ResultDialog = ResultStore();
      if (result.status === "success") {
        ResultDialog.successres();
      } else {
        ResultDialog.errorres(result.message);
      }
    } catch (e) {
      let ResultDialog = ResultStore();
      if(data.value.isOnline == false){
        ResultDialog.errorres("Device offline, Unable to Update");
        return;
      }
      ResultDialog.errorres(res.data);
    }
  });
};

const getData = async () => {
  let chargePoint = chargePointStore();
  let token = JSON.parse(localStorage.getItem("token"));

  const res = await chargePoint.GetClientChargePoint(token);
  data.value = res.data;
};

onMounted(async () => {
  await getData(); // ⭐關鍵：先等第一筆資料

  isReady.value = true; // 👉 確保 data 已存在才顯示畫面

  timer = setInterval(() => {
    getData();
  }, 10000);
});
onUnmounted(() => {
  // 離開頁面清除計時器
  clearInterval(timer);
});
</script>
<style scoped>
.infowrap {
  background: linear-gradient(180deg, #0f0f10, #1c1c1e);
  padding: 40px 20px;
  border-radius: 24px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0 30px;
}

.info-container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.info-title {
  color: #f5f5f7;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 16px;
}

.info-subtitle {
  color: #a1a1a6;
  font-size: 18px;
  margin-bottom: 50px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  text-align: left;
}

.info-card {
  background: #2c2c2e;
  padding: 20px;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  background: #3a3a3c;
}

.info-card h3 {
  color: #f5f5f7;
  font-size: 18px;
  margin-bottom: 8px;
}

.info-card p {
  color: #d1d1d6;
  font-size: 16px;
}

.status-ok {
  color: #4cd964;
  font-weight: 500;
}
.update-btn {
  display: inline-block;
  margin-top: 50px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(135deg, #0a84ff, #0066ff);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.update-btn:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, #339cff, #0a84ff);
}

.update-btn:active {
  transform: scale(0.98);
}

.update-btn:disabled {
  background: #3a3a3c;
  color: #8e8e93;
  cursor: not-allowed;
}
@media (max-width: 576px) {
  .info-title {
    font-size: 26px;
  }

  .info-subtitle {
    font-size: 16px;
  }
  .info-card h3 {
    font-size: 12px;
  }
  .info-grid {
    gap: 20px;
  }
  .update-btn {
    margin-top: 20px;
  }
}
</style>
