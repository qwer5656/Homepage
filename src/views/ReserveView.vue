<template>
    <Reserve />
  </template>
  


<script>
import Reserve from "@/components/Reserve.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Reserve,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "Reserve";
  },
};
</script>
  