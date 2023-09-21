<!--// src/components/mainComponent/mainComponent.vue-->

<script lang="ts">
import { defineComponent, onMounted, watchEffect } from 'vue';

import { useCellStore } from '@/stores/cell.store';
import CellComponent from '@/components/cellComponent/cellComponent.vue';
import ModalComponent from '@/components/modalComponent/modalComponent.vue';
import { useModalStore } from '@/stores/modal.store';

export default defineComponent({
  components: { ModalComponent, CellComponent },
  setup() {
    const cellStore = useCellStore();

    onMounted(() => {
      const localStorage = window.localStorage;
      const store = localStorage.getItem('store');
      if (store && store != '{}') {
        cellStore.setAllStore(store);
      } else {
        resetStore();
      }
    });

    watchEffect(() => {
      const cell = cellStore.values;
      if (cell && Object.keys(cell).length !== 0) {
        localStorage.setItem('store', JSON.stringify(cell));
      }
    });

    const numberModal = useModalStore();

    let draggingFrom: null | number = null;
    let draggingTo: null | number = null;

    function showHideModal(id: number | null) {
      if (numberModal.show !== null) {
        id = null;
      }
      numberModal.changeShow(id);
    }

    function resetStore() {
      cellStore.makeDefaultStore();
    }

    function handleDragStart(startCell: number) {
      draggingFrom = startCell;
    }

    function handleDragOver(processCell: number) {
      draggingTo = processCell;
    }

    function handleDrop() {
      if (draggingFrom !== null && draggingTo !== null)
        cellStore.moveElement(draggingFrom, draggingTo);
    }

    return {
      numberModal,
      cellStore,
      handleDragStart,
      handleDragOver,
      handleDrop,
      showHideModal,
      resetStore,
    };
  },
});
</script>

<template src="./mainComponent.html" />

<style scoped></style>