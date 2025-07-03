<template>
  <LicensePlate
    v-if="licensePlateshow"
    @changestatus="Changestatus"
  ></LicensePlate>
  
  <div class="licensePlateSettingwrap" v-else>
    <div>
      <!-- <div class="backicon" @click="previous()">
        <img src="../assets/img/Previous.png" alt="" />
        <span>Back</span>
      </div> -->
      <div class="container">
        <div class="content">
          <div class="switch">
            <span>{{ $t("StartModepage.licensetitle") }}</span
            ><Nswitch v-model="licensePlateswitchdata.enabled"></Nswitch>
          </div>
          <div class="explain">
            {{ $t("StartModepage.licensecontent") }}
          </div>
          <div
            class="bt"
            :class="{ btenabled: licensePlateswitchdata.enabled }"
            @click="changelicensePlateshow"
          >
            My Car License
          </div>
        </div>
        <div class="imgwrap">
          <img src="../assets/img/CarNumberEnabled.png" alt="" />
          <div
            class="phonebt bt"
            :class="{ btenabled: licensePlateswitchdata.enabled }"
            @click="changelicensePlateshow"
          >
            My Car License
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Nswitch from "./public/Nswitch.vue";
import LicensePlate from "@/components/LicensePlate.vue";
import { settingStore } from "@/stores/setting";
import { ref, watch, onBeforeMount, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const proxy = instance?.proxy;
const licensePlateswitchdata = ref({});
const licensePlateshow = ref(false);
const init=ref(false);
const changelicensePlateshow = function () {
  if (licensePlateswitchdata.value.enabled == true) {
    licensePlateshow.value = true;
  }
};

const Changestatus=function(val){
  licensePlateshow.value = val;
}

watch(
  () => licensePlateswitchdata.value.enabled,
  () => {
    if (init.value == true) {
      let setting = settingStore();
      if (licensePlateswitchdata.value.chargePointId == "") {
        setting.postapi(proxy, licensePlateswitchdata.value).then((res) => {
          licensePlateswitchdata.value = res.data;
        });
        return;
      }
      setting.putapi(proxy, licensePlateswitchdata.value).then((res) => {
        licensePlateswitchdata.value = res.data;
      });
    }
    init.value = true;
  }
);

onBeforeMount(() => {
  let setting = settingStore();
  setting.getapi(proxy, "LicensePlateSetting").then((res) => {
    licensePlateswitchdata.value = res.data;
  });
});
</script>
<style>
.licensePlateSettingwrap {
  display: flex;
  justify-content: center;
  margin-top: 101px;
}
.licensePlateSettingwrap .imgwrap img {
  width: 347.86px;
  height: 205px;
}
.licensePlateSettingwrap .backicon {
  color: white;
  cursor: pointer;
}
.licensePlateSettingwrap .backicon img {
  vertical-align: middle;
}
.licensePlateSettingwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.licensePlateSettingwrap .switch span {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-right: 22px;
}
.licensePlateSettingwrap .content {
  color: white;
}
.licensePlateSettingwrap .switch {
  display: flex;
  align-items: center;
}
.licensePlateSettingwrap .explain {
  color: rgba(107, 107, 107, 1);
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 510;
  line-height: 24.5px;
  text-align: justified;
  width: 265px;
}
.licensePlateSettingwrap .container {
  display: flex;
  width: 680px;
}
.licensePlateSettingwrap .container > div {
  flex: 1;
}
.licensePlateSettingwrap .backicon {
  margin-bottom: 101px;
}
.licensePlateSettingwrap .bt {
  /* Stop */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 93px;
  gap: 10px;

  width: 306px;
  height: 30px;

  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.41),
    inset 0px 0px 12px rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(100px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 32px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin-top: 80px;
  cursor: not-allowed;
}
.licensePlateSettingwrap .btenabled {
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  ) !important;
  color: black;
  cursor: pointer !important;
}
.licensePlateSettingwrap .phonebt {
  display: none !important;
}
@media (max-width: 576px) {
  .licensePlateSettingwrap .container {
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
  }
  .licensePlateSettingwrap .bt {
    display: none;
  }
  .licensePlateSettingwrap .explain {
    width: 100%;
  }
  .licensePlateSettingwrap {
    margin-top: 0px;
  }
  .licensePlateSettingwrap .imgwrap {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    text-align: center;
  }
  .licensePlateSettingwrap .imgwrap img {
    width: 80%;
    height: auto;
  }
  .licensePlateSettingwrap .phonebt {
    display: block !important;
    margin: 20px auto;
    text-align: center;
    height: auto;
    padding: 2px 0;
  }
}
</style>
