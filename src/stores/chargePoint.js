import { defineStore } from "pinia";
import axios from "@/axios";
export const chargePointStore = defineStore("chargePoint", {
  state: () => {
    return {
      apiurl: "ChargePoint",
    };
  },
  actions: {
    GetClientChargePoint(self) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.get(this.apiurl + "/ClientChargePoint", token, false).then((res) => {
          resolve(res);
        });
      });
    },
    FirmwareNotify(){
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        axios.get(this.apiurl + "/FirmwareNotify", token, false).then((res) => {
          resolve(res);
        });
      });
    }
  },
});
