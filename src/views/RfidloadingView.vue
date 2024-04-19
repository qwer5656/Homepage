
<script>
import Rfidloading from "@/components/Rfidloading.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Rfidloading
  },
  methods: {
   
  },
  mounted(){
    const mainstore = useMainStore();
      mainstore.curpage="Rfidloading";
  }
};
</script>

<template>
<Rfidloading />
</template>

<style scoped>

</style>
