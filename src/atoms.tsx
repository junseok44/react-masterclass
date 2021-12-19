import { atom } from "recoil";

export interface ItoDos {
  [key: string]: string[];
}

export const todoAtoms = atom<ItoDos>({
  key: "toDo",
  default: {
    TO_DO: ["A", "B", "C", "D", "E"],
    DOING: ["아", "내일", "친구", "전역이라고?"],
    DONE: ["시간", "존나", "빨리가네"],
  },
});
