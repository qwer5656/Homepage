
<script setup>
import Bluetooth from "@/components/Bluetooth/Bluetooth.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";


onMounted(()=>{
  var windowWidth =  document.body.clientWidth;
    if(windowWidth>576){
      this.$router.push(`/Setting`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Bluetooth";
});
</script>
<template>
<Bluetooth />
</template>

<style scoped>

</style>
