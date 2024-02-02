<template>
  <div style="margin-top: 5px">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">充電日期</th>
          <th class="text-left">充電時間</th>
          <th class="text-left">充電度數</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.degree }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide,reactive } from "vue";

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: "category",
    data: ["2024/01/18", "2024/01/19", "2024/01/20", "2024/01/21", "2024/01/22"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [1.5, 25, 3.2, 2, 1],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
});

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
</script>

<style scoped>
.chart {
  height: 80vh;
}
</style>
