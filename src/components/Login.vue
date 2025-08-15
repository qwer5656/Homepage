<template lang="">
  <div class="loginwrap">
    <UserInfo v-show="firstLogin" />
    <div class="logincotainer" v-show="!firstLogin">
      <div class="logincontent">
        <div class="logoimg">
          <img src="../assets/img/logo.png" alt="" />
        </div>
        <div class="title">Log In Account</div>
        <v-form class="formwrap" ref="entryForm">
          <v-text-field
            variant="solo"
            :type="text"
            label="Account"
            :rules="accountrules"
            v-model="accountdata"
            @keyup.enter="passwordConfirmationRule"
          ></v-text-field>
          <v-text-field
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="password"
            v-model="passworddata"
            @click:append-inner="show1 = !show1"
            :rules="passwordrules"
            variant="solo"
            @keyup.enter="passwordConfirmationRule"
          ></v-text-field>
          <div style="display: flex; justify-content: right; margin: 10px 0">
            <div style="color: #66ff80; cursor: pointer" @click="open">
              Forget Password?
            </div>
          </div>
          <div class="chargebt" @click="passwordConfirmationRule">Log in</div>
        </v-form>
      </div>
      <div class="loginchargepilewrap">
        <img src="../assets/img/loginlogo.png" alt="" />
      </div>
    </div>
    <v-dialog
      v-model="deletedialog"
      persistent
      width="auto"
      class="emaildialogwrap"
    >
      <div class="emaildialog">
        <div
          style="
            color: white;
            text-align: right;
            font-size: 40px;
            padding-right: 10px;
            cursor: pointer;
          "
        >
          <img src="../assets/img/Close.png" @click="close" alt="" />
        </div>
        <v-form class="formwrap" ref="entryForm1">
          <v-text-field
            label="Account"
            variant="solo"
            v-model="resetaccount"
            :rules="resetAccountrules"
          ></v-text-field>
          <v-text-field
            label="Email"
            variant="solo"
            v-model="emaildata"
            :rules="resetEmailrules"
          ></v-text-field>
          <div
            class="chargebt"
            @click="ResetpasswordConfirmationRule"
            style="background-color: blue; color: white"
          >
            Reset Password
          </div>
        </v-form>
      </div>
    </v-dialog>
  </div>
</template>
<script setup>
import { loginStore } from "@/stores/login";
import { ResultStore } from "@/stores/result";
import { useMainStore } from "@/stores/main";
import { ref, getCurrentInstance, onBeforeMount, computed } from "vue";
import UserInfo from "@/components/UserInfo.vue";

const instance = getCurrentInstance();
const proxy = instance?.proxy;
const show1 = ref(false);
const passworddata = ref("");
const accountdata = ref("");
const accounterror = ref("");
const passworderror = ref("");
const resetaccount = ref("");
const emaildata = ref("");
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
    return "password is not null";
  },
]);
const accountrules = ref([
  (value) => {
    if (accounterror.value !== "") {
      let temperror = accounterror.value;
      accounterror.value = "";
      return temperror;
    }
    if (value) return true;
    return "account is not null";
  },
]);

const resetEmailrules = ref([
  (value) => {
    if (resetemailerror.value !== "") {
      let temperror = resetemailerror.value;
      resetemailerror.value = "";
      return temperror;
    }
    if (value) return true;
    return "email is not null";
  },
]);
const resetAccountrules = ref([
  (value) => {
    if (resetaccounterror.value !== "") {
      let temperror = resetaccounterror.value;
      resetaccounterror.value = "";
      return temperror;
    }
    if (value) return true;
    return "account is not null";
  },
]);

const passwordConfirmationRule = function () {
  let login = loginStore();
  let useMain = useMainStore();
  proxy.$refs.entryForm.validate().then(function (res) {
    if (res.valid == true) {
      let obj = {};
      obj.accout = accountdata.value;
      obj.password = passworddata.value;
      login.accountlogin(proxy, obj).then((res) => {
        if (res.success == true) {
          let obj = {};
          obj.accout = res.data.accout;
          obj.userName = res.data.userName;
          localStorage.setItem("userdata", JSON.stringify(obj));
          localStorage.setItem("token", JSON.stringify(res.data.token));
          if (res.data.email == "") {
            useMain.firstLogin = true;
          } else {
            proxy.$router.push("/");
          }
        } else {
          if (res.data == undefined) {
            let Result = ResultStore();
            Result.errorres(res);
          } else if (res.data.error.indexOf("Account") != -1) {
            accounterror.value = res.data.error;
          } else {
            passworderror.value = res.data.error;
          }

          proxy.$refs.entryForm.validate();
        }
      });
    }
  });
};

const firstLogin = computed(() => {
  let useMain = useMainStore();
  return useMain.firstLogin;
});

const ResetpasswordConfirmationRule = function () {
  let login = loginStore();
  let Result = ResultStore();
  proxy.$refs.entryForm1.validate().then(function (res) {
    if (res.valid == true) {
      let obj = {};
      obj.accout = resetaccount.value;
      obj.email = emaildata.value;
      login.resetPassword(proxy, obj).then((res) => {
        if (res.success == true) {
          Result.successres();
          close();
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
onBeforeMount(() => {
  let val = localStorage.getItem("token");
  if (val != null && useMain.firstLogin == false) {
    proxy.$router.push("/");
  }
});
</script>
<style>
.loginwrap .error-message {
  color: red;
}
.loginwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  margin-bottom: 5px;
}
.loginwrap .formwrap {
  margin-top: 33px;
}
.loginwrap {
  max-height: -webkit-fill-available;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
}
.loginwrap .loginchargepilewrap {
  width: 570px;
  height: 518px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0px;
}
.loginwrap .logincotainer {
  display: flex;
}
.loginwrap .loginformwrap span {
  width: 92px;
  height: 18px;
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5px;
  text-align: center;
  color: rgba(107, 107, 107, 1);
}
.loginwrap .logincontent {
  width: 478px;
  height: 518.49px;
  padding: 30px 86px 74px 86px;
  border-radius: 20px;
  background: rgb(255 255 255 / 10%);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.loginwrap .chargebt {
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

.loginwrap .title {
  font-family: SF Pro;
  font-size: 32px;
  font-weight: 510;
  line-height: 40px;
  text-align: center;
  margin-top: 55px;
}
.loginwrap .logoimg {
  width: 102px;
  height: 13.49px;
  margin-top: 35px;
}
@media (max-width: 576px) {
  .loginwrap .loginchargepilewrap {
    display: none;
  }
  .loginwrap .logincontent {
    width: 100%;
    box-sizing: border-box;
    padding: 50px 10px;
    height: auto;
  }
  .loginwrap .title {
    font-size: 25px;
  }
  .emaildialogwrap .emaildialog {
    width: 100%;
  }
  .loginwrap {
    width: 100%;
  }
  .loginwrap .logincotainer {
    width: 90%;
  }
  .emaildialogwrap  .v-overlay__content{
    width: 100% !important;
  }
  .emaildialogwrap .chargebt {
    padding: 0 20px;
  }
}
</style>
