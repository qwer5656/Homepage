<template>
  <div class="historywrap">
    <div style="display: flex; padding: 0 120px 0 80px; align-items: center">
      <div class="title">
        {{ $t("Historypage.Title") }}
      </div>
      <div style="display: flex;align-items: center;">
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
        <v-btn text="Export" @click="changetimeshowValue(true)"  style="color: white; background-color: green; padding: 10px"></v-btn>
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
    <!-- <v-dialog v-model="chartsshow" persistent width="800">
      <div style="background-color: white">
        <div class="btwrap">
          <v-btn text="X" @click="changeValue(false)"></v-btn>
        </div>
        <v-chart class="chart" :option="options" autoresize />
      </div>
    </v-dialog> -->
    <v-dialog v-model="timeshow" persistent width="800" class="historydialogwrap">
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
          <img src="../assets/img/Close.png"  @click="changetimeshowValue(false)" alt="" />
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
            ></v-date-input>
          </v-col>
          <v-col cols="12" md="6">
            <v-date-input
              label="EndDate"
              prepend-icon=""
              variant="solo"
              persistent-placeholder
              v-model="endDate"
            ></v-date-input>
          </v-col>
        </v-row>
        <div class="btwrap">
          <v-btn text="Export Report" @click="ExportExcel"  style="color: white; background-color: green; padding: 10px"></v-btn>
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

import { VDateInput } from "vuetify/labs/VDateInput";

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import {
  computed,
  ref,
  provide,
  reactive,
  onMounted,
  getCurrentInstance,
} from "vue";
import { historyStore } from "@/stores/history";
import { mdiChevronDown } from "@mdi/js";
import { useI18n } from "vue-i18n";
import { exportStore } from "@/stores/export";
import "@mdi/font/css/materialdesignicons.css";
use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const { locale, messages } = useI18n();

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

const chartsshow = ref(false);

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

    // 將日期加一天
    currentDate.setDate(currentDate.getDate() + i);

    // 取得加一天後的年、月、日
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // 注意 JavaScript 中月份是從 0 開始的，所以要加 1
    var day = currentDate.getDate();

    // 格式化年月日字串
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
console.log(instance); // 這裡可以查看 attrs、props 等組件信息

// 定義導出 Excel 的方法
const ExportExcel = async () => {
  const exportexcel = exportStore(); // 假設你使用 Pinia

  let data = {
    startDate: formatDateToYMD(startDate.value, true),
    endDate: formatDateToYMD(endDate.value, false),
  };
  try {
    const res = await exportexcel.getapi(instance?.proxy, data); // 傳遞組件實例
    const fileName = "exported-file.csv"; // 或從後端響應中提取檔案名稱

    // 調用下載函數
    downloadFile(res, fileName);
  } catch (error) {
    console.error("導出失敗:", error);
  }
};

function formatDateToYMD(date, time) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
  let day = String(date.getDate()).padStart(2, "0");
  let val = time === true ? "00:00:00" : "23:59:59";
  return `${year}/${month}/${day} ` + val;
}

const downloadFile = (response, fileName) => {
  // 創建 Blob 對象
  const blob = new Blob([response.data], {
    type: response.headers["content-type"], // 從後端返回的 Content-Type 中讀取
  });

  // 創建 URL
  const downloadUrl = URL.createObjectURL(blob);

  // 創建隱藏的 <a> 標籤
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = fileName; // 設置檔案名稱
  document.body.appendChild(a);

  // 自動點擊下載
  a.click();

  // 移除 <a> 標籤並釋放 URL
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
};

function changeValue(value, obj) {
  if (obj != undefined) {
    options.value.series[0] = {
      data: [
        obj.degree * 100,
        obj.degree * 150,
        obj.degree * 180,
        obj.degree * 200,
        obj.degree * 180,
        obj.degree * 150,
        obj.degree * 120,
      ],
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
    };
  }
  chartsshow.value = value;
}

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
  background: rgba(255, 255, 255, 0.05);
}
.historydialogwrap .formwrap {

 
  gap: 50px;

  border-radius: 20px;
}


@media (max-width: 576px) {
  .historywrap .chart {
    padding-bottom: 30px;
  }
}
</style>
