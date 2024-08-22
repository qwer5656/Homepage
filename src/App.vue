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
            <li @click="goto('Bluetooth')">
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
            </li>
            <li @click="goto('Language')">
              <img src="./assets/img/Languageicon.png" alt="" />
              <span>Language</span>
              <img src="./assets/img/Previous_2.png" alt="" />
            </li>
          </ul>
        </div>
        <a href="./" class="logowrap">
          <img src="./assets/img/logo.png" />
        </a>

        <div class="midaccountwrap">
          <div class="midtranslate" @click="openmenu('languagewrap')">
            <img src="./assets/img/Language.png" />
            <div style="margin: 0 10px">
              {{ this.$i18n.locale.toLocaleUpperCase() }}
            </div>
            <img src="./assets/img/Dropdown.png" />
          </div>
          <div class="midaccount" @click="openmenu('accountwrap')">
            <img src="./assets/img/people.png" />
          </div>
          <ul class="menuwrap" id="accountwrap">
            <li @click="editpassword">
              <a class="" style="padding: 0; font-size: 13px; font-weight: bold"
                >Change Password</a
              >
            </li>
            <li @click="logout">
              <a class="" style="font-size: 13px; font-weight: bold">Logout</a>
            </li>
          </ul>

          <ul class="menuwrap" id="languagewrap">
            <!-- <li @click="changelanguage('zh')">
              <a :class="{ active: lang }">中文</a>
            </li> -->
            <li @click="changelanguage('en')">
              <a
                :class="{ active: !lang }"
                style="font-size: 13px; font-weight: bold"
                >English</a
              >
            </li>
          </ul>
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
              :src="curpage == 'Touchstart' ? Touch_Start_On : Touch_Start_Off"
              alt=""
              @click="goto('Touchstart')"
            />
          </div>
          <div>
            <img
              :src="curpage == 'Startmode' ? Mode_On : Mode_Off"
              alt=""
              @click="goto('Startmode')"
            />
          </div>
          <div class="pcwrap">
            <img
              :src="curpage == 'Setting' ? Settings_On : Settings_Off"
              alt=""
              @click="goto('Setting')"
            />
          </div>
        </div>
        <div class="leftbarconent">
          <router-view @loginstauts="loginchange" />
        </div>
      </div>
      <div class="phonediv"></div>
    </v-main>

    <Loading v-if="isshow"></Loading>
    <Result/>
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
import Touch_Start_On from "@/assets/img/Touch Start_On.png";
import Touch_Start_Off from "@/assets/img/Touch Start_Off.png";
import Mode_On from "@/assets/img/Mode_On.png";
import Mode_Off from "@/assets/img/Mode_Off.png";
import Settings_On from "@/assets/img/Settings_On.png";
import Settings_Off from "@/assets/img/Settings_Off.png";
import Result  from "@/components/Result.vue";
import qrcodsscan from "@/assets/img/qrcodsscan.png";
import QrcodeEnabled from "@/assets/img/QrcodeEnabled.png";

import {
  mdiAccount,
} from "@mdi/js";

export default {
  name: "App",
  components: {
    Loading,
    Result
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
  },
  data: () => ({
    loginshow: true,
    mdiAccount,
    footvalue: -1,
    icontouch: false,
    loadingshow: true,
    navbarstatus: false,
    Charger_On,
    Touch_Start_On,
    Touch_Start_Off,
    Charger_Off,
    History_On,
    History_Off,
    Schdule_On,
    Schdule__Off,
    Mode_On,
    Mode_Off,
    Settings_On,
    Settings_Off,
  }),
  methods: {
    changenavbarstatus() {
      this.navbarstatus = !this.navbarstatus;
    },
    goto(val) {
      this.$router.push(`/${val}`);
    },
    loginchange() {
      this.loginshow = true;
      this.footvalue = 0;
      this.$router.push(`/`);
    },
    editpassword() {
      this.footvalue = -1;
      this.$router.push(`/EditPassword`);
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
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      this.loginshow = false;
      this.$router.push(`/Login`);
    },
    changelanguage(type) {
      document.querySelector("#languagewrap").style.display = "none";
      this.$i18n.locale = type;
    },
    checklogin() {
<<<<<<< HEAD
      let object = JSON.parse(localStorage.getItem("login"));
      if (object != null) {
        this.loginshow = true;
        return true;
      }

=======
      let token = JSON.parse(localStorage.getItem("token"));
      let loginstore = loginStore();
      let self = this;
      if (token != null) {
        loginstore.tokenauth(self, token).then((res) => {
          if (res.success === true) {
            this.loginshow = true;
          } else {
           this.logout();
          }
        });
        return true;
      }
>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
      this.loginshow = false;
      this.$router.push(`/Login`);
    },
  },
  beforeMount() {
<<<<<<< HEAD
    this.checklogin();
  },
  watch: {
    "$route.path"(topath, frompath) {
      this.checklogin();
=======
    if (this.$route.path == "/") {
      this.checklogin();
    }
  },
  watch: {
    "$route.path"(topath, frompath) {
        this.checklogin();
>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
    },
  },
  mounted() {
    let self = this;
    window.addEventListener("resize", function () {
<<<<<<< HEAD
      console.log("1");
      var windowWidth = document.body.clientWidth;
      const mainstore = useMainStore();
      console.log(windowWidth, mainstore.curpage);
=======
      var windowWidth = document.body.clientWidth;
      const mainstore = useMainStore();

>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
      if (windowWidth <= 576) {
        if (mainstore.curpage == "Setting") {
          self.$router.push(`/`);
          mainstore.curpage = "";
        }
      } else {
        if (
          mainstore.curpage == "Bluetooth" ||
          mainstore.curpage == "LTE" ||
          mainstore.curpage == "Wifi" ||
          mainstore.curpage == "OCPP" ||
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
  src: url("./assets/fonts/SF-Pro.ttf") format("truetype");
}
::-webkit-scrollbar {
  width: 5px;
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
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.41),
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
  background: rgba(255, 255, 255, 0.05);
  position: absolute;
  z-index: 9999;
  right: 0;
  top: 80%;
  width: 150px;
  display: none;
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

  cursor: pointer;
}
.leftbarconent {
  width: calc(100% - 65px);
}
.settingnavbar {
  display: none;
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
  .settingnavbar .navbarul li:hover{
    
    color: rgba(91, 228, 114, 1);

  }
  .settingnavbar .navbarul {
    position: absolute;
    width: 100%;
    left: 0px;
    list-style: none;
    padding: 10px;
    height: calc(100vh - 46px);
  }
  .settingnavbar .navbarul li span {
    margin-right: auto;
    padding-left: 20px;
  }
}

@media (max-height: 740px) {
  .pctopwrap {
    padding: 0;
    
  }
}
</style>
