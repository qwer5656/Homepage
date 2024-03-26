<template lang="">
    <div class="timemodewrap">
      <h3>Time Setting</h3>
        <div class="date">
        <div class="selectwrap">
          <div class="timetitle">Hour</div>
          <div>
            <v-select 
              :items="houritems"
              style="width: 150px; height: 20px;text-align:center"
              variant="plain"
              color="#000"
              v-model="hour"
            ></v-select>
          </div>
        </div>
        <div class="selectwrap">
          <div class="timetitle">Min</div>
          <div>
            <v-select
            
              :items="minitems"
              style="width: 150px"
              variant="plain"
              color="#000"
              v-model="min"
            ></v-select>
          </div>
        </div>
        <div class="selectwrap">
          <div class="timetitle">Sec</div>
          <div>
            <v-select
              :items="secitems"
              style="width: 150px"
              variant="plain"
              color="#000"
              v-model="sec"
            ></v-select>
          </div>
        </div>
      </div>
      <div class="nbtwrap">
        <Nbt title="Save" enabled="true" @click="savetime()" />
      </div>
    </div>
  </template>
  <script>
  import Nbt from "./public/Nbt.vue";
  import { useMainStore } from "@/stores/main";
  export default {
    data() {
      return{
        hour:"23",
        min:"59",
        sec:"59",
        houritems:[],
        minitems:[],
        secitems:[]

      }
    },mounted(){
      for(let i=0;i<24;i++){
        let num=i<=9?"0"+i:i.toString();
        this.houritems.push(num);
      }
      for(let i=0;i<60;i++){
        let num=i<=9?"0"+i:i.toString();
        this.minitems.push(num);
        this.secitems.push(num);
      }
     
    },
    methods:{
      savetime(){
        const mainstore = useMainStore();
        mainstore.loading = true;
        let self = this;
        setTimeout(function () {
          mainstore.loading = false;
          if (val == true) {
            self.Touchstartmodeimg = "src/assets/img/Car.png";
          }
          else{
            self.Touchstartmodeimg = "src/assets/img/TouchStarmtmode.png";
          }
          setTimeout(function () {
            self.error = "";
          }, 10);
        }, 1000);
      }
    },
    components:{
      Nbt
    }

  };
  </script>
  <style>
.timemodewrap .nbtwrap{
  margin-top: 166px;
}
  .timemodewrap {
    color: white;
    margin-top: 45px;
  }
.timemodewrap .date{
  display: flex;
  margin-top: 65px;
  justify-content: center;
  width: 540px;
  margin: 65px auto;
}
.timemodewrap .selectwrap{
  margin: 0 23px;
}
.timemodewrap .v-field__input{
  padding: 0 0 0 60px;
}
.timemodewrap .v-field__append-inner{
  padding-top: 14px !important;
}
  .timemodewrap .v-field {
    border-radius: 33px;
    background-color: black;
    cursor: text;
    color: white;
    border: 1px solid rgba(107, 107, 107, 1);
    width: 360px;
  }
  .timemodewrap .title {
    font-family: SF Pro;
    font-size: 18px;
    font-weight: 400;
    line-height: 22.5px;
    text-align: left;
    margin-top: 49px;
  }
  .timemodewrap .timetitle{
    margin-bottom: 19px;
 }
  </style>
  