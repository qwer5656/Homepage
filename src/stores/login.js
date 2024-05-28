import { defineStore } from "pinia";

export const loginStore = defineStore("login", {
  state: () => {
    return {
        apiurl:"https://localhost:7120/api/Login"
    };
  },
  actions: {
    accountlogin(self,data) {
      console.log(self);
      return new Promise((resolve, reject) => {
        self.$axios
          .post(
            this.apiurl,data,true)
          .then((res) => {
            resolve(res);
          });
      });
    }
  },
});
