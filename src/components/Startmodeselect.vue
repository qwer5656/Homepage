<template lang="">
    <div class="backicon" @click="previous()">
      <img src="../assets/img/Previous.png" alt="" />
      <span>Back</span>
    </div>
    <div class="startmodegwrap">
      <div class="wrap" @click="goto('QrcodeStartmode')">
        <div>
          <img src="../assets/img/QRCode.png" alt="" />
        </div>
        <div class="txt">QR Code</div>
      </div>
      <div class="wrap" @click="goto('Rfidloading')">
        <div>
          <img src="../assets/img/RFID.png" alt="" />
        </div>
        <div class="txt">RFID</div>
      </div>
      <div class="wrap" @click="goto('CarNumberloading')">
        <div>
          <img src="../assets/img/ScanCarNumber.png" alt="" />
        </div>
        <div class="txt">Car Number</div>
      </div>
    </div>
</template>
<script>
import { useMainStore } from "@/stores/main";
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
    previous(){
      const mainstore=useMainStore();
      mainstore.chargepilemode = "standby";
    }
  },
};
</script>
<style scoped>

.backicon{
  color: white;
  margin: 0 50px;
  display: inline-block;
  cursor: pointer;
}
.backicon img{
  vertical-align: middle;
  margin: 0 5px;
}
.startmodegwrap {
  color: white;
  display: flex;
  margin-left: 205px;
  padding-top: 52px;
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
@media (max-width: 576px) {
  .startmodegwrap {
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 0;
  }
  .wrap {
    width: auto;
    height: auto;
    margin: 10px;
    padding: 15px 20px;
  }
}
</style>
