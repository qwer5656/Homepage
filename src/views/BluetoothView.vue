
<script>
import Bluetooth from "@/components/Bluetooth.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Bluetooth,
  },
  mounted() {
    var windowWidth =  document.body.clientWidth;
    if(windowWidth>576){
      this.$router.push(`/Setting`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Bluetooth";
  },
};
</script>
<template>
<Bluetooth />
</template>

<style scoped>

</style>
