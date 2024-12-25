<template lang="">
  <div class="Cardwrap">
    <div class="backicon" @click="previous()">
      <img src="../assets/img/Previous.png" alt="" />
      <span>Back</span>
    </div>
    <div class="searchwrap">
      <div class="searchcontent">
        <v-text-field
          variant="underlined"
          :type="text"
          label="Search"
          single-line
          :prepend-inner-icon="'mdi-magnify'"
          v-model="searchText"
        ></v-text-field>
      </div>
    </div>

    <div class="cardmangerwrap" @click.capture="clearcard">
      <div class="addcontent">
        <div>My Card</div>
        <div class="addiconwrap">
          <div @click="addcard">
            Add
            <img src="../assets/img/Add_On.png" alt="" />
          </div>
        </div>
      </div>
      <div v-for="(item, index) in filtercarddata" :key="item">
        <h3>{{ item.cardName }}</h3>

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
            <div class="cardoperate" @click="removecard(item)">
              <img
                class="cardoperateimg"
                src="../assets/img/Remove_On_black.png"
                alt=""
              />
              <div class="cardoperatetxt">Remove</div>
            </div>
          </div>

          <span>{{ item.cardNumber }}</span>
        </div>
      </div>
      <div class="cardnone" v-if="filtercarddata.length == 0"></div>
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
        <v-form class="formwrap" ref="entryForm">
          <v-text-field
            label="Fill in Name"
            variant="solo"
            v-model="newCarddata.cardName"
            :rules="cardNamerules"
          ></v-text-field>
          <v-text-field
            label="Fill in number"
            variant="solo"
            v-model="newCarddata.cardNumber"
            :rules="cardNumberrules"
          ></v-text-field>
          <div class="chargebt" @click="savecard">
            {{ mode == "add" ? "Create" : "Save" }}
          </div>
        </v-form>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import { mdiMinusCircle, mdiPencil } from "@mdi/js";
import { useMainStore } from "@/stores/main";
import { cardStore } from "@/stores/card";
import { ResultStore } from "@/stores/result";
import { mdiMagnify } from "@mdi/js";
export default {
  data() {
    return {
      deletedialog: false,
      newCarddata: {},
      carddata: [],
      tempdata: {},
      mode: "",
      error: "",
      searchText: "",
      mdiMagnify,
      cardNamerules: [
        (value) => {
          if (value) return true;
          return "Name is not null";
        },
      ],
      cardNumberrules: [
        (value) => {
          if (value) return true;
          return "CarNumber is not null";
        },
      ],
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
      let self = this;
      this.$refs.entryForm.validate().then(function (res) {
        if (res.valid == true) {
          let cardoperate = cardStore();
          let Result = ResultStore();

          if (self.mode == "edit") {
            cardoperate.putapi(self, self.newCarddata).then((res) => {
              if (res.success === false) {
                Result.errorres(res.message);
              }
              if (res.success === true) {
                self.carddata = res.data;
                Result.successres();
              }
            });
          }
          if (self.mode == "add") {
            let obj = {
              blocked: false,
              cardId: "00000000-0000-0000-0000-000000000000",
              createTime: new Date(),
              updateTime: new Date(),
              expiryDate: null,
            };

            obj.cardName = self.newCarddata.cardName;
            obj.cardNumber = self.newCarddata.cardNumber;

            cardoperate.postapi(self, obj).then((res) => {
              if (res.success === false) {
                Result.errorres(res.message);
              }
              if (res.success === true) {
                self.carddata = res.data;
                Result.successres();
                self.newCarddata = {};
                self.deletedialog = false;
              }
            });
          }
        }
      });
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
      this.newCarddata = {};
    },
    editcard(item) {
      this.tempdata = item;
      this.newCarddata = JSON.parse(JSON.stringify(item));
      this.open();
      this.mode = "edit";
    },
    removecard(item) {
      let card = cardStore();
      let self = this;
      card.deleteapi(this, item.cardId).then((res) => {
        let Result = ResultStore();
        if (res.success === false) {
          Result.errorres(res.message);   
        }
        if (res.success === true) {
          self.carddata = res.data;
          Result.successres();
        }
      });
    },
    clearcard() {
      this.carddata.forEach((e) => {
        e.select = false;
      });
    },
  },
  beforeMount() {
    let card = cardStore();
    let self = this;
    card.getapiAll(this).then((res) => {
      self.carddata = res.data;
    });
  },
  computed: {
    filtercarddata() {
      if (this.carddata == null) return [];
      return this.carddata.filter((e) => {
        if (
          e.cardNumber.indexOf(this.searchText) != -1 ||
          e.cardName.indexOf(this.searchText) != -1
        ) {
          return true;
        }
      });
    },
    clearcard() {
      this.carddata.forEach((e) => {
        e.select = false;
      });
    },
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
  width: 120px;
}
.Cardwrap .searchwrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 23px;
}
.Cardwrap .searchwrap .searchcontent {
  width: 120px;
}
.Cardwrap .addiconwrap img {
  vertical-align: middle;
  margin-left: 15px;
}
.Cardwrap .addcontent {
  display: flex;
  justify-self: center;
  align-items: center;
  width: 100%;
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
  margin-top: 10px;
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
