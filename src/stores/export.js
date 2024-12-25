import { defineStore } from "pinia";

export const exportStore = defineStore("export", {
  state: () => {
    return {
      apiurl: "Export",
    };
  },
  actions: {
    getapi(self, chargePileId) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        let startTime="2024/12/03";
        let endTime="2024/12/25";
        self.$axios.getExcel(this.apiurl + "/" + chargePileId+"?StartTimeDate="+startTime+"&EndTimeDate="+endTime,token, true).then((res) => {
          console.log(res);
          resolve(res);
        });
      });
    },
  },
});
