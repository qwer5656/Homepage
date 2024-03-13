<template>
  <div style="margin-top: 5px">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">{{ $t("Historypage.Date") }}</th>
          <th class="text-left">{{ $t("Historypage.Time") }}</th>
          <th class="text-left">{{ $t("Historypage.Degree") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name" @click="changeValue(true,item)">
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
  <v-dialog v-model="chartsshow" persistent width="800">
    <div style="background-color: white">
      <div class="btwrap">      <v-btn
        text="X"
        
        @click="changeValue(false)"
      ></v-btn></div>
      <v-chart class="chart" :option="options" autoresize />
    </div>
  </v-dialog>
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
import { ref, provide, reactive } from "vue";

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const option = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    type: "category",
    data: [
      "2024/01/18",
      "2024/01/19",
      "2024/01/20",
      "2024/01/21",
      "2024/01/22",
    ],
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
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      areaStyle: {},
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

function changeValue(value,obj) {
  if(obj!=undefined){
    options.value.series[0]={
      data: [obj.degree*100,obj.degree*150,obj.degree*180,obj.degree*200,obj.degree*180,obj.degree*150,obj.degree*120],
      type: "line",
      areaStyle: {},
    };
  }
  chartsshow.value = value; 

}

</script>

<style scoped>
.btwrap{
  display: flex;
  flex-direction: row-reverse;
}
.chart {
  height: 80vh;
}
tbody tr:hover {
  background-color: transparent !important;
}
tr:hover td {
  background: rgb(197, 201, 231);
  cursor: pointer;
}
</style>



The story of The Three Little Pigs featured here has been adapted from different sources and from childhood memory. 

這裡介紹的三隻小豬的故事是根據不同來源和童年記憶改編的

The primary sources are English Fairy Tales, retold by Flora Annie Steel (1922) with illustrations by L. Leslie Brooke from the 1904 version.

主要來源是《英國童話故事》，由 Flora Annie Steel（1922 年）重述，並由 L. Leslie Brooke 為 1904 年版本繪製插圖。

This story is featured in our Favorite Fairy Tales and Children's Stories.

這個故事出現在我們最喜歡的童話故事和兒童故事中。