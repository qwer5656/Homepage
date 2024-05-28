<template>
  <div class="historywrap">
    <div style="display: flex; padding-left: 80px; align-items: center">
      <div class="title">History</div>
      <div>
        <v-select
          :items="['week', 'month']"
          style="width: 200px"
          variant="plain"
          clear-icon="clear"
          :menu-icon="false"
          v-model="selectval"
          :prepend-inner-icon="mdiChevronDown"
        ></v-select>
      </div>
    </div>
    <div style="margin-top: 5px" v-if="selectval == 'month'">
      <!-- <v-data-table class="vtablewrap"
    v-model:items-per-page="itemsPerPage">
      <thead>
        <tr>
            <th>充電(卡號/車牌)</th>
          <th class="text-left">{{ $t("Historypage.Date") }}</th>
          <th class="text-left">{{ $t("Historypage.Time") }}</th>
          <th class="text-left">{{ $t("Historypage.Degree") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
          @click="changeValue(true, item)"
        >
        <td>{{ item.startTagId }}</td>
          <td>{{ item.startTime.split("T")[0] }}</td>
          <td>{{ item.chargetime }}</td>
          <td>{{ item.meterStop-item.meterStart }}</td>
        </tr>
      </tbody>
    </v-data-table> -->
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items="desserts"
        :items-per-page="itemsPerPage"
        class="vtablewrap"
      >
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
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts";
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

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const selectval = ref("week");

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

const desserts = ref();
const itemsPerPage = ref(5);
const page = ref(1);
const headers = ref([
  { title: "(Card/licensePlate)", key: "startTagId" },
  { title: "Charging Date", key: "dateTime" },
  { title: "Charging Time", key: "chargetime" },
  { title: "Charging Dgree", key: "drgee" },
]);
onMounted(() => {
  var test = historyStore();
  const { proxy, ctx } = getCurrentInstance();
  console.log(ctx);
  test.getapiAll(proxy).then((res) => {
    desserts.value = res.data;
  });
  desserts.value = [];

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

  option.value.series[0].data = [10, 5, 6, 0,20,50,100];
  console.log(option.value);
});

let pageCount = computed(() => {
  return Math.ceil(desserts.value.length / itemsPerPage.value);
});

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
</script>

<style>
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
@media (max-width: 576px) {
  .historywrap .chart {
    padding-bottom: 30px;
  }
}
</style>
