import React, { useState } from "react";
import { Circle } from "./Circle";
function App() {
  const [name, setName] = useState<string | any>("anonymous");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);

    console.log(event.currentTarget.value);
  };
  return (
    <div>
      <Circle bgColor="yourwelcome" name={name}></Circle>
      <form>
        <input
          onChange={onChange}
          type="text"
          placeholder="your name"
          name="name"
          value={name}
        ></input>
      </form>
    </div>
  );
}

export default App;
