<template lang="">
  <div style="margin-top: 5px">


    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn style="margin: 5px" @click="adddata"> Add Card </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Card</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-form ref="form">
                  <v-text-field
                    :rules="rules"
                    v-model="carddatamode.cardId"
                    :background-color="fff"
                  >
                    <template v-slot:prepend>
                      <label> 卡片序號: </label>
                    </template>
                  </v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="canceldata()">
            CanCel
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
          <th class="text-left">卡號</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in carddata" :key="item.name">
          <td>
            <v-btn
              variant="text"
              :icon="mdiMinusCircle"
              color="red"
              @click="opendelete(item)"
            ></v-btn>
          </td>
          <td>{{ item.cardId }}</td>
          <td>
            <v-btn
              variant="text"
              :icon="mdiPencil"
              color="indigo"
              @click="editdata(item.cardId)"
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
    <v-dialog v-model="alertobj.show">
      <v-alert
        :type="alertobj.type"
        title="Card"
        :text="alertobj.text"
      ></v-alert>
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
      dialog: false,
      deletedialog: false,
      carddatamode: {
        cardId: "",
      },
      mdiMinusCircle,
      mdiPencil,
      mode: "add",
      tempdata: {},
      carddata: [
        {
          cardId: "TCXDFY",
        },
      ],
      alertobj: {
        type: "",
        show: false,
        text: "",
      },
    };
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
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
      this.carddatamode = { cardId: "" };
      this.dialog = true;
      this.mode = "add";
    },
    opendelete(item) {
      this.tempdata = item;
      this.deletedialog = true;
    },
    addsavedata() {
      let data = {};
      data = JSON.parse(JSON.stringify(this.carddatamode));
      this.$axios.get("test.json").then((res) => {
        let self = this;
        self.alertobj.show = true;
        if (res != "") {
          this.carddata.push(data);
          self.alertobj.text = "success";
          self.alertobj.type = "success";
        } else {
          self.alertobj.text = "error";
          self.alertobj.type = "error";
        }
        setTimeout(function () {
          self.alertobj.show = false;
        }, 600);
      });
    },
    editsavedata() {
      this.tempdata.cardId = this.carddatamode.cardId;
    },
    canceldata() {
      this.dialog = false;
    },
    deletedata() {
      let index = -1;
      this.carddata.forEach((e, indexs) => {
        if (e.cardId == this.tempdata.cardId) {
          index = indexs;
          return;
        }
      });
      this.carddata.splice(index, 1);
      this.deletedialog = false;
    },
    editdata(cardId) {
      let obj = this.carddata.find((e) => e.cardId == cardId);
      this.tempdata = obj;
      this.carddatamode.cardId = obj.cardId;
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
