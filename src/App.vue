<template>
  <v-app @click="startDrag">
    <v-main>
      <div class="navbar navmenu" v-if="loginshow">
        <a href="#"> <img src="./assets/img/logo.jpg" width="80px" /></a>

        <div class="midaccountwrap">
          <v-icon
            class="midtranslate"
            @click="openmenu('languagewrap')"
            :icon="mdiTranslate"
          />

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

      <div class="footer" v-if="loginshow">
        <v-bottom-navigation v-model="footvalue" color="primary">
          <v-btn value="Index" @click="goto('')">
            <v-icon :icon="mdiHome" />
            <span>{{ $t("Apppage.Footer.Index") }}</span>
          </v-btn>

          <v-btn value="History" @click="goto('History')">
            <v-icon :icon="mdiHistory" />
            <span>{{ $t("Apppage.Footer.History") }}</span>
          </v-btn>

          <v-btn value="Reserve" @click="goto('Reserve')">
            <v-icon :icon="mdiCalendarClock" />
            <span>{{ $t("Apppage.Footer.Reserve") }}</span>
          </v-btn>
          <v-btn value="StartMode" @click="goto('Startmode')">
            <v-icon :icon="mdiGestureTapBox" />
            <span>{{ $t("Apppage.Footer.StartMode") }}</span>
          </v-btn>
          <v-btn value="Setting" @click="goto('Setting')">
            <v-icon :icon="mdiCog" />
            <span>{{ $t("Apppage.Footer.Setting") }}</span>
          </v-btn>
        </v-bottom-navigation>
      </div>
      <div style="padding-top: 10px">
        <router-view @loginstauts="loginchange" />
      </div>
 
    </v-main>
    <Loading v-if="isshow"></Loading>
  </v-app>
</template>

<script>
import Loading from "./components/Loading.vue";
import { useCounterStore } from '@/stores/counter'
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
  components:{
    Loading
  },
  computed:{
    isshow(){
      const counter = useCounterStore()
      return counter.loading;
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
    loadingshow:true
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
      console.log("1");
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
      // let dateString = object.timestamp;
      // let nowtimes = new Date().getTime();

      // if (nowtimes < dateString) {
      //   this.loginshow = true;
      //   return true;
      // }
    }

    this.loginshow = false;
    this.$router.push(`/Login`);
  },
};
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
  z-index: 100;
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
  background-color: white;

  box-shadow: 0 2px 5px #e9e9e9;
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
}
@media screen and (max-width: 500px) {
  .midaccount {
  }
}
</style>
