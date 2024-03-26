<template>
  <div class="qrcodesettingwrap">
    <div>
      <!-- <div class="backicon" @click="previous()">
        <img src="../assets/img/Previous.png" alt="" />
        <span>Back</span>
      </div> -->
      
      <div class="container">
        <div class="content">
          <div class="qrcodeswitch">
            <span>QR Code</span><Nswitch v-model="val"></Nswitch>
          </div>
          <div class="qrcodeexplain">
            Turn on this option need to scan QR code when you ready to charge.
          </div>
        </div>
        <div class="imgwrap">
          <img src="../assets/img/QrcodeEnabled.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nswitch from "./public/Nswitch.vue";
export default {
  setup() {},
  data() {
    return {
      val: false,
    };
  },
  components: {
    Nswitch,
  },
  methods: {
    previous() {
      this.$router.push("/Startmode");
    },
  },
};
</script>
<style>
.qrcodesettingwrap {
  display: flex;
  justify-content: center;
  margin-top: 120px;
}
.qrcodesettingwrap .imgwrap {
  width: 415px;
  height:315.57px;
}
.qrcodesettingwrap .backicon {
  color: white;
  cursor: pointer;
}
.qrcodesettingwrap .backicon img {
  vertical-align: middle;
}
.qrcodesettingwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.qrcodesettingwrap .qrcodeswitch span {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-right: 22px;
}
.qrcodesettingwrap .content {
  color: white;
}
.qrcodesettingwrap .qrcodeswitch {
  display: flex;
  align-items: center;
}
.qrcodesettingwrap .qrcodeexplain {
  color: rgba(107, 107, 107, 1);
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 510;
  line-height: 24.5px;
  text-align: justified;
  width: 206px;
}
.qrcodesettingwrap .container {
  display: flex;
  width: 680px;
}
.qrcodesettingwrap .container > div {
  flex: 1;
}
.qrcodesettingwrap .backicon {
  margin-bottom: 101px;
}
</style>
