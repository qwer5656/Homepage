<template lang="">
  <div class="userinfowrap">
    <div class="userinfocotainer">
      <div class="userinfocontent">
        <div class="logoimg">
          <img src="../assets/img/logo.png" alt="" />
        </div>
        <div class="title">{{ $t("Loginpage.updateAccountInformation") }}
          <h6>{{ $t("Loginpage.firstTimeLogin") }}</h6>
        </div>
        <v-form class="formwrap" ref="entryForm">
          <v-text-field
            :type="text"
            label="UserName"
            v-model="userNamedata"
            @click:append-inner="show1 = !show1"
            :rules="userNamerules"
            variant="solo"
            maxlength="10"
            @keyup.enter="passwordConfirmationRule"
          ></v-text-field>
          <v-text-field
            variant="solo"
            :type="text"
            label="Email"
            :rules="emailrules"
            v-model="emaildata"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="show1 ? mdiEye : mdiEyeOff"
            :type="show1 ? 'text' : 'password'"
            label="password"
            v-model="passworddata"
            @click:append-inner="show1 = !show1"
            :rules="passwordrules"
            variant="solo"
            @keyup.enter="passwordConfirmationRule"
            maxlength="16"
          ></v-text-field>
          <div class="chargebt" @click="passwordConfirmationRule">{{ $t("Loginpage.sumbit") }}</div>
          <div class="logout" @click="logout">{{ $t("Loginpage.logout") }}</div>
        </v-form>
      </div>
      <div class="loginchargepilewrap">
        <img src="../assets/img/loginlogo.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { loginStore } from "@/stores/login";
import { ResultStore } from "@/stores/result";
import { ref, getCurrentInstance, onBeforeMount } from "vue";
import { useMainStore } from "@/stores/main";
import { useI18n } from "vue-i18n";
import { mdiEye, mdiEyeOff } from '@mdi/js'
const { t,locale  } = useI18n();
const instance = getCurrentInstance();
const proxy = instance?.proxy;
const show1 = ref(false);
const passworddata = ref("");
const emaildata = ref("");
const userNamedata = ref("");
const emailerror = ref("");
const passworderror = ref("");
const userNameerror = ref("");
const commonDomains = [
  "gmail.com",
  "yahoo.com.tw",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
]; // 自定義
const resetaccount = ref("");

const resetaccounterror = ref("");
const resetemailerror = ref("");

const deletedialog = ref(false);
const passwordrules = ref([
  (value) => {
    if (passworderror.value !== "") {
      let temperror = passworderror.value;
      passworderror.value = "";
      return temperror;
    }
    if (value) return true;
     return `${t("Loginpage.password")} ${t("notNull")}`;
  },
]);
const emailrules = ref([
  (value) => {
    if (emailerror.value !== "") {
      const tempError = emailerror.value;
      emailerror.value = "";
      return tempError;
    }

    if (!value) {
      return `${t("Loginpage.email")} ${t("notNull")}`;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) {
      return `${t("Loginpage.emailFormaterror")}`;
    }

    // 👇 新增：檢查 domain
    const domain = value.split("@")[1]?.toLowerCase();
    if (!commonDomains.includes(domain)) {
      return `Email 網域需為常見信箱（${commonDomains.join(", ")}）`;
    }

    return true;
  },
]);
const userNamerules = ref([
  (value) => {
    if (userNameerror.value !== "") {
      let temperror = userNameerror.value;
      userNameerror.value = "";
      return temperror;
    }
    if (value) return true;
      return `${t("Loginpage.userName")} ${t("notNull")}`;
  },
]);

const passwordConfirmationRule = function () {
  let login = loginStore();
  let Result = ResultStore();
  proxy.$refs.entryForm.validate().then(function (res) {
    if (res.valid == true) {
      let obj = {};
      let data = JSON.parse(localStorage.getItem("userdata"));
      let token = JSON.parse(localStorage.getItem("token"));

      obj.accout = data.accout;
      obj.username = userNamedata.value;
      obj.email = emaildata.value;
      obj.token = token;
      obj.password = passworddata.value;
      login.updateAccount(proxy, obj).then((res) => {
        if (res.success == true) {
          let userdata = {};
          userdata.accout = obj.accout;
          userdata.userName = obj.username;
          localStorage.setItem("token", JSON.stringify(res.data));
          localStorage.setItem("userdata", JSON.stringify(userdata));
          Result.successres();
          proxy.$router.push("/");
        } else {
          if (res.data != undefined) {
            Result.errorres(res.data);
          }

          proxy.$refs.entryForm1.validate();
        }
      });
    }
  });
};

const close = function () {
  deletedialog.value = false;
};
const open = function () {
  resetaccount.value = "";
  emaildata.value = "";
  deletedialog.value = true;
};
const logout = function () {
  let useMain = useMainStore();
  localStorage.removeItem("token");
  localStorage.removeItem("userdata");
  proxy.$router.push("/Login");
  useMain.firstLogin = false;
};
onBeforeMount(() => {});
</script>
<style>
.userinfowrap .error-message {
  color: red;
}
.userinfowrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  margin-bottom: 5px;
}
.userinfowrap .formwrap {
  margin-top: 33px;
}
.userinfowrap {
  max-height: -webkit-fill-available;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
}
.userinfowrap .loginchargepilewrap {
  width: 570px;
  height: 518px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0px;
}
.userinfowrap .userinfocotainer {
  display: flex;
  align-items: center;
}
.userinfowrap .loginformwrap span {
  width: 92px;
  height: 18px;
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5px;
  text-align: center;
  color: rgba(107, 107, 107, 1);
}
.userinfowrap .userinfocontent {
  width: 478px;
  height: 640px;
  padding: 30px 30px 30px 30px;
  border-radius: 20px;
  background: rgb(255 255 255 / 10%);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.userinfowrap .chargebt {
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
  margin-top: 15px;
}

.userinfowrap .logout {
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
    #e7adad 0%,
    #f53e3e 100%
  );
  border-radius: 32px;
  cursor: pointer;
  margin-top: 15px;
}
.emaildialogwrap .emaildialog {
  width: 500px;
  height: 350px;
  background-color: rgba(0, 0, 0, 0.5);
}

.emaildialogwrap .chargebt {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 93px;
  gap: 10px;

  height: 30px;
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  );
  border-radius: 32px;
  cursor: pointer;
  margin-top: 15px;
}
.emaildialogwrap .formwrap {
  padding: 0 30px;
}

.userinfowrap .title {
  font-family: SF Pro;
  font-size: 32px;
  font-weight: 510;
  line-height: 40px;
  text-align: center;
  margin-top: 35px;
}
.userinfowrap .logoimg {
  width: 102px;
  height: 13.49px;
  margin-top: 35px;
}
@media (max-width: 576px) {
  .userinfowrap .loginchargepilewrap {
    display: none;
  }
  .userinfowrap .userinfocontent {
    width: 100%;
    box-sizing: border-box;
    padding: 50px 10px;
    height: auto;
  }

  .userinfowrap{
    width: 100%;
  }
  .userinfowrap .userinfocotainer{
    width: 90%;
  }
  .userinfowrap .title {
    font-size: 25px;
  }
  .emaildialogwrap .emaildialog {
    width: 100%;
  }
}
</style>
