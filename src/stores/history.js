import { defineStore } from "pinia";
import axios from "@/axios";
export const historyStore = defineStore("history", {
  state: () => {
    return {
      apiurl: "Transactions",
    };
  },
  actions: {
    getapiAll(self) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.get(this.apiurl + "/GetAll", token, true).then((res) => {
          resolve(res);
        });
      });
    },
    getapi(transactionId) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios
          .get(this.apiurl + "/" + transactionId, token, true)
          .then((res) => {
            resolve(res);
          });
      });
    },
    getfinsh() {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.get(this.apiurl + "/GetFinish", token, true).then((res) => {
          resolve(res);
        });
      });
    },
    getapiInterval(startTime, endTime) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios
          .get(
            this.apiurl +
              "/GetTransactionIntervalAll?startTime=" +
              startTime +
              "&endTime=" +
              endTime,
            token,
            true,
          )
          .then((res) => {
            resolve(res);
          });
      });
    },
    getAllToday() {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.get(this.apiurl + "/GetAllToday", token, true).then((res) => {
          resolve(res);
        });
      });
    },
    GetchargeTransactions(startTime, endTime) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios
          .get(
            this.apiurl +
              "/GetchargeTransactions?startTime=" +
              startTime +
              "&endTime=" +
              endTime,
            token,
            true,
          )
          .then((res) => {
            resolve(res);
          });
      });
    },
  },
});
