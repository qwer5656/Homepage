<template lang="">
  <div class="passwordwrap">
    <div class="container">
      <div class="content">
        <v-form class="formwrap" ref="passwordForm">
          <div>New Password</div>
          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            :append-inner-icon="show1 ? mdiEye : mdiEyeOff"
            :type="show1 ? 'text' : 'password'"
            label="password"
            @click:append-inner="show1 = !show1"
            variant="solo"
            v-model="newPassword"
            :rules="newPasswordrules"
          ></v-text-field>
          <div>Confirm New Password</div>
          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            :append-inner-icon="show ? mdiEye : mdiEyeOff"
            :type="show ? 'text' : 'password'"
            label="password"
            @click:append-inner="show = !show"
            variant="solo"
            v-model="confirmnewPassword"
            :rules="confirmnewPasswordrules"
          ></v-text-field>
        </v-form>
        <div class="btwrap">
          <Nbt title="Save" enabled="true" @click="savedata()" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mdiEyeOff, mdiEye } from "@mdi/js";
import Nbt from "./public/Nbt.vue";
import { useMainStore } from "@/stores/main";
import { ResultStore } from "@/stores/result";
export default {
  data() {
    return {
      visible: false,
      visible1: false,
      mdiEyeOff,
      mdiEye,
      show1: false,
      show: false,
      newPassword: "",
      errortxt: "",
      confirmnewPassword: "",
      newPasswordrules: [
        (value) => {
          if (value) return true;
          return "newPassword is not null";
        },
      ],
      confirmnewPasswordrules: [
        (value) => {
          if (this.errortxt !== "") {
            let temp = this.errortxt;
            this.errortxt = "";
            return temp;
          }
          if (value) return true;
          return "confirm New Password is not null";
        },
      ],
    };
  },
  components: {
    Nbt,
  },
  methods: {
    savedata() {
      let self = this;
      this.$refs.passwordForm.validate().then(function (res) {
        if (res.valid == true) {
          if (self.newPassword !== self.confirmnewPassword) {
            self.errortxt = "confirm New Password is not equal newPassword";
            self.$refs.passwordForm.validate();
          } else {
            let store = useMainStore();
            let data = JSON.parse(localStorage.getItem("userdata"));
            let token = JSON.parse(localStorage.getItem("token"));
            let obj = {};
            obj.accout = data.accout;
            obj.password = self.newPassword;
            obj.token = token;
            store.updatePassword(self, obj).then((res) => {
              let Result = ResultStore();
              if (res.success === undefined) {
                Result.errorres(res);
              } else if (res.success == true) {
                self.newPassword = "";
                self.confirmnewPassword = "";
                self.$refs.passwordForm.reset();
                Result.successres();
              }
            });
          }
        }
      });
    },
  },
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
  }
  .passwordwrap .btwrap {
    margin-top: 20px;
  }
  .passwordwrap .formwrap {
    width: 100%;
  }
}
</style>
