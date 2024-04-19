<template>
  <div class="mainwrap">
    <div class="flex">
      <div class="itemwrap">
        <div class="itemtxt">Times</div>
        <div class="imgwrap">
          <img src="../assets/img/timer.png" alt="" />
        </div>
        <div class="line"></div>
        <div class="itembottomtxt">3 <span>hrs</span></div>
      </div>
      <div class="itemwrap">
        <div class="itemtxt">TPC</div>
        <div class="imgwrap">
          <img src="../assets/img/lightning.png" alt="" />
        </div>
        <div class="line"></div>
        <div class="itembottomtxt">456.7 <span>kwh</span></div>
      </div>
    </div>
    <div class="chargebt" @click="changemode('standby')">Ok</div>
  </div>
</template>
<script>
import { useMainStore } from "@/stores/main";
export default {
  methods: {
    changemode(val) {
      const mainstore = useMainStore();
      mainstore.chargepilemode = val;
    },
  },
};
</script>
<style scoped>
.mainwrap {
  padding-top: 89px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex {
  display: flex;
}
.itemwrap {
  background: url("../assets/img/finishbackground.png");
  width: 217.09px;
  height: 245px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 29px;
  margin: 0 9px;
}
.itemtxt {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 23.87px;
  text-align: left;
  color: white;
}
.line {
  width: 155px;
  height: 0px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.itembottomtxt {
  color: white;
  font-family: SF Pro;
  font-size: 44px;
  font-weight: 510;
  line-height: 52.51px;
  text-align: left;
  margin-top: 5px;
}
.itembottomtxt span {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 23.87px;
  text-align: left;
  color: gray;
}
.imgwrap {
  padding: 10px;
}
.chargebt {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 93px;
  gap: 10px;
  width: 306px;
  height: 30px;
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  );
  border-radius: 32px;
  cursor: pointer;
  margin-top: 100px;
}
@media (max-width: 576px) {
  .itemwrap {
    background: url(/src/assets/img/phonefinishbackground.png) no-repeat;
    background-size: contain;
    width: 95%;
    height: calc( 100vw / 2.9);
    padding: 0;
    margin:10px;
  }
  .itemtxt{
    font-size: 15px;
    text-align: right;
    margin-top:-50px;
    padding-right: 10px;
  }
  .imgwrap{
    width: 50px;
    order: -1;
  }
  .line{
    display: none;
  }
  .itembottomtxt{
    font-size: 30px;
    padding-right: 10px;
    text-align: right;
  }
  .flex{
    flex-direction: column;
    width: 100%;
    padding: 5px;
  }
  .chargebt{
    margin: 20px 0;
  }
  .mainwrap{
    padding-top:40px;
  }
}
</style>
