import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { minutesAtom, selectorAtom } from "./atoms";

export function ToDoList() {
  const [minutes, setMinutes] = useRecoilState(minutesAtom);
  const [translatedHours, setHours] = useRecoilState(selectorAtom);

  const changeMinutes = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  const setHoursFunction = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <>
      <input
        value={minutes}
        onChange={changeMinutes}
        type="text"
        placeholder="minute"
      ></input>
      <input
        value={translatedHours}
        onChange={setHoursFunction}
        type="text"
        placeholder="hours"
      ></input>
    </>
  );
}

export default ToDoList;
