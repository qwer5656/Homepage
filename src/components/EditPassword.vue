<template lang="">
  <div class="passwordwrap">
    <div class="container">
      <div class="content">
        <v-form class="formwrap" ref="passwordForm">
          <div>{{ $t("EditPasswordPage.NewPassword") }}</div>
          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            :append-inner-icon="show1 ? mdiEye : mdiEyeOff"
            :type="show1 ? 'text' : 'password'"
            label="password"
            @click:append-inner="show1 = !show1"
            variant="solo"
            v-model="newPassword"
            :rules="newPasswordrules"
            maxlength="16"
          ></v-text-field>
          <div>{{ $t("EditPasswordPage.ConfirmNewPassword") }}</div>
          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            :append-inner-icon="show ? mdiEye : mdiEyeOff"
            :type="show ? 'text' : 'password'"
            label="password"
            @click:append-inner="show = !show"
            variant="solo"
            v-model="confirmnewPassword"
            :rules="confirmnewPasswordrules"
            maxlength="16"
          ></v-text-field>
        </v-form>
        <div class="btwrap">
          <Nbt
            :title="$t('EditPasswordPage.Save')"
            enabled="true"
            @click="savedata()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Nbt from "./public/Nbt.vue";
import { useMainStore } from "@/stores/main";
import { ResultStore } from "@/stores/result";
import { ref, getCurrentInstance, watch } from "vue";
import { useI18n } from "vue-i18n";
import { mdiEye, mdiEyeOff } from '@mdi/js'
const { t, locale } = useI18n();
const instance = getCurrentInstance();
const proxy = instance?.proxy;
const show1 = ref(false);
const show = ref(false);
const newPassword = ref("");
const errortxt = ref("");
const confirmnewPassword = ref("");
const newPasswordrules = ref([
  (value) => {
    if (value) return true;
    return `${t("EditPasswordPage.NewPassword")} ${t("notNull")}`;
  },
]);

function updateRules() {
 savedata();
}

let confirmnewPasswordrules = ref([
  (value) => {
    if (errortxt.value !== "") {
      let temp = errortxt.value;
      errortxt.value = "";
      return temp;
    }
    if (value) return true;
    return `${t("EditPasswordPage.ConfirmNewPassword")} ${t("notNull")}`;
  },
]);

watch(locale, updateRules);

const savedata = function () {
  proxy.$refs.passwordForm.validate().then(function (res) {
    if (res.valid == true) {
      if (newPassword.value !== confirmnewPassword.value) {
        errortxt.value = "confirm New Password is not equal newPassword";
        proxy.$refs.passwordForm.validate();
      } else {
        let store = useMainStore();
        let data = JSON.parse(localStorage.getItem("userdata"));
        let token = JSON.parse(localStorage.getItem("token"));
        let obj = {};
        obj.accout = data.accout;
        obj.password = newPassword.value;
        obj.token = token;
        store.updatePassword(proxy, obj).then((res) => {
          let Result = ResultStore();
          if (res.success === undefined) {
            Result.errorres(res);
          } else if (res.success == true) {
            newPassword.value = "";
            confirmnewPassword.value = "";
            proxy.$refs.passwordForm.reset();
            Result.successres();
          }
        });
      }
    }
  });
};
</script>
<style>
.passwordwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  margin-bottom: 25px;
}
.passwordwrap {
  display: flex;
  justify-content: center;
}
.passwordwrap .container {
  width: 478px;
  height: 520px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
}
.passwordwrap .formwrap {
  color: white;
  width: 306px;
  margin: 20px auto;
}
.passwordwrap .content {
  padding: 86px 0;
}
.passwordwrap .btwrap {
  margin-top: 17px;
}

@media (max-width: 576px) {
  .passwordwrap .content {
    padding: 86px 30px;
  }
  .passwordwrap .formwrap {
    margin: 0;
    width: 100%;
  }
  .passwordwrap .btwrap {
    margin-top: 20px;
  }
}
</style>
