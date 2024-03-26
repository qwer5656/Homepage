<template lang="">
  <div class="carnumberwrap">
    <div class="backicon" @click="previous()">
      <img src="../assets/img/Previous.png" alt="" />
      <span>Back</span>
    </div>
    <div class="addcontent">
      <div>My Car License</div>
      <div class="addiconwrap" @click="open">
        Add
        <img src="../assets/img/Add_On.png" alt="" />
      </div>
    </div>
    <div class="cardmangerwrap">
      <div class="cardcontent" v-for="item in carddata">
        <img src="../assets/img/cardLogo.png" alt="" />
        <span>{{item.CardNumber}}</span>
      </div>
      <div class="cardnone"></div>
    </div>
    <v-dialog
      v-model="deletedialog"
      persistent
      width="auto"
      class="Cardnumberdialogwrap"
    >
      <div class="addcardwrap">
        <div
          style="
            color: white;
            text-align: right;
            font-size: 40px;
            padding-right: 10px;
            cursor: pointer;
          "
          @click="close"
        >
          <img src="../assets/img/Close.png" alt="">
        </div>
        <form class="formwrap">
         
          <v-text-field label="Fill in number" variant="solo" v-model="CardNumber"></v-text-field>
          <div class="chargebt" @click="addcard">Create</div>
        </form>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import { mdiMinusCircle, mdiPencil } from "@mdi/js";
import { useMainStore } from "@/stores/main";
export default {
  data() {
    return {
      deletedialog: false,
      carddata: [],
    };
  },
  methods: {
    previous() {
      this.$emit("changestatus",false);
    
    },
    close() {
      this.deletedialog = false;
    },
    open() {
      this.deletedialog = true;
    },
    addcard(){
      let data={};
      data.CardNumber=this.CardNumber;
      this.carddata.push(data);
      this.deletedialog = false;
      this.CardNumber="";
    }
  },
};
</script>
<style>
.carnumberwrap .cardmangerwrap {
  display: flex;

  flex-wrap: wrap;
  gap: 50px;
}
.carnumberwrap .cardcontent {
  width: 375px;
  height: 205px;
  border-radius: 10px;
  opacity: 0px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 21.5px 27.5px;

  box-shadow: 0px 0px 11.399999618530273px 0px rgba(255, 255, 255, 0.25) inset;

box-shadow: 0px -6px 100.30000305175781px 0px rgba(255, 255, 255, 0.18) inset;

}
.carnumberwrap .cardcontent span {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 25px;
  margin-top: auto;
}
.carnumberwrap .cardcontent img {
  width: 100%;
  height: 28px;
}
.Cardnumberdialogwrap .formwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
}
.Cardnumberdialogwrap .addcardwrap {
  background: rgba(255, 255, 255, 0.05);
}
.Cardnumberdialogwrap .formwrap {
  width: 456px;
  height: 370px;
  padding: 100px 75px 120px 75px;
  gap: 50px;

  border-radius: 20px;
}
.carnumberwrap .addiconwrap {
  margin-left: auto;
  vertical-align: middle;
  cursor: pointer;
}
.carnumberwrap .addiconwrap img {
  vertical-align: middle;
  margin-left: 15px;
}
.carnumberwrap .addcontent {
  display: flex;
  justify-self: center;
  align-items: center;
  margin-top: 43px;
}
.carnumberwrap {
  color: white;
  margin-top: 45px;
}
.carnumberwrap .backicon {
  color: white;
  cursor: pointer;
}
.carnumberwrap .backicon img {
  vertical-align: middle;
}
.carnumberwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.carnumberwrap .cardnone {
  width: 418px;
height: 208px;

  background: url("../assets/img/CarNumber_None.png");
}
.Cardnumberdialogwrap .chargebt {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 93px;
  gap: 10px;
  width: 306px;
  height: 30px;
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  );
  border-radius: 32px;
  cursor: pointer;
}
</style>
