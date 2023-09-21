// src/stores/cell.store.ts

import { defineStore } from 'pinia';
import type { ICellStore } from '@/types/allTypes.interface';
import { ref } from 'vue';

export const useCellStore = defineStore('cellStore', () => {
    const values = ref<ICellStore>({});

    function makeDefaultStore() {
        values.value = {
            0: {
                count: 99,
                picture: 'green',
            },
            1: {
                count: 99,
                picture: 'yellow',
            },
            2: {
                count: 99,
                picture: 'blue',
            },
        };
    }

    function moveElement(from: number, to: number) {
        // дабы обменяться не ссылками, а таки объектами — заюзаю JSON
        const toValue = JSON.stringify(values.value[to]);
        values.value[to] = JSON.parse(JSON.stringify(values.value[from]));
        if (toValue) {
            values.value[from] = JSON.parse(toValue);
        } else {
            delete values.value[from];
        }
    }

    function deleteItem(from: number, count: number) {
        values.value[from].count -= count;
        if (values.value[from].count <= 0) {
            delete values.value[from];
        }
    }

    function setAllStore(jsonStore: string): void {
        values.value = JSON.parse(jsonStore);
    }

    return {
        values,
        setAllStore,
        makeDefaultStore,
        moveElement,
        deleteItem,
    };
});
