import { Draggable } from "react-beautiful-dnd";
import { ItoDos } from "../atoms";
import DropDivCard from "./DropDivCard";

export function DraggableBoard({
  index,
  categoryName,
  toDos,
}: {
  index: number;
  categoryName: string;
  toDos: ItoDos;
}) {
  return (
    <Draggable key={index} index={index} draggableId={categoryName}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DropDivCard
            isDragging={snapshot.isDragging}
            isDropAnimating={snapshot.isDropAnimating}
            index={index}
            title={categoryName}
            category={toDos[categoryName]}
            toDos={toDos}
          ></DropDivCard>
        </div>
      )}
    </Draggable>
  );
}
