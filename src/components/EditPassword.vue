<template lang="">
  <div class="passwordwrap">
    <div class="container">
      <div class="content">
        <form class="formwrap">
          <div>New Password</div>
          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            :append-inner-icon="show1 ? mdiEye : mdiEyeOff"
            :type="show1 ? 'text' : 'password'"
            label="password"
            @click:append-inner="show1 = !show1"
            variant="solo"
            hide-details
          ></v-text-field>
          <div>Confirm New Password</div>
          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            :append-inner-icon="show ? mdiEye : mdiEyeOff"
            :type="show ? 'text' : 'password'"
            label="password"
            @click:append-inner="show = !show"
            variant="solo"
            hide-details
          ></v-text-field>
        </form>
        <div class="btwrap">
          <Nbt title="Save" enabled="true" @click="savetime()" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mdiEyeOff, mdiEye } from "@mdi/js";
import Nbt from "./public/Nbt.vue";
export default {
  data: () => ({
    visible: false,
    visible1: false,
    mdiEyeOff,
    mdiEye,
    show1: false,
    show: false,
  }),
  components: {
    Nbt,
  },
};
</script>
<style>
.passwordwrap .v-field {
  border-radius: 33px;
  background-color: black;
  cursor: text;
  color: white;
  border: 1px solid rgba(107, 107, 107, 1);
  margin-bottom: 25px;
}
.passwordwrap {
  display: flex;
  justify-content: center;
}
.passwordwrap .container {
  width: 478px;
  height: 520px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
}
.passwordwrap .formwrap {
  color: white;
  width: 306px;
  margin: 20px auto;
}
.passwordwrap .content {
  padding: 86px 0;
}
.passwordwrap .btwrap {
  margin-top: 57px;
}

@media (max-width: 576px) {
  .passwordwrap .content {
    padding: 86px 30px;
  }
  .passwordwrap .formwrap {
    margin: 0;
  }
  .passwordwrap .btwrap {
    margin-top: 20px;
  }
}
</style>
