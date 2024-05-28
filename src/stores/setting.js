import { defineStore } from "pinia";

export const settingStore = defineStore("setting", {
  state: () => {
    return {
        apiurl:"https://localhost:7120/api/Setting"
    };
  },
  actions: {
    getapi(self,methods) {
      console.log(self);
      return new Promise((resolve, reject) => {
        self.$axios
          .get(
            this.apiurl+"/Test1234/"+methods,
            true
          )
          .then((res) => {
            resolve(res);
          });
      });
    },
    postapi(self,data){
        self.$axios
        .post(this.apiurl,data,true)
        .then((res) => {
          console.log(res);
        });
    },
    putapi(self,data){
        self.$axios
        .put(this.apiurl, data, true)
        .then((res) => {
          console.log(res);
        });
    }
  },
});
