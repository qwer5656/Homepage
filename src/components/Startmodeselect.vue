<template lang="">
  <div class="startmodegwrap">
    <div class="wrap" @click="goto('QrcodeSetting')">
      <div>
        <img src="../assets/img/QR Code.png" alt=""  />
      </div>
      <div class="txt">QR Code</div>
    </div>
    <div class="wrap" @click="goto('RfidSetting')">
      <div>
        <img src="../assets/img/RFID.png" alt="" />
      </div>
      <div class="txt">RFID</div>
    </div>
    <div class="wrap" @click="goto('CarNumberSetting')">
      <div>
        <img src="../assets/img/Scan Car Number.png" alt="" />
      </div>
      <div class="txt">Car Number</div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      radioval: "two",
      selected: [],
    };
  },
  components: {},
  methods: {
    goto(val) {
   
      this.$router.push(`/${val}`);
    },
  },
};
</script>
<style scoped>
.startmodegwrap {
  color: white;
  display: flex;
  margin-left: 205px;
  padding-top:52px ;
}
.wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 213px;
  height: 304px;
  padding: 70px 20px 70px 20px;
  gap: 10px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.05);
  margin: 25px;
  cursor: pointer;
}
.txt {
  font-family: SF Pro;
  font-size: 23px;
  font-weight: 400;
  line-height: 28.75px;
  text-align: center;
}
</style>
