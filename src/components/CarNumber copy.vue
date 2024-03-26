<template lang="">
  <div style="margin-top: 5px">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn style="margin: 5px" @click="adddata"> Add CarNumber</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add CarNumber</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-form ref="form">
                <v-text-field
                  :rules="rules"
                  hide-details="auto"
                  v-model="carNumberdatamode.carNumber"
                  :background-color="fff"
                >
                  <template v-slot:prepend>
                    <label> 車牌號碼: </label>
                  </template>
                </v-text-field>
              </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="validate()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-table>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">車牌號碼</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in carNumberdata" :key="item.name">
          <td>
            <v-btn
              variant="text"
              :icon="mdiMinusCircle"
              color="red"
              @click="opendelete(item)"
            ></v-btn>
          </td>
          <td>{{ item.carNumber }}</td>
          <td>
            <v-btn
              variant="text"
              :icon="mdiPencil"
              color="indigo"
              @click="editdata(item.carNumber)"
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
import { useMainStore } from "@/stores/main";
export default {
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 20 || "Max 20 characters",
       
      ],
      mdiMinusCircle,
      mdiPencil,
      dialog: false,
      deletedialog:false,
      carNumberdatamode: {
        carNumber: "",
      },
      carNumberdata: [
        {
          carNumber: "TCX-2024",
        },
      ],
      mode:"",
      tempdata:{},
    };
  },
  methods: {
    async validate () {
        const { valid } = await this.$refs.form.validate()

        if (valid){
          this.savedata();
        }
      },
    compareTime() {
      return 2.5;
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
      this.carNumberdatamode = { carNumber: "" };
      this.dialog = true;
      this.mode = "add";
    },
    opendelete(item) {
      this.tempdata = item;
      this.deletedialog = true;
    },
    addsavedata() {
      let data = {};
      data = JSON.parse(JSON.stringify(this.carNumberdatamode));
      const mainstore = useMainStore();
      mainstore.loading = true;
      this.carNumberdata.push(data);
      setTimeout(function () {
        mainstore.loading = false;
      }, 500);
    },
    editsavedata() {
      this.tempdata.carNumber = this.carNumberdatamode.carNumber;
    },
    canceldata() {
      this.dialog = false;
    },
    deletedata() {
      let index=-1;
      this.carNumberdata.forEach((e,indexs)=>{
        if(e.carNumber==this.tempdata.carNumber){
          index=indexs;
          return;
        }
      });
     this.carNumberdata.splice(index, 1);
      this.deletedialog = false;

    },
    editdata(carNumber) {
      let obj = this.carNumberdata.find((e) => e.carNumber == carNumber);
      this.tempdata = obj;
      this.carNumberdatamode.carNumber = obj.carNumber;
      this.dialog = true;
      this.mode = "edit";
    },
  },
};
</script>
<style scoped>
.v-text-field {
}
</style>
