import { defineStore } from "pinia";

export const historyStore = defineStore("history", {
  state: () => {
    return {
      apiurl: "https://localhost:7120/api/Transactions",
    };
  },
  actions: {
    getapiAll(self) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        self.$axios.get(this.apiurl + "/GetAll/"+token+"/", true).then((res) => {
          resolve(res);
        });
      });
    },
    getapi(self, transactionId) {
      return new Promise((resolve, reject) => {
        self.$axios.get(this.apiurl + "/" + transactionId, true).then((res) => {
          resolve(res);
        });
      });
    },
  },
});
