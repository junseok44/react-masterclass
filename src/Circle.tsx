import styled from "styled-components";

const CircleOne = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: black;
  color: white;
  border-radius: 15px;
  padding: 10px;
`;
/*
interface CircleProps__TYPE {
  color: string;
}
*/

export function Circle({ bgColor, name }: CircleType) {
  return (
    <div>
      <CircleOne>{name}</CircleOne>
    </div>
  );
}

interface CircleType {
  bgColor: string;
  text?: string;
  name?: string;
}

export function calculator(playerObj: calculatorObj) {
  console.log(
    `your name is : ${playerObj.name} and your age is : ${playerObj.age}`
  );
}

calculator({ name: "junseok", age: 22 });

interface calculatorObj {
  name: string;
  age: number;
}
