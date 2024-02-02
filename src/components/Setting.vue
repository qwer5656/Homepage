<template lang="">
  <div style="padding: 10px">
    <v-card>
      <v-tabs
      v-model="tab"
      bg-color="teal-darken-3"
      show-arrows
      slider-color="teal-lighten-3"
        >
        <v-tab value="Bluetooth">Bluetooth</v-tab>
        <v-tab value="Wifi">Wifi</v-tab>
        <v-tab value="LTE">LTE</v-tab>
        <v-tab value="Ocpp">Ocpp</v-tab>
        <v-tab value="Time">Time</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="Bluetooth">
            <h1 style="padding: 5px 0px">Device Name(樁）</h1>
            <h2>xxxx-xxxxx</h2>
            <v-switch
              color="green"
              :model-value="true"
              label="Bluetooth"
              inset
            ></v-switch>
          </v-window-item>
          <v-window-item value="Wifi">
            <h1 style="padding: 5px 0px">Device Name(樁）</h1>
            <h2>xxxx-xxxxx</h2>
            <v-switch
              color="green"
              :model-value="true"
              label="Wifi"
              inset
            ></v-switch>
          </v-window-item>
          <v-window-item value="LTE">
            <h1 style="padding: 5px 0px">Device Name(樁）</h1>
            <h2>xxxx-xxxxx</h2>
            <v-switch
              color="green"
              :model-value="true"
              label="LTE"
              inset
            ></v-switch>
          </v-window-item>
          <v-window-item value="Ocpp">
            <v-text-field
              label="Ocpp url"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <div
              style="
                display: flex;
                justify-content: end;
                padding-right: 10px;
                margin-top:10px;
                color: white;
              "
            > 
              <v-btn color="#5865f2" variant="flat">Save</v-btn>
            </div>
          </v-window-item>

          <v-window-item value="Time">
            <v-switch
              color="green"
              :model-value="true"
              label="自動設定"
              inset
            ></v-switch>
            時間:<input type="time" id="myTime" value="00:00:00" />

            <div
              style="
                display: flex;
                justify-content: end;
                padding-right: 10px;
                color: white;
              "
            >
              <v-btn color="#5865f2" variant="flat">Save</v-btn>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "",
    };
  },
};
</script>
<style lang=""></style>
