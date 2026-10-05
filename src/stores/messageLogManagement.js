import { defineStore } from "pinia";
import axios from "@/axios";
export const messageLogManagementStore = defineStore("messageLogManagement", {
  state: () => {
    return {
      apiurl: "MessageLog",
    };
  },
  getters: {},
  actions: {
    async GetChargeLogAllList(self) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios
          .get(this.apiurl + `/GetSingleChargeLogAllList?token=${token}`, false)
          .then((res) => {
            resolve(res);
          });
      });
    },
  },
});
