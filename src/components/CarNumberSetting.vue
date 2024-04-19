<template>
  <CarNumber v-if="carnumbershow"  @changestatus="Changestatus"></CarNumber>
  <div class="CarNumberSettingwrap" v-else>
    <div>
      <!-- <div class="backicon" @click="previous()">
        <img src="../assets/img/Previous.png" alt="" />
        <span>Back</span>
      </div> -->
      <div class="container">
        <div class="content">
          <div class="switch">
            <span>Auto Scan Car License</span
            ><Nswitch v-model="carnumberswitchval"></Nswitch>
          </div>
          <div class="explain">
            Turn on this option will be allow auto scan car number to start the
            charging.
          </div>
          <div
            class="bt"
            :class="{ btenabled: carnumberswitchval }"
            @click="changecarnumbershow"
          >
          My Car License
          </div>
        </div>
        <div class="imgwrap">
          <img src="../assets/img/CarNumberEnabled.png" alt="" />
          <div
            class="phonebt bt"
            :class="{ btenabled: carnumberswitchval }"
            @click="changecarnumbershow"
          >
            My Car License
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nswitch from "./public/Nswitch.vue";
import CarNumber from "@/components/CarNumber.vue";
export default {
  setup() {},
  data() {
    return {
      carnumberswitchval: false,
      carnumbershow: false,
    };
  },
  components: {
    Nswitch,
    CarNumber,
  },
  methods: {
    changecarnumbershow() {
      if (this.carnumberswitchval == true) {
          this.carnumbershow=true;
      }
    },
    Changestatus(val){
     
      this.carnumbershow = val;
    }
  },
};
</script>
<style>
.CarNumberSettingwrap {
  display: flex;
  justify-content: center;
  margin-top: 101px;
}
.CarNumberSettingwrap .imgwrap img {
  width: 347.86px;
  height: 205px;
}
.CarNumberSettingwrap .backicon {
  color: white;
  cursor: pointer;
}
.CarNumberSettingwrap .backicon img {
  vertical-align: middle;
}
.CarNumberSettingwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.CarNumberSettingwrap .switch span {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-right: 22px;
}
.CarNumberSettingwrap .content {
  color: white;
}
.CarNumberSettingwrap .switch {
  display: flex;
  align-items: center;
}
.CarNumberSettingwrap .explain {
  color: rgba(107, 107, 107, 1);
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 510;
  line-height: 24.5px;
  text-align: justified;
  width: 265px;
}
.CarNumberSettingwrap .container {
  display: flex;
  width: 680px;
}
.CarNumberSettingwrap .container > div {
  flex: 1;
}
.CarNumberSettingwrap .backicon {
  margin-bottom: 101px;
}
.CarNumberSettingwrap .bt {
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
.CarNumberSettingwrap .btenabled {
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  ) !important;
  color: black;
  cursor: pointer !important;
}
.CarNumberSettingwrap .phonebt {
  display: none !important;
}
@media (max-width: 576px) {
  .CarNumberSettingwrap .container {
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
  }
  .CarNumberSettingwrap .bt {
    display: none;
  }
  .CarNumberSettingwrap .explain {
    width: 100%;
  }
  .CarNumberSettingwrap {
    margin-top: 0px;
  }
  .CarNumberSettingwrap .imgwrap {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    text-align: center;
  }
  .CarNumberSettingwrap .imgwrap img {
    width: 80%;
    height: auto;
  }
  .CarNumberSettingwrap .phonebt {
    display: block !important;
    margin: 20px auto;
    text-align: center;
    height: auto;
    padding: 2px 0;
  }
}
</style>
