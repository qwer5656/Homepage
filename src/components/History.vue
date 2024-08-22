<template>
  <div class="historywrap">
    <!-- <div style="margin-top: 5px">
    <v-table>
      <thead>
        <tr>
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
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.degree }}</td>
        </tr>
      </tbody>
    </v-table>
  </div> -->
    <div style="display: flex; padding-left: 80px; align-items: center">
      <div class="title">History</div>
      <div>
        <v-select
          :items="['Last 7 day']"
          style="width: 200px"
          variant="plain"
          clear-icon="clear"
          :menu-icon="false"
          v-model="selectval"
          :prepend-inner-icon="mdiChevronDown"
        ></v-select>
      </div>
    </div>

    <div>
      <v-chart class="chart" :option="option" autoresize />
    </div>
    <v-dialog v-model="chartsshow" persistent width="800">
      <div style="background-color: white">
        <div class="btwrap">
          <v-btn text="X" @click="changeValue(false)"></v-btn>
        </div>
        <v-chart class="chart" :option="options" autoresize />
      </div>
    </v-dialog>
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
import { ref, provide, reactive } from "vue";

import { mdiChevronDown } from "@mdi/js";

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const selectval = ref("Last 7 day");

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

const desserts = reactive([
  {
    date: "2024/01/18",
    time: "05:10",
    degree: 1.5,
  },
  {
    date: "2024/01/19",
    time: "01:10",
    degree: 25,
  },

  {
    date: "2024/01/20",
    time: "02:10",
    degree: 3.2,
  },

  {
    date: "2024/01/21",
    time: "10:10",
    degree: 2,
  },

  {
    date: "2024/01/22",
    time: "15:10",
    degree: 1,
  },
]);

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

@media (max-width: 576px) {
  .historywrap .chart {
   padding-bottom: 30px;
  }
}
</style>
