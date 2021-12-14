import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { GlobalStyle } from "./GlobalStyle";
import ToDoList from "./ToDoList";

// 에러 메시지를 paint 해주고 싶은데요.. errors["key"].message 요런식으로. 근데 안되더라고.
// function errorPaint() {
//   const newArray = [];
//   for (var name in errors) {
//     newArray.push(errors[name]?.message);
//   }
//   console.log(newArray);
//   setErrorMsg(newArray);
// }

// <
//   {
//     text: string;
//     id: number;
//     category: "TO_DO" | "TO_DO_NOW" | "TO_DO_TMR";
//   }[]
// >

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList></ToDoList>
    </>
  );
}

export default App;
