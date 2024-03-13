<template lang="">
  <div style="margin-top: 5px">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn style="margin: 5px" @click="adddata"> Add Reserve </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Reserve</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                預約時間:
                <input
                  type="date"
                  v-model="dessertsmode.date"
                  id="start"
                  name="trip-start"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                開始時間:
                <input
                  type="time"
                  v-model="dessertsmode.starttime"
                  id="myTime"
                  value="00:00:00"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                結束時間:
                <input
                  type="time"
                  v-model="dessertsmode.endtime"
                  id="myTime1"
                  value="23:00:00"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="savedata()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-table>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">預約日期</th>
          <th class="text-left">起始時間</th>
          <th class="text-left">結束時間</th>
          <th class="text-left">總時</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>
            <v-btn
              variant="text"
              :icon="mdiMinusCircle"
              color="red"
              @click="opendelete(item)"
            ></v-btn>
          </td>
          <td>{{ item.date }}</td>
          <td>{{ item.starttime }}</td>
          <td>{{ item.endtime }}</td>
          <td>{{ compareTime(item.starttime, item.endtime) }}hr</td>
          <td>
            <v-btn
              variant="text"
              :icon="mdiPencil"
              color="indigo"
              @click="editdata(item)"
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="deletedialog" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5"> Delete Or Not? </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="deletedialog = false"
          >
            No
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="deletedata">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mdiMinusCircle, mdiPencil } from "@mdi/js";
import { useCounterStore } from "@/stores/counter";
export default {
  data() {
    return {
      mdiMinusCircle,
      mdiPencil,
      dialog: false,
      dessertsmode: {
        date: "2024-01-01",
        starttime: "00:00",
        endtime: "23:59",
      },
      desserts: [
        {
          date: "2024-01-18",
          starttime: "05:10",
          endtime: "06:40",
        },
      ],
      tempdata: {},
      mode: "",
      deletedialog: false,
    };
  },
  methods: {
    compareTime(starttime, endtime) {
      let endmintues =
        parseInt(endtime.split(":")[0]) * 60 + parseInt(endtime.split(":")[1]);
      let startmintues =
        parseInt(starttime.split(":")[0]) * 60 +
        parseInt(starttime.split(":")[1]);
      return this.round((endmintues - startmintues) / 60);
    },
    round(num) {
      var m = Number((Math.abs(num) * 100).toPrecision(15));
      return (Math.round(m) / 100) * Math.sign(num);
    },
    savedata() {
      if (this.mode == "add") {
        this.addsavedata();
      }
      if (this.mode == "edit") {
        this.editsavedata();
      }
      this.dialog = false;
    },
    adddata() {
      this.dessertsmode = {
        date: "2024-01-01",
        starttime: "00:00",
        endtime: "23:59",
      };
      this.dialog = true;
      this.mode = "add";
    },
    opendelete(item) {
      this.tempdata = item;
      this.deletedialog = true;
    },
    addsavedata() {
      let data = {};
      data = JSON.parse(JSON.stringify(this.dessertsmode));
      const counter = useCounterStore();
      counter.loading = true;
      this.desserts.push(data);
      setTimeout(function () {
        counter.loading = false;
      }, 500);
    },
    editsavedata() {
      this.tempdata.date = this.dessertsmode.date;
      this.tempdata.starttime = this.dessertsmode.starttime;
      this.tempdata.endtime = this.dessertsmode.endtime;
    },
    canceldata() {
      this.dialog = false;
    },
    deletedata() {
      let index = this.desserts.indexOf(this.tempdata.cardId);
      this.desserts.splice(index, 1);
      this.deletedialog = false;
    },
    editdata(outsideobj) {
      let obj = this.desserts.find(
        (e) =>
          e.date == outsideobj.date &&
          e.starttime == outsideobj.starttime &&
          e.endtime == outsideobj.endtime
      );
      this.tempdata = obj;
      this.dessertsmode.date = obj.date;
      this.dessertsmode.starttime = obj.starttime;
      this.dessertsmode.endtime = obj.endtime;
      this.dialog = true;
      this.mode = "edit";
    },
  },
};
</script>
<style scoped>
.v-table > .v-table__wrapper > table > tbody > tr > td{
  padding: 0;
}
.v-table > .v-table__wrapper > table > thead > tr > th{
  padding: 0;
}
</style>
