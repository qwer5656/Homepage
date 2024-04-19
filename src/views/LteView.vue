
<script>
import Lte from "@/components/Lte.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Lte,
  },
  mounted() {
    var windowWidth =  document.body.clientWidth;
    if(windowWidth>576){
      this.$router.push(`/Setting`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Lte";
  },
};
</script>
<template>
<Lte />
</template>

<style scoped>

</style>
