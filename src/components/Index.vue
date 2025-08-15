<template lang="">
  <div>
    <div style="position: absolute; top: 20%; left: 20%; display: none">
      <div class="chargebt" @click="reset()" style="width: 50px; margin: 20px">
        Reset
      </div>

      <v-text-field
        label="Fill in Name"
        variant="solo"
        v-model="dataTransferMessageId"
        style="width: 200px"
      ></v-text-field>
      <div
        class="chargebt"
        @click="dataTransfer()"
        style="width: 50px; margin: 20px"
      >
        DataTransfer
      </div>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="changeAvailabilityItems"
          class="changeAvailabilityselect"
          variant="plain"
          color="#000"
          v-model="changeAvailabilityData"
        ></v-select>
      </v-col>

      <div
        class="chargebt"
        @click="ChangeConfiguration()"
        style="width: 50px; margin: 20px"
      >
        ChangeConfiguration
      </div>

      <div
        class="chargebt"
        @click="UnlockConnector()"
        style="width: 50px; margin: 20px"
      >
        UnlockConnector
      </div>
    </div>
    <Chargingmode
      v-if="getchargepilemode == 'charging' || getchargepilemode == 'preparing'"
    />
    <Finishmode v-if="getchargepilemode == 'finish'" />
    <Startmodeselect v-if="getchargepilemode == 'selectmode'" />
    <div class="headcontent" v-if="getchargepilemode == 'standby'">
      <div style="display: flex; flex-direction: column">
        <div class="contentwrap">
          <div class="contentleft">
            <!-- <div>
              <img v-if="wifi" src="../assets/img/Wifi-On.png" />
              <img v-else src="../assets/img/Wifi-Off.png" />
            </div> -->
            <!-- <div>
              <img v-if="lte" src="../assets/img/LTE-On.png" />
              <img v-else src="../assets/img/LTE-Off.png" />
            </div> -->
            <!-- <div>
              <img v-if="bluetooth" src="../assets/img/Buletooth-On.png" />
              <img v-else src="../assets/img/Buletooth-Off.png" />
            </div> -->
          </div>
          <div class="contentmid">
            <img
              :class="{ offline: !chargestauts }"
              src="../assets/img/Device.png"
              class="deviceimg"
            />
          </div>
          <!-- <div class="txt">
            <div class="timetxt">{{ Nowmonth }}</div>
            <div class="timetxt bigtxt">{{ Nowdate }}</div>
            <div class="timetxt">
              {{ Nowtime
              }}<span style="font-size: 10px; padding-left: 5px">PM</span>
            </div>
          </div> -->
        </div>

        <div class="bottomwrap">
          <div
            class="chargetxt"
            v-if="chargestauts"
          >
             {{ $t("Apppage.Header.Plug") }}
          </div>
          <!-- <div
            class="chargebt"
            v-if="getchargepileRemote"
            @click="goto('Rfidloading')"
          >
            {{ $t("Apppage.Header.Remote") }}
          </div> -->
          <!-- <div
            class="chargebt"
            v-if="chargestauts"
            @click="ChangeConfiguration()"
            style="width: 200px; margin: 20px"
          >
            ChangeConfiguration
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Chargingmode from "@/components/Chargingmode.vue";
import Finishmode from "@/components/Finishmode.vue";
import Startmodeselect from "@/components/Startmodeselect.vue";
import { useMainStore } from "@/stores/main";
import { chargePileStore } from "@/stores/chargePile";
import { ResultStore } from "@/stores/result";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, computed, getCurrentInstance } from "vue";

const dataTransferMessageId = ref("");
const instance = getCurrentInstance();
const router = useRouter();
const proxy = instance?.proxy;
const Nowtime = ref("");
const touchstart = ref(false);
const chargestauts = ref(false);
const monthNames = ref([
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]);
const Nowdate = ref("");
const Nowmonth = ref("");
const TimeData = ref("");
const wifi = ref(false);
const lte = ref(false);
const bluetooth = ref(false);
const changeAvailabilityItems = ref(["Inoperative", "Operative"]);
const changeAvailabilityData = ref("Inoperative");
onMounted(() => {
  setinit();
  TimeData.value = setInterval(function () {
    setinit();
  }, 2000);
});

onUnmounted(() => {
  if (TimeData.value !== null) {
    clearInterval(TimeData.value);
    TimeData.value = null;
  }
});
const setinit = function () {
  gettime();
  getchargepilestatus();
};

const goto = (val) => {
  router.push(`/${val}`);
};

const gettime = function () {
  let date = new Date();
  let hour = date.getHours();
  let min =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  Nowtime.value = hour + ":" + min;
  Nowdate.value = date.getDate();
  Nowmonth.value = monthNames.value[date.getMonth()];
};

const changemode = function (val) {
  const mainstore = useMainStore();
  mainstore.chargepilemode = val;
};

const getchargepilestatus = function () {
  let chargePile = chargePileStore();
  const mainstore = useMainStore();

  if (mainstore.apibusy == true) {
    return;
  }

  chargePile.GetChargePileStatus(proxy).then((res) => {
    if (res.data === null || res.data === undefined) {
      const mainstore = useMainStore();
      chargestauts.value = false;
      mainstore.chargepilemode = "standby";
      lte.value = false;
      return;
    }
    lte.value = true;
    let data = res.data;
    wifi.value = data.wifi;
    // lte.value = data.lte;
    bluetooth.value = data.bluetooth;
    if (
      data.lastStatus == "Available" &&
      mainstore.chargepilemode == "selectmode"
    ) {
      return;
    }
    if (data.lastStatus == "Finishing") {
      mainstore.chargepilemode = "finish";
    }
    if (data.lastStatus == "Charging" && mainstore.chargepilemode != "finish") {
      mainstore.chargepilemode = "charging";
    }
    if (data.lastStatus == "Preparing") {
      mainstore.chargepilemode = "preparing";
    }
    if (data.lastStatus == "Available") {
      chargestauts.value = true;
      mainstore.chargepilemode = "standby";
    }
    if (data.lastStatus == "Unavailable") {
      mainstore.chargepilemode = "standby";
      chargestauts.value = false;
    }
  });
};
const reset = function () {
  if (chargestauts.value == true) {
    let chargePile = chargePileStore();
    chargePile.Reset(proxy).then((res) => {
      console.log(res.data);
    });
  }
};

const dataTransfer = function () {
  if (chargestauts.value == true) {
    let chargePile = chargePileStore();
    let senddata = {
      VendorId: "efaner",
      MessageId: "Qrcode",
      data: "true",
    };
    chargePile.DataTransfer(proxy, senddata).then((res) => {
      let Result = ResultStore();
      let json = JSON.parse(res.data);
      let resjson = JSON.parse(json);
      if (resjson.status == "Accepted") {
        Result.successres(resjson.data);
      }
    });
  }
};

const ChangeAvailability = function () {
  let chargePile = chargePileStore();
  chargePile
    .ChangeAvailability(proxy, changeAvailabilityData.value)
    .then((res) => {
      let Result = ResultStore();
      let resjson = JSON.parse(res.data);
      if (resjson.status == "Accepted") {
        Result.successres(resjson.data);
      }
    });
};

const ChangeConfiguration = function () {
  let chargePile = chargePileStore();
  chargePile.ChangeConfiguration(proxy).then((res) => {
    console.log(res);
    let Result = ResultStore();
    let resjson = JSON.parse(res.data);
    if (resjson.status == "Accepted") {
      Result.successres(resjson.data);
    }
  });
};

const UnlockConnector = function () {
  if (chargestauts.value == true) {
    let chargePile = chargePileStore();
    chargePile.UnlockConnector(proxy).then((res) => {
     
    });
  }
};

const getchargepilemode = computed(() => {
  const mainstore = useMainStore();
  return mainstore.chargepilemode;
});

const getchargepileRemote = computed(() => {
  const mainstore = useMainStore();
  return (
    getchargepilemode.chargepilemode == "preparing" &&
    chargestauts.value == true
  );
});
</script>
<style scoped>
.changeAvailabilityselect {
  color: white;
  width: 300px;
}
.offline {
  opacity: 0.5;
}
.deviceimg {
  height: 300px;
}
.txt {
  color: white;
}
.itemswrap {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
}
.item {
  width: 48%;
  height: 100px;
  background-color: #20283d;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
}
.itemfooter {
  width: calc(96% + 4px);
}
.itemcontent {
  display: flex;
}
.iconwrap {
  font-size: 50px;
  padding-right: 20px;
}
.firsttext {
  font-size: 18px;
}
.txtwrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.iconwrap {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
}
.headcontent {
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
.fontsize {
  transform: scale(1.5);
}
.contentwrap {
  display: flex;
  align-items: center;
}
.contentleft div {
  margin: 17.5px;
}
.contentmid {
  margin: 0 80px;
}

.timetxt {
  font-family: "SF Pro";
  font-style: normal;
  font-weight: 590;
  font-size: 20px;
  line-height: 35px;
  color: #6b6b6b;
  text-align: center;
}
.bigtxt {
  font-size: 30px;
}
.chargetxt {
  font-family: "SF Pro";
  font-style: normal;
  font-weight: 510;
  font-size: 19px;
  line-height: 144%;
  text-align: center;
  color: #5be472;
  transform: matrix(1, 0, 0.01, 1, 0, 0);
  animation: slidein 1.5s infinite alternate ease-in;
}
.chargebt {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  gap: 10px;
  width: 306px;
  height: 30px;
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  );
  border-radius: 32px;
  cursor: pointer;
}
.bottomwrap {
  margin-top: 74px;
  display: flex;
  justify-content: center;
}

@keyframes slidein {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.3;
  }
}

@media (max-width: 576px) {
  .contentmid {
    margin: 0 20px;
  }
  .deviceimg {
    height: 250px;
  }
}

@media (max-height: 740px) {
}
</style>
