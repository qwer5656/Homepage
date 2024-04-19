<template lang="">
  <div class="settingwrap">
    <v-tabs
      v-model="tab"
      show-arrows
      hide-slider="true"
      class="tab"
      selected-class="select"
    >
      <v-tab value="Bluetooth">Bluetooth</v-tab>
      <v-tab value="Wifi">Wifi</v-tab>
      <v-tab value="LTE">LTE</v-tab>
      <v-tab value="Ocpp">OCPP</v-tab>
      <v-tab value="Time">Time</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item
          value="Bluetooth"
          style="color: white; padding: 0 18px; margin-top: 174px"
        >
          <Bluetooth/>
        </v-window-item>
        <v-window-item value="Wifi" style="color: white; padding: 0 18px; margin-top: 174px">
          <Wifi/>
        </v-window-item>
        <v-window-item value="LTE" style="color: white; padding: 0 18px; margin-top: 174px">
          <Lte/>
        </v-window-item>
        <v-window-item value="Ocpp" style="color: white; padding: 0 18px;">
         <OCPPmode/>
        </v-window-item>

        <v-window-item value="Time">
          <Timemode />
        </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>
<script>
import OCPPmode from "../components/OCPPmode.vue"
import Timemode from "../components/Timemode.vue"
import Bluetooth from '../components/Bluetooth.vue'
import Wifi from '../components/Wifi.vue'
import Lte from '../components/Lte.vue'
export default {
  data() {
    return {
      tab: "",
      Bluetoothstatus: false,
    };
  },
  components:{
    OCPPmode,
    Timemode,
    Bluetooth,
    Wifi,
    Lte
  }
};
</script>
<style>
.settingwrap {
  padding: 0 0 0 85px;
  margin: 0 auto;
  width: 800px;
}
.settingwrap .select {
  background: rgba(91, 228, 114, 0.19) !important;

  color: rgba(91, 228, 114, 1) !important;
}
.settingwrap .v-window{
  width: 800px;
}
.settingwrap .Bluetoothwrap {
  display: flex;
  
}
.settingwrap .tab {
  width: 800px;
  height: 73px;
  padding: 0px 10px;
  box-sizing: border-box;
  align-items: center;
}
.settingwrap .v-slide-group__content {
  justify-content: space-around;
}
.settingwrap .v-slide-group__content .v-btn {
  color: white;
  padding: 15px 35px 15px 35px;
  gap: 10px;
  border-radius: 35px !important;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: center;
  text-transform: none;
}

.settingwrap .v-switch--inset .v-selection-control--dirty .v-switch__track {
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
.settingwrap .v-switch--inset .v-selection-control--dirty .v-switch__thumb {
  background: black;
}
.settingwrap .v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}
.settingwrap .v-switch--inset .v-switch__track {
  background: #ffffff1a;

  width: 52.89px;
  height: 28px;
  border-radius: 30px;
  border: 2px solid #474747;

  box-shadow: 0px 8px 30px 0px #00000069;

  box-shadow: 0px 0px 12px 0px #ffffff08 inset;
}
.settingwrap .container {
  display: flex;
  align-items: flex-start;
}
.settingwrap .container .txt {
  padding-right: 22px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  padding-bottom: 6px;
  display: inline-block;
}
</style>
