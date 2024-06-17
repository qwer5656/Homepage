<template>
  <div class="Bluetoothwrap">
    <div style="">
      <h2 style="color: white">Your E-FANer</h2>
      <h3 style="color: rgba(107, 107, 107, 1)">xxxx-xxxxx</h3>
    </div>
    <div class="bottomwrap">
      <div class="container">
        <v-switch v-model="Bluetoothdata.enabled" inset hide-details></v-switch>
        <div class="wrap">
          <span class="txt">Bluetooth</span>
          <h5 style="color: rgba(107, 107, 107, 1)">
            Turn on this option allow you configure your device via bluetooth.
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
      Bluetoothdata: false,
      init:true
    };
  },
  watch: {
    "Bluetoothdata.enabled"(val) {
      if (this.init == true) {
        let setting = settingStore();
        if (this.Bluetoothdata.chargePointId == "") {
          setting.postapi(this,this.Bluetoothdata);
        } else {
          setting.putapi(this,this.Bluetoothdata);

        }
      }
      this.init = true;
    },
  },
  beforeMount() {
    let setting = settingStore();
    let self = this;
    setting.getapi(this, "BluetoothSetting").then((res) => {
      self.Bluetoothdata = res.data;
    });
  },
  components: {},
};
</script>
<style >
.Bluetoothwrap .v-switch--inset .v-selection-control--dirty .v-switch__track {
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
.Bluetoothwrap .v-switch--inset .v-selection-control--dirty .v-switch__thumb {
  background: black;
}
.Bluetoothwrap .v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}
.Bluetoothwrap .v-switch--inset .v-switch__track {
  background: #ffffff1a;

  width: 52.89px;
  height: 28px;
  border-radius: 30px;
  border: 2px solid #474747;

  box-shadow: 0px 8px 30px 0px #00000069;

  box-shadow: 0px 0px 12px 0px #ffffff08 inset;
}

.Bluetoothwrap .txt {
  color: white;
}
.Bluetoothwrap .wrap {
  margin-left: 22px;
  padding-top: 12px;
}
.Bluetoothwrap .bottomwrap {
  margin-left: 110px;
}
.Bluetoothwrap h2{
  font-size: 21px;
}
@media (max-width: 576px) {
  .Bluetoothwrap .bottomwrap{
    margin-top: 50px;
  }
  .Bluetoothwrap {
    display: flex;
    flex-direction: column;
    padding: 70px 30px 0px 30px;

  }
  .Bluetoothwrap .wrap {
    margin-left: 0px;
    margin-right: 10px;
    padding-top: 0px;
    order: -1;
  }
  .Bluetoothwrap .bottomwrap {
    margin-left: 0px;
  }
  .Bluetoothwrap .container{
    display: flex;
    align-items: center;
  
  }

}
</style>
