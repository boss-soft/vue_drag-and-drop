import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modalStore', () => {
  const show = ref<null | number>(null);

  function changeShow(id: null | number): void {
    show.value = id;
  }

  return {
    show,
    changeShow,
  };
});
