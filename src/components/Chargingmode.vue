<template>
  <div class="chargepilemode">
    <div>
      <img
        src="../assets/img/Schdule_On.png"
        alt=""
        style="vertical-align: middle; cursor: pointer"
        v-if="isScheduleTask"
        @click="changeinfodialog(true)"
      />
      <span style="vertical-align: middle">
        {{ $t("ChargingmodePage." + getchargepilemode) }}
      </span>
    </div>
  </div>
  <div class="mainwrap">
    <div class="batterywrap">
      <div class="batterycontainer">
        <div class="batteryoverflow">
          <div
            class="batterycontent"
            :class="{ startmode: getRemoteStopCharge }"
          ></div>
        </div>
      </div>
    </div>
    <div>
      <div class="container">
        <div class="chargingwrap mg18">
          <div class="txtwrap">
            <div class="circle"></div>
            <div class="txt">{{ $t("ChargingmodePage.I") }}</div>
          </div>
          <div class="txtbottom">
            <div class="txtlen">{{ chargingdata.aval }}</div>
            <span>A</span>
          </div>
        </div>
        <div class="chargingwrap">
          <div class="txtwrap">
            <div class="circle"></div>
            <div class="txt">{{ $t("ChargingmodePage.V") }}</div>
          </div>
          <div class="txtbottom">
            <div class="txtlen">{{ chargingdata.vval }}</div>
            <span>V</span>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="chargingwrap mg18">
          <div class="txtwrap">
            <div class="circle"></div>
            <div class="txt">{{ $t("ChargingmodePage.P") }}</div>
          </div>
          <div class="txtbottom">
            <div class="txtlen">{{ chargingdata.kwval }}</div>
            <span>kw</span>
          </div>
        </div>
        <div class="chargingwrap">
          <div class="txtwrap">
            <div class="circle"></div>
            <div class="txt">{{ $t("ChargingmodePage.TPC") }}</div>
          </div>
          <div class="txtbottom">
            <div class="txtlen">{{ chargingdata.kwhval }}</div>
            <span>kwh</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chargingbottomwrap">
      <div class="txtwrap">
        <div class="circle"></div>
        <div class="txt">{{ $t("ChargingmodePage.Times") }}</div>
      </div>
      <div class="txtbottom timetxt">
        <div class="timewrap">
          {{ timesval.hour }}
          <span style="margin: 0px 10px 0px 5px">hrs</span>{{ timesval.min }}
          <span style="margin: 0px 10px 0px 5px">mins</span>
        </div>
        <div class="timewrap">
          {{ timesval.sec }}
          <span style="margin: 0px 10px 0px 5px" s>secs</span>
        </div>
      </div>
    </div>
  </div>
  <div
    class="chargebt"
    @click="changemode('finish')"
    v-if="getRemoteStopCharge"
  >
    {{ $t("ChargingmodePage.Stop") }}
  </div>
  <div
    class="chargebt"
    v-if="getRemoteStartCharge"
    @click="goto('Rfidloading')"
  >
    {{ $t("ChargingmodePage.Remote") }}
  </div>

  <v-dialog v-model="infodialog" persistent width="auto" class="infodialog">
    <div class="infotitlewrap">
      <div class="titlewrap">
        <div class="title">
          {{ $t("ChargingmodePage.info") }}
        </div>
        <div>
          <img src="../assets/img/Close.png" @click="changeinfodialog(false)" />
        </div>
      </div>
      <div class="curinforesult">
        <div>
          <span>{{ $t("ChargingmodePage.ScheduleTitle") }} : </span>
          {{ ScheduleTaskTitle }}
        </div>
        <br />
        <div>
          <span>{{ $t("ChargingmodePage.StartTime") }} : </span>{{ Startinfo }}
        </div>
        <br />
        <div>
          <span>{{ $t("ChargingmodePage.StopTime") }} : </span>{{ Endinfo }}
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { chargePileOperationStore } from "@/stores/chargePileOperation";
import { reverseStore } from "@/stores/reverse";
import { ResultStore } from "@/stores/result";
import _ from "lodash";
import {
  ref,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  computed,
  reactive,
} from "vue";
const router = useRouter();
const resultStore = ResultStore();
const TimeData = ref(null);
const chargeTimeData = ref(null);
const chargeTimeStrart = ref(null);
const isScheduleTask = ref(false);
const infodialog = ref(false);
const instance = getCurrentInstance();
const Startinfo = ref(null);
const Endinfo = ref(null);
const ScheduleTaskTitle = ref(null);
const proxy = instance?.proxy;
let chargingdata = ref({
  aval: 0,
  kwhval: 0,
  kwval: 0,
  vval: 0,
});

const timesval = ref({
  hour: 0,
  min: 0,
  sec: 0,
});

const changemode = function (val) {
  const mainstore = useMainStore();
  let chargePile = chargePileOperationStore();
  mainstore.apibusy = true;
  chargePile
    .RemoteStopTransaction(proxy)
    .then((res) => {
      let data = JSON.parse(res.data);
      if (data.apiResult.status == "Accepted") {
        mainstore.transactionId = data.TransactionId;
        resultStore.successres();
      } else {
        resultStore.errorres("Fail");
      }
      mainstore.apibusy = false;
    })
    .catch((ex) => {
      resultStore.errorres("Fail");
      mainstore.apibusy = false;
    });
};
const goto = (val) => {
  router.push(`/${val}`);
};
const GetMeterValue = function () {
  let chargePile = chargePileOperationStore();

  chargePile.GetChargePiledata(proxy).then((res) => {
    if (res.data !== null) {
      let MeterStart = res.data.meterStart;
      chargeTimeStrart.value = res.data.startTime;
      if (res.data.meterValuesRequest != null) {
        res.data.meterValuesRequest.meterValue[0].sampledValue.forEach((e) => {
          if (e.unit == "kW") {
            chargingdata.value.kwval = e.value;
          }
          if (e.unit == "A") {
            chargingdata.value.aval = e.value;
          }
          if (e.unit == "V") {
            chargingdata.value.vval = e.value;
          }
          if (e.unit == "kWh") {
            chargingdata.value.kwhval = _.round(e.value - MeterStart, 3);
          }
        });
      }
    }
  });
};

const GetScheduleTask = function () {
  let reverse = reverseStore();

  reverse.getScheduleTask(proxy).then((res) => {
    if (res.data != null) {
      let val = res.data;
      isScheduleTask.value = true;
      let startTime = convertUtcToLocalString(val.startTime).split("T");
      let endTime = convertUtcToLocalString(val.endTime).split("T");
      ScheduleTaskTitle.value = val.title;
      Startinfo.value = `${startTime[0]} ${startTime[1]}`;
      Endinfo.value = `${endTime[0]} ${endTime[1]}`;
    }
  });
};

onMounted(() => {
  GetScheduleTask();
  const mainstore = useMainStore();
  if (mainstore.chargepilemode == "Charging") {
    GetMeterValue();
  }
  TimeData.value = setInterval(function () {
    const mainstore = useMainStore();
    if (mainstore.chargepilemode == "Charging") {
      GetMeterValue();
    } else {
      chargingdata.value = {
        aval: 0,
        kwhval: 0,
        kwval: 0,
        vval: 0,
      };
    }
  }, 3000);

  chargeTimeData.value = setInterval(function () {
    chargeTime();
  }, 1000);
});

const chargeTime = function () {
  const mainstore = useMainStore();

  if (mainstore.chargepilemode === "Charging") {
    if (chargeTimeStrart.value != null) {
      const chargeTime = new Date(chargeTimeStrart.value);
      const now = new Date();

      // ✅ 加入合法日期檢查
      if (!isNaN(chargeTime.getTime())) {
        const Time = now - chargeTime; // 單位：毫秒
        const TimeInSeconds = Math.floor(Time / 1000); // 轉成秒

        const hour = Math.floor(TimeInSeconds / 3600);
        const min = Math.floor((TimeInSeconds % 3600) / 60);
        const sec = TimeInSeconds % 60;

        timesval.value.hour = hour;
        timesval.value.min = min;
        timesval.value.sec = sec;
      } else {
        timesval.value = {
          hour: 0,
          min: 0,
          sec: 0,
        };
      }
    }
  } else {
    timesval.value = {
      hour: 0,
      min: 0,
      sec: 0,
    };
  }
};

onUnmounted(() => {
  if (TimeData.value !== null) {
    clearInterval(TimeData.value);
    TimeData.value = null;
  }

  if (chargeTimeData.value !== null) {
    clearInterval(chargeTimeData.value);
    chargeTimeData.value = null;
  }
});

const getRemoteStopCharge = computed(() => {
  const mainstore = useMainStore();
  return mainstore.chargepilemode == "Charging" ? true : false;
});

const getRemoteStartCharge = computed(() => {
  const mainstore = useMainStore();
  return mainstore.chargepilemode == "Preparing" ? true : false;
});

const getchargepilemode = computed(() => {
  const mainstore = useMainStore();
  return mainstore.chargepilemode;
});
const changeinfodialog = (val) => {
  infodialog.value = val;
};
function convertUtcToLocalString(utcString, keepT = true) {
  if (!utcString) return "";

  // 確保格式正確，加上 Z 表示 UTC
  const input = utcString.slice(0, 19) + "Z";
  const date = new Date(input);

  if (keepT) {
    // 回傳格式：yyyy-MM-ddTHH:mm:ss（保留 T）
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  } else {
    // 回傳格式：依語系顯示的 yyyy-MM-dd HH:mm:ss（去除 T）
    const userLocale = navigator.language;
    return date
      .toLocaleString(userLocale, {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/\//g, "-")
      .replace(", ", " ");
  }
}
</script>
<style scoped>
.batterywrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 44.6px;
  flex-direction: column;
}
.batterycontainer {
  background: url("../assets/img/batterybg.png");
  height: 309.99px;
  width: 66.34px;
  gap: 0px;
  opacity: 0px;

  position: relative;
}

.batterycontainer::before {
  content: url(/src/assets/img/batterytop.png);
  display: inline-block;
  top: -20px;
  right: 50%;
  transform: translateX(50%);
  position: absolute;
}
.batteryoverflow::after {
  content: url(/src/assets/img/batterybottombg.png);
  display: inline-block;
  bottom: -10px;
  right: 0px;

  position: absolute;
}
.batteryoverflow {
  position: absolute;
  height: 300.99px;
  width: 66.34px;
  overflow: hidden;
  left: 0;
  top: 5px;
  border-radius: 25px;
}
.batterycontent {
  background: url("../assets/img/battery.png") no-repeat;
  height: 174px;
  width: 0px;
  gap: 0px;
  border-radius: 8px 0px 0px 0px;
  position: absolute;
  left: 0px;
}
.startmode {
  animation: batteryrun 1.5s infinite ease-in;
  width: 69px !important;
}
.timetxt {
  margin-top: 144px !important;
  font-size: 28px !important;
}
.infodialog {
  color: white;
}

.infodialog .infotitlewrap {
  width: 605px;
  height: 519px;
  padding: 42px 45px 42px 45px;
  border-radius: 30px;
  background: #222222cf;
  display: flex;
  flex-direction: column;
}

.infodialog .infotitlewrap .titlewrap {
  display: flex;
  align-items: center;
}
.infodialog .infotitlewrap .titlewrap img {
  cursor: pointer;
}
.infodialog .title {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-right: auto;
  padding-bottom: 10px;
  font-weight: bold;
}

@keyframes batteryrun {
  from {
    bottom: -100%;
  }

  to {
    bottom: 100%;
  }
}
.mainwrap {
  margin-left: 177px;
  display: flex;
  padding-top: 48px;
}
.chargingwrap {
  width: 217.09px;
  height: 151px;
  background: url("../assets/img/background.png");
  padding: 36px 23px 0px 23px;
}
.mg18 {
  margin-right: 18px;
  margin-bottom: 18px;
}
.circle {
  /* Ellipse 47 */

  width: 5px;
  height: 5px;

  /* E-FANer Green */
  background: #5be472;
  box-shadow: 0px 0px 4px #5be472;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  border-radius: 50%;
  margin-right: auto;
}
.txt {
  /* I */

  height: 24px;

  font-family: "SF Pro";
  font-style: normal;
  font-weight: 510;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */
  text-align: right;

  /* White */
  color: #ffffff;

  transform: matrix(1, 0, 0.01, 1, 0, 0);

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
.txtwrap {
  display: flex;
  align-items: center;
}
.txtbottom {
  color: white;
  margin-top: 17px;
  font-family: SF Pro;
  font-size: 38px;
  font-weight: 510;
  line-height: 47.73px;
  text-align: left;
}
.txtbottom span {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 23.87px;
  text-align: left;
  color: gray;
  margin-left: 5px;
}
.container {
  display: flex;
}
.chargingbottomwrap {
  width: 230px;
  height: 320px;
  gap: 0px;
  border-radius: 30px;
  border: 1px;
  background: url("../assets/img/background2.png");
  background-size: cover;
  padding: 36px 19px 0;
  margin-left: 21px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
}
.chargepilemode {
  color: white;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
}
.txtlen {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 125px;
  display: inline-block;
  vertical-align: bottom;
}
.chargebt {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
  margin-top: 100px;
  margin: 50px auto;
}
@media (max-width: 1200px) {
  .mainwrap {
    margin-left: 10vw;
  }
}
@media (max-width: 576px) {
  .mainwrap {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
  }
  .infodialog .infotitlewrap {
    width: 90vw;
    padding: 15px;
    flex-direction: column;
  }

  .batterywrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 44.6px;
    flex-direction: column;
    margin: auto 0;
    padding: 0 15px;
    margin: 0 0 5px 0;
  }
  .batterycontainer {
    background: url(/src/assets/img/phonebatterybg.png) no-repeat;
    width: 330px;
    height: 55px;
    position: relative;
    background-size: contain;
  }
  .batterycontainer::before {
    content: url(/src/assets/img/phonebatterytop.png);
    display: inline-block;
    top: 15px;
    left: 101%;
    transform: translateX(50%);
    position: absolute;
  }
  .batteryoverflow::after {
    content: url(/src/assets/img/phonebatterybottombg.png);
    display: inline-block;
    bottom: 3px;
    right: 0px;

    position: absolute;
  }
  .batteryoverflow {
    position: absolute;
    height: 55px;
    width: 100%;
    overflow: hidden;
    left: 0;
    top: 0px;
    border-radius: 25px;
  }
  .startmode {
    animation: batteryrun 1.5s infinite ease-in;
    width: 241px !important;
  }
  .batterycontent {
    background: url("../assets/img/phonebattery.png") no-repeat;
    height: 67px;
    width: 0px;
    gap: 0px;
    border-radius: 8px 0px 0px 0px;
    position: absolute;
    left: 0px;
    top: -10px;
  }
  .chargingwrap {
    width: 170px;
    background: url("../assets/img/phonebackground.png") no-repeat;
    background-size: contain;
    height: 120px;
    box-sizing: border-box;
    padding: 13px 14px 10px 14px;
    margin: 5px;
  }
  .container {
    justify-content: center;
  }
  .chargingbottomwrap {
    background: url("../assets/img/phonebackground2.png") no-repeat;
    width: 350px;
    height: 120px;
    padding: 26px 29px 20px 29px;
    margin-top: 5px;
    margin-left: 0;
  }
  .timetxt {
    margin-top: 10px !important;
  }
  @keyframes batteryrun {
    from {
      left: -100%;
    }

    to {
      left: 100%;
    }
  }
  .chargebt {
    margin: 10px auto;
  }

  .txtbottom {
    font-size: 28px;
  }
  .timewrap {
    display: inline-block;
  }

  .txtlen {
    max-width: 90px;
  }
  .chargepilemode {
    font-size: 25px;
  }
}
</style>
