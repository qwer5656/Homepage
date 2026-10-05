<template>
  <div class="background">
    <div class="content">
      <div class="loadingwrap">
        <div class="loader"></div>
        <img src="../assets/img/Touch Start_On.png" alt="loading image" />
      </div>
      <div class="txt">
        {{ $t("RfidloadingPage.Startingup") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { chargePileOperationStore } from "@/stores/chargePileOperation";
import { ResultStore } from "@/stores/result";
import { useMainStore } from "@/stores/main"; 
import { onMounted, getCurrentInstance, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

// router 與組件實例
const router = useRouter();
const instance = getCurrentInstance();
const proxy = instance?.proxy;

// 狀態管理
const mainstore = useMainStore();
const result = ResultStore();
const chargePile = chargePileOperationStore();
let intervalId = null;

// 錯誤處理方法
const error = (msg = "RemoteStartTransaction Fail") => {
  clearInterval(intervalId); // ← 確保清除輪詢
  result.errorres(msg);
  router.push(`/`);
};

// 充電狀態輪詢
const checkStatus = () => {
  chargePile.GetChargePileStatus(proxy).then((res) => {
    const data = res.data;
    if (!data) {
      return;
    }
    if (data.lastStatus === "Charging") {
      clearInterval(intervalId);
      router.push(`/`);
    }
  });
};

// 初始化邏輯
onMounted(() => {
  // 延遲執行 RemoteStartTransaction
  setTimeout(() => {
    chargePile
      .RemoteStartTransaction(proxy)
      .then((res) => {
        if (res.success === true) {
          let data;

          try {
            data = JSON.parse(res.data);
          } catch (e) {
            return error("回傳資料格式錯誤");
          }

          if (data.status === "Rejected") {
            return error("啟動充電被拒絕");
          }

          // 設定逾時 10 秒返回
          setTimeout(() => {
            clearInterval(intervalId);
            router.push(`/`);
          }, 10000);

          // 每秒檢查狀態
          intervalId = setInterval(checkStatus, 1000);
        } else {
          error("RemoteStartTransaction 啟動失敗");
        }
      })
      .catch((ex) => {
        error("RemoteStartTransaction 例外錯誤");
        console.error(ex);
      });
  }, 1000);
});

// 離開前清除輪詢
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.txt {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 510;
  line-height: 22.5px;
  text-align: center;
  color: rgba(107, 107, 107, 1);
  width: 316px;
}

.background {
  background-color: #0000006e;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  z-index: 9999;
}

.content {
  width: 456px;
  height: 370px;
  border-radius: 20px;
  background: rgba(28, 28, 28, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loadingwrap {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 101px 0px 32px 0px;
}

.loadingwrap img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  width: 90px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #66ff80;
  animation: l20-1 0.8s infinite linear alternate, l20-2 1.6s infinite linear;
  position: absolute;
}

@keyframes l20-1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }
  12.5% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 0%,
      100% 0%,
      100% 0%
    );
  }
  25% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }
  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  62.5% {
    clip-path: polygon(
      50% 50%,
      100% 0,
      100% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }
  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}

@keyframes l20-2 {
  0% {
    transform: scaleY(1) rotate(0deg);
  }
  49.99% {
    transform: scaleY(1) rotate(135deg);
  }
  50% {
    transform: scaleY(-1) rotate(0deg);
  }
  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}

@media (max-width: 576px) {
  .content {
    width: 100%;
    margin: 10px;
  }
}
</style>
