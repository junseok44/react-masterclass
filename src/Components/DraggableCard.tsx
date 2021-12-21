import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ItoDos, todoAtoms } from "../atoms";

export const DropItem = styled.div<{
  isDragging: boolean;
  draggingOver: string | undefined;
}>`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: white;
  color: black;
`;

export function DraggableCompo({
  todo, // 지금은 이렇게 text를 바로 전달하고 있는데, 일단 props 이름부터 헷갈리고. 그리고 객체를 주면
  //삭제할때도 편하잖아요
  index,
  boardName,
  toDos,
}: {
  todo: string;
  index: number;
  boardName: string;
  toDos?: ItoDos;
}) {
  const settoDo = useSetRecoilState(todoAtoms);
  const onClick = (index: number) => {
    console.log(index);
    console.log(boardName);

    settoDo((currentObj) => {
      const currentArr = [...currentObj[boardName]];
      currentArr.splice(index, 1);

      return { ...currentObj, [boardName]: currentArr };
    });
  };
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(magic, snapshot) => (
        <DropItem
          isDragging={snapshot.isDragging}
          draggingOver={snapshot.draggingOver}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todo}
          <span
            onClick={(event) => {
              onClick(index);
            }}
            // 여기서 onClick = {(index)=> { onClick(index)}} 이렇게 해주면은..onClick이 전달하는 mouseEvent가 전달이 되어버림.
            style={{ color: "red" }}
          >
            delete
          </span>
        </DropItem>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCompo);
