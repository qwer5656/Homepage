
<script setup>
import ChargePointRatePlan from "@/components/ChargePointRatePlan.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";

onMounted(()=>{

    const mainstore = useMainStore();
    mainstore.curpage = "ChargePointRatePlan";

});
</script>
<template>
<ChargePointRatePlan />
</template>

<style scoped>

</style>
