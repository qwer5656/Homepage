<template lang="">
  <div class="reservewrap">
    <div class="datepicker">
      <div>
        <v-date-picker
          bg-color="#000"
          :title="$t('Reservepage.title')"
          v-model="date"
        >
          <template v-slot:header>
            <h1 class="datepickerheader">{{ getheaderdate }}</h1>
          </template></v-date-picker
        >
      </div>
      <div class="schedulewrap" @click.capture="clearscheduledata()">
        <div class="addserverwrap">
          <h4>{{ $t("Reservepage.schedule") }}</h4>
          <div>
            <img
              src="../assets/img/Adddeep_On.png"
              alt=""
              @click="adddata(true)"
            />
          </div>
        </div>

        <div class="reservecontent">
          <div class="reservenone" v-if="timedata.length == 0">none</div>
          <div class="reserveschedulewrap" v-for="item in timedata" :key="item">
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
<script setup>
import { ref, computed, watch, onMounted, defineProps } from "vue";
import { mdiMinusCircle, mdiPencil } from "@mdi/js";
import { useMainStore } from "@/stores/main";
import { reverseStore } from "@/stores/reverse";
import { ResultStore } from "@/stores/result";

const date = ref(new Date(""));
const day = ref("2024.01.02");
const dayitems = ref([]);
const timeform = ref("00:00");
const timeto = ref("00:00");
const value = ref([0, 0]);
const title = ref("");
const timeitem = ref([]);
const createdialog = ref(false);
const monthNames = [
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
];
const cratescheduleitem = ref([]);
const mode = ref("");
const scheduledata = ref({});
const tempscheduledata = ref({});

const mainStore = useMainStore();
const reverse = reverseStore();
const resultStore = ResultStore();

const allowedDates = (val) => {
  return parseInt(mainStore.date.toISO(val).split("-")[2], 10) % 2 === 0;
};

const change = () => {
  let sub = (value.value[1] - value.value[0]) / 2;
  document.documentElement.style.setProperty("--hourvalue", `'${sub}hrs'`);
};

const changedialog = (val) => {
  createdialog.value = val;
};

const adddata = () => {
  scheduledata.value = {
    title: "",
    timeform: "00:00",
    timeto: "00:00",
    active: false,
  };
  mode.value = "add";
  changedialog(true);
};

const operationscheduledata = () => {
  if (mode.value == "add") {
    let obj = {};
    let dayString = convertDate.value.toString();
    obj.startTime = dayString + "T" + scheduledata.value.timeform;
    obj.endTime = dayString + "T" + scheduledata.value.timeto;
    obj.title = scheduledata.value.title;
    obj.valid = true;
    obj.result = "";
    reverse.postapi(obj).then((res) => {
      if (res.success) {
        cratescheduleitem.value = res.data;
        resultStore.successres();
        changedialog(false);
      } else {
        resultStore.errorres(res.message);
      }
    });
  }

  if (mode.value == "edit") {
    let obj = {};
    let dayString = convertDate.value.toString();
    obj.startTime = dayString + "T" + scheduledata.value.timeform;
    obj.endTime = dayString + "T" + scheduledata.value.timeto;
    obj.valid = true;
    obj.result = "";
    obj.title = scheduledata.value.title;
    obj.scheduleTaskId = scheduledata.value.scheduleTaskId;
    reverse.putapi(obj).then((res) => {
      if (res.success) {
        cratescheduleitem.value = res.data;
        resultStore.successres();
        changedialog(false);
      } else {
        resultStore.errorres(res.message);
      }
    });
  }
};

const selectdata = (e) => {
  cratescheduleitem.value.forEach((el) => {
    el.active = el === e;
  });
};

const deletedata = (e) => {
  reverse.deleteapi(e.scheduleTaskId).then((res) => {
    if (res.success === undefined) {
      resultStore.errorres(res);
    }
    if (res.success) {
      cratescheduleitem.value = res.data;
      resultStore.successres();
    }
  });
};

const ediddata = (e) => {
  mode.value = "edit";
  tempscheduledata.value = e;
  scheduledata.value = JSON.parse(JSON.stringify(e));
  changedialog(true);
};

const clearscheduledata = () => {
  cratescheduleitem.value.forEach((e) => {
    e.active = false;
  });
};

// Watchers
watch(value, (val) => {
  let sub = (val[1] - val[0]) / 2;
  scheduledata.value.timeform = timeitem.value[val[0]];
  scheduledata.value.timeto = timeitem.value[val[1]];
  document.documentElement.style.setProperty("--hourvalue", `'${sub}hrs'`);
});

watch(
  () => scheduledata.value.timeto,
  (val) => {
    if (val < scheduledata.value.timeform) {
      let temp = scheduledata.value.timeform;
      scheduledata.value.timeform = val;
      scheduledata.value.timeto = temp;
    } else {
      let i =
        parseInt(val.split(":")[0] * 2) + parseInt(val.split(":")[1] / 30);
      value.value[1] = i;
      change();
    }
  }
);

watch(
  () => scheduledata.value.timeform,
  (val) => {
    if (val > scheduledata.value.timeto) {
      let temp = scheduledata.value.timeto;
      scheduledata.value.timeform = temp;
      scheduledata.value.timeto = val;
    } else {
      let i =
        parseInt(val.split(":")[0] * 2) + parseInt(val.split(":")[1] / 30);
      value.value[0] = i;
      change();
    }
  }
);

// Computed
const getheaderdate = computed(() => {
  let date = new Date();
  let year = date.getFullYear();
  return `${year}.${monthNames[date.getMonth()]}`;
});

const convertDate = computed(() => {
  let nowdate = date.value;
  let year = nowdate.getFullYear();
  let month = (nowdate.getMonth() + 1).toString().padStart(2, "0");
  let day = nowdate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
});

const getcalendar = computed(() => {
  let nowdate = date.value;
  let year = nowdate.getFullYear();
  let month = (nowdate.getMonth() + 1).toString().padStart(2, "0");
  let day = nowdate.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
});

const getcalendarlist = computed(() => [getcalendar.value]);

const filterdata = computed(() => {
  if (!cratescheduleitem.value) return [];
  return cratescheduleitem.value.filter((e) => {
    let val = convertDate.value;
    return e.startTime.split("T")[0] === val;
  });
});

const timedata = computed(() => {
  return filterdata.value.map((e) => {
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
});

// Mounted lifecycle
onMounted(() => {
  date.value = new Date();
  let sub = (value.value[1] - value.value[0]) / 2;
  document.documentElement.style.setProperty("--hourvalue", `'${sub}hrs'`);

  let timeval = [];
  let hour = 0;
  let min = 0;

  for (let i = 0; i <= 48; i++) {
    timeval.push(
      `${hour < 10 ? "0" + hour : hour}:${min < 30 ? min + "0" : min}`
    );
    if (i === 47) {
      hour = 23;
      min = 59;
      continue;
    }

    if (i % 2 === 0) {
      min = 30;
    } else {
      hour++;
      min = 0;
    }
  }

  reverse.getapiAll().then((res) => {
    cratescheduleitem.value = res.data;
  });

  timeitem.value = timeval;
});
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
