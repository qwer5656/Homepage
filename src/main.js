import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { loadFonts } from "./plugins/webfontloader";

import * as echarts from "echarts";
import {createVuetify} from "vuetify";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'




import { createI18n } from "vue-i18n";
import { createPinia } from 'pinia'

import en from "./locales/en.json";
import zh from "./locales/zh.json";
import axios from "./axios";
const pinia = createPinia()


const i18n = createI18n({
  locale: "en",
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  },
});


const vuetify=createVuetify({

})

loadFonts();
const app =createApp(App);
app.config.globalProperties.$axios= axios
app.use(router).use(vuetify).use(echarts).use(i18n).use(pinia).mount("#app");