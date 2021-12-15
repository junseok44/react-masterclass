import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryState,
  categoryStorage,
  IToDo,
  todoSelector,
  toDoState,
} from "./atoms";
import CreateToDo from "./Components/CreateToDos";
import ToDo from "./Components/ToDo";

export enum CategoryType {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const categorizdToDos = useRecoilValue(todoSelector);
  const [categoryStore, storeCategory] = useRecoilState(categoryStorage);

  useEffect(() => {
    console.log(toDos);
  }, [toDos]);

  useEffect(() => {
    const toDoData: any = localStorage.getItem("toDos");
    const categoryData: any = localStorage.getItem("categories");
    const JsonCategories: string[] = JSON.parse(categoryData);
    const JsonTodoData: IToDo[] = JSON.parse(toDoData);
    storeCategory(JsonCategories);
    setToDos(JsonTodoData);
  }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
    localStorage.setItem("categories", JSON.stringify(categoryStore));
  }, [toDos, categoryStore]);

  const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    console.log(value);
    setCategory(value as any);
  };
  return (
    <div>
      current category : {category}
      <select onInput={handleInput}>
        {categoryStore.map((category, index) => {
          return <option key={index}>{category}</option>;
        })}
      </select>
      <CreateToDo />
      <ul>
        {categorizdToDos.map((item) => {
          return <ToDo key={item.id} {...item}></ToDo>;
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
