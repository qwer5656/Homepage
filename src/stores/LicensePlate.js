import { defineStore } from "pinia";
export const LicensePlateStore = defineStore("LicensePlate", {
  state: () => {
    return {
      apiurl: "https://localhost:7120/api/LicensePlate",
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
    getapi(self, cardId) {
      return new Promise((resolve, reject) => {
        
        self.$axios.get(this.apiurl + "/" + cardId, true).then((res) => {
          resolve(res);
        });
      });
    },
    postapi(self, data) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        data.token=token;
        self.$axios.post(this.apiurl, data, true).then((res) => {
          resolve(res);
        });
      });
    },
    putapi(self, data) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        data.token=token;
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
