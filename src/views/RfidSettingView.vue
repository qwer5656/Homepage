<template>
<RfidSetting />
</template>

<script setup>
import RfidSetting from "@/components/RfidSetting.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
onMounted(() => {
  const mainstore = useMainStore();
  mainstore.curpage="Startmode";

});
</script>
