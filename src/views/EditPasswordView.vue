<script>
import EditPassword from "@/components/EditPassword.vue";
import { useMainStore } from "@/stores/main";
export default {
  components: {
    EditPassword,
  },
  mounted() {
    const mainstore = useMainStore();
    mainstore.curpage = "EditPassword";
  },
};
</script>

<template>
<EditPassword />
</template>

<style scoped>

</style>



