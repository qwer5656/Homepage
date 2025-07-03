<template lang="">
  <div>
    <Setting />
  </div>
</template>
<script setup>
import Setting from "@/components/Setting.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
onMounted(() => {
  var windowWidth = document.body.clientWidth;
    if (windowWidth <= 576) {
      this.$router.push(`/`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Setting";

});
</script>
<style lang=""></style>
