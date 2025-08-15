import { defineStore } from 'pinia'
import axios from "@/axios";
export const useMainStore = defineStore('main', {
  state: () => {
    return { 
    loading:false,
    curpage:"",
    chargepilemode:"standby",
    userapi:"UpdatePassword",
    transactionId:0,
    apibusy:false,
    firstLogin:false,
    userdata:{},
  }
  },
  actions: {
       updatePassword(self,data){
        return new Promise((resolve, reject) => {
          axios.put(this.userapi, data, true).then((res) => {
            resolve(res);
          }).catch((res)=>{
            reject(res);
          });
        });
     }
  },
})