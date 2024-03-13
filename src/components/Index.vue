<template lang="">
  <div>
    <div class="headcontent">
      <div style="display: flex; flex-direction: column">
        <img src="../assets/img/Device.png" style="height: 300px" />
        <v-btn style="margin-top: 20px; color: white" color="#5865f2">
          Start Charing
        </v-btn>
      </div>
      <div>
        
      </div>
    </div>
    <div class="itemswrap">
      <div class="item">
        <div class="itemcontent">
          <div class="iconwrap">
            <v-icon class="timer fontsize" :icon="mdiLightningBolt" />
          </div>
          <div class="txtwrap">
            <h5 class="firsttext">120</h5>
            <h4>V</h4>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="itemcontent">
          <div class="iconwrap">
            <v-icon class="timer fontsize" :icon="mdiSineWave" />
          </div>
          <div class="txtwrap">
            <h5 class="firsttext">120</h5>
            <h4>I</h4>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="itemcontent">
          <div class="iconwrap">  
            <v-icon class="timer fontsize" :icon="mdiBatteryCharging" />
          </div>
          <div class="txtwrap">
            <h5 class="firsttext">120</h5>
            <h4>W</h4>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="itemcontent">
          <div class="iconwrap">
            <v-icon class="timer fontsize" :icon="mdiCar" />
          </div>
          <div class="txtwrap">
            <h5 class="firsttext">20</h5>
            <h4>Kwh</h4>
          </div>
        </div>
      </div>
      <div class="itemfooter item">
        <div class="itemcontent">
          <div class="iconwrap">
            <v-icon class="timer fontsize" :icon="mdiTimerOutline" /> 
          </div>
          <div class="txtwrap">
            <h5 class="firsttext">01:58:30</h5>
            <h4>Time</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import { mdiTimerOutline, mdiLightningBolt,mdiSineWave,mdiBatteryCharging,mdiCar } from "@mdi/js";

export default {
  name: "App",

  data: () => ({
    mdiLightningBolt,
    mdiSineWave,
    mdiBatteryCharging,
    mdiTimerOutline,
    mdiCar
  }),
};
</script>
<style scoped>
.itemswrap {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top:20px;
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
.itemfooter{
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
  padding-top: 25px;
}
.fontsize {
  transform: scale(1.5);
}
</style>

