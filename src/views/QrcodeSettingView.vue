<template>
<QrcodeSetting />
</template>

<script>
import QrcodeSetting from "@/components/QrcodeSetting.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    QrcodeSetting
  },
  methods: {
   
  },
  mounted(){
    const mainstore = useMainStore();
      mainstore.curpage="Startmode";
  }
};
</script>
