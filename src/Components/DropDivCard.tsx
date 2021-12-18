import { DropDiv, Title } from "../App";
import { Droppable } from "react-beautiful-dnd";
import DraggableCompo from "./DraggableCard";
import { ItoDos } from "../atoms";

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
  return (
    <>
      <DropDiv>
        <Title>{title}</Title>
        <Droppable droppableId={Object.keys(toDos)[index]}>
          {(magic) => (
            <ul
              style={{ minHeight: "300px" }}
              ref={magic.innerRef}
              {...magic.droppableProps}
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
            </ul>
          )}
        </Droppable>
      </DropDiv>
      ;
    </>
  );
}
