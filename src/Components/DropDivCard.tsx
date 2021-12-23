import { Title } from "../App";
import { Droppable } from "react-beautiful-dnd";
import DraggableCompo from "./DraggableCard";
import { Item, ItoDos, todoAtoms } from "../atoms";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";

const ColoredUl = styled.ul<{
  isDraggingOver: boolean;
  draggingOverWith: string | undefined;
  draggingFromThisWith: string | undefined;
}>`
  width: 90%;
  flex-grow: 1;
  padding: 10px;
  background-color: ${(props) =>
    props.draggingFromThisWith
      ? "#fab1a0"
      : props.draggingOverWith
      ? "#74b9ff"
      : "transparent"};
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 90%;
  }
  text-align: center;
`;
const ColoredInput = styled.input`
  all: unset;
  text-align: center;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const ColoredButton = styled.button`
  all: unset;
  background-color: white;
  padding: 3px 10px;
  border-radius: 10px;
  pointer: cursor;
  &:hover {
    font-weight: 700;
  }
`;

const DropDiv = styled.div`
  width: 200px;
  margin: 10px 10px;
  background-color: #dcdee0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function DropDivCard({
  title,
  category,
  toDos,
  index,
}: {
  title: string;
  category: Item[];
  toDos: ItoDos;
  index: number;
  isDragging?: boolean;
  isDropAnimating?: boolean;
}) {
  const [_, settoDos] = useRecoilState(todoAtoms);

  const { register, handleSubmit, setValue } = useForm();

  const boardName = Object.keys(toDos)[index];

  const onSubmit = (data: { [key: string]: string }) => {
    const keys = Object.keys(data)[0];
    const values = Object.values(data)[0];
    const newObj = { id: Date.now(), text: values };

    settoDos((currentObj) => {
      const categoryArr = [...currentObj[keys]];
      categoryArr.push(newObj);

      return { ...currentObj, [keys]: [...categoryArr] };
    });

    setValue(`${boardName}`, "");
  };

  return (
    <>
      <DropDiv>
        <Title>{title}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ColoredInput
            type="text"
            {...register(`${boardName}`, { required: true })}
            placeholder={`type a ${boardName}`}
          ></ColoredInput>
          <ColoredButton type="submit">submit</ColoredButton>
        </Form>

        <Droppable droppableId={boardName}>
          {(magic, snapshot) => (
            <ColoredUl
              ref={magic.innerRef}
              {...magic.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              draggingOverWith={snapshot.draggingOverWith}
              draggingFromThisWith={snapshot.draggingFromThisWith}
            >
              {category.map((item, index) => {
                return (
                  <DraggableCompo
                    key={index}
                    boardName={boardName}
                    index={index}
                    todo={item.text}
                    toDos={toDos}
                  ></DraggableCompo>
                );
              })}
              {magic.placeholder}
            </ColoredUl>
          )}
        </Droppable>
      </DropDiv>
    </>
  );
}

export default React.memo(DropDivCard);
