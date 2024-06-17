<template>
  <div class="resultwrap" v-if="show">
    <div class="resultcontent">
      <div class="closewrap">
        <img  v-if="mode!==1" src="../assets/img/Close.png" @click="close" alt="" />
      </div>
      <div class="resulttxtwrap">
        <img v-if="mode===1" src="../assets/img/success.png" alt="" />
        <img v-else-if="mode===2" src="../assets/img/Failure.png" alt="" />
        <img v-else-if="mode===3" src="../assets/img/Exist.png" alt="" />
        <div class="txt">{{text}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { ResultStore } from "@/stores/result";


export default {
  data() {
    return {

    };
  },
  methods:{
    close(){
        let Result=ResultStore();
        Result.close();
    }
  },
  computed:{
    text(){
        const counterStore = ResultStore();
        return counterStore.getresulttext;
    },
    show(){
        const counterStore = ResultStore();
        return counterStore.getshow;
    },
    mode(){
        const counterStore = ResultStore();
        return counterStore.getmode;
    }
  }
};
</script>

<style scoped>
.resultwrap .resultcontent {
  width: 456px;
  height: 370px;
  position: relative;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  background: rgba(28, 28, 28, 1);
}
.resultwrap {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  z-index: 9999;
  top: 0;
  left: 0;
}
.resultwrap .resulttxtwrap .txt {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 25px;
  text-align: center;
  color: white;
}
.resultwrap .resulttxtwrap {
  height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.resultwrap .resulttxtwrap img {
  width: 96px;
  height: 96px;
}
.resultwrap .resultcontent .closewrap {
  text-align: right;
  cursor: pointer;
  position: absolute;
  top:15px;
  right: 15px;
}
</style>
