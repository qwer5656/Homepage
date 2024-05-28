import { defineStore } from "pinia";

export const addCardStore = defineStore("addCard", {
  state: () => {
    return {
      apiurl: "https://localhost:7120/api/Card",
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
    postapi(self, data) {
      return new Promise((resolve, reject) => {
        self.$axios.post(this.apiurl, data, true).then((res) => {
          resolve(res);
        });
      });
    },
    putapi(self, data) {
      return new Promise((resolve, reject) => {
        self.$axios.put(this.apiurl, data, true).then((res) => {
          resolve(res);
        });
      });
    },
    deleteapi(self, id) {
      return new Promise((resolve, reject) => {
        self.$axios.delete(this.apiurl+"/"+id, true).then((res) => {
          resolve(res);
        });
      });
    },
  },
});
