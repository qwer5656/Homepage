<template>
  <div class="mainwrap">
    <div class="batterywrap">
      <div class="batterycontainer">
        <div class="batteryoverflow">
          <div class="batterycontent" :class="{ startmode: getmode }"></div>
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
  <div class="chargebt" @click="changemode('finish')" v-if="getmode">
    {{ $t("ChargingmodePage.Stop") }}
  </div>
  <div class="chargebt" v-if="!getmode" @click="goto('Rfidloading')">
    {{ $t("ChargingmodePage.Remote") }}
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { chargePileStore } from "@/stores/chargePile";

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
const TimeData = ref(null);
const instance = getCurrentInstance();
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
  let chargePile = chargePileStore();
  mainstore.apibusy = true;
  chargePile
    .RemoteStopTransaction(proxy)
    .then((res) => {
      let data = JSON.parse(res.data);
      if (data.apiResult.status == "Accepted") {
        mainstore.transactionId = data.TransactionId;
        mainstore.chargepilemode = val;
      }
      mainstore.apibusy = false;
    })
    .catch(() => {
      mainstore.apibusy = false;
    });
};
const goto = (val) => {
  router.push(`/${val}`);
};
const GetMeterValue = function () {
  let chargePile = chargePileStore();

  chargePile.GetChargePiledata(proxy).then((res) => {
    console.log(res.data);
    if (res.data !== null) {
      console.log(res.data);
      let Time = res.data.chargeTime;
      let hour = Math.floor(Time / 3600);
      let min = Math.floor((Time - 3600 * hour) / 60);
      let sec = Time - 3600 * hour - 60 * min;
      let MeterStart = res.data.meterStart;
      timesval.value.hour = hour;
      timesval.value.min = min;
      timesval.value.sec = sec;

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

onMounted(() => {
  const mainstore = useMainStore();
  GetMeterValue();
  TimeData.value = setInterval(function () {
    if (mainstore.chargepilemode == "charging") {
      GetMeterValue();
    }
  }, 1000);
});

onUnmounted(() => {
  if (TimeData.value !== null) {
    clearInterval(TimeData.value);
    TimeData.value = null;
  }
});

const getmode = computed(() => {
  const mainstore = useMainStore();
  return mainstore.chargepilemode == "charging" ? true : false;
});
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
  padding: 36px 29px 0px 29px;
  margin-left: 21px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
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
    padding-top: 3vh;
  }
  .batterywrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 44.6px;
    flex-direction: column;
    margin: auto 0;
    padding: 0 15px;
    margin: 0 0 10px 0;
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
    margin-top: 10px;
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
    margin: 20px auto;
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
}
</style>
