<template lang="">
  <div class="licensePlatewrap">
    <div class="backicon" @click="previous()">
      <img src="../assets/img/Previous.png" alt="" />
      <span>Back</span>
    </div>
    <div class="searchwrap">
      <div class="searchcontent">
        <v-text-field
          variant="underlined"
          :type="text"
          label="Search"
          single-line
          :prepend-inner-icon="mdiMagnify"
          v-model="searchText"
        ></v-text-field>
      </div>
    </div>
    <div class="addcontent">
      <div>My Car License</div>
      <div class="addiconwrap" @click="addlicensePlate">
        Add
        <img src="../assets/img/Add_On.png" alt="" />
      </div>
    </div>
    <div class="licensePlatemangerwrap" @click.capture="clearlicensePlatedata">
      <div
        v-for="(item, index) in filterlicensePlatedata"
        :key="item"
        class="licensePlatecontainer"
      >
        <h3>{{ item.licensePlateName }}</h3>
        <div class="licensePlateoperatewrap" v-if="item.select == true">
          <div class="licensePlateoperate" @click.capture="editlicensePlate(item)">
            <img
              class="licensePlateoperateimg"
              src="../assets/img/Edit_black.png"
              alt=""
            />
            <div class="licensePlateoperatetxt">Edit</div>
          </div>
          <div class="licensePlateoperate" @click="removelicensePlate(item)">
            <img
              class="licensePlateoperateimg"
              src="../assets/img/Remove_On_black.png"
              alt=""
            />
            <div class="licensePlateoperatetxt">Remove</div>
          </div>
        </div>
        <div
          class="licensePlatecontent"
          @click="licensePlateclick(item)"
          :class="{ opacity: item.select }"
        >
          <span>{{ item.licensePlateNumber }}</span>
        </div>
      </div>
      <div
        class="licensePlatenone"
        v-if="filterlicensePlatedata.length == 0"
      ></div>
    </div>
    <v-dialog
      v-model="deletedialog"
      persistent
      width="auto"
      class="licensePlatedialogwrap"
    >
      <div class="addlicensePlatewrap">
        <div
          style="
            color: white;
            text-align: right;
            font-size: 40px;
            padding-right: 10px;
            cursor: pointer;
          "
          @click="close"
        >
          <img src="../assets/img/Close.png" alt="" />
        </div>
        <v-form class="formwrap" ref="entryForm">
          <v-text-field
            label="Fill in Name"
            variant="solo"
            v-model="newlicensePlatedata.licensePlateName"
            :rules="licensePlateNamerules"
          ></v-text-field>
          <v-text-field
            label="Fill in number"
            variant="solo"
            v-model="newlicensePlatedata.licensePlateNumber"
            maxlength="11"
            :rules="licensePlaterules"
          ></v-text-field>
          <div class="chargebt" @click="savelicensePlate">
            {{ mode == "add" ? "Create" : "Save" }}
          </div>
        </v-form>
      </div>
    </v-dialog>
  </div>
</template>
<script setup>
import { useMainStore } from "@/stores/main";
import { LicensePlateStore } from "@/stores/LicensePlate";
import { ResultStore } from "@/stores/result";
import { mdiMagnify } from "@mdi/js";
import {
  ref,
  onBeforeMount,
  getCurrentInstance,
  computed,
  defineEmits,
} from "vue";

const deletedialog = ref(false);
const newlicensePlatedata = ref({});
const licensePlatedata = ref([]);
const tempdata = ref({});
const mode = ref("");
const instance = getCurrentInstance();
const proxy = instance?.proxy;
const emit = defineEmits();
const searchText=ref("");
const licensePlateNamerules = ref([
  (value) => {
    if (value) return true;
    return "Name is  null";
  },
]);
const licensePlaterules = ref([
  (value) => {
    if (value) return true;
    return "CarNumber is  null";
  },
]);

onBeforeMount(() => {
  let License = LicensePlateStore();
  License.getapiAll(proxy).then((res) => {
    licensePlatedata.value = res.data;
  });
});

const filterlicensePlatedata = computed(() => {
  if (licensePlatedata.value == null) return [];
  return licensePlatedata.value.filter((e) => {
    if (
      e.licensePlateName.indexOf(searchText.value) != -1 ||
      e.licensePlateNumber.indexOf(searchText.value) != -1
    ) {
      return true;
    }
  });
});

const clearlicensePlatedata = computed(() => {
  licensePlatedata.value.forEach((e) => {
    e.select = false;
  });
});

const previous = function () {
  emit("changestatus", false);
};

const close = function () {
  deletedialog.value = false;
};
const open = function () {
  deletedialog.value = true;
};

const savelicensePlate = function () {
  proxy.$refs.entryForm.validate().then(function (res) {
    if (res.valid == true) {
      let License = LicensePlateStore();
      let Result = ResultStore();
      if (mode.value == "add") {
        let obj = {
          blocked: false,
          licensePlateId: "00000000-0000-0000-0000-000000000000",
          chargePointId: "Test1234",
          createTime: new Date(),
          updateTime: new Date(),
          expiryDate: null,
        };

        obj.licensePlateName = newlicensePlatedata.value.licensePlateName;
        obj.licensePlateNumber = newlicensePlatedata.value.licensePlateNumber;
        License.postapi(proxy, obj).then((res) => {
          if (res.success === false) {
            Result.errorres(res.message);
          }
          if (res.success === true) {
            licensePlatedata.value = res.data;
            newlicensePlatedata.value = {};
            Result.successres();
            deletedialog.value = false;
          }
        });
      }
      if (mode.value == "edit") {
        License.putapi(proxy, newlicensePlatedata.value).then((res) => {
          if (res.success === false) {
            Result.errorres(res.message);
          }
          if (res.success === true) {
            licensePlatedata.value = res.data;
            newlicensePlatedata.value = {};
            Result.successres();
            deletedialog.value = false;
          }
        });
      }
    }
  });
};
const licensePlateclick = function (item) {
  item.select = true;
  licensePlatedata.value.forEach((e) => {
    if (e != item) {
      e.select = false;
    }
  });
};

const addlicensePlate = function () {
  open();
  newlicensePlatedata.value = {};
  mode.value = "add";
};
const editlicensePlate = function (item) {
  tempdata.value = item;
  newlicensePlatedata.value = JSON.parse(JSON.stringify(item));
  open();
  mode.value = "edit";
};

const removelicensePlate = function (item) {
  let License = LicensePlateStore();


  License.deleteapi(proxy, item.licensePlateId).then((res) => {
    let Result = ResultStore();
    if (res.success === false) {
      Result.errorres(res.message);
    }
    if (res.success === true) {
      licensePlatedata.value = res.data;
      Result.successres();
    }
  });
};
const clearlicensePlate = function () {
  licensePlatedata.value.forEach((e) => {
    e.select = false;
  });
};


</script>
<style>
.licensePlatewrap .opacity {
  opacity: 0.3;
}
.licensePlatewrap .licensePlatemangerwrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  overflow: auto;
  width: 520px;
  height: 40vh;
  margin: 0px auto;
}
.licensePlatewrap .licensePlatemangerwrap h3 {
  padding: 10px 0;
}
.licensePlatewrap .licensePlatecontent {
  width: 418px;
  height: 208px;
  background: url("../assets/img/CarPlate.png");
  display: flex;
  padding-bottom: 32px;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.licensePlatewrap .licensePlatecontent span {
  font-family: SF Pro;
  font-size: 20px;
  font-weight: 510;
  line-height: 25px;
  margin-top: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 23.8px 0px rgba(255, 255, 255, 0.25) inset;
  background: rgba(255, 255, 255, 0.2);
  padding: 15px 0px;
  text-align: center;
  width: 174.33px;
  height: 55.62px;
}
.licensePlatewrap .licensePlatecontent img {
  width: 100%;
  height: 28px;
}
.licensePlatedialogwrap .formwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
}
.licensePlatewrap .searchwrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 23px;
}
.licensePlatewrap .searchwrap .searchcontent {
  width: 120px;
}
.licensePlatedialogwrap .addlicensePlatewrap {
  background: rgba(255, 255, 255, 0.05);
}
.licensePlatedialogwrap .formwrap {
  width: 456px;
  height: 370px;
  padding: 100px 75px 120px 75px;
  gap: 50px;

  border-radius: 20px;
}
.licensePlatewrap .addiconwrap {
  margin-left: auto;
  vertical-align: middle;
  cursor: pointer;
  width: 120px;
}
.licensePlatewrap .addiconwrap img {
  vertical-align: middle;
  margin-left: 15px;
}
.licensePlatewrap .addcontent {
  display: flex;
  justify-self: center;
  align-items: center;
  margin: 0px 0px 30px 0px;
  width: 100%;
}
.licensePlatewrap {
  color: white;
  margin-top: 45px;
}
.licensePlatewrap .backicon {
  color: white;
  cursor: pointer;
}
.licensePlatewrap .backicon img {
  vertical-align: middle;
}
.licensePlatewrap .backicon span {
  margin-left: 15px;
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  vertical-align: middle;
}
.licensePlatewrap .licensePlatenone {
  width: 418px;
  height: 208px;

  background: url("../assets/img/CarNumber_None.png");
}
.licensePlatedialogwrap .chargebt {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 93px;
  gap: 10px;
  width: 306px;
  height: 30px;
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  );
  border-radius: 32px;
  margin-top: 10px;
  cursor: pointer;
}

.licensePlatewrap .licensePlateoperate {
  width: 128px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: rgba(255, 255, 255, 1);
  color: black;
  vertical-align: middle;
  margin: 0 6px;
  cursor: pointer;
}
.licensePlatewrap .licensePlateoperatetxt {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 510;
  line-height: 22.5px;
  margin-left: 9px;
}
.licensePlatewrap .licensePlateoperatewrap {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
.licensePlatewrap .licensePlateoperate .licensePlateoperateimg {
  width: 23px;
  height: 23px;
}
.licensePlatewrap .licensePlatecontainer {
  position: relative;
}

@media (max-width: 576px) {
  .licensePlatewrap {
    padding: 0 10px;
  }
  .licensePlatewrap .licensePlatemangerwrap {
    width: 100%;
    margin-top: 20px;
    padding: 0px 20px 40px 20px;
  }
  .licensePlatewrap .licensePlatecontainer {
    width: 100%;
  }
  .licensePlatewrap .licensePlatenone {
    width: 100%;
    height: calc(90vw / 1.95);
    background-image: url("/src/assets/img/CarNumber_None.png");
    background-size: 100% 100%;
  }
  .licensePlatewrap .licensePlatecontent {
    width: 100%;
    height: calc(90vw / 1.95);
    background-size: 100% 100%;
    padding: 20px;
  }
  .licensePlatewrap .licensePlateoperate .licensePlateoperateimg {
    width: 18px;
    height: 18px;
  }
  .licensePlatewrap .licensePlateoperate {
    width: 33%;
  }
  .licensePlatewrap .licensePlateoperatetxt {
    font-family: SF Pro;
    font-size: 12px;
    font-weight: 510;
    line-height: 22.5px;
    margin-left: 9px;
  }
  .licensePlatewrap .licensePlateoperate {
    width: 50%;
    padding: 3px 10px;
    height: auto;
  }
  .licensePlatedialogwrap .addlicensePlatewrap {
    background: rgba(255, 255, 255, 0.05);
  }
  .licensePlatedialogwrap .formwrap {
    width: 100%;
    padding: 20px 10px;
    height: auto;
  }
}
</style>
