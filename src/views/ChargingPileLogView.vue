
<script>
import ChargingPileLog from "@/components/ChargingPileLog.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    ChargingPileLog,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "ChargingPileLog";
  },
};
</script>
<template>
<ChargingPileLog />
</template>

<style scoped>

</style>
