<template>
  <div class="chargingPileLogwrap">
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
</template>

<script setup>
import { useI18n } from "vue-i18n";
import {
  computed,
  ref,
  onMounted
} from "vue";
import { messageLogManagementStore } from "@/stores/messageLogManagement";
const { locale, messages,t } = useI18n();
const itemsPerPage = ref(5);
const page = ref(1);
const obj = ref({});
const desserts = ref([]);
const messageLogManagement = messageLogManagementStore();
const headers = computed(() =>
  locale.value === "en" ? messages.value.en.ChargingPileLogheaders : messages.value.zh.ChargingPileLogheaders
);

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

onMounted(() => {
  messageLogManagement.GetChargeLogAllList().then((res) => {
    res.data.forEach((item) => {
      item.logTime = convertUtcToLocalString(item.logTime, false);
    });

     desserts.value = res.data;
  });
});
</script>

<style>
.chargingPileLogwrap .mdi-chevron-down::before {
  color: white;
}
.chargingPileLogwrap .title {
  color: white;
  margin-right: auto;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
}
.chargingPileLogwrap .btwrap {
  display: flex;
  flex-direction: row-reverse;
}
.chargingPileLogwrap {
  margin: 30px 10px;

}
.chargingPileLogwrap .chart {
  height: 70vh;
}
.chargingPileLogwrap tbody tr:hover {
  background-color: transparent !important;
}
.chargingPileLogwrap tr:hover td {
  background: rgb(197, 201, 231);
  cursor: pointer;
}
.chargingPileLogwrap .v-icon__svg {
  color: white;
}
.chargingPileLogwrap .v-select__selection-text {
  color: rgba(107, 107, 107, 1);
}

.chargingPileLogwrap .vtablewrap {
  background-color: black;
  color: white;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  padding: 0 60px;
}

.chargingPileLogwrap .vtablewrap tbody tr:hover td {
  background-color: rgb(255, 255, 255, 0.1);
}
.chargingPileLogwrap .vtablewrap table {
  padding: 10px;
}

.chargingPileLogwrap .vtablewrap thead {
  background-color: #588157;
  border-radius: 10px;
}
.chargingPileLogwrap .headerwrap {
  padding: 20px 10px !important;
}

.chargingPileLogwrap .formwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
}
.chargingPileLogwrap .exportwrap {
  background: rgba(0, 0, 0, 1);
}
.chargingPileLogwrap .formwrap {
  gap: 50px;

  border-radius: 20px;
}



/* <v-date-picker> Style End */

@media (max-width: 576px) {

  .chargingPileLogwrap .vtablewrap {
    padding: 0 5px;
    font-size: 12px;
  }
}
</style>