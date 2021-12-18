import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { DropItem } from "../App";

export function DraggableCompo({
  todo,
  index,
}: {
  todo: string;
  index: number;
}) {
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(magic) => (
        <DropItem
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
