<template lang="">
  <div>
    <Chargingmode v-if="getchargepilemode == 'charging'" />
    <Finishmode v-if="getchargepilemode == 'finish'" />
    <div class="headcontent" v-if="getchargepilemode == 'standby'">
      <div style="display: flex; flex-direction: column">
        <div class="contentwrap">
          <div class="contentleft">
            <div><img src="../assets/img/Buletooth-Off.png" /></div>
            <div><img src="../assets/img/Buletooth-On.png" /></div>
          </div>
          <div class="contentmid">
            <img src="../assets/img/Device.png" style="height: 300px" />
          </div>
          <div class="txt">
            <div class="timetxt">{{ Nowmonth }}</div>
            <div class="timetxt bigtxt">{{ Nowdate }}</div>
            <div class="timetxt">
              {{ Nowtime
              }}<span style="font-size: 10px; padding-left: 5px">PM</span>
            </div>
          </div>
        </div>
        <div class="bottomwrap">
          <div
            class="chargetxt"
            v-if="!touchstart"
            @click="changemode('charging')"
          >
            Plug and charge
          </div>
          <div class="chargebt" v-if="touchstart">Start Charging</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mdiTimerOutline,
  mdiLightningBolt,
  mdiSineWave,
  mdiBatteryCharging,
  mdiCar,
} from "@mdi/js";

import Chargingmode from "@/components/Chargingmode.vue";
import Finishmode from "@/components/Finishmode.vue";
import { useMainStore } from "@/stores/main";
export default {
  name: "App",
  components: {
    Chargingmode,
    Finishmode,
  },
  data: () => ({
    mdiLightningBolt,
    mdiSineWave,
    mdiBatteryCharging,
    mdiTimerOutline,
    mdiCar,
    Nowtime: "",
    touchstart: false,
    monthNames: [
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
    ],
    Nowdate: "",
    Nowmonth: "",
  }),
  mounted() {
    let self = this;
    self.gettime();
    setInterval(function () {
      self.gettime();
    }, 1000);
  },
  methods: {
    gettime() {
      let date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      this.Nowtime = hour + ":" + min;
      this.Nowdate = date.getDate();
      this.Nowmonth = this.monthNames[date.getMonth()];
    },
    changemode(val) {
      const mainstore = useMainStore();
       mainstore.chargepilemode=val;
    },
  },
  computed:{
    getchargepilemode(){
      const mainstore = useMainStore();
      return mainstore.chargepilemode;
    }
  }
};
</script>
<style scoped>

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
  color: #6b6b6b;
  transform: matrix(1, 0, 0.01, 1, 0, 0);
  animation: slidein 1.5s infinite alternate ease-in;
  cursor: pointer;
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
</style>
