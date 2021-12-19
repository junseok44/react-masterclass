import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

export const DropItem = styled.div<{
  isDragging: boolean;
  draggingOver: string | undefined;
}>`
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: white;
  color: ${(props) => (props.draggingOver ? "red" : "black")};
`;

export function DraggableCompo({
  todo,
  index,
}: {
  todo: string;
  index: number;
}) {
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
        </DropItem>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCompo);
