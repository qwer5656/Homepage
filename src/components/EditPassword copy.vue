<template lang="">
  <div style="padding: 10px">
    <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    >
      Old Password
    </div>
    <v-text-field
      :append-inner-icon="visible ? mdiEyeOff:mdiEye"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    >
      New Password
    </div>
    <v-text-field
      :append-inner-icon="visible1 ? mdiEyeOff : mdiEye"
      :type="visible1 ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      variant="outlined"
      @click:append-inner="visible1 = !visible1"
    ></v-text-field>
    <div style="display:flex;justify-content: end;">
        <v-btn>確認</v-btn>
    </div>
  </div>
</template>
<script>

import { mdiEyeOff, mdiEye } from "@mdi/js";


export default {

    data: () => ({
      visible: false,
      visible1:false,
      mdiEyeOff,
      mdiEye
    }),

};
</script>
<style lang=""></style>
