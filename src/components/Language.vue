<template lang="">
  <div class="languagemodewrap">
    <h3>{{ $t("LanguagePage.SelectLanguage") }}</h3>
    <div class="date">
      <div class="selectwrap">
        <v-select
          :items="languageitem"
          item-title="text"
          item-value="value"
          class="timeselect"
          variant="plain"
          color="#000"
          v-model="languagedata.methodsContent"
        />
      </div>
    </div>
    <div class="nbtwrap">
      <Nbt
        :title="$t('LanguagePage.Save')"
        enabled="true"
        @click="savelanguage()"
      />
    </div>
  </div>
</template>
<script setup>
import Nbt from "./public/Nbt.vue";
import { settingStore } from "@/stores/setting";
import { ref, getCurrentInstance, onBeforeMount } from "vue";
const languagedata = ref({});
const languageitem = ref([
  { text: "English", value: "en" },
  { text: "中文", value: "zh" },
]);
const instance = getCurrentInstance();
const proxy = instance?.proxy;
const savelanguage = function () {
  let setting = settingStore();
  if (languagedata.value.chargePointId == "") {
    setting.postapi(proxy, languagedata.value).then((res) => {
      languagedata.value = res.data;
      chagelanuage();
    });
    return;
  }
  setting.putapi(proxy, languagedata.value).then((res) => {
    languagedata.value = res.data;
    chagelanuage();
  });
};

const chagelanuage = function () {
  if (languagedata.value.methodsContent === "") {
    proxy.$i18n.locale = "en";
    return;
  }
  proxy.$i18n.locale = languagedata.value.methodsContent;
};

onBeforeMount(() => {
  let setting = settingStore();
  setting.getapi(proxy, "LanguageSetting").then((res) => {
    languagedata.value = res.data;
    if (res.data.chargePointId == "") {
      const lang = navigator.language || navigator.userLanguage;

      if (lang.toLowerCase().startsWith("zh")) {
        languagedata.value.methodsContent = "zh";
      } else {
        languagedata.value.methodsContent = "en";
      }
    }
  });
});
</script>
<style>
.languagemodewrap .nbtwrap {
  margin-top: 106px;
}
.languagemodewrap {
  color: white;
  margin-top: 45px;
}
.languagemodewrap .timeselect {
  width: 150px;
  height: 20px;
  text-align: center;
}
.languagemodewrap .date {
  display: flex;
  margin-top: 65px;
  justify-content: center;
  width: 540px;
  margin: 65px auto;
}
.languagemodewrap .selectwrap {
  margin: 0 23px;
}
.languagemodewrap .v-field__input {
  padding: 0 0 0 60px;
}
.languagemodewrap .v-field__append-inner {
  padding-top: 14px !important;
}
.languagemodewrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  width: 360px;
}
.languagemodewrap .title {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-top: 49px;
}
.languagemodewrap .timetitle {
  margin-bottom: 19px;
}
.languagemodewrap .v-field__append-inner {
  margin-right: 10px;
}

@media (max-width: 576px) {
  .languagemodewrap .date {
    flex-direction: column;
  }
  .languagemodewrap {
    padding: 30px;
    margin-top: 0px;
    width: 100%;
  }
  .languagemodewrap .nbtwrap {
    margin-top: 60px;
  }
  .languagemodewrap .date {
    margin: 10px 0px;
    width: 100%;
  }
  .languagemodewrap .timeselect {
    width: calc(100vw - 60px);
    height: 20px;
    text-align: center;
  }
  .languagemodewrap .selectwrap {
    margin: 20px 0;
  }
  .languagemodewrap .timetitle {
    margin-bottom: 10px;
  }
}
</style>
