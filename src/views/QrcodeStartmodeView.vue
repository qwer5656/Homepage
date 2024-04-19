<template>
<Qrcode />
</template>

<script>
import Qrcode from "@/components/Qrcode.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Qrcode
  },
  methods: {
   
  },
  mounted(){
    const mainstore = useMainStore();
      mainstore.curpage="QrcodeStartmode";
  }
};
</script>
