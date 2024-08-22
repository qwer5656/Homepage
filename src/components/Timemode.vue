<template lang="">
  <div class="timemodewrap">
    <h3>Time Setting</h3>
    <div class="date">
      <div class="selectwrap">
        <div class="timetitle">Hour</div>
        <div>
          <v-select
            :items="houritems"
            class="timeselect"
            variant="plain"
            color="#000"
            v-model="hour"
          ></v-select>
        </div>
      </div>
      <div class="selectwrap">
        <div class="timetitle">Min</div>
        <div>
          <v-select
            :items="minitems"
            class="timeselect"
            variant="plain"
            color="#000"
            v-model="min"
          ></v-select>
        </div>
      </div>
      <div class="selectwrap">
        <div class="timetitle">Sec</div>
        <div>
          <v-select
            :items="secitems"
            class="timeselect"
            variant="plain"
            color="#000"
            v-model="sec"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="nbtwrap">
      <Nbt title="Save" enabled="true" @click="savetime()" />
    </div>
  </div>
</template>
<script>
import Nbt from "./public/Nbt.vue";
import { settingStore } from "@/stores/setting";
import { ResultStore } from "@/stores/result";
export default {
  data() {
    return {
      timedata: {},
      hour: "23",
      min: "59",
      sec: "59",
      houritems: [],
      minitems: [],
      secitems: [],
    };
  },
  mounted() {
    for (let i = 0; i < 24; i++) {
      let num = i <= 9 ? "0" + i : i.toString();
      this.houritems.push(num);
    }
    for (let i = 0; i < 60; i++) {
      let num = i <= 9 ? "0" + i : i.toString();
      this.minitems.push(num);
      this.secitems.push(num);
    }
  },
  methods: {
    savetime() {
      let setting = settingStore();
      let Result = ResultStore();
      this.timedata.methodsContent =
        this.hour + ":" + this.min + ":" + this.sec;
      if (this.timedata.chargePointId == "") {
        this.timedata.enabled = true;
        setting.postapi(this, this.timedata).then((res) => {
          if (res.success === undefined) {
            Result.errorres(res);
          }
          if (res.success === true) {
            self.timedata = res.data;
            Result.successres();
          }
     
        });
      } else {
        setting.putapi(this, this.timedata).then((res) => {
          if (res.success === undefined) {
            Result.errorres(res);
          }
          if (res.success === true) {
            self.timedata = res.data;
            Result.successres();
          }
        });
      }
    },
  },
  components: {
    Nbt,
  },
  beforeMount() {
    let setting = settingStore();
    let self = this;
    setting.getapi(this, "TimeSetting").then((res) => {
      self.timedata = res.data;
      if (self.timedata.methodsContent != "") {
        var itme = self.timedata.methodsContent.split(":");
        self.hour = itme[0];
        self.min = itme[1];
        self.sec = itme[2];
      }
    });
  },
};
</script>
<style>
.timemodewrap .nbtwrap {
  margin-top: 106px;
}
.timemodewrap {
  color: white;
  margin-top: 45px;
}
.timemodewrap .timeselect {
  width: 150px;
  height: 20px;
  text-align: center;
}
.timemodewrap .date {
  display: flex;
  margin-top: 65px;
  justify-content: center;
  width: 540px;
  margin: 65px auto;
}
.timemodewrap .selectwrap {
  margin: 0 23px;
}
.timemodewrap .v-field__input {
  padding: 0 0 0 60px;
}
.timemodewrap .v-field__append-inner {
  padding-top: 14px !important;
}
.timemodewrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  width: 360px;
}
.timemodewrap .title {
  font-family: SF Pro;
  font-size: 18px;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-top: 49px;
}
.timemodewrap .timetitle {
  margin-bottom: 19px;
}
.timemodewrap .v-field__append-inner {
  margin-right: 10px;
}

@media (max-width: 576px) {
  .timemodewrap .date {
    flex-direction: column;
  }
  .timemodewrap {
    padding: 30px;
    margin-top: 0px;
    width: 100%;
  }
  .timemodewrap .nbtwrap {
    margin-top: 60px;
  }
  .timemodewrap .date {
    margin: 10px 0px;
    width: 100%;
  }
  .timemodewrap .timeselect {
    width: calc(100vw - 60px);
    height: 20px;
    text-align: center;
  }
  .timemodewrap .selectwrap {
    margin: 20px 0;
  }
  .timemodewrap .timetitle {
    margin-bottom: 10px;
  }
}
</style>
