<template lang="">
  <div>
    <Setting />
  </div>
</template>
<script>
import Setting from "@/components/Setting.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    Setting,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "Setting";
  },
};
</script>
<style lang=""></style>
