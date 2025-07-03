<template>
<LicensePlateloading />
</template>

<script>
import LicensePlateloading from "@/components/LicensePlateloading.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    LicensePlateloading
  },
  methods: {
   
  },
  mounted(){
    const mainstore = useMainStore();
      mainstore.curpage="licensePlateloading";
  }
};
</script>
