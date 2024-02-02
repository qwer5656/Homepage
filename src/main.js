import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import * as echarts from "echarts";

import { createI18n } from "vue-i18n";
import { createPinia } from 'pinia'

import en from "./locales/en.json";
import zh from "./locales/zh.json";

const pinia = createPinia()


const i18n = createI18n({
  locale: "zh",
  legacy: false,
  messages: {
    en,
    zh,
  },
});

loadFonts();
createApp(App).use(router).use(vuetify).use(echarts).use(i18n).use(pinia).mount("#app");
