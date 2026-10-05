<template>
  <div class="reverseHistorywrap">
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
      <template #item="{ item }">
        <tr>
          <td>{{ item.actionType }}</td>
          <td>{{ item.executeTime }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.errorMessage }}</td>
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
import { historyStore } from "@/stores/history";
import { useI18n } from "vue-i18n";
import { reverseStore } from "@/stores/reverse";
import { ref, computed, watch, onMounted, defineProps } from "vue";
const { locale, messages, t } = useI18n();
const date = ref(new Date(""));
const obj = ref({});

const desserts = ref([]);
const itemsPerPage = ref(5);
const page = ref(1);
const value = ref([0, 0]);
const reverse = reverseStore();
const headers = computed(() =>
  locale.value === "en"
    ? messages.value.en.ReverseHistoryheaders
    : messages.value.zh.ReverseHistoryheaders
);
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
let formatDate = function (date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // '07'
  const day = String(date.getDate()).padStart(2, "0"); // '03'
  return `${year}-${month}-${day}`;
};
let pageCount = computed(() => {
  return Math.ceil(filterdesserts.value.length / itemsPerPage.value);
});
onMounted(() => {
  reverse.getapiAllList().then((res) => {
    res.data.forEach((e) => {
      // 拼接帶 T 的格式
      e.executeTime = convertUtcToLocalString(e.executeTime, false);
      let str = "";
      if (e.result != null && e.result != "") {
        const logs = e.result.split("\n");
        logs.forEach((log) => {
          // 1. 擷取時間、事件、狀態
          const timeString = log.substring(0, 19); // "2025-09-02 01:45:04"
          const rest = log.substring(20).split(" "); // ["RemoteStopTransaction", "Success"]
          const event = rest[0];
          const status = rest[1];

          // 2. UTC → 本地時間（Asia/Taipei）
          const localTime = convertUtcToLocalString(timeString).replace(
            "T",
            " "
          );

          // 3. 輸出結果
          str += `${localTime}  ${event}  ${status}\n`;
        });
      }
      e.result = str.trim();
    });

    console.log(res.data);
    desserts.value = res.data;
  });

  // timeitem.value = timeval;
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
.reverseHistorywrap .vtablewrap thead {
  background-color: #588157;
  border-radius: 10px;
}
.reverseHistorywrap .headerwrap {
  padding: 20px 10px !important;
}

.reverseHistorywrap .formwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
}

.reverseHistorywrap .formwrap {
  gap: 50px;

  border-radius: 20px;
}

.reservewrap .historytitle {
  display: flex;
  padding: 0 120px 0 80px;
  align-items: center;
}
.reservewrap .vtablewrap {
  background-color: black;
  color: white;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
}

.reservewrap .vtablewrap tbody tr:hover td {
  background-color: rgb(255, 255, 255, 0.1);
}
.reservewrap .vtablewrap table {
  padding: 10px;
}

@media (max-width: 576px) {
  .reservewrap .vtablewrap {
    font-size: 14px;
  }
}
</style>
