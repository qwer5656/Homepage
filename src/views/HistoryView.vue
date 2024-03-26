
<script>
import History from "@/components/History.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    History
  },
  methods: {
   
  },
  mounted(){
    const mainstore = useMainStore();
      mainstore.curpage="History";
  }
};
</script>

<template>
<History />
</template>

<style scoped>

</style>
