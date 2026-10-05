<script setup>
import Info from "@/components/Info.vue";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";


onMounted(()=>{
  const mainstore = useMainStore();
  mainstore.curpage = "Info";
});


</script>

<template>
<Info />
</template>

<style scoped>

</style>
