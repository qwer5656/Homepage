<template lang="">
  <div>
    <ScanQrcode />
  </div>
</template>
<script setup>
import ScanQrcode from "@/components/ScanQrcode.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
onMounted(() => {
  var windowWidth = document.body.clientWidth;
    if (windowWidth <= 576) {
     // this.$router.push(`/`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Setting";

});
</script>
<style lang=""></style>
