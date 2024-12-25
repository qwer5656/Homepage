import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return { 
    loading:false,
    curpage:"",
    chargepilemode:"standby",
    userapi:"UpdatePassword",
    userdata:{},
  }
  },
  actions: {
       updatePassword(self,data){
        return new Promise((resolve, reject) => {
          self.$axios.put(this.userapi, data, true).then((res) => {
            resolve(res);
          }).catch((res)=>{
            reject(res);
          });
        });
     }
  },
})