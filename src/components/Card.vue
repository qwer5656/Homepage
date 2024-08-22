<template lang="">
  <div class="Cardwrap">
    <div class="backicon" @click="previous()">
      <img src="../assets/img/Previous.png" alt="" />
      <span>Back</span>
    </div>
    <div class="addcontent">
      <div>My Card</div>
      <div class="addiconwrap" @click="addcard">
        Add
        <img src="../assets/img/Add_On.png" alt="" />
      </div>
    </div>
    <div class="cardmangerwrap" @click.capture="clearcard">
      <div v-for="(item, index) in carddata" :key="item">
        <h3>{{ item.CardNumberName }}</h3>
        <div class="cardcontent" @click.capture="cardclick(item)">
          <img src="../assets/img/cardLogo.png" alt="" />
          <div class="cardoperatewrap" v-if="item.select == true">
            <div class="cardoperate" @click="editcard(item)">
              <img
                class="cardoperateimg"
                src="../assets/img/Edit_black.png"
                alt=""
              />
              <div class="cardoperatetxt">Edit</div>
            </div>
            <div class="cardoperate" @click="removecard(index)">
              <img
                class="cardoperateimg"
                src="../assets/img/Remove_On_black.png"
                alt=""
              />
              <div class="cardoperatetxt">Remove</div>
            </div>
          </div>

          <span>{{ item.CardNumber }}</span>
        </div>
      </div>
      <div class="cardnone" v-if="carddata.length == 0"></div>
    </div>
    <v-dialog
      v-model="deletedialog"
      persistent
      width="auto"
      class="Carddialogwrap"
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
        >
          <img src="../assets/img/Close.png" @click="close" alt="" />
        </div>
        <form class="formwrap">
          <v-text-field
            label="Fill in Name"
            variant="solo"
            v-model="newCarddata.CardNumberName"
          ></v-text-field>
          <v-text-field
            label="Fill in number"
            variant="solo"
            v-model="newCarddata.CardNumber"
          ></v-text-field>
          <div class="chargebt" @click="savecard">
            {{ mode == "add" ? "Create" : "Save" }}
          </div>
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
      newCarddata: {},
      carddata: [],
      tempdata: {},
      mode: "",
    };
  },
  methods: {
    previous() {
      this.$emit("changestatus", false);
    },
    close() {
      this.deletedialog = false;
    },
    open() {
      this.deletedialog = true;
    },
    savecard() {
      if (this.mode == "edit") {
        this.tempdata.CardNumberName = this.newCarddata.CardNumberName;
        this.tempdata.CardNumber = this.newCarddata.CardNumber;
      }
      if (this.mode == "add") {
        this.carddata.push(this.newCarddata);
        this.newCarddata = {};
      }

      this.deletedialog = false;
    },
    cardclick(item) {
      item.select = true;
      this.carddata.forEach((e) => {
        if (e != item) {
          e.select = false;
        }
      });
    },
    addcard() {
      this.open();
      this.mode = "add";
    },
    editcard(item) {
      this.tempdata = item;
      this.newCarddata = JSON.parse(JSON.stringify(item));
      this.open();
      this.mode = "edit";
    },
    removecard(index) {
      this.carddata.splice(index, 1);
    },
    clearcard(){
      this.carddata.forEach((e) => {
          e.select = false;
      });
    }
  },
};
</script>
<style>
.Cardwrap .cardmangerwrap {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 450px;
  height: 40vh;

  overflow: auto;
  flex-wrap: wrap;
  gap: 50px;
}
.Cardwrap .cardcontent {
  width: 375px;
  height: 205px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 21.5px 27.5px;
  cursor: pointer;
  box-shadow: 0px 0px 11.399999618530273px 0px rgba(255, 255, 255, 0.25) inset;
  margin-top: 10px;
  box-shadow: 0px -6px 100.30000305175781px 0px rgba(255, 255, 255, 0.18) inset;
}
.Cardwrap .cardcontent span {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 25px;
}
.Cardwrap .cardcontent img {
  width: 100%;
  height: 28px;
}
.Carddialogwrap .formwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
}
.Carddialogwrap .addcardwrap {
  background: rgba(255, 255, 255, 0.05);
}
.Carddialogwrap .formwrap {
  width: 456px;
  height: 370px;
  padding: 100px 75px 120px 75px;
  gap: 50px;

  border-radius: 20px;
}
.Cardwrap .addiconwrap {
  margin-left: auto;
  vertical-align: middle;
  cursor: pointer;
}
.Cardwrap .addiconwrap img {
  vertical-align: middle;
  margin-left: 15px;
}
.Cardwrap .addcontent {
  display: flex;
  justify-self: center;
  align-items: center;
  margin-top: 43px;
}
.Cardwrap {
  color: white;
  margin-top: 45px;
}
.Cardwrap .backicon {
  color: white;
  cursor: pointer;
}
.Cardwrap .backicon img {
  vertical-align: middle;
}
.Cardwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.Cardwrap .cardnone {
  width: 375px;
  height: 205px;

  background: url("../assets/img/RFID Card_None.png");
}
.Carddialogwrap .chargebt {
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
.Cardwrap .cardoperate {
  width: 128px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.5);
  color: black;
  vertical-align: middle;
  margin: 0 6px;
}
.Cardwrap .cardoperatetxt {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 510;
  line-height: 22.5px;
  margin-left: 9px;
}
.Cardwrap .cardoperatewrap {
  display: flex;
  justify-content: center;
}
.Cardwrap .cardoperate .cardoperateimg {
  width: 23px;
  height: 23px;
}

@media (max-width: 576px) {
  .Cardwrap {
    padding: 0 10px;
  }
  .Cardwrap .cardmangerwrap {
    width: 100%;
    margin-top: 20px;
    padding: 0px 20px 40px 20px;
  }
  .Cardwrap .cardnone {
    width: 100%;
    height: calc(90vw / 1.95);
    background-image: url("/src/assets/img/RFID Card_None.png");
    background-size: 100% 100%;
  }
  .Carddialogwrap .formwrap {
    width: 100%;
    padding: 20px 10px;
  }
  .Cardwrap .cardcontent {
    width: 100%;
    height: calc(90vw / 1.95);
    padding: 20px;
  }
  .Cardwrap .cardoperate .cardoperateimg {
    width: 18px;
    height: 18px;
  }
  .Cardwrap .cardoperate {
    width: 33%;
  }
  .Cardwrap .cardoperatetxt {
    font-family: SF Pro;
    font-size: 12px;
    font-weight: 510;
    line-height: 22.5px;
    margin-left: 9px;
  }
  .Cardwrap .cardoperate {
    width: 50%;
    padding: 3px 10px;
    height: auto;
  }
}
</style>
