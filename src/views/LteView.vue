
<script setup>
import Lte from "@/components/Lte.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
onMounted(() => {
  var windowWidth =  document.body.clientWidth;
    if(windowWidth>576){
      this.$router.push(`/Setting`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Lte";
});
</script>
<template>
<Lte />
</template>

<style scoped>

</style>
