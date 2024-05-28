<template>
  <div class="Ltewrap">
    <div style="">
      <h2 style="color: white">Your E-FANer</h2>
      <h3 style="color: rgba(107, 107, 107, 1)">xxxx-xxxxx</h3>
    </div>
    <div class="bottomwrap">
      <div class="container">
        <v-switch v-model="Ltedata.enabled" inset hide-details></v-switch>
        <div class="wrap">
          <span class="txt">LTE</span>
          <h5 style="color: rgba(107, 107, 107, 1)">
            Turn on this option allow you configure your EV charger to SIM.
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { settingStore } from "@/stores/setting";
export default {
  data() {
    return {
      Ltedata: {},
      init:false
    };
  },
  components: {},
  watch: {
    "Ltedata.enabled"(val) {
      if (this.init == true) {
        let setting = settingStore();
        if (this.Ltedata.chargePointId == "") {
          this.Ltedata.chargePointId = "Test1234";
          setting.postapi(this,this.Ltedata);
        } else {
          setting.putapi(this,this.Ltedata);

        }
      }
      this.init = true;
    },
  },
  beforeMount() {
    let setting = settingStore();
    let self = this;
    setting.getapi(this, "LteSetting").then((res) => {
      self.Ltedata = res.data;
    });
  },
};
</script>
<style >
.Ltewrap .v-switch--inset .v-selection-control--dirty .v-switch__track {
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
.Ltewrap .v-switch--inset .v-selection-control--dirty .v-switch__thumb {
  background: black;
}
.Ltewrap .v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}
.Ltewrap .v-switch--inset .v-switch__track {
  background: #ffffff1a;

  width: 52.89px;
  height: 28px;
  border-radius: 30px;
  border: 2px solid #474747;

  box-shadow: 0px 8px 30px 0px #00000069;

  box-shadow: 0px 0px 12px 0px #ffffff08 inset;
}
.Ltewrap h2{
  font-size: 21px;
}
.Ltewrap{
  display: flex;
  color: white;
}
.Ltewrap .txt {
  color: white;
}
.Ltewrap .wrap {
  margin-left: 22px;
  padding-top: 12px;
}
.Ltewrap .bottomwrap {
  margin-left: 110px;
}
@media (max-width: 576px) {
  .Ltewrap .bottomwrap{
    margin-top: 50px;
  }
  .Ltewrap {
    display: flex;
    flex-direction: column;
    padding: 70px 30px 0px 30px;

  }
  .Ltewrap .wrap {
    margin-left: 0px;
    margin-right: 10px;
    padding-top: 0px;
    order: -1;
  }
  .Ltewrap .bottomwrap {
    margin-left: 0px;
  }
  .Ltewrap .container{
    display: flex;
    align-items: center;
  
  }

}
</style>
