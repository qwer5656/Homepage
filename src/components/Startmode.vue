<template lang="">
  <div class="startmodewrap">
    <div class="startmodemenu">
      <div>
        <img
          src="../assets/img/qrcodestartmodeenabled.png"
          @click="changeselectmode('qrcode')"
          alt=""
          v-if="selectmode == 'qrcode'"
        />
        <img
          src="../assets/img/qrcodestartmode.png"
          @click="changeselectmode('qrcode')"
          alt=""
          v-else
        />
      </div>
      <div>
        <img
          src="../assets/img/rfidstartmodeenabled.png"
          @click="changeselectmode('qrcode')"
          v-if="selectmode == 'rfid'"
          alt=""
        />
        <img
          src="../assets/img/rfidstartmode.png"
          alt=""
          @click="changeselectmode('rfid')"
          v-else
        />
      </div>
      <div>
        <img
          src="../assets/img/carnumberstartmodeenabled.png"
          alt=""
          v-if="selectmode == 'carnumber'"
          @click="changeselectmode('carnumber')"
        />
        <img
          src="../assets/img/carnumberstartmode.png"
          v-else
          @click="changeselectmode('carnumber')"
          alt=""
        />
      </div>
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
        <CarNumberSetting v-if="selectmode == 'carnumber'" />
      </div>
    </div>
  </div>
</template>
<script>
import QrcodeSetting from "@/components/QrcodeSetting.vue";
import RfidSetting from "@/components/RfidSetting.vue";
import CarNumberSetting from "@/components/CarNumberSetting.vue";
import test from "@/components/test.vue";
export default {
  data() {
    return {
      radioval: "two",
      selectmode: "qrcode",
      selected: [],
    };
  },
  components: {
    QrcodeSetting,
    RfidSetting,
    CarNumberSetting,
    test,
  },
  methods: {
    goto(val) {
      this.$router.push(`/${val}`);
    },
    changeselectmode(val) {
      this.selectmode = val;
    },
  },
};
</script>
<style scoped>
.startmodewrap {
  width: 680px;
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
</style>
