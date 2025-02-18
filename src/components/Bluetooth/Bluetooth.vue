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
            {{ $t("Settingpage.bluetoothcontent") }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import  Bluetooth  from "./Bluetooth.js";

export default{
  name:"Bluetooth",
  setup(){
    return Bluetooth();
  }
}

</script>
<style src="./Bluetooth.css"></style>
