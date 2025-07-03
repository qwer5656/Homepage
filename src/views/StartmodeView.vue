<script setup>
import Startmode from "@/components/Startmode.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
onMounted(() => {
  const mainstore = useMainStore();
  mainstore.curpage = "Startmode";
});
</script>

<template>
  <Startmode />
</template>

<style scoped></style>
