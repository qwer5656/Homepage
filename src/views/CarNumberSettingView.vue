<template>
<CarNumberSetting />
</template>
<script>
import CarNumberSetting from "@/components/CarNumberSetting.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    CarNumberSetting,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "Startmode";
  },
};
</script>
