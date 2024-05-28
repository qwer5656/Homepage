import { defineStore } from "pinia";

export const historyStore = defineStore("history", {
  state: () => {
    return {
      apiurl: "https://localhost:7120/api/Transactions",
    };
  },
  actions: {
    getapiAll(self) {
      console.log(self);
      return new Promise((resolve, reject) => {
        self.$axios.get(this.apiurl + "/GetAll/Test1234/", true).then((res) => {
          resolve(res);
        });
      });
    },
    getapi(self, cardId) {
      console.log(self);
      return new Promise((resolve, reject) => {
        self.$axios.get(this.apiurl + "/" + cardId, true).then((res) => {
          resolve(res);
        });
      });
    },
  },
});
