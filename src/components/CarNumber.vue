<template lang="">
  <div class="carnumberwrap">
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
    <div class="addcontent">
      <div>My Car License</div>
      <div class="addiconwrap" @click="addcardnumber">
        Add
        <img src="../assets/img/Add_On.png" alt="" />
      </div>
    </div>
    <div class="cardnumbermangerwrap" @click.capture="clearcardnumber">
      <div
        v-for="(item, index) in filtercarNumberddata"
        :key="item"
        class="cardnumbercontainer"
      >
        <h3>{{ item.licensePlateName }}</h3>
        <div class="cardoperatewrap" v-if="item.select == true">
          <div class="cardoperate" @click.capture="editcardnumber(item)">
            <img
              class="cardoperateimg"
              src="../assets/img/Edit_black.png"
              alt=""
            />
            <div class="cardoperatetxt">Edit</div>
          </div>
          <div class="cardoperate" @click="removecardnumber(item)">
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
          <span>{{ item.licensePlateNumber }}</span>
        </div>
      </div>
      <div class="cardnumbernone" v-if="filtercarNumberddata.length == 0"></div>
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
        <v-form class="formwrap" ref="entryForm">
          <v-text-field
            label="Fill in Name"
            variant="solo"
            v-model="newcarNumberddata.licensePlateName"
            :rules="carNamerules"
          ></v-text-field>
          <v-text-field
            label="Fill in number"
            variant="solo"
            v-model="newcarNumberddata.licensePlateNumber"
            maxlength="11"
            :rules="carNumberrules"
          ></v-text-field>
          <div class="chargebt" @click="savecardnumber">
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
import { LicensePlateStore } from "@/stores/LicensePlate";
import { ResultStore } from "@/stores/result";
import { mdiMagnify } from "@mdi/js";
export default {
  data() {
    return {
      deletedialog: false,
      newcarNumberddata: {},
      carNumberddata: [],
      tempdata: {},
      mode: "",
      searchText: "",
      mdiMagnify,
      carNamerules: [
        (value) => {
          if (value) return true;
          return "Name is  null";
        },
      ],
      carNumberrules: [
        (value) => {
          if (value) return true;
          return "CarNumber is  null";
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
    savecardnumber() {
      let self = this;
      this.$refs.entryForm.validate().then(function (res) {
        if (res.valid == true) {
          let License = LicensePlateStore();
          let Result = ResultStore();
          if (self.mode == "add") {
            let obj = {
              blocked: false,
              licensePlateId: "00000000-0000-0000-0000-000000000000",
              chargePointId: "Test1234",
              createTime: new Date(),
              updateTime: new Date(),
              expiryDate: null,
            };

            obj.licensePlateName = self.newcarNumberddata.licensePlateName;
            obj.licensePlateNumber = self.newcarNumberddata.licensePlateNumber;
            License.postapi(self, obj).then((res) => {
              if (res.success === false) {
                Result.errorres(res.message);
              }
              if (res.success === true) {
                self.carNumberddata = res.data;
                self.newcarNumberddata = {};
                Result.successres();
                self.deletedialog = false;
              }
            });
          }
          if (self.mode == "edit") {
            License.putapi(self, self.newcarNumberddata).then((res) => {
              if (res.success === false) {
                Result.errorres(res.message);
              }
              if (res.success === true) {
                self.carNumberddata = res.data;
                self.newcarNumberddata = {};
                Result.successres();
                self.deletedialog = false;
              }
            });
          }
        }
      });
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
      this.newcarNumberddata = {};
      this.mode = "add";
    },
    editcardnumber(item) {
      this.tempdata = item;
      this.newcarNumberddata = JSON.parse(JSON.stringify(item));
      this.open();
      this.mode = "edit";
    },
    removecardnumber(item) {
      let License = LicensePlateStore();
      
      let self = this;
      License.deleteapi(this, item.licensePlateId).then((res) => {
        let Result = ResultStore();
        if (res.success === false) {
          Result.errorres(res.message);   
        }
        if (res.success === true) {
          self.carNumberddata = res.data;
          Result.successres();
        }

      });
    },
    clearcardnumber() {
      this.carNumberddata.forEach((e) => {
        e.select = false;
      });
    },
  },
  beforeMount() {
    let License = LicensePlateStore();
    let self = this;
    License.getapiAll(this).then((res) => {
      self.carNumberddata = res.data;
    });
  },
  computed: {
    filtercarNumberddata() {
      if (this.carNumberddata == null) return [];
      return this.carNumberddata.filter((e) => {
        if (
          e.licensePlateName.indexOf(this.searchText) != -1 ||
          e.licensePlateNumber.indexOf(this.searchText) != -1
        ) {
          return true;
        }
      });
    },
    clearcardnumber() {
      this.carNumberddata.forEach((e) => {
        e.select = false;
      });
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
.carnumberwrap .searchwrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 23px;
}
.carnumberwrap .searchwrap .searchcontent {
  width: 120px;
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
  width: 120px;
}
.carnumberwrap .addiconwrap img {
  vertical-align: middle;
  margin-left: 15px;
}
.carnumberwrap .addcontent {
  display: flex;
  justify-self: center;
  align-items: center;
  margin: 0px 0px 30px 0px;
  width: 100%;
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
  margin-top: 10px;
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
  cursor: pointer;
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
    padding: 0px 20px 40px 20px;
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
