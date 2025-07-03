
<script setup>
import Rfidloading from "@/components/Rfidloading.vue";
import { useMainStore } from "@/stores/main";

import { onMounted } from "vue";
onMounted(() => {
  const mainstore = useMainStore();
  mainstore.curpage="Rfidloading";

});
</script>

<template>
<Rfidloading />
</template>

<style scoped>

</style>
