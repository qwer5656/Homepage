import { defineStore } from "pinia";
import axios from "@/axios";
export const reverseStore = defineStore("reverse", {
  state: () => {
    return {
      apiurl: "ScheduleTask",
    };
  },
  actions: {
    getapiAll() {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios
        .get(this.apiurl +"/GetAll",token, true)
        .then((res) => {
            resolve(res);
        });
      });
    },
    getapi(cardId) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.get(this.apiurl + "/" + cardId,token, true).then((res) => {
          resolve(res);
        });
      });
    },
    postapi(data) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        data.token=token;
        axios.post(this.apiurl, data, true).then((res) => {
          resolve(res);
        });
      });
    },
    putapi(data) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        data.token=token;
       axios.put(this.apiurl, data, true).then((res) => {
          resolve(res);
        });
      });
    },
    deleteapi(id) {
      return new Promise((resolve, reject) => {
        axios.delete(this.apiurl+"/"+id, true).then((res) => {
          resolve(res);
        });
      });
    },
  },
});
