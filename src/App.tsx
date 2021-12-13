import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch());

  const onSubmit = () => {
    console.log("hello");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")}></input>
        <input {...register("email")}></input>
        <button type="submit">submit</button>
        {/* {errors.name?.type === "required" && "more then 10"} */}
      </form>
    </>
  );
}

export default App;
