<!--// src/components/modalComponent/modalComponent.vue-->

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useCellStore } from '@/stores/cell.store';
import { useModalStore } from '@/stores/modal.store';

export default defineComponent({
  setup() {
    const cellStore = useCellStore();

    const numberModal = useModalStore();

    const showId = numberModal.show;

    function closeModal() {
      numberModal.changeShow(null);
    }

    let cellId: number = 0;

    if (showId === null) {
      closeModal();
    } else {
      cellId = showId;
    }

    let cell = cellStore.values[cellId];

    const count = ref(cell.count);
    const name = ref(cell.picture);
    const src = ref('');

    const modelCountToDelete = ref(1);

    loadImage(name.value);

    watchEffect(() => {
      cell = cellStore.values[cellId];
      if (cell) {
        count.value = cell.count;
        name.value = cell.picture;
        loadImage(name.value);
        compareModelToMinMax();
      } else {
        closeModal();
      }
    });

    async function loadImage(name: string) {
      src.value = '';
      const img = await import(`../../assets/${name}.png`);
      src.value = img.default;
    }

    function compareModelToMinMax() {
      if (modelCountToDelete.value > count.value) {
        modelCountToDelete.value = count.value;
      }
      if (modelCountToDelete.value < 1) {
        modelCountToDelete.value = 1;
      }
    }

    function deleteFromStore() {
      cellStore.deleteItem(cellId, modelCountToDelete.value);
    }

    const showDialog = ref(false);

    function showDelete() {
      showDialog.value = !showDialog.value;
    }

    return {
      count,
      src,
      name,
      showDialog,
      modelCountToDelete,
      numberModal,
      deleteFromStore,
      compareModelToMinMax,
      closeModal,
      showDelete,
    };
  },
});
</script>

<template src="./modalComponent.html"></template>