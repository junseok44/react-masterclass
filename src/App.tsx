import { GlobalStyle } from "./GlobalStyle";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DroppableProvidedProps,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { todoAtoms } from "./atoms";
import DropDivCard from "./Components/DropDivCard";
import { useEffect } from "react";
import { DraggableBoard } from "./Components/DraggableBoard";

export const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin: 10px 0px;
  font-weight: 600;
`;

export const DropWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const DropBox = styled.div`
  position: fixed;
  bottom: 5%;
  left: 25%;
  width: 50%;
  background-color: #dcdee0;
`;

export const DropBoxItem = styled.div<{
  droppableProps: DroppableProvidedProps;
  draggingOverWith: string | undefined;
}>`
  background-color: ${(props) =>
    props.draggingOverWith ? "#fab1a0" : "transparent"};

  text-align: center;
  min-height: 100px;
`;

const DropBoard = styled.div<{
  droppableProps: DroppableProvidedProps;
}>`
  display: flex;
  min-height: 350px;
  background-color: black;
`;

function App() {
  const [toDos, settoDos] = useRecoilState(todoAtoms);

  const onDragEnd = (args: DropResult, provided: ResponderProvided) => {
    console.log(args);

    const { source, destination, draggableId } = args;

    console.log(destination?.droppableId, draggableId);

    // if (
    //   source.droppableId === "boardDrop" &&
    //   destination?.droppableId === "boardDrop"
    // ) {
    //   //execute code.
    //   return;
    // }

    if (
      source.droppableId === "boardDrop" &&
      destination?.droppableId === "boardDrop"
    ) {
      console.log("this should be filled");
      return;
    }

    if (
      source.droppableId === "boardDrop" &&
      destination?.droppableId !== "boardDrop"
    ) {
      return;
    }

    if (destination?.droppableId === "trash") {
      settoDos((currentObj) => {
        const currentArr = [...currentObj[source.droppableId]];
        currentArr.splice(source.index, 1);

        return { ...currentObj, [source.droppableId]: currentArr };
      });

      return;
    }

    if (source.droppableId === destination?.droppableId) {
      settoDos((currentObj) => {
        const destName = destination.droppableId;
        const copyObj = { ...currentObj };
        const copyArr = [...copyObj[destName]];
        // 뭐가 달라졌나.. 아까는 copyArr를 바로 copyObj[destname] 이라고 했는데요
        // 그러니까 splice를 못쓰더라구요. read only property라고. 그러니까 이거는..
        // 그래서 copyObj의 안에 value를 다시 복사해서 만들었어요
        // 아니 근데 그러면 copyObj 만들어서 할 필요가 없다고 한다. nico의 코딩에 따르면.
        copyArr.splice(source.index, 1);
        copyArr.splice(destination.index, 0, {
          text: draggableId,
          id: Date.now(),
        });

        return { ...currentObj, [destName]: copyArr };
      });
    }

    if (
      source.droppableId !== destination?.droppableId &&
      destination !== undefined &&
      destination !== null
    ) {
      const startName = source.droppableId;
      const endName = destination?.droppableId;

      settoDos((currentObj) => {
        const copyArr = [...currentObj[startName]];
        const copyArr2 = [...currentObj[endName]];
        copyArr.splice(source.index, 1);
        copyArr2.splice(destination.index, 0, {
          text: draggableId,
          id: Date.now(),
        });
        return { ...currentObj, [startName]: copyArr, [endName]: copyArr2 };
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("thisisTOdoS", JSON.stringify(toDos));
  }, [toDos]);

  useEffect(() => {
    async function fetchData() {
      const data = localStorage.getItem("thisisTOdos");
      const parsedData = await JSON.parse(data || "");
      settoDos(parsedData);
      console.log("loaded");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>hello</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <GlobalStyle />

      <DragDropContext onDragEnd={onDragEnd}>
        <DropWrapper>
          <Droppable droppableId="boardDrop">
            {(provided, snapshot) => (
              <DropBoard
                ref={provided.innerRef}
                droppableProps={provided.droppableProps}
              >
                {Object.keys(toDos).map((categoryName, index) => {
                  return (
                    <DraggableBoard
                      key={index}
                      index={index}
                      categoryName={categoryName}
                      toDos={toDos}
                    ></DraggableBoard>
                  );
                })}
                {provided.placeholder}
              </DropBoard>
            )}
          </Droppable>
        </DropWrapper>
        <DropBox>
          <Title>Trashcan</Title>
          <Droppable droppableId="trash">
            {(provided, snapshot) => (
              <DropBoxItem
                ref={provided.innerRef}
                droppableProps={provided.droppableProps}
                draggingOverWith={snapshot.draggingOverWith}
              >
                drop here to remove
                {provided.placeholder}
              </DropBoxItem>
            )}
          </Droppable>
        </DropBox>
      </DragDropContext>
    </>
  );
}

export default App;
