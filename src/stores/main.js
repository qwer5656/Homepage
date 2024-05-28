import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return { 
    loading:false,
    curpage:"",
    chargepilemode:"standby",
    userapi:"https://localhost:7120/api/UpdatePassword",
  }
  },
  actions: {
       updatePassword(self,data){
        return new Promise((resolve, reject) => {
          self.$axios.put(this.userapi, data, true).then((res) => {
            resolve(res);
          });
        });
     }
  },
})