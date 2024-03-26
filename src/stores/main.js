import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return { 
    loading:false,
    curpage:"",
    chargepilemode:"standby"
  }
  },
  actions: {
    
  },
})