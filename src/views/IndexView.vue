

<script>
import Index from "@/components/Index.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Index
  },
  methods: {
   
  },
  mounted(){
    const mainstore = useMainStore();
      mainstore.curpage="";
  }
};
</script>


<template>
<Index />
</template>

<style scoped>

</style>



