import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, categoryStorage, toDoState } from "../atoms";

interface IForm {
  toDo: string;
  categoryInput: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const categoryState1 = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [categoryStore, storeCategory] = useRecoilState(categoryStorage);

  useEffect(() => {
    console.log(categoryStore);
  }, [categoryStore]);
  const handleValid = ({ toDo, categoryInput }: IForm) => {
    setToDos((oldToDos) => [
      {
        text: toDo,
        id: Date.now(),
        category: categoryInput !== "" ? categoryInput : categoryState1,
      },
      ...oldToDos,
    ]);
    setValue("toDo", "");
    setValue("categoryInput", "");
    if (categoryInput !== "") {
      storeCategory((current) => {
        return [...current, categoryInput];
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <input
        {...register("categoryInput")}
        placeholder="write your own categories"
      ></input>
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
