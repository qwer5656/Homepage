<template>
    <Reserve />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import Reserve from '../components/Reserve.vue';
  
  export default defineComponent({
    name: 'ReserveView',
  
    components: {
        Reserve,
    },
  });
  </script>
  