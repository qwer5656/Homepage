
<script>
import Card from "@/components/Card.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Card,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "Startmode";
  },
};
</script>
<template>
<Card />
</template>

<style scoped>

</style>
