import { defineStore } from "pinia";

export const chargePileStore = defineStore("chargePile", {
  state: () => {
    return {
      apiurl:"ChargePileOperation"
    };
  },
  actions: {
    RemoteStartTransaction(self) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        self.$axios.get(this.apiurl + "/RemoteStartTransaction?connect=1",token, false).then((res) => {
          resolve(res);
        });
      });
    },
    RemoteStopTransaction(self) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        self.$axios.get(this.apiurl + "/RemoteStopTransaction",token, true).then((res) => {
          resolve(res);
        });
      });
    },
    Reset(self){
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        self.$axios.get(this.apiurl + "/Reset",token, true).then((res) => {
          resolve(res);
        });
      });
    },
    GetChargePileStatus(self) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        self.$axios.get(this.apiurl + "/ChargePileStatus",token, false).then((res) => {
          resolve(res);
        });
      });
    },
    GetChargePiledata(self) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        self.$axios.get(this.apiurl + "/ChargePiledata",token, false).then((res) => {
          resolve(res);
        });
      });
    },
  },
});
