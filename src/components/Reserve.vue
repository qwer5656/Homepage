<template lang="">
  <div style="margin-top: 5px">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn style="margin:5px"   v-bind="props"> Add Reserve </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Reserve</span>
        </v-card-title>
        <v-card-text>
          <v-container>
           
            <v-row>
                <v-col
                cols="12"
                sm="6"
                md="4"
              >
              預約時間:
              <input type="date" v-model="dessertsmode.date" id="start" name="trip-start"   />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
              開始時間:
              <input type="time" v-model="dessertsmode.starttime" id="myTime" value="00:00:00">
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
              結束時間:
              <input type="time" v-model="dessertsmode.endtime" id="myTime1" value="23:00:00">
              </v-col>
              
            </v-row>
          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="adddata()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 
    <v-table>
      <thead>
        <tr>
          <th class="text-left">預約日期</th>
          <th class="text-left">起始時間</th>
          <th class="text-left">結束時間</th>
          <th class="text-left">總時</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.date }}</td>
          <td>{{ item.starttime }}</td>
          <td>{{ item.endtime }}</td>
          <td>{{ compareTime(item.starttime,item.endtime)}}hr</td>
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
        dessertsmode:{
          date:"2024-01-01",
          starttime:"00:00",
          endtime:"23:59"
        },
      desserts: [
        {
          date: "2024/01/18",
          starttime: "05:10",
          endtime: "06:40",
        },
      ],
    };
  },
  methods:{
    compareTime(){
        return 2.5;
    },
    adddata(){
      let data={};
      data = JSON.parse(JSON.stringify(this.dessertsmode))
      this.desserts.push(data);
      this.dialog=false;
    }
  }
};
</script>
<style lang=""></style>
