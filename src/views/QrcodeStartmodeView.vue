<template>
<Qrcode />
</template>

<script setup>
import Qrcode from "@/components/Qrcode.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
onMounted(() => {
  const mainstore = useMainStore();
  mainstore.curpage="QrcodeStartmode";

});
</script>
