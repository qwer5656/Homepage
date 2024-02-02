<template lang="">
  <div>
    <Login @loginstauts="loginchange" />
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
export default {
  components: {
    Login,
  },
  methods: {
    loginchange(){
      this.$emit("loginstauts");
    },
  },
};
</script>
<style lang=""></style>
