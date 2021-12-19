import { Title } from "../App";
import { Droppable } from "react-beautiful-dnd";
import DraggableCompo from "./DraggableCard";
import { ItoDos } from "../atoms";
import styled from "styled-components";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const ColoredUl = styled.ul<{
  isDraggingOver: boolean;
  draggingOverWith: string | undefined;
  draggingFromThisWith: string | undefined;
}>`
  width: 90%;
  minheight: "300px";
  padding: 10px;
  background-color: ${(props) =>
    props.draggingFromThisWith
      ? "#fab1a0"
      : props.draggingOverWith
      ? "#74b9ff"
      : "transparent"};
`;
const ColoredInput = styled.input`
  all: unset;
  text-align: center;
  background-color: white;
  width: 90%;
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

interface ItoDO {
  TO_DO?: string;
  DOING?: string;
  DONE?: string;
}

export function DropDivCard({
  title,
  category,
  toDos,
  index,
}: {
  title: string;
  category: string[];
  toDos: ItoDos;
  index: number;
}) {
  const { register, handleSubmit, setValue, watch } = useForm();
  // form 쓰는부분 막힘 다시 해야함..
  const inputElement = useRef<HTMLInputElement>(null);

  const onSubmit = (data: ItoDO) => {
    console.log("confirmed");
    console.log(data);
  };

  return (
    <>
      <DropDiv>
        <Title>{title}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register(`${Object.keys(toDos)[index]}`, { required: true })}
            ref={inputElement}
            placeholder={`write  ` + Object.keys(toDos)[index]}
          ></input>
          <button type="submit">click here</button>
        </form>

        <Droppable droppableId={Object.keys(toDos)[index]}>
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
                    index={index}
                    todo={item}
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
