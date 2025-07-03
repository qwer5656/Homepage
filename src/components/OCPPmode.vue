<template lang="">
  <div class="ocppwrap">
    <!-- <div class="backicon" @click="previous()" v-if="mode!='address'">
      <img src="../assets/img/Previous.png" alt="" />
      <span>Back</span>
    </div> -->
    <div>
      <div class="title">{{ ocppdata.title }}</div>
      <div class="describe">
        {{ describe }}
      </div>
      <div>
        <form class="formwrap">
          <v-text-field
            v-if="mode == 'address'"
            label="http://10.0.0.2.8887"
            @click:append-inner="show1 = !show1"
            variant="solo"
            density="compact"
            single-line
            width="360px"
            hide-details
            v-model="ocpp.methodsContent"
          ></v-text-field>
          <div class="content" v-else>
            <img src="../assets/img/ocppdevice.png" alt="" />
            <div class="progresswrap">
              <img
                class="progresswrapimg"
                :src="devicetowebprogressimg"
                alt=""
              />
              <img :src="devicetoweblineimg" alt="" />
            </div>
            <img :src="devicetowebimg" alt="" />
            <div class="progresswrap">
              <img
                class="progresswrapimg"
                :src="webtobackendprogressimg"
                alt=""
              />
              <img :src="webtobackendlineimg" alt="" />
            </div>
            <img :src="webtobackendimg" alt="" />
          </div>
          <Nbt :title="bttitle" :enabled="btenabled" @click="clickbt()" />
        </form>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useMainStore } from '@/stores/main';
import { settingStore } from '@/stores/setting';
import { useI18n } from 'vue-i18n';
import Nbt from './public/Nbt.vue';
import No from "@/assets/img/No.png";
import grayline from "@/assets/img/grayline.png";
import greenline from "@/assets/img/greenline.png";
import ocppweb from "@/assets/img/ocppweb.png";
import ocppwebsuccess from "@/assets/img/ocppwebsuccess.png";
import ocppbackend from "@/assets/img/ocppbackend.png";
import ocppbackendsuccess from "@/assets/img/ocppbackendsuccess.png";
import Yes from "@/assets/img/Yes.png";

// Define reactive state variables using `ref`
const deletedialog = ref(false);
const carddata = ref([]);
const mode = ref('address');
const ocppdata = ref({ title: '', describe: '' });
const ocpp = ref({});
const bttitle = ref('Next');
const btenabled = ref(true);
const devicetowebimg = ref('');
const webtobackendimg = ref('');

const devicetowebprogressimg = ref(No);
const devicetoweblineimg = ref(grayline);
const webtobackendprogressimg = ref(No);
const webtobackendlineimg = ref(grayline);



let myt;

// Using i18n for translations
const { t } = useI18n();
myt = t;

// Methods
const previous = () => {
  mode.value = 'address';
};

const clickbt = () => {
  if (mode.value == 'address') {
    changemode('connent');
  } else {
    changemode('address');
  }
};

const changemode = (val) => {
  mode.value = val;
  chagetxt();
};

const chagetxt = () => {
  if (mode.value == 'address') {
    ocppdata.value.title = 'Backend Address';
    bttitle.value = 'Next';
    btenabled.value = true;
    return;
  }

  if (mode.value == 'connent') {
    ocppdata.value.title = 'Connecting';
    bttitle.value = 'OK';
    btenabled.value = false;
    devicetowebprogressimg.value = No;
    devicetoweblineimg.value = grayline;
    webtobackendprogressimg.value = No;
    webtobackendlineimg.value = grayline;
    devicetowebimg.value = ocppweb;
    webtobackendimg.value = ocppbackend;

    const mainstore = useMainStore();
    mainstore.loading = true;
    setTimeout(() => {
      changemode('devicetoweb');
    }, 1000);
    return;
  }

  if (mode.value == 'devicetoweb') {
    devicetowebprogressimg.value = Yes;
    devicetoweblineimg.value = greenline;
    devicetowebimg.value = ocppbackendsuccess;

    setTimeout(() => {
      changemode('webtobackend');
    }, 1000);
    return;
  }

  if (mode.value == 'webtobackend') {
    webtobackendprogressimg.value = Yes;
    webtobackendlineimg.value = greenline;
    webtobackendimg.value = ocppbackendsuccess;
    btenabled.value = true;
    const mainstore = useMainStore();
    const setting = settingStore();

    if (ocpp.value.chargePointId == '') {
      setting.postapi(this, ocpp.value).then((res) => {
        ocpp.value = res.data;
        mainstore.loading = false;
      });
    } else {
      setting.putapi(this, ocpp.value).then((res) => {
        ocpp.value = res.data;
        mainstore.loading = false;
      });
    }
    return;
  }
};

// Computed properties
const describe = computed(() => {
  if (mode.value === 'address') {
    return myt('Ocpppage.describe');
  }
  return myt('Ocpppage.connectiondescribe');
});

// Lifecycle hooks
onMounted(() => {
  chagetxt();
});

onBeforeMount(() => {
  const setting = settingStore();
  setting.getapi(this, 'OCPPSetting').then((res) => {
    ocpp.value = res.data;
  });
});
</script>
<style>
.ocppwrap {
  color: white;
  margin-top: 45px;
}
.ocppwrap .backicon {
  color: white;
  cursor: pointer;
}
.ocppwrap .backicon img {
  vertical-align: middle;
}
.ocppwrap .content {
  display: flex;
  justify-content: center;
  margin: 46px 0;
}
.ocppwrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.ocppwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  width: 360px;
}
.ocppwrap .title {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-top: 49px;
}
.ocppwrap .progresswrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ocppwrap .formwrap .v-input {
  width: 306px;
  margin: 85px auto;
}
.ocppwrap .describe {
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 510;
  line-height: 17.5px;
  text-align: justified;
  color: rgba(107, 107, 107, 1);
  margin-top: 9px;
}
.ocppwrap .progresswrapimg {
  width: 22px;
  height: 22px;
  margin-bottom: 13px;
}

@media (max-width: 576px) {
  .ocppwrap {
    padding: 0 30px;
  }
  .content > img {
    width: 30%;
  }
  .ocppwrap .formwrap .v-input {
    width: 100%;
  }
}
</style>
