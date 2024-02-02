<template lang="">
  <div style="margin-top: 5px">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn style="margin: 5px" v-bind="props"> Add Card </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Card</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <lable style="display: inline-block;width:70px;margin-right:16px;">                    
                時間:</lable>
                <input
                  type="date"
                  v-model="carddatamode.date"
                  id="start"
                  name="trip-start"
                  class="timeinput"
                />
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :rules="rules"
                  hide-details="auto"
                  v-model="carddatamode.cardId"
                  :background-color="fff"
                >
                  <template v-slot:prepend>
                    <label> 卡片序號: </label>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="adddata()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">日期</th>
          <th class="text-left">卡號</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in carddata" :key="item.name">
          <td>{{ item.date }}</td>
          <td>{{ item.cardId }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      carddatamode: {
        date: "2022-01-01",
        cardId: "",
      },
      carddata: [
        {
          date: "2024/01/18",
          cardId: "TCXDFY",
        },
      ],
    };
  },
  methods: {
    compareTime() {
      return 2.5;
    },
    adddata() {
      let data = {};
      data = JSON.parse(JSON.stringify(this.carddatamode));
      this.carddata.push(data);
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
.v-text-field {
 
}
</style>
