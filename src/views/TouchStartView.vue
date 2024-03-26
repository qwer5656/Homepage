<script>
import TouchStartmode from "@/components/TouchStartmode.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    TouchStartmode,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "Touchstart";
  },
};
</script>

<template>
<TouchStartmode />
</template>

<style scoped>

</style>
