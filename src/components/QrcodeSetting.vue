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
            <span>QR Code</span><Nswitch v-model="qrcodeval"></Nswitch>
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
import qrcodsscan from '@/assets/img/qrcodsscan.png'
import QrcodeEnabled from '@/assets/img/QrcodeEnabled.png'
export default {
  setup() {},
  data() {
    return {
      qrcodeval: false,
      qrcodeimg:QrcodeEnabled,
      error:""
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
  watch: {
    qrcodeval(val) {
      if (this.error == "") {
        const mainstore = useMainStore();
        mainstore.loading = true;
        let self = this;
        setTimeout(function () {
          mainstore.loading = false;
          if (val == true) {
            self.qrcodeimg = qrcodsscan;
          }
          else{
            self.qrcodeimg = QrcodeEnabled;
          }
          setTimeout(function () {
            self.error = "";
          }, 10);
        }, 1000);
      }
    }
  }
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

@media (max-width: 576px) {
  .qrcodesettingwrap{
    justify-content: start;
    margin-top: 20px;
    
  }
  .qrcodesettingwrap .container{
    width: 100%;
    flex-direction: column;
  }
  .qrcodesettingwrap .content{
    padding: 0 20px;
  }
  .qrcodesettingwrap .qrcodeexplain{
    width: 100%;
  }
  .qrcodesettingwrap  .imgwrap{
    display: flex;
    justify-content: center;
    margin-top: 40px;
    width: 80%;
    margin: 30px auto;
  }
  .qrcodesettingwrap .imgwrap img{ 
    width: 80%;
  
  }
}
</style>
