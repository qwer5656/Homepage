<template>
  <div class="historywrap">
    <div class="historytitle">
      <div class="title">
        {{ $t("Historypage.Title") }}
      </div>
      <div style="display: flex; align-items: center">
        <v-select
          :items="dateitems"
          item-title="text"
          item-value="value"
          style="width: 100px"
          variant="plain"
          clear-icon="clear"
          :menu-icon="false"
          v-model="selectval"
          :prepend-inner-icon="mdiChevronDown"
        ></v-select>
        <v-icon
          :icon="mdiCalculator"
          style="color: white; margin: 0 10px; cursor: pointer"
          @click="changetimeshowValue(true)"
          v-if="selectval == 'month'"
        ></v-icon>
      </div>
    </div>

    <!-- <div v-if="selectval == 'day'">
      <v-chart class="chart" :option="dayoption" autoresize />
    </div> -->

    <div style="margin-top: 5px" v-if="selectval == 'month'">
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items="filterdesserts"
        :items-per-page="itemsPerPage"
        class="vtablewrap"
      >
        <!-- 搜尋列 -->
        <template v-slot:body.prepend>
          <tr>
            <td v-for="header in headers" :key="header.key" class="headerwrap">
              <v-text-field
                v-model="obj[header.key]"
                :label="header.title"
                hide-details
              />
            </td>
          </tr>
        </template>

        <!-- 分頁 -->
        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount" />
          </div>
        </template>
      </v-data-table>
    </div>
    <div v-if="selectval == 'week'">
      <v-chart class="chart" :option="option" autoresize />
    </div>
    <v-dialog
      v-model="timeshow"
      persistent
      width="800"
      class="historydialogwrap"
    >
      <div class="exportwrap">
        <div
          style="
            color: white;
            text-align: right;
            font-size: 40px;
            padding-right: 10px;
            cursor: pointer;
          "
        >
          <img
            src="../assets/img/Close.png"
            @click="changetimeshowValue(false)"
            alt=""
          />
        </div>
        <v-form class="formwrap" ref="entryForm">
          <v-row dense style="padding: 30px">
            <v-col cols="12" md="6">
              <v-date-input
                label="StartDate"
                prepend-icon=""
                variant="solo"
                persistent-placeholder
                v-model="startDate"
                :rules="Daterules"
              >
              </v-date-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-date-input
                label="EndDate"
                prepend-icon=""
                variant="solo"
                persistent-placeholder
                v-model="endDate"
                :rules="Daterules"
              ></v-date-input>
            </v-col>
          </v-row>
          <div class="btwrap">
            <v-btn
              text="查詢"
              @click="CheckExPortDate"
              style="color: white; background-color: green; padding: 10px"
            ></v-btn>
          </div>
        </v-form>
      </div>
    </v-dialog>
    <v-dialog
      v-model="datashow"
      persistent
      width="500"
      class="statisticsdialogwrap"
    >
      <v-card>
        <v-card-title>
          <div style="display: flex; align-items: center">
            <div>統計資料</div>
            <img
              src="../assets/img/Close.png"
              @click="datashow = false"
              style="margin-left: auto; cursor: pointer"
              alt=""
            />
          </div>
        </v-card-title>
        <div style="padding-left: 20px">
          {{ formatDateSearch(startDate) }} ~ {{ formatDateSearch(endDate) }}
        </div>
        <v-card-text>
          <v-data-table
            :headers="dataheaders"
            :items="summaryItems"
            hide-default-footer
            class="elevation-1"
          />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            :text="$t('Historypage.Export')"
            @click="ExePortDate(true)"
            style="color: white; background-color: green; padding: 10px"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ul style="color: white">
      <li v-for="(product, index) in products" :key="index">
        {{ product }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts";
import { mdiMagnify, mdiChevronDown, mdiCalculator } from "@mdi/js";
import { ResultStore } from "@/stores/result";
import { VDateInput } from "vuetify/labs/VDateInput";
import _ from "lodash";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts"; //有用到
import {
  computed,
  ref,
  provide,
  reactive,
  onMounted,
  getCurrentInstance,
} from "vue";
import { historyStore } from "@/stores/history";
import { useI18n } from "vue-i18n";
import { exportStore } from "@/stores/export";

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const { locale, messages, t } = useI18n();
const Result = ResultStore();
const Daterules = [
  (value) => {
    if (value) return true;
    return `${t("Historypage.Dateinput")} ${t("notNull")}`;
  },
];

// 使用 computed 確保資料是反應式的
const headers = computed(() =>
  locale.value === "en" ? messages.value.en.headers : messages.value.zh.headers,
);

const dataheaders = [
  { title: "總時間", key: "time" },
  { title: "充電度數", key: "degree" },
  { title: "充電費用", key: "totalAmount" },
];

// 秒數轉 HH:mm:ss
const formatTime = (totalSeconds) => {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );

  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

// 加總充電時間
const totalTime = ref(0);
const monthtotalDrgee = ref(0);
const monthTotalAmount = ref(0);

const summaryItems = computed(() => {
  return [
    {
      time: totalTime.value,
      degree: monthtotalDrgee.value,
      totalAmount: monthTotalAmount.value,
    },
  ];
});

const dateitems = computed(() =>
  locale.value === "en"
    ? messages.value.en.dateitems
    : messages.value.zh.dateitems,
);

const pagedItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return filterdesserts.value.slice(start, end);
});

const totalDrgee = computed(() => {
  return pagedItems.value.reduce((sum, item) => {
    return sum + Number((item.drgee / 1000) || 0);
  }, 0);
});

const selectval = ref("week");
const timeshow = ref(false);
const datashow = ref(false);
let startDate = ref(new Date());
let endDate = ref(new Date());
const option = ref({
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(50, 50, 50, 0.7)", // 背景色
    borderColor: "#ccc", // 邊框顏色
    borderWidth: 1, // 邊框寬度
    textStyle: {
      color: "#fff", // 字體顏色
      fontSize: 14,
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "50%"],
  },

  series: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      type: "line",
      itemStyle: {
        color: "rgba(91, 228, 114, 1)",
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(91, 228, 114, 0.8)",
          },
          {
            offset: 1,
            color: "rgb(0, 0, 0, 0)",
          },
        ]),
      },
    },
  ],
});
const formatDateSearch = function (date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};
const dayoption = ref({
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(50, 50, 50, 0.7)", // 背景色
    borderColor: "#ccc", // 邊框顏色
    borderWidth: 1, // 邊框寬度
    textStyle: {
      color: "#fff", // 字體顏色
      fontSize: 14,
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "50%"],
  },

  series: [
    {
      type: "bar",
      name: "KWh",
      data: [],
      barCategoryGap: "80%",
      itemStyle: {
        color: "rgba(91, 228, 114, 1)",
      },
    },
  ],
});

const obj = ref({});

const desserts = ref([]);
const itemsPerPage = ref(5);
const page = ref(1);
const historylist = ref("");

onMounted(() => {
  getDay();
  var history = historyStore();
  // const { proxy } = getCurrentInstance();
  // history.getapiAll(proxy).then((res) => {
  //   desserts.value = res.data;
  // });

  const start = new Date();
  const end = new Date();

  const startMonthDate = new Date(start.getFullYear(), start.getMonth(), 1); // 當月第一天
  const endMonthDate = new Date(end.getFullYear(), end.getMonth() + 1, 0); // 當月最後一天

  let startMonthDatestring = formatDate(startMonthDate);
  let endMonthDatestring = formatDate(endMonthDate);

  history
    .getapiInterval(startMonthDatestring, endMonthDatestring)
    .then((res) => {
      if (res.data === undefined || res.data === null) {
        return;
      }
      res.data.forEach((e) => {
        const input = e.startTime.slice(0, 19) + "Z"; // 當作 UTC 解析
        const dateUtc = new Date(input);
        const userLocale = navigator.language;
        console.log(userLocale);
        // 直接用 toLocaleString 轉成本地時間字串
        e.startTime = dateUtc
          .toLocaleString(userLocale, {
            hour12: false, // 24小時制
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          .replace(/\//g, "-")
          .replace(", ", " ");
      });
      desserts.value = res.data;
    });

  let item = [];
  let searchTime = {};
  for (let i = 6; i >= 0; i--) {
    let currentDate = new Date();

    currentDate.setDate(currentDate.getDate() - i);

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    let dateString =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;
    item.push(dateString);
    searchTime[dateString] = 6 - i;
  }

  option.value.xAxis.data = item;

  history.getapiInterval(item[0], item[item.length - 1]).then((res) => {
    let val = [0, 0, 0, 0, 0, 0, 0];
    res.data.forEach((e) => {
      if (searchTime[e.dateTime] != undefined) {
        val[searchTime[e.dateTime]] = _.round(
          (e.drgee/1000) + val[searchTime[e.dateTime]],
          3,
        );
      }
    });
    option.value.series[0].data = val;
  });
});

let formatDate = function (date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // '07'
  const day = String(date.getDate()).padStart(2, "0"); // '03'
  return `${year}-${month}-${day}`;
};

let pageCount = computed(() => {
  return Math.ceil(filterdesserts.value.length / itemsPerPage.value);
});

let getDay = function () {
  var history = historyStore();

  history.getAllToday().then((res) => {
    const energyMap = new Array(24).fill(0);
    res.data.forEach((item) => {
      const hour = parseInt(item.dateTime.substring(0, 2)); // 06 -> 6
      energyMap[hour] = item.energyWh;
    });
    dayoption.value.series[0].data = energyMap;
  });
};

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

// 獲取組件實例
const instance = getCurrentInstance();

const CheckExPortDate = function () {

  


    const start = new Date(startDate.value);
    start.setHours(0, 0, 0, 0);
  const end = new Date(endDate.value);
  end.setHours(0, 0, 0, 0);

  const maxEnd = new Date(start);
  maxEnd.setMonth(maxEnd.getMonth() + 6);

  if (start > end) {
    Result.errorres("開始日期不能大於結束日期");
    return;
  }

  if (end > maxEnd) {
    Result.errorres("查詢區間不可超過半年");
    return;
  }


  var history = historyStore();
  datashow.value = true;

  let startMonthDatestring = formatDateToYMD(startDate.value, true);
  let endMonthDatestring = formatDateToYMD(endDate.value, false);

  history
    .GetchargeTransactions(startMonthDatestring, endMonthDatestring)
    .then((res) => {
      if (res.data != null) {
        totalTime.value = res.data.time;
        monthtotalDrgee.value = res.data.degree;
        monthTotalAmount.value = res.data.totalAmount;
      }
    });
};

const ExePortDate = function () {
  ExportExcel();
};

// 定義導出 Excel 的方法
const ExportExcel = async () => {
  const exportexcel = exportStore();

  let data = {
    startDate: formatDateToYMD(startDate.value, true),
    endDate: formatDateToYMD(endDate.value, false),
  };
  try {
    console.log(data);
    const res = await exportexcel.getapi(instance?.proxy, data);

    const dateTime = new Date();

    let year = dateTime.getFullYear();
    let month = String(dateTime.getMonth() + 1).padStart(2, "0");
    let day = String(dateTime.getDate()).padStart(2, "0");
    let date = `${year}/${month}/${day}`;

    const fileName = `${date}.csv`;

    downloadFile(res, fileName);
  } catch (error) {
    console.error("導出失敗:", error);
  }
};

function formatDateToYMD(date, time) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  let val = time === true ? "00:00:00" : "23:59:59";
  return `${year}/${month}/${day} ` + val;
}

const downloadFile = (response, fileName) => {
  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  const downloadUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = fileName;
  document.body.appendChild(a);

  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
};

function changetimeshowValue(value) {
  timeshow.value = value;
}

function changedatashowValue(value) {
  datashow.value = value;
}
</script>

<style>
.historywrap .mdi-chevron-down::before {
  color: white;
}
.historywrap .title {
  color: white;
  margin-right: auto;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
}
.historywrap .btwrap {
  display: flex;
  flex-direction: row-reverse;
}
.btwrap {
  margin: 30px 10px;
  text-align: right;
}
.historywrap .chart {
  height: 70vh;
}
.historywrap tbody tr:hover {
  background-color: transparent !important;
}
.historywrap tr:hover td {
  background: rgb(197, 201, 231);
  cursor: pointer;
}
.historywrap .v-icon__svg {
  color: white;
}
.historywrap .v-select__selection-text {
  color: rgba(107, 107, 107, 1);
}

.historywrap .historytitle {
  display: flex;
  padding: 0 120px 0 80px;
  align-items: center;
}
.historywrap .vtablewrap {
  background-color: black;
  color: white;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  padding: 0 60px;
}

.historywrap .vtablewrap tbody tr:hover td {
  background-color: rgb(255, 255, 255, 0.1);
}
.historywrap .vtablewrap table {
  padding: 10px;
}

.historywrap .vtablewrap thead {
  background-color: #588157;
  border-radius: 10px;
}
.historywrap .headerwrap {
  padding: 20px 10px !important;
}

.historydialogwrap .formwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
}

/* 統計 Dialog */
.statisticsdialogwrap .v-card {
  overflow: hidden;
  background: rgb(0, 0, 0, 0.8);
  color: white;
}

.statisticsdialogwrap .v-card-title {
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
}

.statisticsdialogwrap .v-table {
  overflow: hidden;
}

.statisticsdialogwrap .v-table thead {
  background-color: #588157;
}

.statisticsdialogwrap .v-table thead th {
  color: white !important;
  font-weight: 600 !important;
}

.statisticsdialogwrap .v-table tbody td {
  padding: 16px;
  background-color: rgb(0, 0, 0);
  color: white;
  font-weight: bold;
}

.statisticsdialogwrap .v-card-actions {
  padding: 16px 24px;
}

.statisticsdialogwrap .v-btn {
  border-radius: 30px;
}

.historydialogwrap .exportwrap {
  background: rgba(0, 0, 0, 1);
}
.historydialogwrap .formwrap {
  gap: 50px;

  border-radius: 20px;
}

/* custom <v-date-picker> Style Start */
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

.v-date-picker-month__day {
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  height: auto;
  width: auto;
}
.v-date-picker-header {
  height: auto;
  padding-bottom: 0px;
}

.v-picker-title {
  text-transform: none;
}

.v-date-picker__title {
  display: inline-block;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
}

.v-date-picker {
  color: white;
  background: rgba(0, 0, 0, 1) !important;
}
/* <v-date-picker> Style End */

@media (max-width: 576px) {
  .historywrap .chart {
    padding-bottom: 30px;
  }
  .historywrap .vtablewrap {
    padding: 0 5px;
    font-size: 12px;
  }
  .historywrap .historytitle {
    display: flex;
    padding: 0 30px 0 50px;
    align-items: center;
  }
}
</style>
