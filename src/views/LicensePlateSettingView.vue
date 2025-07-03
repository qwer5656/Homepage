<template>
<LicensePlateSetting />
</template>
<script>
import LicensePlateSetting from "@/components/LicensePlateSetting.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    LicensePlateSetting,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "Startmode";
  },
};
</script>
