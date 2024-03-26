<template lang="">
  <div class="reservewrap">
    <div class="Schedulewrap">
      <div class="title">Create Schedule</div>
      <div class="date">
        <div>
          <div>Day</div>
          <div>
            <v-select 
              :items="['2024.01.02']"
              style="width: 150px; height: 20px"
              variant="plain"
              color="#000"
              v-model="day"
            ></v-select>
          </div>
        </div>
        <div>
          <div>Time - Form</div>
          <div>
            <v-select
              :items="timeitem"
              style="width: 150px"
              variant="plain"
              color="#000"
              v-model="timeform"
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
              v-model="timeto"
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
            <div>24:00</div>
          </div>
        </div>
      </div>
      <div class="chargebt">Create</div>
    </div>
    <div class="datepicker">
      <div>
        <v-date-picker
          bg-color="#000"
          title="Schedule List"
          v-model="date"
          :max="date"
          :min="date1"
        >
          <template v-slot:header>
            <h1 class="datepickerheader">{{ getheaderdate }}</h1>
          </template></v-date-picker
        >
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mdiMinusCircle, mdiPencil } from "@mdi/js";
import { useMainStore } from "@/stores/main";

export default {
  data() {
    return {
      date: new Date("2024-03-22"),
      date1: new Date("2024-03-21"),
      day: "2024.01.02",
      timeform: "00:00",
      timeto: "00:00",
      value: [0, 0],
      timeitem: [],
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
  },
  watch: {
    value: {
      handler(val) {
        let sub = (val[1] - val[0]) / 2;
        this.timeform = this.timeitem[val[0]];
        this.timeto = this.timeitem[val[1]];
        console.log(this.timeitem);
        document.documentElement.style.setProperty(
          "--hourvalue",
          `'${sub}hrs'`
        );
      },
    },
    timeto(val) {
      if (val < this.timeform) {
        let temp = this.timeform;
        this.timeform = val;
        this.timeto = temp;
      } else {
        let i =
          parseInt(val.split(":")[0] * 2) + parseInt(val.split(":")[1] / 30);
        this.value[1] = i;
        this.change();
      }
    },
    timeform(val) {
      if (val > this.timeto) {
        let temp = this.timeto;
        this.timeform = temp;
        this.timeto = val;
      } else {
        let i =
          parseInt(val.split(":")[0] * 2) + parseInt(val.split(":")[1] / 30);
        this.value[0] = i;
        this.change();
      }
    },
  },
  mounted() {
    let sub = (this.value[1] - this.value[0]) / 2;
    document.documentElement.style.setProperty("--hourvalue", `'${sub}hrs'`);

    let timeval = [];
    let hour = 0;
    let min = 0;
    for (let i = 0; i <= 48; i++) {
      timeval.push(
        `${hour < 10 ? "0" + hour : hour}:${min < 30 ? min + "0" : min}`
      );
      if (i % 2 == 0) {
        min = 30;
      } else {
        hour++;
        min = 0;
      }
    }

    this.timeitem = timeval;
  },
  computed: {
    getheaderdate() {
      let date = new Date();
      let year = date.getFullYear();
      return year + "." + this.monthNames[date.getMonth()];
    },
  },
};
</script>
<style>
:root {
  --hourvalue: "0";
}

.reservewrap {
  margin-left: 94px;
  width: 1200px;
}
.reservewrap .v-field {
  border: 1px solid rgba(107, 107, 107, 1);
  border-radius: 50px;
  padding: 0px 10px 12px 20px;
  margin-top: 10px;
}
.reservewrap .datepicker {
  height: 520px;
  margin-left: 10px;
  padding: 20px 47px 42px 47px;
  gap: 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
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
}
.Schedulewrap {
  width: 605px;
  height: 519px;
  padding: 42px 45px 42px 45px;
  gap: 40px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.05);
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
.reservewrap {
  color: white;
  display: flex;
}
.Schedulewrap .date {
  display: flex;
  justify-content: space-between;
}
.reservewrap .title {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
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
</style>
