import { defineStore } from "pinia";
import axios from "@/axios";
export const electricityStore = defineStore("Electricity", {
  state: () => {
    return {
      apiurl: "Electricity",
    };
  },
  actions: {
    postapi(data) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        console.log(token, data);
        data.token = token;
        axios.post(this.apiurl, data, true).then((res) => {
          resolve(res);
        });
      });
    },
    getapi() {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.get(this.apiurl, token, true).then((res) => {
          resolve(res);
        });
      });
    },
  },
});
