<template>
<CarNumberloading />
</template>

<script>
import CarNumberloading from "@/components/CarNumberloading.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    CarNumberloading
  },
  methods: {
   
  },
  mounted(){
    const mainstore = useMainStore();
      mainstore.curpage="CarNumberloading";
  }
};
</script>
