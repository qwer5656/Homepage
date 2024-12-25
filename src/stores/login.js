import { defineStore } from "pinia";

export const loginStore = defineStore("login", {
  state: () => {
    return {
        apiurl:"Login"
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
            this.apiurl,data,false)
          .then((res) => {
            resolve(res);
          });
      });
    },
  },
});
