<template>
  <v-app @click="startDrag" class="mainwrap">
    <v-main class="maincontent" >
      <div class="navbar navmenu" v-if="loginshow">
        <a href="#"> <img src="./assets/img/logo.png" /></a>

        <div class="midaccountwrap">

          <img class="midtranslate" src="./assets/img/Language.png"   
            @click="openmenu('languagewrap')">
          <v-icon
            class="midaccount"
            :icon="mdiAccount"
            @click="openmenu('accountwrap')"
          />
          <ul class="menuwrap" id="accountwrap">
            <li @click="editpassword">
              <a class="active">修改密碼</a>
            </li>
            <li @click="logout">
              <a class="active">登出</a>
            </li>
          </ul>

          <ul class="menuwrap" id="languagewrap">
            <li @click="changelanguage('zh')">
              <a class="active">中文</a>
            </li>
            <li @click="changelanguage('en')">
              <a class="active">English</a>
            </li>
          </ul>
        </div>
      </div>
      <div style="padding-top: 67px;" v-if="loginshow"></div>
      <div style="display: flex;">
        
        <div class="leftbar" v-if="loginshow">
          <div class="Charger">
            <img src="./assets/img/Charger_On.png" v-if="curpage==''" alt="" @click="goto('')" />
            <img src="./assets/img/Charger_Off.png" v-else alt="" @click="goto('')" />
          </div>
          <div>
            <img src="./assets/img/History_On.png" v-if="curpage=='History'" alt="" @click="goto('History')" />
            <img src="./assets/img/History_Off.png" v-else alt="" @click="goto('History')" />
          </div>
          <div>
            <img src="./assets/img/Schdule_On.png" v-if="curpage=='Reserve'" alt="" @click="goto('Reserve')" />
            <img src="./assets/img/Schdule__Off.png" v-else alt="" @click="goto('Reserve')" />
          </div>
          <div>
            <img src="./assets/img/Touch Start_On.png" v-if="curpage=='Touchstart'" alt="" @click="goto('Touchstart')" />
            <img src="./assets/img/Touch Start_Off.png" v-else alt="" @click="goto('Touchstart')" />
          </div>
          <div>
            <img src="./assets/img/Mode_On.png" v-if="curpage=='Startmode'" alt="" @click="goto('Startmode')" />
            <img src="./assets/img/Mode_Off.png" v-else alt="" @click="goto('Startmode')" />
          </div>
          <div>
            <img src="./assets/img/Settings_On.png" v-if="curpage=='Setting'" alt="" @click="goto('Setting')" />
            <img src="./assets/img/Settings_Off.png" v-else alt="" @click="goto('Setting')" />
          </div>
        </div>
        <div class="leftbarconent" >
          <router-view @loginstauts="loginchange" />
        </div>
      </div>
    </v-main>
    <Loading v-if="isshow"></Loading>
    
  </v-app>
</template>

<script>
import Loading from "./components/Loading.vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiHome,
  mdiHistory,
  mdiGestureTapBox,
  mdiCalendarClock,
  mdiCog,
  mdiTranslate,
} from "@mdi/js";

export default {
  name: "App",
  components: {
    Loading,
  },
  computed: {
    isshow() {
      const mainstore = useMainStore();
      return mainstore.loading;
    },
    curpage(){
      const mainstore = useMainStore();
      return mainstore.curpage;
    }
  },
  data: () => ({
    loginshow: false,
    mdiAccount,
    mdiHome,
    mdiHistory,
    mdiGestureTapBox,
    mdiCalendarClock,
    mdiCog,
    mdiTranslate,
    footvalue: -1,
    icontouch: false,
    loadingshow: true,
  }),
  methods: {
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
        console.log(languageobj);
        languageobj.style.display = "none";
      }
      this.icontouch = "none";
    },
    logout() {
      localStorage.removeItem("login");
      this.loginshow = false;
      this.$router.push(`/Login`);
    },
    changelanguage(type) {
      document.querySelector("#languagewrap").style.display = "none";
      this.$i18n.locale = type;
    },
  },
  beforeMount() {
    let object = JSON.parse(localStorage.getItem("login"));

    if (object != null) {
      this.loginshow = true;
      return true;
    }

    this.loginshow = false;
    this.$router.push(`/Login`);
    
  },
};
</script>
<style>
   .v-list {
  background-color:black !important;
  overflow: hidden;
   text-align: center;
  
}
 .v-list-item{
  color:white !important;
}
.v-list-item--active{
  color:rgba(91, 228, 114, 1) !important;
}
.v-overlay-container{
  scrollbar-color: rgba(91, 228, 114, 1) black;
  scrollbar-width: thin;
}
</style>
<style scoped>
*{
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
.leftbar img{
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
  transform: scale(1.5);
  margin-right: 20px;
  cursor: pointer;
  color: white;
}
.midaccountwrap {
  margin-left: auto;
}

.menuwrap {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
  position: absolute;
  z-index: 9999;
  right: 0;
  top: 80%;
  width: 150px;
  display: none;
}

.menuwrap li {
  background-color: white;
  display: block;
  padding: 15px 16px;
  text-decoration: none;
  box-shadow: 0px 0px 5px #f1f1f1;
  position: relative;

  cursor: pointer;
}
.menuwrap li a {
  color: black;
  user-select: none;
}

.midtranslate {
  margin: 0 20px;
  color: white;
  vertical-align: middle;
  cursor: pointer;
}
.leftbarconent{
  width: calc(100% - 65px);
}
@media screen and (max-width: 675px) {
  
}


</style>
