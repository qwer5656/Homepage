
<script>
import Language from "@/components/Language.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Language,
  },
  mounted() {
    var windowWidth =  document.body.clientWidth;
    if(windowWidth>576){
      this.$router.push(`/Setting`);
    }
    const mainstore = useMainStore();
    mainstore.curpage = "Language";
  },
};
</script>
<template>
<Language />
</template>

<style scoped>

</style>
