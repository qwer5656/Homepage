<template>
  <div class="nswitch">
    <v-switch inset hide-details v-model="modelval"></v-switch>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
  props: ['modelValue'],
  setup(props, { emit }) {
    const modelval = ref(props.modelValue);

    // Watch for changes in props.modelValue to update modelval
    watch(() => props.modelValue, (newVal) => {
      modelval.value = newVal;
    });

    // Watch for changes in modelval to emit updates
    watch(modelval, (newVal) => {
      emit('update:modelValue', newVal);
    });


    return {
      modelval,
    };
  }
};
</script>
<style>
.nswitch .v-switch--inset .v-selection-control--dirty .v-switch__track {
  background: radial-gradient(
    51.11% 51.11% at 50% 0%,
    #c8ffd1 0%,
    #66ff80 100%
  );
  border: 2px solid #66ff80;
  width: 52.89px;
  height: 28px;
  vertical-align: middle;
}
.nswitch .v-switch--inset .v-selection-control--dirty .v-switch__thumb {
  background: black;
}
.nswitch .v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}
.nswitch .v-switch--inset .v-switch__track {
  background: #ffffff1a;

  width: 52.89px;
  height: 28px;
  border-radius: 30px;
  border: 2px solid #474747;

  box-shadow: 0px 8px 30px 0px #00000069;

  box-shadow: 0px 0px 12px 0px #ffffff08 inset;
}
</style>
