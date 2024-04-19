
<script>
import OCPPmode from "@/components/OCPPmode.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    OCPPmode,
  },
  mounted() {
    var windowWidth =  document.body.clientWidth;
    if(windowWidth>576){
      this.$router.push(`/Setting`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "OCPPmode";
  },
};
</script>
<template>
<OCPPmode />
</template>

<style scoped>

</style>
