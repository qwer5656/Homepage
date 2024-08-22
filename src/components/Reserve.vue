<template lang="">
  <div class="reservewrap">
    <div class="datepicker">
      <div>
        <v-date-picker bg-color="#000" title="Schedule List" v-model="date">
          <template v-slot:header>
            <h1 class="datepickerheader">{{ getheaderdate }}</h1>
          </template></v-date-picker
        >
      </div>
      <div class="schedulewrap" @click.capture="clearscheduledata()">
        <div class="addserverwrap">
          <h4>My schedule</h4>
          <div>
            <img
              src="../assets/img/Adddeep_On.png"
              alt=""
              @click="adddata(true)"
            />
          </div>
        </div>
<<<<<<< HEAD
        <div class="reservecontent" >
          <div class="reservenone" v-if="cratescheduleitem.length == 0">
            none
          </div>
          <div
            class="reserveschedulewrap"
            v-for="item in cratescheduleitem"
            :key="item" 
          >
=======
        <div class="reservecontent">
          <div class="reservenone" v-if="timedata.length == 0">none</div>
          <div class="reserveschedulewrap" v-for="item in timedata" :key="item">
>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
            <div class="reservescheduleoperation" v-show="item.active">
              <div>
                <img
                  src="../assets/img/Edit.png"
                  @click="ediddata(item)"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="../assets/img/Trash.png"
                  @click="deletedata(item)"
                  alt=""
                />
              </div>
            </div>
            <h3 class="title">{{ item.title }}</h3>
            <div
              class="reservetimewrap"
              :class="{ scheduleselect: item.active }"
              @click="selectdata(item)"
            >
              {{ item.timeform }}-{{ item.timeto }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="createdialog"
      persistent
      width="auto"
      class="reservewrap"
    >
      <div class="Schedulewrap">
        <div class="titlewrap">
          <div class="title">
            {{ mode == "add" ? "Create" : "Edit" }} Schedule
          </div>
          <div>
            <img src="../assets/img/Close.png" @click="changedialog(false)" />
          </div>
        </div>
        <v-text-field
          label="Text schedule title"
          variant="underlined"
          class="Scheduletxt"
          hide-details
          density="compact"
          v-model="scheduledata.title"
          maxlength="20"
        >
        </v-text-field>
        <div class="date">
          <!-- <div>
            <div>Day</div>
            <div>
              <v-select
                :items="getcalendarlist"
                style="width: 160px; height: 20px"
                variant="plain"
                color="#000"
                v-model="getcalendar"
              ></v-select>
            </div>
          </div> -->
          <div>
            <div>Time - Form</div>
            <div>
              <v-select
                :items="timeitem"
                style="width: 150px"
                variant="plain"
                color="#000"
                v-model="scheduledata.timeform"
              ></v-select>
            </div>
          </div>
          <div>
            <div>Time - to</div>
            <div>
              <v-select
                :items="timeitem"
                style="width: 150px"
                variant="plain"
                color="#000"
                v-model="scheduledata.timeto"
              ></v-select>
            </div>
          </div>
        </div>

        <div>
          <div style="padding: 0 0 70px 0">Duration</div>
          <div style="padding: 0 20px">
            <v-range-slider
              max="48"
              min="0"
              step="1"
              color="rgba(91, 228, 114)"
              hide-details="false"
              v-model="value"
            ></v-range-slider>
            <div class="datebottom">
              <div>00:00</div>
              <div>12:00</div>
              <div>23:59</div>
            </div>
          </div>
        </div>
        <div class="chargebt" @click="operationscheduledata()">
          {{ mode == "add" ? "Create" : "Save" }}
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import { mdiMinusCircle, mdiPencil } from "@mdi/js";
import { useMainStore } from "@/stores/main";
import { reverseStore } from "@/stores/reverse";
import { ResultStore } from "@/stores/result";
export default {
  data() {
    return {
      date: new Date(""),
      day: "2024.01.02",
      dayitems: [],
      timeform: "00:00",
      timeto: "00:00",
      value: [0, 0],
      title: "",
      timeitem: [],
      createdialog: false,
      monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      cratescheduleitem: [],
      mode: "",
      scheduledata: {},
      tempscheduledata: {},
    };
  },
  methods: {
    allowedDates: (val) => {
      return (
        parseInt(this.$vuetify.date.toISO(val).split("-")[2], 10) % 2 === 0
      );
    },
    change() {
      let sub = (this.value[1] - this.value[0]) / 2;
      document.documentElement.style.setProperty("--hourvalue", `'${sub}hrs'`);
    },
    changedialog(val) {
      this.createdialog = val;
    },
    adddata() {
      this.scheduledata = {
        title: "",
        timeform: "00:00",
        timeto: "00:00",
        active: false,
      };
      this.mode = "add";
      this.changedialog(true);
    },
    operationscheduledata() {
      let self = this;
      let reverse = reverseStore();
      let Result = ResultStore();
      if (this.mode == "add") {
        let obj = {};
        let day = this.convertDate.toString();
        obj.startTime = day + "T" + this.scheduledata.timeform;
        obj.endTime = day + "T" + this.scheduledata.timeto;
        obj.title = this.scheduledata.title;
        obj.valid = true;
        obj.result = "";
        reverse.postapi(self, obj).then((res) => {
          if (res.success === undefined) {
            Result.errorres(res);
          }
          if (res.success === true) {
            self.cratescheduleitem = res.data;
            Result.successres();
          }
        });
      }
      if (this.mode == "edit") {
        let self = this;
        let obj = {};
        let day = this.convertDate.toString();
        obj.startTime = day + "T" + this.scheduledata.timeform;
        obj.endTime = day + "T" + this.scheduledata.timeto;
        obj.valid = true;
        obj.result = "";
        obj.title = this.scheduledata.title;
        obj.scheduleTaskId = this.scheduledata.scheduleTaskId;
        reverse.putapi(self, obj).then((res) => {
          if (res.success === undefined) {
            Result.errorres(res);
          }
          if (res.success === true) {
            self.cratescheduleitem = res.data;
            Result.successres();
          }
        });
      }
      this.changedialog(false);
    },
    selectdata(e) {
      this.cratescheduleitem.forEach((el) => {
        if (el == e) {
          el.active = true;
        } else {
          el.active = false;
        }
      });
    },
    deletedata(e) {
      let self = this;
      let reverse = reverseStore();
      let Result = ResultStore();
      reverse.deleteapi(self, e.scheduleTaskId).then((res) => {
        if (res.success === undefined) {
          Result.errorres(res);
        }
        if (res.success === true) {
          self.cratescheduleitem = res.data;
          Result.successres();
        }
      });
    },
    ediddata(e) {
      this.mode = "edit";
      this.tempscheduledata = e;
      this.scheduledata = JSON.parse(JSON.stringify(e));
      this.changedialog(true);
    },
<<<<<<< HEAD
    clearscheduledata(){
      this.cratescheduleitem.forEach((e) => {
          e.active = false;
      });
    }
=======
    clearscheduledata() {
      this.cratescheduleitem.forEach((e) => {
        e.active = false;
      });
    },
>>>>>>> dfee2160ae59ebff1f8a62416ace88320651501d
  },
  watch: {
    value: {
      handler(val) {
        let sub = (val[1] - val[0]) / 2;
        this.scheduledata.timeform = this.timeitem[val[0]];
        this.scheduledata.timeto = this.timeitem[val[1]];
        document.documentElement.style.setProperty(
          "--hourvalue",
          `'${sub}hrs'`
        );
      },
    },
    "scheduledata.timeto"(val) {
      console.log(val);
      if (val < this.scheduledata.timeform) {
        let temp = this.scheduledata.timeform;
        this.scheduledata.timeform = val;
        this.scheduledata.timeto = temp;
      } else {
        let i =
          parseInt(val.split(":")[0] * 2) + parseInt(val.split(":")[1] / 30);
        this.value[1] = i;
        this.change();
      }
    },
    "scheduledata.timeform"(val) {
      if (val > this.scheduledata.timeto) {
        let temp = this.scheduledata.timeto;
        this.scheduledata.timeform = temp;
        this.scheduledata.timeto = val;
      } else {
        let i =
          parseInt(val.split(":")[0] * 2) + parseInt(val.split(":")[1] / 30);
        this.value[0] = i;
        this.change();
      }
    },
  },
  mounted() {
    this.date = new Date();
    let sub = (this.value[1] - this.value[0]) / 2;
    document.documentElement.style.setProperty("--hourvalue", `'${sub}hrs'`);

    let timeval = [];
    let hour = 0;
    let min = 0;

    for (let i = 0; i <= 48; i++) {
      timeval.push(
        `${hour < 10 ? "0" + hour : hour}:${min < 30 ? min + "0" : min}`
      );
      if (i == 47) {
        hour = 23;
        min = 59;
        continue;
      }

      if (i % 2 == 0) {
        min = 30;
      } else {
        hour++;
        min = 0;
      }
    }

    let reverse = reverseStore();

    let self = this;
    reverse.getapiAll(self).then((res) => {
      self.cratescheduleitem = res.data;
    });
    this.timeitem = timeval;
  },
  computed: {
    getheaderdate() {
      let date = new Date();
      let year = date.getFullYear();
      return year + "." + this.monthNames[date.getMonth()];
    },
    convertDate() {
      let date = this.date;
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = date.getDate();
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    },
    getcalendar() {
      let date = this.date;
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = date.getDate();
      day = day < 10 ? "0" + day : day;
      let val = year + "." + month + "." + day;
      return val;
    },
    getcalendarlist() {
      let arr = [];
      arr.push(this.getcalendar);

      return arr;
    },
    filterdata() {
      if( this.cratescheduleitem===null)return[];    
      return this.cratescheduleitem.filter((e) => {
        let date = this.date;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = date.getDate();
        day = day < 10 ? "0" + day : day;
        let val = year + "-" + month + "-" + day;
        if (e.startTime.split("T")[0] == val) {
          return true;
        }
      });
    },
    timedata() {
      return this.filterdata.map((e) => {
        e.timeform =
          e.startTime.split("T")[1].split(":")[0] +
          ":" +
          e.startTime.split("T")[1].split(":")[1];
        e.timeto =
          e.endTime.split("T")[1].split(":")[0] +
          ":" +
          e.endTime.split("T")[1].split(":")[1];
        return e;
      });
    },
  },
};
</script>
<style>
.reservewrap .reservenone {
  border: 1px dashed rgba(107, 107, 107, 1);
  width: 195px;
  height: 50px;
  padding: 16px 26px 16px 26px;
  border-radius: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: SF Pro;
  font-size: 16px;
  font-weight: bold;
  color: rgba(107, 107, 107, 1);
}
:root {
  --hourvalue: "0";
}
.reservewrap .addserverwrap {
  display: flex;
  font-family: SF Pro;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
}
.reservewrap .addserverwrap img {
  cursor: pointer;
}
.reservewrap .addserverwrap h4 {
  margin-right: auto;
}
.reservewrap .reservecontent {
  margin-top: 18px;
  height: 400px;
  overflow: auto;
  scrollbar-color: rgba(107, 107, 107, 1) #000;
  padding: 0 15px 0 0;
  scrollbar-width: thin;
}
.reservewrap .v-field__field {
  text-align: center;
}
.reservewrap .v-select__selection {
  margin: 0 auto !important;
}
.reservewrap .v-field {
  border: 1px solid rgba(107, 107, 107, 1);
  border-radius: 50px;
  padding: 0px 10px 12px 20px;
  margin-top: 10px;
}

.reservewrap .datepicker {
  height: 520px;
  padding: 20px 47px 42px 47px;
  gap: 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  margin: 0 auto;
}
.reservewrap .chargebt {
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
  margin: 0 auto;
  color: black;
  margin-top: 44px;
}
.Schedulewrap {
  width: 605px;
  height: 519px;
  padding: 42px 45px 42px 45px;
  border-radius: 30px;
  background: rgba(0, 0, 0);
  display: flex;
  flex-direction: column;
}
.datebottom {
  display: flex;
  justify-content: space-between;
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5px;
  text-align: center;
  color: rgba(107, 107, 107, 1);
}
.scheduleselect {
  background: rgba(255, 255, 255, 0.1);
}
.reservewrap {
  color: white;
  display: flex;
}
.Schedulewrap .date {
  display: flex;
  justify-content: space-around;
}
.reservewrap .title {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-right: auto;
  padding-bottom: 10px;
}
.reservewrap .v-date-picker-month__day .v-btn.v-date-picker-month__day-btn {
  --v-btn-height: 24px;
  --v-btn-size: 0.85rem;
  color: white;
  background: black;
}
.reservewrap
  .v-date-picker-month__day--selected
  .v-btn.v-date-picker-month__day-btn {
  --v-btn-height: 24px;
  --v-btn-size: 0.85rem;
  color: black;
  background: rgba(91, 228, 114, 1);
}

.reservewrap .v-date-picker-month__day {
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  height: auto;
  width: auto;
}
.reservewrap .v-date-picker-header {
  height: auto;
  padding-bottom: 0px;
}

.reservewrap .v-picker-title {
  text-transform: none;
}

.reservewrap .v-date-picker__title {
  display: inline-block;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
}
.reservewrap .reserveschedulewrap {
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5px;
  text-align: left;
}
.reservewrap .reservescheduleoperation {
  display: flex;
  justify-content: flex-end;
}
.reservewrap .reservescheduleoperation img {
  cursor: pointer;
}
.reservewrap .v-slider-track__fill::after {
  content: var(--hourvalue);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;

  width: 58px;
  height: 38px;

  background: rgba(91, 228, 114, 0.19);
  box-shadow: 0px 0px 14.9px rgba(91, 228, 114, 0.54),
    inset 0px 0px 13.4px #5be472;
  border-radius: 16px;
  color: white;
  left: 50%;
  transform: translate(-50%);
  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 2;
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5px;
  text-align: center;
  position: absolute;
  bottom: 20px;
}
.reservewrap .reservetimewrap {
  border: 1px solid rgba(107, 107, 107, 1);
  text-align: center;
  padding: 16px 26px 16px 26px;
  border-radius: 33px;
  margin-bottom: 18px;
  width: 195px;
  height: 50px;
  cursor: pointer;
}
.reservewrap .v-slider-track__fill {
  position: relative;
}
.reservewrap .v-slider-track__background {
  background: rgba(107, 107, 107, 1) !important;
}
.reservewrap .v-picker {
  background-color: transparent !important;
}
.reservewrap .datepickerheader {
  grid-area: title;
  padding-inline: 24px 12px;
  padding-top: 16px;
  padding-bottom: 16px;
  font-family: SF Pro;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
}
/* 暫時不需要 */
.reservewrap .v-date-picker-controls {
  display: none;
}
.reservewrap .Scheduletxt .v-field {
  border: none;

  margin: 30px 0;
}
.reservewrap .v-input {
  flex: 0;
}
.reservewrap .Schedulewrap .titlewrap {
  display: flex;
  align-items: center;
}
.reservewrap .Schedulewrap .titlewrap img {
  cursor: pointer;
}

@media (max-width: 576px) {
  .reservewrap .datepicker {
    padding: 0 20px;
    height: auto;
    flex-direction: column;
  }
  .Schedulewrap {
    width: 100%;
    padding: 0;
    flex-direction: column;
  }
  .reservewrap .v-overlay__content {
    width: 100% !important;
    padding: 20px;
    max-width: 100% !important;
    margin: 0 !important;
  }
  .reservewrap .reservecontent {
    height: auto;
    padding: 3px 15px 75px 0;
  }
  .reservewrap .schedulewrap {
    padding-left: 24px;
  }
  .reservewrap .reservescheduleoperation img {
    width: 30px;
    margin: 0 10px;
  }
}
</style>
