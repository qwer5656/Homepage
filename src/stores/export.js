import { defineStore } from "pinia";

export const exportStore = defineStore("export", {
  state: () => {
    return {
      apiurl: "Export",
    };
  },
  actions: {
    getapi(self, data) {
      return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("token"));
        console.log(data);
        let startTime=data.startDate;
        let endTime=data.endDate;
        self.$axios.getExcel(this.apiurl +"?StartTimeDate="+startTime+"&EndTimeDate="+endTime,token, true).then((res) => {
          console.log(res);
          resolve(res);
        });
      });
    },
  },
});
