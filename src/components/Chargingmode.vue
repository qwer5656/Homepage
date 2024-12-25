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
            <div class="txt">I</div>
          </div>
          <div class="txtbottom">{{ chargingdata.aval }} <span>A</span></div>
        </div>
        <div class="chargingwrap">
          <div class="txtwrap">
            <div class="circle"></div>
            <div class="txt">TPC</div>
          </div>
          <div class="txtbottom">{{ chargingdata.wval }} <span>W</span></div>
        </div>
      </div>
      <div class="container">
        <div class="chargingwrap mg18">
          <div class="txtwrap">
            <div class="circle"></div>
            <div class="txt">P</div>
          </div>
          <div class="txtbottom">{{ chargingdata.kwval }} <span>kw</span></div>
        </div>
        <div class="chargingwrap">
          <div class="txtwrap">
            <div class="circle"></div>
            <div class="txt">V</div>
          </div>
          <div class="txtbottom">{{ chargingdata.vval }} <span>V</span></div>
        </div>
      </div>
    </div>
    <div class="chargingbottomwrap">
      <div class="txtwrap">
        <div class="circle"></div>
        <div class="txt">Times</div>
      </div>
      <div class="txtbottom timetxt">
        {{ chargingdata.timesval.hour }}
        <span style="margin-right: 20px">hrs</span>{{ Math.floor(time / 60) }}
        <span>mins</span>
      </div>
    </div>
  </div>
  <div class="chargebt" @click="changemode('finish')" v-if="getmode">Stop</div>
</template>
<script>
import { useMainStore } from "@/stores/main";
import { chargePileStore } from "@/stores/chargePile";
export default {
  data() {
    return {
      TimeData: null,
      chargingdata: {
        aval: 0,
        wval: 0,
        kwval: 0,
        vval: 0,
        timesval: {
          hour: 0,
          min: 0,
        },
      },
      time: 0,
    };
  },
  methods: {
    changemode(val) {
      const mainstore = useMainStore();
      let chargePile = chargePileStore();
      chargePile.RemoteStopTransaction(this).then((res) => {
        let data=JSON.parse(res.data);
        if (data.status == "Accepted") {
          mainstore.chargepilemode = val;
        }
      });
    },
    random() {
      let self = this;
      let chargePile = chargePileStore();
      chargePile.GetChargePiledata(this).then((res) => {
        self.time++;
        if (res.data !== null) {
          res.data[0].meterValue[0].sampledValue.forEach((e) => {
            if (e.unit == "kW") {
              self.chargingdata.kwval = e.value;
            }
            if (e.unit == "A") {
              self.chargingdata.aval = e.value;
            }
            if (e.unit == "V") {
              self.chargingdata.vval = e.value;
            }
            if (e.unit == "W") {
              self.chargingdata.wval = e.value;
            }
          });
        }
      });
    },
  },
  mounted() {
    const mainstore = useMainStore();
    let self = this;
    this.TimeData = setInterval(function () {
      if (mainstore.chargepilemode == "charging") {
        self.random();
      }
    }, 3000);
  },
  beforeUnmount() {
    clearInterval(this.TimeData);
  },
  computed: {
    getmode() {
      const mainstore = useMainStore();

      return mainstore.chargepilemode == "charging" ? true : false;
    },
  },
};
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
.timetxt {
  margin-top: 184px !important;
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
  width: 69px;
  gap: 0px;
  border-radius: 8px 0px 0px 0px;
  position: absolute;
  left: 0px;
}
.startmode {
  animation: batteryrun 1.5s infinite ease-in;
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
  padding: 36px 29px 0px 29px;
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
}
.container {
  display: flex;
}
.chargingbottomwrap {
  width: 240.09px;
  height: 320px;
  gap: 0px;
  border-radius: 30px;
  border: 1px;
  opacity: 0px;
  background: url("../assets/img/background2.png");
  background-size: cover;
  padding: 36px 29px 0px 29px;
  margin-left: 21px;
}
.chargebt {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 93px;
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
  .batterycontent {
    background: url("../assets/img/phonebattery.png") no-repeat;
    height: 67px;
    width: 241px;
    gap: 0px;
    border-radius: 8px 0px 0px 0px;
    position: absolute;
    left: 0px;
    top: -10px;
    animation: batteryrun 1.5s infinite ease-in;
  }
  .chargingwrap {
    width: 170px;
    background: url("../assets/img/phonebackground.png") no-repeat;
    background-size: contain;
    height: 120px;
    box-sizing: border-box;
    padding: 16px 29px 10px 29px;
    margin: 5px;
  }
  .container {
    justify-content: center;
  }
  .chargingbottomwrap {
    background: url("../assets/img/phonebackground2.png") no-repeat;
    width: 340px;
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
}
</style>
