
<script>
import Wifi from "@/components/Wifi.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Wifi,
  },
  mounted() {
    var windowWidth =  document.body.clientWidth;
    if(windowWidth>576){
      this.$router.push(`/Setting`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Wifi";
  },
};
</script>
<template>
<Wifi />
</template>

<style scoped>

</style>
