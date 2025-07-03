<template>
<QrcodeSetting />
</template>

<script setup>
import QrcodeSetting from "@/components/QrcodeSetting.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
onMounted(() => {
  const mainstore = useMainStore();
  mainstore.curpage="Startmode";
});
</script>
