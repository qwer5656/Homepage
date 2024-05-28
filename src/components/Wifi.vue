<template>
  <div class="Wifiwrap">
    <div style="">
      <h2 style="color: white">Your E-FANer</h2>
      <h3 style="color: rgba(107, 107, 107, 1)">xxxx-xxxxx</h3>
    </div>
    <div class="bottomwrap">
      <div class="container">
        <v-switch v-model="Wifidata.enabled" inset hide-details></v-switch>
        <div class="wrap">
          <span class="txt">Wifi</span>
          <h5 style="color: rgba(107, 107, 107, 1)">
            Turn on this option allow you configure your EV charger to AP point.
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { settingStore } from "@/stores/setting";
export default {
  data() {
    return {
      Wifidata: {},
      init:false
    };
  },
  components: {},
  watch: {
    "Wifidata.enabled"(val) {
      if (this.init == true) {
        let setting = settingStore();
        if (this.Wifidata.chargePointId == "") {
          this.Wifidata.chargePointId = "Test1234";
          setting.postapi(this,this.Wifidata);
        } else {
          setting.putapi(this,this.Wifidata);

        }
      }
      this.init = true;
    },
  },
  beforeMount() {
    let setting = settingStore();
    let self = this;
    setting.getapi(this, "WifiSetting").then((res) => {
      self.Wifidata = res.data;
    });
  },
};
</script>
<style>
.Wifiwrap .v-switch--inset .v-selection-control--dirty .v-switch__track {
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
.Wifiwrap .v-switch--inset .v-selection-control--dirty .v-switch__thumb {
  background: black;
}
.Wifiwrap .v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}
.Wifiwrap h2{
  font-size: 21px;
}
.Wifiwrap .v-switch--inset .v-switch__track {
  background: #ffffff1a;

  width: 52.89px;
  height: 28px;
  border-radius: 30px;
  border: 2px solid #474747;

  box-shadow: 0px 8px 30px 0px #00000069;

  box-shadow: 0px 0px 12px 0px #ffffff08 inset;
}
.Wifiwrap {
  color: white;
  display: flex;
}
.Wifiwrap .txt {
  color: white;
}
.Wifiwrap .wrap {
  margin-left: 22px;
  padding-top: 12px;
}
.Wifiwrap .bottomwrap {
  margin-left: 110px;
}
@media (max-width: 576px) {
  .Wifiwrap .bottomwrap {
    margin-top: 50px;
  }
  .Wifiwrap {
    display: flex;
    flex-direction: column;
    padding: 70px 30px 0px 30px;
  }
  .Wifiwrap .wrap {
    margin-left: 0px;
    margin-right: 10px;
    padding-top: 0px;
    order: -1;
  }
  .Wifiwrap .bottomwrap {
    margin-left: 0px;
  }
  .Wifiwrap .container {
    display: flex;
    align-items: center;
  }
}
</style>
