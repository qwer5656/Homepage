<template lang="">
  <div class="loginwrap">
    <div class="logincotainer">
      <div class="logincontent">
        <div class="logoimg">
          <img src="../assets/img/logo.png" alt="" />
        </div>
        <div class="title">Log In Account</div>
        <form class="formwrap">
          <v-text-field
          :prepend-inner-icon="mdiLockOutline"
            :append-inner-icon="show1 ? mdiEye : mdiEyeOff"
            :type="show1 ? 'text' : 'password'"
            label="password"
            @click:append-inner="show1 = !show1"
            variant="solo"
          ></v-text-field>
          <div class="chargebt" @click="checklogin">Login</div>
        </form>
      </div>
      <div class="loginchargepilewrap">
        <img src="../assets/img/loginlogo.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { mdiEye, mdiEyeOff,mdiLockOutline } from "@mdi/js";
export default {
  data() {
    return {
      show1: true,
      mdiEye,
      mdiEyeOff,
      mdiLockOutline,
      password: "",
    };
  },
  methods: {
    checklogin() {
      this.$emit("loginstauts");
      var object = { value: "true", timestamp: new Date().getTime() + 10000 };
      localStorage.setItem("login", JSON.stringify(object));
    },
  },
  beforeMount(){
    let val=localStorage.getItem("login");
    if(val!=null){
      this.$router.push("/");
    }
  }
};
</script>
<style>
.loginwrap .v-field {
  
 
 
  border-radius: 33px;
  background-color: black;
    cursor: text;
    color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  margin-bottom: 25px ;
  
}
.loginwrap .formwrap {
  margin-top: 33px;
}
.loginwrap {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
</style>
