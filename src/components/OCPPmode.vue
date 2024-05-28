<template lang="">
  <div class="ocppwrap">
    <!-- <div class="backicon" @click="previous()" v-if="mode!='address'">
      <img src="../assets/img/Previous.png" alt="" />
      <span>Back</span>
    </div> -->
    <div>
      <div class="title">{{ ocppdata.title }}</div>
      <div class="describe">
        {{ ocppdata.describe }}
      </div>
      <div>
        <form class="formwrap">
          <v-text-field
            v-if="mode == 'address'"
            label="http://10.0.0.2.8887"
            @click:append-inner="show1 = !show1"
            variant="solo"
            density="compact"
            single-line
            width="360px"
            hide-details
            v-model="ocpp.methodsContent"
          ></v-text-field>
          <div class="content" v-else>
            <img src="../assets/img/ocppdevice.png" alt="" />
            <div class="progresswrap">
              <img
                class="progresswrapimg"
                :src="devicetowebprogressimg"
                alt=""
              />
              <img :src="devicetoweblineimg" alt="" />
            </div>
            <img :src="devicetowebimg" alt="" />
            <div class="progresswrap">
              <img
                class="progresswrapimg"
                :src="webtobackendprogressimg"
                alt=""
              />
              <img :src="webtobackendlineimg" alt="" />
            </div>
            <img :src="webtobackendimg" alt="" />
          </div>
          <Nbt :title="bttitle" :enabled="btenabled" @click="clickbt()" />
        </form>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import Nbt from "./public/Nbt.vue";
import { useMainStore } from "@/stores/main";
import No from "@/assets/img/No.png";
import grayline from "@/assets/img/grayline.png";
import greenline from "@/assets/img/greenline.png";
import ocppweb from "@/assets/img/ocppweb.png";
import ocppwebsuccess from "@/assets/img/ocppwebsuccess.png";
import ocppbackend from "@/assets/img/ocppbackend.png";
import ocppbackendsuccess from "@/assets/img/ocppbackendsuccess.png";
import Yes from "@/assets/img/Yes.png";
import { settingStore } from "@/stores/setting";
export default {
  data() {
    return {
      deletedialog: false,
      carddata: [],
      mode: "address",
      ocppdata: {
        title: "",
        describe: "",
      },
      ocpp: {},
      bttitle: "Next",
      btenabled: true,
      devicetowebprogressimg: No,
      devicetoweblineimg: grayline,
      webtobackendprogressimg: No,
      webtobackendlineimg: grayline,
      devicetowebimg: "",
      webtobackendimg: "",
    };
  },
  components: {
    Nbt,
  },
  methods: {
    previous() {
      this.mode = "address";
    },
    clickbt() {
      if (this.mode == "address") {
        this.changemode("connent");
      } else {
        this.changemode("address");
      }
    },
    changemode(val) {
      this.mode = val;
      this.chagetxt();
    },
    chagetxt() {
      if (this.mode == "address") {
        this.ocppdata.title = "Backend Address";
        this.ocppdata.describe =
          "Please key in the backend address provided to you by E-Faner.";
        this.bttitle = "Next";
        this.btenabled = true;
      } else if (this.mode == "connent") {
        this.ocppdata.title = "Connecting";
        this.ocppdata.describe = "Please wait to connection process.";
        this.bttitle = "OK";
        this.btenabled = false;
        this.devicetowebprogressimg = No;
        this.devicetoweblineimg = grayline;
        this.webtobackendprogressimg = No;
        this.webtobackendlineimg = grayline;
        this.devicetowebimg = ocppweb;
        this.webtobackendimg = ocppbackend;

        let self = this;
        const mainstore = useMainStore();
        mainstore.loading = true;
        setTimeout(function () {
          self.changemode("devicetoweb");
        }, 1000);
      } else if (this.mode == "devicetoweb") {
        this.devicetowebprogressimg = Yes;
        this.devicetoweblineimg = greenline;
        this.devicetowebimg = ocppwebsuccess;

        let self = this;
        setTimeout(function () {
          self.changemode("webtobackend");
        }, 1000);
      } else if (this.mode == "webtobackend") {
        this.webtobackendprogressimg = Yes;
        this.webtobackendlineimg = greenline;
        this.webtobackendimg = ocppbackendsuccess;
        this.btenabled = true;
        const mainstore = useMainStore();
        let setting = settingStore();
        let self = this;
        if (this.ocpp.chargePointId == "") {
          this.ocpp.chargePointId = "Test1234";
          setting.postapi(this, this.ocpp).then((res) => {
            self.ocpp = res.data;
            mainstore.loading = false;
          });
        }
        else{
          setting.putapi(this, this.ocpp).then((res) => {
            self.ocpp = res.data;
            mainstore.loading = false;
          });
        }
      }
    },
  },
  mounted() {
    this.chagetxt();
  },
  beforeMount() {
    let setting = settingStore();
    let self = this;
    setting.getapi(this, "OCPPSetting").then((res) => {
      self.ocpp = res.data;
    });
  },
};
</script>
<style>
.ocppwrap {
  color: white;
  margin-top: 45px;
}
.ocppwrap .backicon {
  color: white;
  cursor: pointer;
}
.ocppwrap .backicon img {
  vertical-align: middle;
}
.ocppwrap .content {
  display: flex;
  justify-content: center;
  margin: 46px 0;
}
.ocppwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.ocppwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  width: 360px;
}
.ocppwrap .title {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-top: 49px;
}
.ocppwrap .progresswrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ocppwrap .formwrap .v-input {
  width: 306px;
  margin: 85px auto;
}
.ocppwrap .describe {
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 510;
  line-height: 17.5px;
  text-align: justified;
  color: rgba(107, 107, 107, 1);
  margin-top: 9px;
}
.ocppwrap .progresswrapimg {
  width: 22px;
  height: 22px;
  margin-bottom: 13px;
}

@media (max-width: 576px) {
  .ocppwrap {
    padding: 0 30px;
  }
  .content > img {
    width: 30%;
  }
  .ocppwrap .formwrap .v-input {
    width: 100%;
  }
}
</style>
