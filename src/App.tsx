import { GlobalStyle } from "./GlobalStyle";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { todoAtoms } from "./atoms";
import { DropDivCard } from "./Components/DropDivCard";

export const DropDiv = styled.div`
  width: 200px;
  padding: 10px;
  margin: 10px 10px;
  background-color: #dcdee0;
  border-radius: 15px;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const DropItem = styled.li`
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: white;
`;

export const DropWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const [toDos, settoDos] = useRecoilState(todoAtoms);

  const onDragEnd = (args: DropResult, provided: ResponderProvided) => {
    console.log(args);

    const { source, destination, draggableId } = args;

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
        copyArr.splice(destination.index, 0, draggableId);

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
        copyArr.splice(source.index, 1);
        return { ...currentObj, [startName]: copyArr };
      });

      settoDos((currentObj) => {
        const copyArr = [...currentObj[endName]];
        copyArr.splice(destination.index, 0, draggableId);
        return { ...currentObj, [endName]: copyArr };
      });
    }
  };

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
          {Object.keys(toDos).map((categoryName, index) => {
            return (
              <DropDivCard
                key={index}
                title={Object.keys(toDos)[index]}
                category={toDos[categoryName]}
                toDos={toDos}
                index={index}
              ></DropDivCard>
            );
          })}
        </DropWrapper>
      </DragDropContext>
    </>
  );
}

export default App;
