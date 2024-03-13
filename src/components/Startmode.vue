<template lang="">
  <div>
    <h1> Start Mode:</h1>
    <v-radio-group inline v-model="radioval">
      <v-radio  label="Multiple Modes" value="one"></v-radio>
      <v-radio   label="Touch Start" value="four"></v-radio>
      <v-radio   label="Plug And Play" value="five"></v-radio>
    </v-radio-group>
    <hr style="margin-bottom:20px">
    <div v-if="radioval == 'one'">
      <v-checkbox label="Scan QR"  v-model="selected" value="Scan QR"></v-checkbox>
      <v-checkbox label="RFID"  v-model="selected" value="RFID"></v-checkbox>
      <Card v-if="selected.indexOf('RFID') != -1" />
      <v-checkbox label="Card Number"  v-model="selected" value="Card Number"></v-checkbox>
      <CarNumber v-if="selected.indexOf('Card Number') != -1" />
    </div>




  </div>
  <div
    style="
      display: flex;
      justify-content: end;
      padding-right: 10px;
      color: white;
      padding-bottom: 20px;
    "
  >
    <v-btn color="#5865f2" variant="flat">Save</v-btn>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import CarNumber from "@/components/CarNumber.vue";
export default {
  data() {
    return {
      radioval: "two",
      selected:[]
    };
  },
  components: {
    Card,
    CarNumber,
  },
  methods: {},
};
</script>
<style scoped></style>
