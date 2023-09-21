<!--// src/components/cellComponent/cellComponent.vue-->

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useCellStore } from '@/stores/cell.store';

export default defineComponent({
  props: {
    cellId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const cellStore = useCellStore();
    const cellId = props.cellId;

    let cell = cellStore.values[cellId];

    const count = ref(cell.count);
    const name = ref(cell.picture);
    const src = ref('');

    loadImage(name.value);

    watchEffect(() => {
      cell = cellStore.values[cellId];
      if (cell) {
        count.value = cell.count;
        name.value = cell.picture;
        loadImage(name.value);
      }
    });

    async function loadImage(name: string) {
      src.value = '';
      const img = await import(`../../assets/${name}.png`);
      src.value = img.default;
    }

    return {
      count,
      src,
      name,
    };
  },
});
</script>

<template src="./cellComponent.html"></template>