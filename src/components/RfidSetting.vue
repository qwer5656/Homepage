<template>
  <Card v-if="showcard" @changestatus="Changestatus"></Card>
  <div class="rfidSettingwrap" v-else>
    <div>
      <!-- <div class="backicon" @click="previous()">
        <img src="../assets/img/Previous.png" alt="" />
        <span>Back</span>
      </div> -->

      <div class="container">
        <div class="content">
          <div class="switch">
            <span>{{ $t("StartModepage.rfidtitle") }}</span>
            <Nswitch v-model="rfidswitchdata.enabled"></Nswitch>
          </div>
          <div class="explain">
            {{ $t("StartModepage.rfidcontent") }}
          </div>
          <div
            class="bt"
            :class="{ btenabled: rfidswitchdata.enabled }"
            @click="changeshowcard"
          >
            My Card
          </div>
        </div>
        <div class="imgwrap">
          <img src="../assets/img/RfidEnabled.png" alt="" />
          <div
            class="phonebt bt"
            :class="{ btenabled: rfidswitchdata.enabled }"
            @click="changeshowcard"
          >
            My Card
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "./Card.vue";
import Nswitch from "./public/Nswitch.vue";
import { settingStore } from "@/stores/setting";
export default {
  setup() {},
  data() {
    return {
      rfidswitchdata: {},
      showcard: false,
      init: false,
    };
  },
  components: {
    Nswitch,
    Card,
  },
  watch: {
    "rfidswitchdata.enabled"(val) {
      if (this.init == true) {
        let self = this;
        let setting = settingStore();
        if (this.rfidswitchdata.chargePointId == "") {
          setting.postapi(this, this.rfidswitchdata).then((res) => {
            self.rfidswitchdata = res.data;
          });
          return;
        }
        setting.putapi(this, this.rfidswitchdata).then((res) => {
          self.rfidswitchdata = res.data;
        });
      }
      this.init = true;
    },
  },
  methods: {
    previous() {
      this.$router.push("/Startmode");
    },
    changeshowcard() {
      if (this.rfidswitchdata.enabled == true) {
        this.showcard = true;
      }
    },
    Changestatus(val) {
      this.showcard = val;
    },
  },
  beforeMount() {
    let setting = settingStore();
    let self = this;
    setting.getapi(this, "RfidSetting").then((res) => {
      self.rfidswitchdata = res.data;
    });
  },
};
</script>
<style>
.rfidSettingwrap {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.rfidSettingwrap .backicon {
  color: white;
  cursor: pointer;
}
.rfidSettingwrap .btenabled {
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  ) !important;
  color: black;
  cursor: pointer !important;
}
.rfidSettingwrap .phonebt {
  display: none !important;
}
.rfidSettingwrap .bt {
  /* Stop */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 93px;
  gap: 10px;

  width: 306px;
  height: 30px;

  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.41),
    inset 0px 0px 12px rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(100px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 32px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin-top: 80px;
  cursor: not-allowed;
}
.rfidSettingwrap .backicon img {
  vertical-align: middle;
}
.rfidSettingwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.rfidSettingwrap .switch span {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-right: 22px;
}
.rfidSettingwrap .content {
  color: white;
}
.rfidSettingwrap .switch {
  display: flex;
  align-items: center;
}
.rfidSettingwrap .explain {
  color: rgba(107, 107, 107, 1);
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 510;
  line-height: 24.5px;
  text-align: justified;
  width: 306px;
}
.rfidSettingwrap .container {
  display: flex;
  width: 680px;
}
.rfidSettingwrap .container > div {
  flex: 1;
}
.rfidSettingwrap .backicon {
  margin-bottom: 101px;
}
.rfidSettingwrap .imgwrap {
  display: flex;
  justify-content: center;
}

@media (max-width: 576px) {
  .rfidSettingwrap .container {
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
  }
  .rfidSettingwrap .bt {
    display: none;
  }
  .rfidSettingwrap .explain {
    width: 100%;
  }
  .rfidSettingwrap {
    margin-top: 00px;
  }
  .rfidSettingwrap .imgwrap {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }
  .rfidSettingwrap .imgwrap img {
    width: 40vw;
  }
  .rfidSettingwrap .phonebt {
    display: block !important;
    margin-top: 20px;
    text-align: center;
    height: auto;
    padding: 2px 0;
  }
}
</style>
