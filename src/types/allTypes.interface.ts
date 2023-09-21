// src/types/allTypes.interface.ts
export interface ICell {
    count: number,
    picture: string,
}

export interface ICellStore {
    [key: number]: ICell;
}