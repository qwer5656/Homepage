<script setup>
import TouchStartmode from "@/components/TouchStartmode.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";


onMounted(()=>{
  const mainstore = useMainStore();
  mainstore.curpage = "Touchstart";
});


</script>

<template>
<TouchStartmode />
</template>

<style scoped>

</style>
