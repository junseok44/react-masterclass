import React from "react";
import { useRecoilValue } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const toDos = useRecoilValue(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    console.log(toDos.findIndex((todo) => todo.id === id));

    // 무엇을 해야하는가. 일단은. 버튼의 name을 가져와서
    // 그 IToDo의 category를 그걸로 바꾸어주어야함.
    // 한번 시도해보고 안되면 다시 하는걸로.
    // 그리고 onClick 을 인자를 받는걸로 다시 시도해보자.
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button onClick={onClick} name="TO_DO">
          TO DO
        </button>
      )}
      {category !== "DOING" && (
        <button onClick={onClick} name="DOING">
          DOING
        </button>
      )}
      {category !== "DONE" && (
        <button onClick={onClick} name="DONE">
          done
        </button>
      )}
    </li>
  );
}

export default ToDo;
