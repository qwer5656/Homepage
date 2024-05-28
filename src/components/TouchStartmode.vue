<template lang="">
  <div class="touchstartmainwrap">
    <div class="touchstartwrap">
      <div class="touchstartcontainer">
        <span class="touchstarttxt">Touch Start</span>
        <v-switch v-model="data.enabled" inset hide-details></v-switch>
      </div>
      <div class="txt">
        Turn on this option need to click start button when you ready to charge.
      </div>
    </div>
    <div class="flex">
      <img
        v-if="Touchstartmodeimg"
        :src="TouchStarmtmodeimageUrl"
        class="sizeclass"
      />
      <img v-else :src="CarimageUrl" />
    </div>
  </div>
</template>
<script>
import TouchStarmtmodeimageUrl from "@/assets/img/TouchStarmtmode.png";
import CarimageUrl from "@/assets/img/Car.png";
import { useMainStore } from "@/stores/main";
import { settingStore } from "@/stores/setting";
export default {
  data() {
    return {
      data: {},
      error: "",
      init: false,
      phoneimg: true,
      TouchStarmtmodeimageUrl,
      CarimageUrl,
    };
  },
  watch: {
    "data.enabled"(val) {
      if (this.init == true) {
        let setting = settingStore();
        if (this.data.chargePointId == "") {
          this.data.chargePointId = "Test1234";
         
          setting.postapi(this,this.data);
        } else {
         
          setting.putapi(this,this.data);

        }
      }
      this.init = true;
    },
  },
  computed: {
    Touchstartmodeimg() {
      return this.data.enabled == true ? false : true;
    },
  },
  components: {},
  methods: {},
  beforeMount() {
    let setting = settingStore();
    let self = this;
    setting.getapi(this, "TouchStartmode").then((res) => {
      self.data = res.data;
    });
  },
};
</script>
<style>
.touchstartmainwrap .flex {
  display: flex;
  justify-content: center;
  padding-top: 91px;
}
.touchstartmainwrap .touchstartwrap {
  padding-left: 147px;
}
.touchstartwrap .v-switch--inset .v-selection-control--dirty .v-switch__track {
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  );
  border: 2px solid #66ff80;
  width: 52.89px;
  height: 28px;
  vertical-align: middle;
}
.touchstartwrap .v-switch--inset .v-selection-control--dirty .v-switch__thumb {
  background: black;
}
.touchstartwrap .v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}
.touchstartwrap .v-switch--inset .v-switch__track {
  background: #ffffff1a;

  width: 52.89px;
  height: 28px;
  border-radius: 30px;
  border: 2px solid #474747;

  box-shadow: 0px 8px 30px 0px #00000069;

  box-shadow: 0px 0px 12px 0px #ffffff08 inset;
}
.touchstartmainwrap .touchstartwrap {
  color: white;
}
.touchstartmainwrap .touchstarttxt {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-right: 22px;
}
.touchstartmainwrap .txt {
  font-family: "SF Pro";
  font-style: normal;
  font-weight: 510;
  font-size: 14px;
  line-height: 125%;
  display: flex;
  align-items: center;
  text-align: justify;
  color: #6b6b6b;
  flex: none;
  order: 1;
  flex-grow: 0;
}
.touchstartmainwrap .touchstartcontainer {
  display: flex;
  align-items: center;
}

@media (max-width: 576px) {
  .touchstartmainwrap .touchstartwrap {
    padding: 0 20px;
    margin-top: 30px;
  }
  .touchstartmainwrap .flex img {
    width: 90%;
  }
  .touchstartmainwrap .flex {
    padding-top: 40px;
  }
  .touchstartmainwrap .flex .sizeclass {
    width: 70%;
  }
}
</style>
