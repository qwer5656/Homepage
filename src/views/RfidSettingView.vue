<template>
<RfidSetting />
</template>

<script>
import RfidSetting from "@/components/RfidSetting.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    RfidSetting
  },
  methods: {
   
  },
  mounted(){
    const mainstore = useMainStore();
      mainstore.curpage="Startmode";
  }
};
</script>
