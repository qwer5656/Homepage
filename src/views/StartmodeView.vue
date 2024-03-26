<script>
import Startmode from "@/components/Startmode.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Startmode,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "Startmode";
  },
};
</script>


<template>
<Startmode />
</template>

<style scoped>

</style>
