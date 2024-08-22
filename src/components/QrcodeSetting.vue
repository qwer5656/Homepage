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
            <span>QR Code</span
            ><Nswitch v-model="qrcodeswitchdata.enabled"></Nswitch>
          </div>
          <div class="qrcodeexplain">
            Turn on this option need to scan QR code when you ready to charge.
          </div>
        </div>
        <div class="imgwrap">
          <img :src="qrcodeimg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nswitch from "./public/Nswitch.vue";
import { useMainStore } from "@/stores/main";
import qrcodsscan from "@/assets/img/qrcodsscan.png";
import QrcodeEnabled from "@/assets/img/QrcodeEnabled.png";
<<<<<<< HEAD
=======
import { settingStore } from "@/stores/setting";
>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
export default {
  setup() {},
  data() {
    return {
<<<<<<< HEAD
      qrcodeval: false,
      qrcodeimg: QrcodeEnabled,
      error: "",
=======
      qrcodeswitchdata: {},
      qrcodeimg: QrcodeEnabled,
      error: "",
      init: false,
>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
    };
  },
  components: {
    Nswitch,
  },
  methods: {
    previous() {
      this.$router.push("/Startmode");
    },
    changeimg(val) {
      if (val == true) {
        this.qrcodeimg = qrcodsscan;
      }
      if (val == false) {
        this.qrcodeimg = QrcodeEnabled;
      }
    },
  },
  beforeMount() {
    let setting = settingStore();
    let self = this;
    setting.getapi(this, "QrcodeSetting").then((res) => {
      self.qrcodeswitchdata = res.data;
        self.changeimg(res.data.enabled);
    });
  },
  watch: {
<<<<<<< HEAD
    qrcodeval(val) {
      if (this.error == "") {
        const mainstore = useMainStore();
        mainstore.loading = true;
        let self = this;
        setTimeout(function () {
          mainstore.loading = false;
          if (val == true) {
            self.qrcodeimg = qrcodsscan;
          } else {
            self.qrcodeimg = QrcodeEnabled;
          }
          setTimeout(function () {
            self.error = "";
          }, 10);
        }, 1000);
      }
=======
    "qrcodeswitchdata.enabled"(val) {
      let self = this;
      if (this.init == true) {
        let setting = settingStore();
        if (this.qrcodeswitchdata.chargePointId == "") {         
          setting.postapi(this,this.qrcodeswitchdata).then((res) => {
              self.changeimg(res.data.enabled);
            });
        } else {
         
          setting.putapi(this,this.qrcodeswitchdata).then(res=>{
            self.changeimg(res.data.enabled);
          })

        }
      }
      this.init = true;
>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
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
  height: 315.57px;
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

@media (max-width: 576px) {
  .qrcodesettingwrap {
<<<<<<< HEAD

=======
>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
    margin-top: 20px;
  }

  .qrcodesettingwrap .container {
    width: 100%;
    flex-direction: column;
  }
  .qrcodesettingwrap .content {
    padding: 0 20px;
  }
  .qrcodesettingwrap .qrcodeexplain {
    width: 100%;
  }
  .qrcodesettingwrap .imgwrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    width: 80%;
    margin: 30px auto;
  }
  .qrcodesettingwrap .imgwrap img {
    width: 90%;
  }
}
</style>
