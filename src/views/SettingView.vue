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
    var windowWidth =  document.body.clientWidth;
    if(windowWidth<=576){
      this.$router.push(`/`);
    }
    console.log(windowWidth);
    const mainstore = useMainStore();
    mainstore.curpage = "Setting";
  },
};
</script>
<style lang=""></style>
