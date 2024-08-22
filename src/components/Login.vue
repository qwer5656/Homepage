<template lang="">
  <div class="loginwrap">
    <div class="logincotainer">
      <div class="logincontent">
        <div class="logoimg">
          <img src="../assets/img/logo.png" alt="" />
        </div>
        <div class="title">Log In Account</div>
        <v-form class="formwrap" ref="entryForm">
          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            :append-inner-icon="show1 ? mdiEye : mdiEyeOff"
            :type="show1 ? 'text' : 'password'"
            label="password"
            v-model="passworddata"
            @click:append-inner="show1 = !show1"
            :rules="rules"
            variant="solo"
            @keyup.enter="passwordConfirmationRule"
          ></v-text-field>
          <div class="chargebt" @click="passwordConfirmationRule" >Log in</div>
        </v-form>
      </div>
      <div class="loginchargepilewrap">
        <img src="../assets/img/loginlogo.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { mdiEye, mdiEyeOff, mdiLockOutline } from "@mdi/js";
import { useMainStore } from "@/stores/main";
export default {
  data() {
    return {
      show1: false,
      mdiEye,
      mdiEyeOff,
      mdiLockOutline,
      passworddata: "",
      errormessage: "password is error",
      sumbitenabled: false,
      rules: [
        (value) => {
          if (this.sumbitenabled == true) {
            this.sumbitenabled = false;
            if (this.passworddata != "1234") {
              return "password is not correct";
            }
            return true;
          }
          if (value) return true;
          return "password is error";
        },
      ],
    };
  },
  methods: {
    passwordConfirmationRule() {
      this.sumbitenabled = true;
      let self = this;
      this.$refs.entryForm.validate().then(function (res) {
        if (res.valid == true) {
          var object = {
            value: "true",
            timestamp: new Date().getTime() + 10000,
          };
          localStorage.setItem("login", JSON.stringify(object));

          const mainstore = useMainStore();
          mainstore.loading = true;

          setTimeout(function () {
            mainstore.loading = false;
            setTimeout(function () {
              self.$emit("loginstauts");
            }, 10);
          }, 1000);
        }
      });
    },
  },
  beforeMount() {
    let val = localStorage.getItem("login");
    if (val != null) {
      this.$router.push("/");
    }
  },
};
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
  margin-bottom: 25px;
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
  padding: 74px 86px 74px 86px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
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
}
</style>

