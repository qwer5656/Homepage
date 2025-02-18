const routes = [
  {
    path: '/:id',
    redirect: to => {
      return { path: '/'} ;
    },
  },
  {
    path: "/Login",
    name: "Login",
    title: "登入",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/",
    name: "index",
    title: "首頁",
    component: () => import("@/views/IndexView.vue"),
  },
  {
    path: "/login",
    name: "login",
    title: "登入",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/Setting",
    name: "Setting",
    title: "設定",
    component: () => import("@/views/SettingView.vue"),
  },
  {
    path: "/History",
    name: "History",
    title: "歷史紀錄",
    component: () => import("@/views/HistoryView.vue"),
  },
  {
    path: "/Reserve",
    name: "Reserve",
    title: "預約排程",
    component: () => import("@/views/ReserveView.vue"),
  },
  {
    path: "/Card",
    name: "Card",
    title: "卡片",
    component: () => import("@/views/CardView.vue"),
  },
  {
    path: "/Startmode",
    name: "Startmode",
    title: "開始模式",
    component: () => import("@/views/StartmodeView.vue"),
  },
  ,
  {
    path: "/Touchstart",
    name: "Touchstartmode",
    title: "TouchStart模式",
    component: () => import("@/views/TouchStartView.vue"),
  },
  {
    path: "/EditPassword",
    name: "EditPassword",
    title: "修改密碼",
    component: () => import("@/views/EditPasswordView.vue"),
  },
  {
    path: "/CarNumber",
    name: "CarNumber",
    title: "車牌號碼",
    component: () => import("@/views/CarNumberView.vue"),
  },
  {
    path: "/QrcodeSetting",
    name: "QrcodeSetting",
    title: "QrcodeSetting",
    component: () => import("@/views/QrcodeSettingView.vue"),
  },
  {
    path: "/RfidSetting",
    name: "RfidSetting",
    title: "RfidSetting",
    component: () => import("@/views/RfidSettingView.vue"),
  },
  {
    path: "/CarNumberSetting",
    name: "CarNumberSetting",
    title: "CarNumberSetting",
    component: () => import("@/views/CarNumberSettingView.vue"),
  },
  {
    path: "/QrcodeStartmode",
    name: "QrcodeStartmode",
    title: "QrcodeStartmode",
    component: () => import("@/views/QrcodeStartmodeView.vue"),
  },
  {
    path: "/Rfidloading",
    name: "Rfidloading",
    title: "Rfidloading",
    component: () => import("@/views/RfidloadingView.vue"),
  },
  {
    path: "/CarNumberloading",
    name: "CarNumberloading",
    title: "CarNumberloading",
    component: () => import("@/views/CarNumberloadingView.vue"),
  },
  {
    path: "/Bluetooth",
    name: "Bluetooth",
    title: "Bluetooth",
    component: () => import("@/views/BluetoothView.vue"),
  },

  {
    path: "/Wifi",
    name: "Wifi",
    title: "Wifi",
    component: () => import("@/views/WifiView.vue"),
  },
  {
    path: "/Lte",
    name: "Lte",
    title: "Lte",
    component: () => import("@/views/LteView.vue"),
  },
  {
    path: "/Ocpp",
    name: "Ocpp",
    title: "Ocpp",
    component: () => import("@/views/OcppView.vue"),
  },
  {
    path: "/Time",
    name: "Time",
    title: "Time",
    component: () => import("@/views/TimeView.vue"),
  },
  {
    path: "/Language",
    name: "Language",
    title: "Language",
    component: () => import("@/views/LanguageView.vue"),
  },



  
];

export default routes;
