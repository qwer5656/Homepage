<template>
  <div class="historywrap">
    <div style="display: flex; padding: 0 120px 0 80px; align-items: center">
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
          :prepend-inner-icon="'mdi-chevron-down'"
        ></v-select>
        <v-btn
          text="Export"
          @click="changetimeshowValue(true)"
          style="color: white; background-color: green; padding: 10px"
        ></v-btn>
      </div>
    </div>
    <div style="margin-top: 5px" v-if="selectval == 'month'">
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items="filterdesserts"
        :items-per-page="itemsPerPage"
        class="vtablewrap"
      >
        <template v-slot:body.prepend>
          <tr>
            <td v-for="header in headers" class="headerwrap">
              <v-text-field
                v-model="obj[`${header.key}`]"
                type="text"
                :label="header.title"
                hide-details
                :prepend-inner-icon="mdiMagnify"
              ></v-text-field>
            </td>
          </tr>
        </template>
        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
              text="Export Report"
              @click="CheckExPortDate"
              style="color: white; background-color: green; padding: 10px"
            ></v-btn>
          </div>
        </v-form>
      </div>
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
import { mdiMagnify } from "@mdi/js";
import { ResultStore } from "@/stores/result";
import { VDateInput } from "vuetify/labs/VDateInput";

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
import "@mdi/font/css/materialdesignicons.css";
use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const { locale, messages } = useI18n();

const Daterules = [
  (value) => {
    if (value) return true;
    return "Date is null";
  },
];

// 使用 computed 確保資料是反應式的
const headers = computed(() =>
  locale.value === "en" ? messages.value.en.headers : messages.value.zh.headers
);

const dateitems = computed(() =>
  locale.value === "en"
    ? messages.value.en.dateitems
    : messages.value.zh.dateitems
);

const selectval = ref("week");
const timeshow = ref(false);
let startDate = ref(new Date());
let endDate = ref(new Date());
const option = ref({
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
      data: [50, 100, 200, 150, 200, 150, 50],
      type: "line",
      areaStyle: {},
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

const options = ref({
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [100, 150, 300],
      type: "line",
      areaStyle: {},
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgb(91, 228, 114, 0.5)",
        },
        {
          offset: 1,
          color: "rgb(0, 0, 0, 0)",
        },
      ]),
    },
  ],
});

const obj = ref({});

const desserts = ref([]);
const itemsPerPage = ref(5);
const page = ref(1);

onMounted(() => {
  var history = historyStore();
  const { proxy } = getCurrentInstance();
  history.getapiAll(proxy).then((res) => {
    desserts.value = res.data;
  });
  let item = [];
  for (let i = 0; i < 7; i++) {
    var currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + i);

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();

    var dateString =
      year +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (day < 10 ? "0" : "") +
      day;
    item.push(dateString);
  }

  option.value.xAxis.data = item;

  option.value.series[0].data = [10, 5, 6, 0, 20, 50, 100];
});

let pageCount = computed(() => {
  return Math.ceil(desserts.value.length / itemsPerPage.value);
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

// 獲取組件實例
const instance = getCurrentInstance();

const CheckExPortDate = function () {
  instance?.proxy.$refs.entryForm.validate().then(function (res) {
    let Result = ResultStore();

    if (startDate.value>endDate.value) {
      Result.errorres("The startDate is greater than the endDate");
      return;
    }



    if (res.valid == true) {
      ExportExcel();
    }
  });
};

// 定義導出 Excel 的方法
const ExportExcel = async () => {
  const exportexcel = exportStore();

  let data = {
    startDate: formatDateToYMD(startDate.value, true),
    endDate: formatDateToYMD(endDate.value, false),
  };
  try {
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
.historydialogwrap .exportwrap {
  background: rgba(0, 0, 0, 0.5);
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
  background: rgba(0, 0, 0, 0.9) !important;
}
/* <v-date-picker> Style End */

@media (max-width: 576px) {
  .historywrap .chart {
    padding-bottom: 30px;
  }
}
</style>
