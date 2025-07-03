import { defineStore } from "pinia";
import axios from "@/axios";
export const loginStore = defineStore("login", {
  state: () => {
    return {
      apiurl: "Login",
    };
  },
  actions: {
    accountlogin(self, data) {
      return new Promise((resolve, reject) => {
        axios.post(this.apiurl, data, true).then((res) => {
          console.log(res);
          resolve(res);
        });
      });
    },
    resetPassword(self, data) {
      return new Promise((resolve, reject) => {
        axios.post("ForgetPassword", data, true).then((res) => {
          console.log(res);
          resolve(res);
        });
      });
    },
    tokenauth(self, data) {
      return new Promise((resolve, reject) => {
        axios.get(this.apiurl, data, false).then((res) => {
          resolve(res);
        });
      });
    },
  },
});
