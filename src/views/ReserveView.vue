<template>
    <Reserve />
  </template>
  


<script setup>
import Reserve from "@/components/Reserve.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
onMounted(() => {
  const mainstore = useMainStore();
  mainstore.curpage = "Reserve";

});
</script>
  