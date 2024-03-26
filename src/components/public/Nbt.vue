<template>
  <div class="flex" :class="{mid}">
    <div
    class="nbt"
    :class="{ btenabled:enabled }">
    {{ title }}
  </div>
  </div>
</template>
<script>
export default {
    props: ["title","enabled"],
  data() {
    return {
      modelval: false,
      mid:true
    };
  },
  watch: {
    modelval() {
      this.$emit("update:modelValue", this.modelval);
    },
  },
};
</script>
<style>
.nbt {
  /* Stop */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 93px;
  gap: 10px;

  width: 306px;
  height: 30px;

  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.41),
    inset 0px 0px 12px rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(100px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 32px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: not-allowed;
}
.btenabled {
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  ) !important;
  color: black;
  cursor: pointer !important;
}
.flex{
  display: flex;
}
.mid{
  justify-content: center;
}

</style>
