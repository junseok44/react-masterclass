import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryStorage, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const toDos = useRecoilValue(toDoState);
  const setTodos = useSetRecoilState(toDoState);
  // 예전에 velopert 씨는 배열을 어떻게 수정했떠라.
  const categoryList = useRecoilValue(categoryStorage);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget; // 이 name의 타입을 지정해주느방법은?
    console.log(toDos.findIndex((todo) => todo.id === id));
    setTodos((oldTodo) => {
      const index = toDos.findIndex((todo) => todo.id === id);
      return [
        ...oldTodo.slice(0, index),
        {
          text,
          id,
          category: name as any,
        },
        ...oldTodo.slice(index + 1),
      ];
    });

    // 여기서 해주면 안된다. toDos는 read-only이니까.
    // const newArr = toDos.splice(1, 0, {
    //   text: "HELLO",
    //   id: 123,
    //   category: "TO_DO",
    // });

    // 무엇을 해야하는가. 일단은. 버튼의 name을 가져와서
    // 그 IToDo의 category를 그걸로 바꾸어주어야함.
    // 한번 시도해보고 안되면 다시 하는걸로.
    // 그리고 onClick 을 인자를 받는걸로 다시 시도해보자.
  };

  return (
    <li>
      <span>{text} : </span>
      <span style={{ color: "Red" }}>{category}</span>
      {categoryList.map((categoryItem) => {
        if (category !== categoryItem) {
          return (
            <button onClick={onClick} name={categoryItem}>
              {categoryItem}
            </button>
          );
        }
      })}
    </li>
  );
}

export default ToDo;
