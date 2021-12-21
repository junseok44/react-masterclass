import { atom } from "recoil";

export interface ItoDos {
  [key: string]: Item[];
}

export interface Item {
  text: string;
  id: number;
}

export const todoAtoms = atom<ItoDos>({
  key: "toDo",
  default: {
    TO_DO: [],
    DOING: [],
    DONE: [],
  },
});
