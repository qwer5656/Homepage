import { defineStore } from "pinia";
import axios from "@/axios";
export const advertisementManagementStore = defineStore(
  "advertisementManagement",
  {
    state: () => {
      return {
        apiurl: "AdvertisementManagement",
      };
    },
    actions: {
      RemoteimageUpdate(num) {
        return new Promise((resolve, reject) => {
          let token = JSON.parse(localStorage.getItem("token"));
          axios
            .get(this.apiurl + "/imageUpdate?num=" + num, token, false)
            .then((res) => {
              resolve(res);
            });
        });
      },
      GetImage(value) {
        let token = JSON.parse(localStorage.getItem("token"));
        return (
          `${axios.geturl()}${this.apiurl}/GetUserImage?token=` +
          token +
          "&id=" +
          value
        );
      },
      UpdateImage(data) {
        return new Promise((resolve, reject) => {
          let token = JSON.parse(localStorage.getItem("token"));
          data.token = token;
          axios
            .post(this.apiurl + "/CreateUserAdvertisement", data, true)
            .then((res) => {
              resolve(res);
            });
        });
      },
    },
  },
);
