
<script>
import Timemode from "@/components/Timemode.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Timemode,
  },
  mounted() {
    var windowWidth =  document.body.clientWidth;
    if(windowWidth>576){
      this.$router.push(`/Setting`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Time";
  },
};
</script>
<template>
<Timemode />
</template>

<style scoped>

</style>
