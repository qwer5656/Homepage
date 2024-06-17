import { defineStore } from "pinia";

export const settingStore = defineStore("setting", {
  state: () => {
    return {
      apiurl: "https://localhost:7120/api/Setting",
    };
  },
  actions: {
    getapi(self, methods) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));

        self.$axios
          .get(this.apiurl + "/" + token + "/" + methods, true)
          .then((res) => {
            resolve(res);
          });
      });
    },
    postapi(self, data) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        data.token = token;

        self.$axios.post(this.apiurl, data, true).then((res) => {
          resolve(res);
        });
      });
    },
    putapi(self, data) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        data.token = token;
        self.$axios.put(this.apiurl, data, true).then((res) => {
          resolve(res);
        });
      });
    },
  },
});
