<template lang="">
  <div class="reservewrap">
    <v-tabs
      v-model="tab"
      show-arrows
      hide-slider="true"
      class="tab"
      selected-class="select"
    >
      <v-tab value="Reserve">{{ $t("Reservepage.reserve") }}</v-tab>
      <v-tab value="Record">{{ $t("Reservepage.record") }}</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="Reserve" style="color: white">
          <div class="datepicker" v-if="tab == 'Reserve'">
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
                <div
                  class="reserveschedulewrap"
                  v-for="item in timedata"
                  :key="item"
                >
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
                        @click="setcurtask(item)"
                        alt=""
                      />
                    </div>
                    <!-- <div>
                      <img
                        style="width: 30px; height: 30px"
                        src="../assets/img/Information.png"
                        @click="infodata(item)"
                        alt=""
                      />
                    </div> -->
                  </div>
                  <h3 class="title">{{ item.title }}</h3>
                  <div
                    class="reservetimewrap"
                    :class="{ scheduleselect: item.active }"
                    @click="selectdata(item)"
                  >
                    {{ item.startDate }} {{ item.timeform }} -
                    {{ item.endDate }}
                    {{ item.timeto }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-window-item>
        <v-window-item value="Record" style="color: white">
          <ReverseHistory v-if="tab == 'Record'" />
        </v-window-item>
      </v-window>
    </v-card-text>

    <v-dialog
      v-model="createdialog"
      persistent
      width="auto"
      class="reservewrap"
    >
      <div class="Schedulewrap">
        <div class="titlewrap">
          <div class="title">
            {{
              mode == "add"
                ? $t("Reservepage.createSchedule")
                : $t("Reservepage.editSchedule")
            }}
          </div>
          <div>
            <img src="../assets/img/Close.png" @click="changedialog(false)" />
          </div>
        </div>
        <v-text-field
          :label="$t('Reservepage.scheduleTitle')"
          variant="underlined"
          class="Scheduletxt"
          hide-details
          density="compact"
          v-model="scheduledata.title"
          maxlength="20"
        >
        </v-text-field>
        <div class="date">
          <div class="datewrap">
            <div>{{ $t("Reservepage.startDateTime") }}</div>
            <div class="datecontent">
              <v-date-input
                label="EndDate"
                prepend-icon=""
                variant="solo"
                persistent-placeholder
                v-model="scheduledata.startDate"
                class="dateinput"
              ></v-date-input>
              <div>
                <Nselect v-model="scheduledata.timeform" :items="timeitem" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="date">
            <div class="datewrap">
              <div>{{ $t("Reservepage.endDateTime") }}</div>
              <div class="datecontent">
                <v-date-input
                  label="EndDate"
                  prepend-icon=""
                  variant="solo"
                  persistent-placeholder
                  v-model="scheduledata.endDate"
                  class="dateinput"
                ></v-date-input>
                <div>
                  <Nselect v-model="scheduledata.timeto" :items="timeitem" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="date">
          <div class="datewrap">
            <div>{{ $t("Reservepage.scheduleTitle") }}</div>

            <div class="periodSummary">
              <span>
                {{
                  $t("Reservepage.periodCount", {
                    count: scheduledata.periods?.length || 0,
                  })
                }}
              </span>

              <v-btn
                color="primary"
                variant="tonal"
                style="margin-left: 20px"
                @click="periodDialog = true"
              >
                {{ $t("Reservepage.setPeriod") }}
              </v-btn>
            </div>
          </div>
        </div>
        <div class="chargebt" @click="operationscheduledata()">
          {{
            mode == "add" ? $t("Reservepage.create") : $t("Reservepage.save")
          }}
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="infodialog" persistent width="auto" class="reservewrap">
      <div class="Schedulewrap">
        <div class="titlewrap">
          <div class="title">
            {{ $t("Reservepage.info") }}
          </div>
          <div>
            <img
              src="../assets/img/Close.png"
              @click="changeinfodialog(false)"
            />
          </div>
        </div>
        <pre class="curinforesult">{{ curinfo }}</pre>
      </div>
    </v-dialog>

    <v-dialog
      v-model="deletedialog"
      persistent
      width="auto"
      class="reservewrap"
    >
      <div class="deletedialogwrap">
        <div class="titlewrap">
          <div class="title">
            {{ $t("Reservepage.info") }}
          </div>
          <div>
            <img
              src="../assets/img/Close.png"
              @click="changedeletedialog(false)"
            />
          </div>
        </div>
        <div>{{ $t("Reservepage.deleteTitle") }}</div>
        <div class="deletechargebtwrap">
          <div class="deletechargebt" @click="deletedata">
            {{ $t("Reservepage.confirm") }}
          </div>
          <div class="cancelbt" @click="changedeletedialog(false)">
            {{ $t("Reservepage.cancel") }}
          </div>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="periodDialog" width="700" class="periodDialogwrap">
      <v-card>
        <v-card-title>
          {{ $t("Reservepage.periodSetting") }}
        </v-card-title>

        <v-card-text>
          <div
            v-for="(period, index) in scheduledata.periods"
            :key="index"
            class="periodCard"
          >
            <div class="periodTitle">
              <span> {{ $t("Reservepage.period") }} {{ index + 1 }} </span>

              <div
                style="
                  cursor: pointer;
                  display: inline-block;
                  vertical-align: middle;
                "
              >
                <img
                  src="../assets/img/Trash.png"
                  @click="removePeriod(index)"
                  alt=""
                />
              </div>
            </div>

            <div class="datecontent">
              <Nselect v-model="period.startTime" :items="timeitem" />

              <span>~</span>

              <Nselect v-model="period.endTime" :items="timeitem" />
            </div>

            <div class="sliderWrap">
              <v-slider
                v-model="period.currentLimit"
                :min="6"
                :max="50"
                :step="1"
                thumb-label="always"
                color="primary"
                hide-details
              />

              <div class="ampText">{{ period.currentLimit }} A</div>
            </div>
          </div>

          <v-btn
            block
            color="primary"
            variant="outlined"
            class="mt-4"
            @click="addPeriod"
          >
            {{ $t("Reservepage.addPeriod") }}
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn variant="text" @click="periodDialog = false">
            {{ $t("Common.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, defineProps } from "vue";
import { useMainStore } from "@/stores/main";
import { reverseStore } from "@/stores/reverse";
import { ResultStore } from "@/stores/result";
import { VDateInput } from "vuetify/labs/VDateInput";
import { mdiDelete } from "@mdi/js";
import Nselect from "./public/Nselect.vue";
import ReverseHistory from "../components/ReverseHistory.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const date = ref(new Date(""));
const day = ref("2024.01.02");
const dayitems = ref([]);
const timeform = ref("00:00");
const timeto = ref("00:00");
const value = ref([0, 0]);
const title = ref("");
const timeitem = ref([]);
const infodialog = ref(false);
const deletedialog = ref(false);
const curinfo = ref(null);
const curtask = ref(null);

let minDate = ref(new Date().toISOString().split("T")[0]);
let EndDate = ref(new Date());
const tab = ref("");
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
const periodDialog = ref(false);

const mainStore = useMainStore();
const reverse = reverseStore();
const resultStore = ResultStore();

const today = new Date().toISOString().slice(0, 10);
day.value = today;

const addPeriod = () => {
  const MAX_PERIODS = 3;

  if (scheduledata.value.periods.length >= MAX_PERIODS) {
    resultStore.errorres(t("Reservepage.maxPeriods", { count: MAX_PERIODS }));
    return;
  }
  const now = new Date();

  const pad = (n) => n.toString().padStart(2, "0");

  // 🔥 5分鐘對齊
  const minutes = now.getMinutes();
  const roundedMinutes = Math.floor(minutes / 5) * 5;

  const rounded = new Date(now);
  rounded.setMinutes(roundedMinutes);
  rounded.setSeconds(0);
  rounded.setMilliseconds(0);

  const currentTime = `${pad(rounded.getHours())}:${pad(rounded.getMinutes())}`;

  scheduledata.value.periods.push({
    sequence: 0,
    startTime: currentTime,
    endTime: currentTime,
    currentLimit: 16,
  });

  normalizeSequence();
};

const removePeriod = (index) => {
  scheduledata.value.periods.splice(index, 1);

  normalizeSequence();
};
const normalizeSequence = () => {
  scheduledata.value.periods.forEach((p, index) => {
    p.sequence = index + 1;
  });
};

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

function roundToNearest5(date) {
  const newDate = new Date(date); // 避免直接修改原始 date
  const minutes = newDate.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 5) * 5;

  if (roundedMinutes === 60) {
    newDate.setHours(newDate.getHours() + 1);
    newDate.setMinutes(0);
  } else {
    newDate.setMinutes(roundedMinutes);
  }

  return (
    String(newDate.getHours()).padStart(2, "0") +
    ":" +
    String(newDate.getMinutes()).padStart(2, "0")
  );
}
let formatDate = function (date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // '07'
  const day = String(date.getDate()).padStart(2, "0"); // '03'
  return `${year}-${month}-${day}`;
};
const adddata = () => {
  scheduledata.value = {
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    timeform: roundToNearest5(new Date()),
    timeto: roundToNearest5(new Date()),
    active: false,
    periods: [],
  };
  mode.value = "add";
  changedialog(true);
};

const convertDateFormat = (date) => {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const operationscheduledata = () => {
  if (mode.value == "add") {
    let obj = {};

    // 時間處理
    let startDate = convertDateFormat(scheduledata.value.startDate).toString();
    let endDate = convertDateFormat(scheduledata.value.endDate).toString();

    obj.scheduleTaskId = crypto.randomUUID(); // 或自己給 GUID
    obj.chargePointId = scheduledata.value.chargePointId;
    obj.title = scheduledata.value.title;

    obj.startTime = startDate + "T" + scheduledata.value.timeform;
    obj.endTime = endDate + "T" + scheduledata.value.timeto;

    obj.valid = true;
    obj.createdTime = new Date().toISOString();
    obj.updatedTime = new Date().toISOString();
    obj.lastExecutedTime = "2026-06-17T03:48:01.288Z";
    obj.status = "Pending";

    let periods = [];

    scheduledata.value.periods.forEach((e) => {
      let data = {};
      data.startTime = e.startTime;
      data.endTime = e.endTime;
      data.currentLimit = e.currentLimit;
      data.rateUnit = "A";
      data.sequence = e.sequence;
      periods.push(data);
    });

    obj.periods = periods;

    reverse.postapi(obj).then((res) => {
      if (res.success) {
        res.data.forEach((e) => {
          e.startTime = convertUtcToLocalString(e.startTime);
          e.endTime = convertUtcToLocalString(e.endTime);
          e.periods.forEach((p) => {
            p.endTime = p.endTimeText;
            p.startTime = p.startTimeText;
          });
        });

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
    let startDate = convertDateFormat(scheduledata.value.startDate).toString();
    let endDate = convertDateFormat(scheduledata.value.endDate).toString();
    obj.startTime = startDate + "T" + scheduledata.value.timeform;
    obj.endTime = endDate + "T" + scheduledata.value.timeto;
    obj.valid = true;
    obj.result = "";
    obj.title = scheduledata.value.title;
    obj.scheduleTaskId = scheduledata.value.scheduleTaskId;

    let periods = [];

    scheduledata.value.periods.forEach((e) => {
      let data = {};
      data.ScheduleTaskPeriodId = e.scheduleTaskPeriodId;
      data.ScheduleTaskId = e.scheduleTaskId;
      data.startTime = e.startTime;
      data.endTime = e.endTime;
      data.currentLimit = e.currentLimit;
      data.rateUnit = "A";
      data.sequence = e.sequence;
      periods.push(data);
    });

    obj.periods = periods;

    reverse.putapi(obj).then((res) => {
      if (res.success) {
        res.data.forEach((e) => {
          e.startTime = convertUtcToLocalString(e.startTime);
          e.endTime = convertUtcToLocalString(e.endTime);
          e.periods.forEach((p) => {
            p.endTime = p.endTimeText;
            p.startTime = p.startTimeText;
          });
        });

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
let pageCount = computed(() => {
  return Math.ceil(filterdesserts.value.length / itemsPerPage.value);
});

let filterdesserts = computed(() => {
  return desserts.value.filter((e) => {
    let val = true;
    for (var item in e) {
      if (obj.value[item] != undefined) {
        if (typeof e[item] === "number") {
          if (
            String(e[item])
              .toLocaleUpperCase()
              .indexOf(obj.value[item].toLocaleUpperCase()) === -1
          ) {
            return false;
          }
        } else {
          if (
            e[item]
              .toLocaleUpperCase()
              .indexOf(obj.value[item].toLocaleUpperCase()) === -1
          ) {
            return false;
          }
        }
      }
    }
    return val;
  });
});
const deletedata = () => {
  let e = curtask.value;
  reverse.deleteapi(e.scheduleTaskId).then((res) => {
    if (res.success === undefined) {
      resultStore.errorres(res);
    }
    if (res.success) {
      res.data.forEach((e) => {
        e.startTime = convertUtcToLocalString(e.startTime);
        e.endTime = convertUtcToLocalString(e.endTime);
        e.periods.forEach((p) => {
          p.endTime = p.endTimeText;
          p.startTime = p.startTimeText;
        });
      });

      cratescheduleitem.value = res.data;
      changedeletedialog(false);
      resultStore.successres();
    }
  });
};

const ediddata = (e) => {
  console.log(e);
  mode.value = "edit";
  tempscheduledata.value = e;
  scheduledata.value = JSON.parse(JSON.stringify(e));
  scheduledata.value.startDate = new Date(scheduledata.value.startTime);
  scheduledata.value.endDate = new Date(scheduledata.value.endTime);
  changedialog(true);
};

const infodata = (item) => {
  let str = "";
  if (item.result != null && item.result != "") {
    const logs = item.result.split("\n");
    logs.forEach((log) => {
      // 1. 擷取時間、事件、狀態
      const timeString = log.substring(0, 19); // "2025-09-02 01:45:04"
      const rest = log.substring(20).split(" "); // ["RemoteStopTransaction", "Success"]
      const event = rest[0];
      const status = rest[1];

      // 2. UTC → 本地時間（Asia/Taipei）
      const localTime = convertUtcToLocalString(timeString).replace("T", " ");

      // 3. 輸出結果
      str += `${localTime}  ${event}  ${status}\n`;
    });
  }
  infodialog.value = true;
  curinfo.value = str;
};

const changeinfodialog = (val) => {
  infodialog.value = val;
};

const changedeletedialog = (val) => {
  deletedialog.value = val;
};

const setcurtask = (item) => {
  changedeletedialog(true);
  curtask.value = item;
};

const clearscheduledata = () => {
  cratescheduleitem.value.forEach((e) => {
    e.active = false;
  });
};

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
  return cratescheduleitem.value;
});

const timedata = computed(() => {
  return filterdata.value.map((e) => {
    e.startDate = e.startTime.split("T")[0];
    e.endDate = e.endTime.split("T")[0];
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

  for (let i = 0; i <= 288; i++) {
    timeval.push(
      `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
    );
    if (i === 287) {
      hour = 23;
      min = 59;
      continue;
    }

    min += 5;
    if (min === 60) {
      min = 0;
      hour++;
    }
  }

  reverse.getapiAll().then((res) => {
    console.log(res.data);
    res.data.forEach((e) => {
      // 拼接帶 T 的格式
      e.startTime = convertUtcToLocalString(e.startTime);
      e.endTime = convertUtcToLocalString(e.endTime);
      e.periods.forEach((p) => {
        p.endTime = p.endTimeText;
        p.startTime = p.startTimeText;
      });
    });
    cratescheduleitem.value = res.data;
  });

  timeitem.value = timeval;
});

function convertUtcToLocalString(utcString, keepT = true) {
  if (!utcString) return "";

  // 確保格式正確，加上 Z 表示 UTC
  const input = utcString.slice(0, 19) + "Z";
  const date = new Date(input);

  if (keepT) {
    // 回傳格式：yyyy-MM-ddTHH:mm:ss（保留 T）
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  } else {
    // 回傳格式：依語系顯示的 yyyy-MM-dd HH:mm:ss（去除 T）
    const userLocale = navigator.language;
    return date
      .toLocaleString(userLocale, {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/\//g, "-")
      .replace(", ", " ");
  }
}
</script>
<style>
.reservewrap,
.reservewrap * {
  -webkit-user-select: none; /* Chrome、Safari、iOS */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */
  user-select: none;
}
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
.reservewrap .Schedulewrap .v-field {
  border: 1px solid rgba(107, 107, 107, 1);
  border-radius: 50px;
  padding: 0px 10px 12px 20px;
  margin-top: 10px;
}
.datecontent .dateinput .v-field {
  padding: 0;
}
.datecontent .dateinput {
  margin: 0 20px;
}
.datecontent .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
}

.reservewrap .datepicker {
  height: 520px;
  padding: 20px 47px 42px 47px;
  gap: 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  margin: 0 auto;
  justify-content: center;
}

.reservewrap .deletechargebt {
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

.reservewrap .cancelbt {
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
    #f1b2b2 0%,
    #e70a0a 100%
  );
  border-radius: 32px;
  cursor: pointer;
  margin: 0 10px;
  color: black;
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
  margin-top: 30px;
}

.Schedulewrap {
  width: 605px;
  height: 619px;
  padding: 42px 45px 42px 45px;
  border-radius: 30px;
  background: #222222cf;
  display: flex;
  flex-direction: column;
}

.reservewrap .deletedialogwrap .titlewrap {
  display: flex;
  align-items: center;
}
.reservewrap .deletedialogwrap .titlewrap img {
  cursor: pointer;
}
.deletedialogwrap {
  width: 605px;
  background: #222222cf;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.schedulewrap {
  width: 500px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.Schedulewrap .curinforesult {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.Schedulewrap .date {
  display: flex;
  justify-content: space-around;
}

.Schedulewrap .datewrap {
  width: 100%;
}

.Schedulewrap .datecontent {
  display: flex;
}

.reservewrap .title {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-right: auto;
  padding-bottom: 10px;
  font-weight: bold;
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
.reservewrap .deletechargebtwrap {
  display: flex;
  margin-top: 40px;
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
  align-items: center;
}
.reservewrap .reservescheduleoperation img {
  cursor: pointer;
}

.reservewrap .v-slider-track__fill {
  background: rgba(91, 228, 114, 1);
}

.v-slider-thumb {
  color: rgba(91, 228, 114, 1) !important;
}

/* .reservewrap .v-slider-track__fill::after {
  content: var(--hourvalue);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;

  width: 58px;
  height: 38px;

  background: rgba(91, 228, 114, 0.19);
  box-shadow:
    0px 0px 14.9px rgba(91, 228, 114, 0.54),
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
} */
.reservewrap .reservetimewrap {
  border: 1px solid rgba(107, 107, 107, 1);
  text-align: center;
  padding: 16px 26px 16px 26px;
  border-radius: 33px;
  margin-bottom: 18px;
  width: 100%;
  height: 50px;
  cursor: pointer;
}
.reservewrap .dateselect {
  width: 200px;
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

  margin: 40px 0;
}
.reservewrap .v-input {
  flex: 1;
  flex-basis: 300px;
}
.reservewrap .Schedulewrap .titlewrap {
  display: flex;
  align-items: center;
}
.reservewrap .Schedulewrap .titlewrap img {
  cursor: pointer;
}
.v-date-picker-month__day .v-btn.v-date-picker-month__day-btn {
  --v-btn-height: 24px;
  --v-btn-size: 0.85rem;
  color: white;
  background: black;
}

.v-date-picker-month__day--selected .v-btn.v-date-picker-month__day-btn {
  --v-btn-height: 24px;
  --v-btn-size: 0.85rem;
  color: black;
  background: rgba(91, 228, 114, 1);
}
.v-date-picker {
  color: white;
  background: rgba(0, 0, 0, 1) !important;
}

.reservewrap .select {
  background: rgba(91, 228, 114, 0.19) !important;

  color: rgba(91, 228, 114, 1) !important;
}
.reservewrap .v-window {
  width: 100%;
  padding: 0 18px;
  margin-top: 17px;
}
.reservewrap .Bluetoothwrap {
  display: flex;
}
.reservewrap .tab {
  width: 550px;
  height: 73px;
  padding: 0px 10px;
  box-sizing: border-box;
  align-items: center;
}
.reservewrap .v-slide-group__content {
  justify-content: space-around;
}
.reservewrap .v-slide-group__content .v-btn {
  color: white;
  padding: 15px 35px 15px 35px;
  gap: 10px;
  border-radius: 35px !important;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: center;
  text-transform: none;
}

.reservewrap .v-switch--inset .v-selection-control--dirty .v-switch__track {
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  );
  border: 2px solid #66ff80;
  width: 52.89px;
  height: 28px;
  vertical-align: middle;
}
.reservewrap .v-switch--inset .v-selection-control--dirty .v-switch__thumb {
  background: black;
}
.reservewrap .v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}
.reservewrap .v-switch--inset .v-switch__track {
  background: #ffffff1a;

  width: 52.89px;
  height: 28px;
  border-radius: 30px;
  border: 2px solid #474747;

  box-shadow: 0px 8px 30px 0px #00000069;

  box-shadow: 0px 0px 12px 0px #ffffff08 inset;
}
.reservewrap .container {
  display: flex;
  align-items: flex-start;
}
.reservewrap .container .txt {
  padding-right: 22px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  padding-bottom: 6px;
  display: inline-block;
}

.reservewrap .v-card-text {
  width: 100%;
}

.periodDialogwrap .v-card {
  background: #222222cf;
  color: white;
}
.periodDialogwrap .v-btn--variant-outlined {
  border: thin solid currentColor;
  background: currentColor;
}
.periodDialogwrap .v-btn--variant-outlined .v-btn__content {
  color: white;
}
.periodDialogwrap .datecontent .v-input {
  margin: 0 10px;
}

.periodDialogwrap .datecontent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media (max-width: 576px) {
  .reservewrap .v-window {
    padding: 0;
  }
  .reservewrap .v-card-text {
    padding: 5px;
  }
  .reservewrap .datepicker {
    padding: 10px 20px;
    height: auto;
    flex-direction: column;
    width: 100%;
  }
  .Schedulewrap {
    width: 100%;
    padding: 15px;
    flex-direction: column;
  }
  .deletedialogwrap {
    width: 100%;
    padding: 15px;
  }
  .reservewrap .v-overlay__content {
    width: 100% !important;
    padding: 20px;
    max-width: 100% !important;
    margin: 0 !important;
  }
  .reservewrap .deletechargebt {
    width: 100%;
  }
  .reservewrap .cancelbt {
    width: 100%;
    margin: 20px 0px;
  }
  .reservewrap .reservecontent {
    height: auto;
    padding: 3px 15px 15px 0;
  }
  .reservewrap .schedulewrap {
    padding-left: 24px;
  }
  .reservewrap .reservescheduleoperation img {
    width: 30px;
    margin: 0 10px;
  }
  .schedulewrap {
    width: 100%;
  }
  .reservewrap .dateselect {
    width: 150px;
  }
  .reservewrap .Scheduletxt .v-input__control {
    height: 100px;
  }
  .reservewrap .Scheduletxt .v-input {
    height: 100px;
  }
  .reservewrap .Schedulewrap {
    display: block;
  }
  .reservewrap .deletechargebtwrap {
    flex-direction: column;
  }
  .reservewrap .tab {
    width: 100%;
  }
  .reservewrap .Scheduletxt .v-field {
    border: none;
    margin: 30px 0;
  }
}
</style>
