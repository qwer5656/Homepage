<template lang="">
  <div class="carnumberwrap">
    <div class="backicon" @click="previous()">
      <img src="../assets/img/Previous.png" alt="" />
      <span>Back</span>
    </div>
    <div class="addcontent">
      <div>My Car License</div>
      <div class="addiconwrap" @click="addcardnumber">
        Add
        <img src="../assets/img/Add_On.png" alt="" />
      </div>
    </div>
    <div class="cardnumbermangerwrap">
      <div
        v-for="(item, index) in carNumberddata"
        :key="item"
        class="cardnumbercontainer"
      >
        <h3 >{{ item.CardNumberName }}</h3>
        <div class="cardoperatewrap" v-if="item.select == true">
          <div class="cardoperate" @click="editcardnumber(item)">
            <img
              class="cardoperateimg"
              src="../assets/img/Edit_black.png"
              alt=""
            />
            <div class="cardoperatetxt">Edit</div>
          </div>
          <div class="cardoperate" @click="removecardnumber(index)">
            <img
              class="cardoperateimg"
              src="../assets/img/Remove_On_black.png"
              alt=""
            />
            <div class="cardoperatetxt">Remove</div>
          </div>
        </div>
        <div
          class="cardnumbercontent"
          @click="cardnumberclick(item)"
          :class="{ opacity: item.select }"
        >
          <span>{{ item.CardNumber }}</span>
        </div>
      </div>
      <div class="cardnumbernone" v-if="carNumberddata.length == 0"></div>
    </div>
    <v-dialog
      v-model="deletedialog"
      persistent
      width="auto"
      class="Cardnumberdialogwrap"
    >
      <div class="addcardnumberwrap">
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
          <img src="../assets/img/Close.png" alt="" />
        </div>
        <form class="formwrap">
          <v-text-field
            label="Fill in Name"
            variant="solo"
            v-model="newcarNumberddata.CardNumberName"
          ></v-text-field>
          <v-text-field
            label="Fill in number"
            variant="solo"
            v-model="newcarNumberddata.CardNumber"
            maxlength="11"
          ></v-text-field>
          <div class="chargebt" @click="savecardnumber">
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
      newcarNumberddata: {},
      carNumberddata: [],
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
    savecardnumber() {
      if (this.mode == "edit") {
        this.tempdata.CardNumberName = this.newcarNumberddata.CardNumberName;
        this.tempdata.CardNumber = this.newcarNumberddata.CardNumber;
      }
      if (this.mode == "add") {
        this.carNumberddata.push(this.newcarNumberddata);
        this.newcarNumberddata = {};
      }

      this.deletedialog = false;
    },
    cardnumberclick(item) {
      item.select = true;
      this.carNumberddata.forEach((e) => {
        if (e != item) {
          e.select = false;
        }
      });
    },
    addcardnumber() {
      this.open();
      this.mode = "add";
    },
    editcardnumber(item) {
      this.tempdata = item;
      this.newcarNumberddata = JSON.parse(JSON.stringify(item));
      this.open();
      this.mode = "edit";
    },
    removecardnumber(index) {
      this.carNumberddata.splice(index, 1);
    },
  },
};
</script>
<style>
.carnumberwrap .opacity {
  opacity: 0.3;
}
.carnumberwrap .cardnumbermangerwrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  overflow: auto;
  width: 520px;
  height: 40vh;
  margin: 0px auto;
}
.carnumberwrap .cardnumbermangerwrap h3 {
  padding: 10px 0;
}
.carnumberwrap .cardnumbercontent {
  width: 418px;
  height: 208px;
  background: url("../assets/img/CarPlate.png");
  display: flex;
  padding-bottom: 32px;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.carnumberwrap .cardnumbercontent span {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 25px;
  margin-top: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 23.8px 0px rgba(255, 255, 255, 0.25) inset;
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 0px;
  text-align: center;
  width: 174.33px;
  height: 55.62px;
}
.carnumberwrap .cardnumbercontent img {
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
.Cardnumberdialogwrap .addcardnumberwrap {
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
  margin: 43px 0px 30px 0px;
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
.carnumberwrap .cardnumbernone {
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

.carnumberwrap .cardoperate {
  width: 128px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: rgba(255, 255, 255, 1);
  color: black;
  vertical-align: middle;
  margin: 0 6px;
}
.carnumberwrap .cardoperatetxt {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 510;
  line-height: 22.5px;
  margin-left: 9px;
}
.carnumberwrap .cardoperatewrap {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
.carnumberwrap .cardoperate .cardoperateimg {
  width: 23px;
  height: 23px;
}
.carnumberwrap .cardnumbercontainer {
  position: relative;
}

@media (max-width: 576px) {
  .carnumberwrap {
    padding: 0 10px;
  }
  .carnumberwrap .cardnumbermangerwrap {
    width: 100%;
    margin-top: 20px;
    padding: 0px 20px;
  }
  .carnumberwrap .cardnumbercontainer {
    width: 100%;
  }
  .carnumberwrap .cardnumbernone {
    width: 100%;
    height: calc(90vw / 1.95);
    background-image: url("/src/assets/img/CarNumber_None.png");
    background-size: 100% 100%;
  }
  .carnumberwrap .cardnumbercontent {
    width: 100%;
    height: calc(90vw / 1.95);
    background-size: 100% 100%;
    padding: 20px;
  }
  .carnumberwrap .cardoperate .cardoperateimg {
    width: 18px;
    height: 18px;
  }
  .carnumberwrap .cardoperate {
    width: 33%;
  }
  .carnumberwrap .cardoperatetxt {
    font-family: SF Pro;
    font-size: 12px;
    font-weight: 510;
    line-height: 22.5px;
    margin-left: 9px;
  }
  .carnumberwrap .cardoperate {
    width: 50%;
    padding: 3px 10px;
    height: auto;
  }
  .Cardnumberdialogwrap .addcardnumberwrap {
    background: rgba(255, 255, 255, 0.05);
  }
  .Cardnumberdialogwrap .formwrap {
    width: 100%;
    padding: 20px 10px;
    height: auto;
  }
}
</style>
