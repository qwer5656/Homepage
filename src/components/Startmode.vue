<template lang="">
  <div class="startmodewrap">
    <div class="startmodemenu">
        <div
          class="qrcode imgsize"
          :class="{ qrcodeenabled: selectmode == 'qrcode' }"
          @click="changeselectmode('qrcode')"
        ></div>
      <div
          class="rfid imgsize"
          :class="{ rfidenabled: selectmode == 'rfid' }"
          @click="changeselectmode('rfid')">
      </div>
        <div
          class="licenseplate imgsize"
          :class="{ licenseplateenabled: selectmode == 'LicensePlate' }"
          @click="changeselectmode('LicensePlate')"
        ></div>
    </div>
    <div>
      <div>
        <QrcodeSetting v-if="selectmode == 'qrcode'" />
      </div>
      <div>
        <test />
        <RfidSetting v-if="selectmode == 'rfid'" />
      </div>
      <div>
        <LicensePlateSetting v-if="selectmode == 'LicensePlate'" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Use vue-router in Vue 3

import QrcodeSetting from "@/components/QrcodeSetting.vue";
import RfidSetting from "@/components/RfidSetting.vue";
import LicensePlateSetting from "@/components/LicensePlateSetting.vue";

// Reactive state
const radioval = ref("two");
const selectmode = ref("qrcode");
const selected = ref([]);

// Router for navigation
const router = useRouter();

// Methods
const goto = (val) => {
  router.push(`/${val}`);
};

const changeselectmode = (val) => {
  selectmode.value = val;
};
</script>
<style scoped>
.startmodewrap {
  width: 800px;
  margin: 0 auto;
}
.startmodemenu {
  display: flex;
}
.startmodemenu img {
  height: 74px;
  margin: 0 15px;
  cursor: pointer;
}
.licenseplate {
  background-image: url("../assets/img/carnumberstartmode.png");
}
.imgsize {
  width: 227px;
  height: 74px;
  margin: 0 15px;
  cursor: pointer;
}
.licenseplateenabled {
  background-image: url("../assets/img/carnumberstartmodeenabled.png") !important;
}
.rfid {
  background-image: url("../assets/img/rfidstartmode.png");
}
.rfidenabled {
  background-image: url("../assets/img/rfidstartmodeenabled.png") !important;
}

.qrcode {
  background-image: url("../assets/img/qrcodestartmode.png");
}

.qrcodeenabled {
  background-image: url("../assets/img/qrcodestartmodeenabled.png") !important;
}
@media (max-width: 576px) {
  .licenseplate {
    background-image: url("../assets/img/phonecarnumberstartmode.png");
    
  }
  .licenseplateenabled {
    background-image: url("../assets/img/phonecarnumberstartmodeenabled.png") !important;
  }
  .rfid {
    background-image: url("../assets/img/phonerfidstartmode.png");
  }
  .rfidenabled {
    background-image: url("../assets/img/phonerfidstartmodeenabled.png") !important;
  }
  .qrcode {
    background-image: url("../assets/img/phoneqrcodestartmode.png");
  }

  .qrcodeenabled {
    background-image: url("../assets/img/phoneqrcodestartmodeenabled.png") !important;
  }
  .imgsize {
   flex: 1;
   background-size: contain;
    margin: 0;
  }
  .startmodewrap{
    width: 100%;
  }
  .startmodemenu{
    padding-top: 2vh;
  }
}
</style>
