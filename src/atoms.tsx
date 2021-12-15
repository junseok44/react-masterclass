import { atom, selector } from "recoil";
import { CategoryType } from "./ToDoList";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom<string>({
  key: "categoryState",
  default: "TO_DO",
});

export const categoryStorage = atom<string[]>({
  key: "categoryStorage",
  default: ["TO_DO", "DOING", "DONE"],
});

export const todoSelector = selector<IToDo[]>({
  key: "toDoSelector",
  get: (options) => {
    const toDos = options.get(toDoState);

    const categoryState123 = options.get(categoryState);
    // 여기서 categoryState의 값에 따라서 다른 toDo를 return해주면.
    // 굳이 3개의 배열이나 return해줄 이유가 없다는 것이다.
    return toDos.filter((todo) => todo.category === categoryState123);
  },
});
