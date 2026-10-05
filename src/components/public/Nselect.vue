<template>
  <v-menu
    v-model="menuOpen"
    :close-on-content-click="false"
    location="bottom"
    offset-y
    max-width="auto"
    min-width="100%"
  >
    <template #activator="{ props }">
      <v-text-field
        v-model="selectedLabel"
        readonly
        variant="plain"
        :append-inner-icon="mdiMenuDown"
        v-bind="props"
        @click="props.onClick"
        class="Nselect"
      />
    </template>

    <v-list ref="listRef" style="max-height: 200px; overflow-y: auto">
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="item"
        :class="{ 'v-list-item--active': item === modelValue }"
        @click="selectItem(item)"
        class="Nselectitem"
      >
        {{ item }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { mdiMenuDown } from "@mdi/js";
const props = defineProps({
  modelValue: String,
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const menuOpen = ref(false);

const selectedLabel = computed(() => props.modelValue || "請選擇");

function selectItem(item) {
  emit("update:modelValue", item);
  menuOpen.value = false;
}

// 自動滾動到選中項目
watch(menuOpen, (open) => {
  if (open) {
    nextTick(() => {
      setTimeout(() => {
        const activeEl = document.querySelector(".v-list-item--active");
        if (activeEl) {
          activeEl.scrollIntoView({ block: "nearest", behavior: "auto" });
        }
      }, 50);
    });
  }
});
</script>
<style>
.Nselect input {
  text-align: center !important;
}
.Nselect,
.Nselectitem {
  width: 200px;
}
.Nselect,
.Nselect * {
  cursor: pointer !important;
}

@media (max-width: 576px) {
  .Nselect,
  .Nselectitem {
    width: 150px;
  }
}
</style>
