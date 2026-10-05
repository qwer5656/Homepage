<template>
  <div class="adImageDatawrap">
    <div>
      <div
        style="display: flex; align-items: center; text-align: center"
        class="adImageDataselect"
      >
        <label
          for=""
          style="
            color: white;
            display: inline-block;
            margin: 0 0 0 10px;
            padding: 10px;
          "
          >{{ $t("AdImageDatapage.title") }}:</label
        >
        <v-select
          label="Select"
          :items="imageItems"
          v-model="imageNum"
          hide-details
          style="
            width: 200px;
            color: white;
            display: inline-block;
            flex-grow: 0;
          "
          variant="outlined"
        ></v-select>
        <v-btn
          class="text-none"
          rounded="xl"
          :text="`${$t('AdImageDatapage.update')}`"
          style="margin: 0 15px; background-color: rgb(30 45 105); color: white"
          @click="UdpateImage"
        ></v-btn>
      </div>
    </div>
    <div class="imgcontent">
      <div class="imgDataWrap">
        <div v-for="item in test" style="padding: 0px; width: 300px">
          <h3 style="margin: 10px 0; font-weight: 500">
            {{ $t("AdImageDatapage.advertisement") }} {{ item }}
          </h3>
          <div>
            <img :src="geturl(item)" style="height: 256px; width: 150px" />
          </div>
          <div style="display: flex; align-items: center; padding-top: 10px">
            <v-file-input
              accept="image/jpeg image/png"
              :label="`${$t('AdImageDatapage.advertisement')} ${item}`"
              placeholder="Upload your photos"
              :prepend-icon="mdiCamera"
              multiple
              max-width="500"
              hide-details
              v-model="ImageData[item]"
            ></v-file-input>
            <v-btn
              class="text-none"
              rounded="xl"
              :text="`${$t('AdImageDatapage.upload')}`"
              style="
                margin: 0 5px;
                background-color: rgb(51, 105, 30);
                color: white;
              "
              @click="uploadImage(item)"
            ></v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { mdiCamera } from "@mdi/js";

import { ResultStore } from "@/stores/result";
import { advertisementManagementStore } from "@/stores/advertisementManagement";
import { useMainStore } from "@/stores/main";
const mainstore = useMainStore();
const ImageData = ref([]);
const imageNum = ref(8);
const imageItems = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const VendorId = ref("Efaner");
const VendorIditems = ref([]);
const key = ref(0);
const res = ref("");
const test = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

async function fetchData(data) {
  let advertisementManagement = advertisementManagementStore();
  try {
    const res = await advertisementManagement.UpdateImage(data);

    key.value++;
    mainstore.loading = false;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

onMounted(() => {
  //vendorListData();
});

watch(
  () => VendorId.value,
  (value) => {
    ImageData.value = [];
  },
);

async function vendorListData() {
  if (userStore.permission == "Vendor") {
    console.log(userStore.vendorId);
    VendorId.value = userStore.vendorId;
  }

  try {
    const res = await vendorList.GetAllList();

    let arr = [];
    for (let i = 0; i < res.data.length; i++) {
      if (userStore.permission == "Vendor") {
        if (res.data[i].vendorId == userStore.vendorId) {
          arr.push(res.data[i].vendorId);
        }
      } else {
        arr.push(res.data[i].vendorId);
      }
    }
    VendorIditems.value = arr;
    mainstore.loading = false;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

const geturl = function (value) {
  let advertisementManagement = advertisementManagementStore();
  return advertisementManagement.GetImage(value) + "&key=" + key.value;
};

const uploadImage = function (id) {
  const file = ImageData.value;
  const Result = ResultStore();
  if (file.length == 0 || file[id] == undefined) {
    res.value = "Not Data";
    Result.errorres(res.value);
  } else {
    var item = ImageData.value[id];
    const formData = new FormData();
    formData.append("advertisementNumber", id);
    formData.append("vendorId", VendorId.value);
    formData.append("vendorName", "string");
    formData.append("editor", "string");
    formData.append("createTime", new Date().toISOString());
    formData.append("updateTime", new Date().toISOString());
    formData.append("uploadFile", item[0]); // 對應後端的 IFormFile UploadFile
    formData.append("fileName", item[0].name);
    let data = fetchData(formData);
  }
};

function UdpateImage() {
  const Result = ResultStore();
  let advertisementManagement = advertisementManagementStore();
  mainstore.loading = true;
  advertisementManagement.RemoteimageUpdate(imageNum.value).then((res) => {
    if (res == true) {
      Result.successres(`${t("AdImageDatapage.uploadSuccess")}`);
    } else {
      Result.errorres(`${t("AdImageDatapage.uploadFail")}`);
    }
    mainstore.loading = false;
  });
}
</script>

<style>
@media (max-width: 576px) {
  .adImageDatawrap .adImageDataselect {
    margin-top: 20px;
  }
  .adImageDatawrap .imgcontent {
    margin: 10px;
    overflow-y: auto;
    height: 60vh !important;
  }
  .adImageDatawrap .adImageDataselect {
    margin: 0 !important;
  }
}
.adImageDatawrap .adImageDataselect {
  margin: 0 30px;
}
.adImageDatawrap .imgcontent {
  margin: 30px;
  overflow-y: auto;
  height: 450px;
}
.adImageDatawrap .imgDataWrap {
  color: white;
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}
.adImageDatawrap .imgDataWrap .v-field__input {
  overflow: hidden;
}
</style>
