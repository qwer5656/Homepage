<template>
  <v-app @click="startDrag" class="mainwrap">
    <v-main class="maincontent">
      <div class="navbar navmenu" v-if="loginshow">
        <div class="settingnavbar">
          <img
            class="setting"
            src="./assets/img/Settings.png"
            alt=""
            @click="changenavbarstatus()"
          />

          <ul
            class="navbarul"
            v-if="navbarstatus"
            @click="navbarstatus = !navbarstatus"
          >
            <!-- <li @click="goto('Bluetooth')">
              <img src="./assets/img/Buletoothicon.png" alt="" />
              <span>Bluetooth</span>
              <img src="./assets/img/Previous_2.png" alt="" />
            </li>
            <li @click="goto('Wifi')">
              <img src="./assets/img/Wifiicon.png" alt="" />
              <span>Wifi</span>
              <img src="./assets/img/Previous_2.png" alt="" />
            </li>
            <li @click="goto('Lte')">
              <img src="./assets/img/LTEicon.png" alt="" />
              <span>LTE</span>
              <img src="./assets/img/Previous_2.png" alt="" />
            </li>
            <li @click="goto('Ocpp')">
              <img src="./assets/img/OCPPicon.png" alt="" />
              <span>OCPP</span>
              <img src="./assets/img/Previous_2.png" alt="" />
            </li>
            <li @click="goto('Time')">
              <img src="./assets/img/Timesicon.png" alt="" />
              <span>Time</span>
              <img src="./assets/img/Previous_2.png" alt="" />
            </li> -->
            <li @click="goto('Language')">
              <img src="./assets/img/Languageicon.png" alt="" />
              <span>Language</span>
              <img src="./assets/img/Previous_2.png" alt="" />
            </li>
          </ul>
        </div>
        <a href="./" class="logowrap">
          <img src="./assets/img/logo.png" style="width: 70px" />
        </a>

        <div class="midaccountwrap">
          <div class="midtranslate" @click="openmenu('languagewrap')">
            <img src="./assets/img/Language.png" />
            <div style="margin: 0 10px">
              {{ this.$i18n.locale.toLocaleUpperCase() }}
            </div>
            <img src="./assets/img/Dropdown.png" />
            <ul class="menuwrap" id="languagewrap">
              <li @click.stop="changelanguage('zh')">
                <a
                  :class="{ active: lang }"
                  style="font-size: 13px; font-weight: bold"
                  >中文</a
                >
              </li>
              <li @click.stop="changelanguage('en')">
                <a
                  :class="{ active: !lang }"
                  style="font-size: 13px; font-weight: bold"
                  >English</a
                >
              </li>
            </ul>
          </div>
          <!-- <div style="position: relative;cursor: pointer;margin: 0 10px;">
            <div
              style="
                background-color: red;
                border-radius: 50%;
                position: absolute;
                width: 20px;
                height: 20px;
                left: 10px;
                top: -5px;
                z-index: 99;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <div style="color: white;font-size: 12px;font-weight: bold;">99+</div>
            </div>
            <v-icon :icon="mdiBell" color="white" />
          </div> -->
          <div class="midaccount" @click="openmenu('accountwrap')">
            <span class="accountName">{{ userName }}</span>
            <img src="./assets/img/people.png" />
            <ul class="menuwrap" id="accountwrap">
              <li @click.stop="editpassword">
                <a
                  class=""
                  style="padding: 0; font-size: 13px; font-weight: bold"
                  >{{ $t("Apppage.Header.Password") }}</a
                >
              </li>
              <li @click.stop="scanQrcode">
                <a
                  class=""
                  style="padding: 0; font-size: 13px; font-weight: bold"
                  >{{ $t("Apppage.Header.ScanQrcode") }}</a
                >
              </li>
              <li @click.stop="ChargingPileLog">
                <a
                  class=""
                  style="padding: 0; font-size: 13px; font-weight: bold"
                  >{{ $t("Apppage.Header.ChargingPileLog") }}</a
                >
              </li>
              <li @click.stop="ChargePointRatePlan">
                <a
                  class=""
                  style="padding: 0; font-size: 13px; font-weight: bold"
                  >{{ $t("Apppage.Header.ChargePointRatePlan") }}</a
                >
              </li>
              <li @click.stop="logout">
                <a class="" style="font-size: 13px; font-weight: bold">
                  {{ $t("Apppage.Header.Logout") }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pctopwrap" v-if="loginshow"></div>
      <div style="display: flex">
        <div class="leftbar" v-if="loginshow">
          <div class="Charger">
            <img
              :src="curpage == '' ? Charger_On : Charger_Off"
              alt=""
              @click="goto('')"
            />
          </div>
          <div>
            <img
              :src="curpage == 'History' ? History_On : History_Off"
              alt=""
              @click="goto('History')"
            />
          </div>
          <div>
            <img
              :src="curpage == 'Reserve' ? Schdule_On : Schdule__Off"
              alt=""
              @click="goto('Reserve')"
            />
          </div>
          <div>
            <img
              :src="curpage == 'AdImageData' ? Mode_On : Mode_Off"
              alt=""
              @click="goto('AdImageData')"
            />
          </div>
          <!-- <div class="icon-wrap">
            <img
              :src="curpage == 'Info' ? Info_On : Info_Off"
              alt=""
              @click="goto('Info')"
            />
            <span class="red-dot" v-if="notify"></span>
          </div> -->
          <!-- <div class="pcwrap">
            <img
              :src="curpage == 'Setting' ? Settings_On : Settings_Off"
              alt=""
              @click="goto('Setting')"
            />
          </div>  -->
        </div>
        <div class="leftbarconent">
          <router-view />
        </div>
      </div>
      <div class="phonediv"></div>
    </v-main>

    <Loading v-if="isshow"></Loading>
    <Result />
  </v-app>
</template>

<script>
import Loading from "./components/Loading.vue";
import { useMainStore } from "@/stores/main";
import { loginStore } from "@/stores/login";
import Charger_On from "@/assets/img/Charger_On.png";
import Charger_Off from "@/assets/img/Charger_Off.png";
import History_On from "@/assets/img/History_On.png";
import History_Off from "@/assets/img/History_Off.png";
import Schdule_On from "@/assets/img/Schdule_On.png";
import Schdule__Off from "@/assets/img/Schdule__Off.png";
import Info_Off from "@/assets/img/info_Off.png";
import Info_On from "@/assets/img/info_On.png";
import Mode_On from "@/assets/img/Mode_On.png";
import Mode_Off from "@/assets/img/Mode_Off.png";
import Settings_On from "@/assets/img/Settings_On.png";
import Settings_Off from "@/assets/img/Settings_Off.png";
import Result from "@/components/Result.vue";
import qrcodsscan from "@/assets/img/qrcodsscan.png";
import QrcodeEnabled from "@/assets/img/QrcodeEnabled.png";
import { settingStore } from "@/stores/setting";
import { mdiAccount, mdiBell } from "@mdi/js";
import { chargePointStore } from "@/stores/chargePoint";
export default {
  name: "App",
  components: {
    Loading,
    Result,
  },
  computed: {
    isshow() {
      const mainstore = useMainStore();
      return mainstore.loading;
    },
    curpage() {
      const mainstore = useMainStore();
      return mainstore.curpage;
    },
    lang() {
      return this.$i18n.locale == "zh" ? true : false;
    },
    userName() {
      return this.userdata ? this.userdata.userName : null;
    },
  },
  data: () => ({
    loginshow: false,
    mdiAccount,
    mdiBell,
    footvalue: -1,
    icontouch: false,
    loadingshow: true,
    navbarstatus: false,
    Charger_On,
    Info_Off,
    Info_On,
    Charger_Off,
    History_On,
    History_Off,
    Schdule_On,
    Schdule__Off,
    Mode_On,
    Mode_Off,
    Settings_On,
    Settings_Off,
    languagedata: {},
    userdata: null,
    notify: false,
  }),
  methods: {
    async callInfoApi() {
      try {
        const chargePoint = chargePointStore();
        const res = await chargePoint.FirmwareNotify();
        this.notify = res.success;
      } catch (err) {
        console.error(err);
      }
    },
    async pollFirmware() {
      try {
        const chargePoint = chargePointStore();

        const res = await chargePoint.FirmwareNotify();
        this.notify = res.success;
        console.log(res.success);
      } catch (err) {
        console.error("FirmwareNotify error:", err);
      } finally {
        this.pollTimer = setTimeout(() => {
          this.pollFirmware();
        }, 10000);
      }
    },

    startPolling() {
      this.pollFirmware();
    },

    stopPolling() {
      if (this.pollTimer) {
        clearTimeout(this.pollTimer);
        this.pollTimer = null;
      }
    },
    changenavbarstatus() {
      this.navbarstatus = !this.navbarstatus;
    },
    goto(val) {
      this.$router.push(`/${val}`);
    },
    editpassword() {
      document.querySelector("#accountwrap").style.display = "none";
      this.footvalue = -1;
      this.$router.push(`/EditPassword`);
    },
    scanQrcode() {
      document.querySelector("#accountwrap").style.display = "none";
      this.footvalue = -1;
      this.$router.push(`/ScanQrcode`);
    },
    ChargingPileLog() {
      document.querySelector("#accountwrap").style.display = "none";
      this.footvalue = -1;
      this.$router.push(`/ChargingPileLog`);
    },
    ChargePointRatePlan() {
      document.querySelector("#accountwrap").style.display = "none";
      this.footvalue = -1;
      this.$router.push(`/ChargePointRatePlan`);
    },
    toucheditpassword() {
      this.footvalue = -1;
      this.$router.push(`/EditPassword`);
      document.querySelector("#accountwrap").style.display = "none";
    },
    openmenu(type) {
      let arr = ["accountwrap", "languagewrap"];
      this.icontouch = type;

      document.querySelector(`#${type}`).style.display = "block";

      for (let i = 0; i < arr.length; i++) {
        if (type != arr[i]) {
          document.querySelector(`#${arr[i]}`).style.display = "none";
        }
      }
    },
    startDrag(e) {
      let obj = document.querySelector("#accountwrap");
      let languageobj = document.querySelector("#languagewrap");
      if (
        this.icontouch == "none" &&
        obj != null &&
        obj.style.display != "none"
      ) {
        obj.style.display = "none";
      }

      if (
        this.icontouch == "none" &&
        languageobj != null &&
        languageobj.style.display != "none"
      ) {
        languageobj.style.display = "none";
      }
      this.icontouch = "none";
    },
    logout() {
      let useMain = useMainStore();
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      this.loginshow = false;
      this.$router.push(`/Login`);
      useMain.firstLogin = false;
    },
    changelanguage(type) {
      document.querySelector("#languagewrap").style.display = "none";
      this.$i18n.locale = type;
      this.savelanguage(type);
    },
    checklogin() {
      let token = JSON.parse(localStorage.getItem("token"));
      let loginstore = loginStore();
      let self = this;
      if (token != null) {
        loginstore.tokenauth(self, token).then((res) => {
          if (res.success === true) {
            if (res.data == "") {
              this.userdata = JSON.parse(localStorage.getItem("userdata"));
              this.loginshow = true;
            } else {
              let useMain = useMainStore();
              useMain.firstLogin = true;
              this.loginshow = false;
              this.$router.push(`/Login`);
            }
          } else {
            this.logout();
          }
        });
        return true;
      }
      this.loginshow = false;
      this.$router.push(`/Login`);
    },
    savelanguage(type) {
      let setting = settingStore();
      this.languagedata.methodsContent = type;
      this.languagedata.MethodsName = "LanguageSetting";
      if (this.languagedata.chargePointId == "") {
        setting.postapi("", this.languagedata).then((res) => {
          this.languagedata = res.data;
        });
        return;
      }
      setting.putapi("", this.languagedata).then((res) => {
        this.languagedata = res.data;
      });
    },
  },
  beforeMount() {
    let self = this;
    if (this.$route.path == "/") {
      this.checklogin();
    }
    this.startPolling();
  },
  beforeUnmount() {
    this.stopPolling();
  },
  watch: {
    "$route.path"(toPath, fromPath) {
      this.checklogin();
      this.callInfoApi();

      let token = JSON.parse(localStorage.getItem("token"));
      if (token != null) {
        let setting = settingStore();

        setting.getapi("", "LanguageSetting").then((res) => {
          this.languagedata = res.data;

          if (res.data.methodsContent === "") {
            const lang = navigator.language || navigator.userLanguage;

            if (lang.toLowerCase().startsWith("zh")) {
              this.$i18n.locale = "zh";
            } else {
              this.$i18n.locale = "en";
            }
            return;
          }

          this.$i18n.locale = res.data.methodsContent;
        });
      }
    },
  },

  mounted() {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null) {
      let setting = settingStore();
      setting.getapi("", "LanguageSetting").then((res) => {
        self.languagedata = res.data;
        if (res.data.methodsContent === "") {
          const lang = navigator.language || navigator.userLanguage;

          if (lang.toLowerCase().startsWith("zh")) {
            this.$i18n.locale = "zh";
          } else {
            this.$i18n.locale = "en";
          }
        } else {
          this.$i18n.locale = res.data.methodsContent;
        }
      });
    }
    let self = this;

    window.addEventListener("resize", function () {
      var windowWidth = document.body.clientWidth;
      const mainstore = useMainStore();
      if (windowWidth <= 576) {
        if (mainstore.curpage == "Setting") {
          self.$router.push(`/`);
          mainstore.curpage = "";
        }
      } else {
        if (
          mainstore.curpage == "Bluetooth" ||
          mainstore.curpage == "Lte" ||
          mainstore.curpage == "Wifi" ||
          mainstore.curpage == "OCPPmode" ||
          mainstore.curpage == "Time" ||
          mainstore.curpage == "Language"
        ) {
          self.$router.push(`/Setting`);
          mainstore.curpage = "Setting";
        }
      }
    });
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  text-size-adjust: none;
}
body {
  background: #000;
}
@font-face {
  font-family: "SF Pro";
  src: url("./fonts/Inter-Regular.woff2") format("woff2");
  font-display: swap;
}
::-webkit-scrollbar {
  width: 5px;
}
.accountName {
  color: white;
  padding: 0 10px;
}
.phonediv {
  height: 65px;
  display: none;
}
/* Track */
::-webkit-scrollbar-track {
  background: black;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(91, 228, 114, 1);
}

.v-list {
  background-color: black !important;
  overflow: hidden;
  text-align: center;
}
.v-list-item {
  color: white !important;
}
.v-list-item--active {
  color: rgba(91, 228, 114, 1) !important;
}
* {
  font-family: "SF Pro";
}
.pcwrap {
  display: block;
}
</style>
<style scoped>
.pctopwrap {
  padding-top: 67px;
}
.logowrap {
  padding: 0 calc(26px - 1rem) 0 0 !important;
}
.active {
  color: rgba(91, 228, 114, 1) !important;
}
* {
  user-select: none;
}
.mainwrap {
  background-color: black;
}
.maincontent {
  width: 1280px;
  margin: 0 auto;
}
.leftbar {
  width: 65px;
  height: 520px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.1);
  box-shadow:
    0px 8px 30px rgba(0, 0, 0, 0.41),
    inset 0px 0px 12px rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(100px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 42px 0;
  align-items: center;
}
.leftbar img {
  cursor: pointer;
}
.v-bottom-navigation .v-bottom-navigation__content > .v-btn {
  font-size: inherit;
  height: 100%;

  text-transform: none;
  transition: inherit;
  width: 70px;
  border-radius: 0;
  padding: 0px;
  min-width: auto;
}
.navbar {
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
}
.navmenu {
  position: relative;
  list-style: none;
}
.navmenu li {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
}
.navbar a {
  padding: 12px;
  color: white;
  text-decoration: none;
  font-size: 17px;
}
.midaccount {
  cursor: pointer;
  position: relative;
}
.midaccountwrap {
  margin-left: auto;
  display: flex;
  text-align: center;
}

.menuwrap {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.9);
  position: absolute;
  z-index: 9999;
  right: 0;
  top: 120%;
  width: 150px;
  display: none;
}

.languagemenuwrap {
  left: 0;
}

.menuwrap li {
  background: rgba(255, 255, 255, 0.05);
  display: block;
  padding: 15px 16px;
  text-decoration: none;

  position: relative;

  cursor: pointer;
}
.menuwrap li a {
  color: black;
  user-select: none;
  color: rgba(107, 107, 107, 1);
}
.menuwrap li a:hover {
  color: rgba(91, 228, 114, 1);
}
.midtranslate {
  margin: 0 20px;
  color: rgba(107, 107, 107, 1);
  display: flex;
  position: relative;
  cursor: pointer;
}
.leftbarconent {
  width: calc(100% - 65px);
}
.settingnavbar {
  display: none;
}
/* 紅點 */
.red-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  background: #ff3b30;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.icon-wrap {
  position: relative;
  width: 47px;
  height: 47px;
}
@media (max-width: 576px) {
  .leftbarconent {
    width: 100%;
  }
  .phonediv {
    display: block;
  }
  .leftbar {
    position: -webkit-fixed;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    padding: 0px;
    align-content: center;
    flex-direction: row;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: none;
    backdrop-filter: none;
    z-index: 999;
  }
  .leftbar > div {
    line-height: 0;
  }
  .pcwrap {
    display: none;
  }
  .midtranslate {
    display: none;
  }
  .midaccountwrap {
    padding-right: 1rem;
    margin-left: 0;
  }
  .settingnavbar {
    display: block;
    padding-left: 10px;
  }
  .setting {
    cursor: pointer;
  }
  .navbar {
    justify-content: space-between;
  }
  .navbar {
    position: sticky;
    z-index: 99999;
    top: 0px;
    background-color: #000;
    padding: 10px 0px;
  }
  .settingnavbar .navbarul li {
    position: static;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #000;
    color: white;
    cursor: pointer;
  }
  .settingnavbar .navbarul li:hover {
    color: rgba(91, 228, 114, 1);
  }
  .settingnavbar .navbarul {
    position: absolute;
    width: 100%;
    left: 0px;
    list-style: none;
    padding: 10px;
    height: calc(100vh - 50px);
  }
  .settingnavbar .navbarul li span {
    margin-right: auto;
    padding-left: 20px;
  }
  .menuwrap {
    top: 170%;
  }
}

@media (max-height: 740px) {
  .pctopwrap {
    padding: 0;
  }
}
</style>
