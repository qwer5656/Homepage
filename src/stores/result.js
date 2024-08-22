import { defineStore } from "pinia";

export const ResultStore = defineStore("result", {
  state: () => {
    return {
      show: false,
      resulttext: "",
      mode:0,
    };
  },
  getters: {
    getshow: (state) => state.show,
    getresulttext: (state) => state.resulttext,
    getmode: (state) => state.mode,
  },
  actions: {
    successres(restxt="") {
      let self=this;
      self.show = true;
      self.mode=1;
      self.resulttext=restxt+"Success";
      setTimeout(() => {
        self.show=false;
      }, 500);
    },
    errorres(errortxt) {
      this.show = true;
      this.mode=2;
      this.resulttext=errortxt;
    },
    close(){
      this.show = false;
    }
  },
});
