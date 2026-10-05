
<script>
import AdImageData from "@/components/AdImageData.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    AdImageData,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "AdImageData";
  },
};
</script>
<template>
<AdImageData />
</template>

<style scoped>

</style>
