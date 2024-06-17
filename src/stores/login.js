import { defineStore } from "pinia";

export const loginStore = defineStore("login", {
  state: () => {
    return {
        apiurl:"https://localhost:7120/api/Login"
    };
  },
  actions: {
    accountlogin(self,data) {
  
      return new Promise((resolve, reject) => {
        self.$axios
          .post(
            this.apiurl,data,true)
          .then((res) => {
            console.log(res);
            resolve(res);
          });
      });
    },
    tokenauth(self,data) {
      return new Promise((resolve, reject) => {
        self.$axios
          .get(
            this.apiurl+"?token="+data,false)
          .then((res) => {
            resolve(res);
          });
      });
    },
  },
});
