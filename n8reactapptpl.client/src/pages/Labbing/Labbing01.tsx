import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string
  lastName: string
};

const initFormState: FormValues = {
  firstName: '聰明',
  lastName: '郝',
}

export default function Labbing01() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<FormValues>({ defaultValues: initFormState });
  const { errors, isValid, isValidating, isDirty } = formState

  const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)));

  const handlePost = handleSubmit((data) => alert(JSON.stringify({ ...data, isPost: true })));

  console.log('Labbing01.formState', formState)
  return (
    <Box sx={{ border: 'red 2px solid' }}>
      <h1>React Hook Form - useForm</h1>

      <p>{`isValid:${isValid} | isValidating:${isValidating} | isDirty:${isDirty}`}</p>

      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input {...register("firstName", { required: "我是必填！" })} placeholder="Kotaro" />
          {errors?.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label>Last Name</label>
          <input {...register("lastName", { required: "我是必填2！" })} placeholder="Sugawara" />
          {errors?.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <input type="submit" />
        <button onClick={handlePost} >送出</button>
      </form>
    </Box>
  );
}
