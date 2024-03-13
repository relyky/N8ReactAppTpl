import { useAppSelector } from "../../store/hooks"
import { selectFormState } from "./useFormSlice";
import AddView from "./AddView";
import EditView from "./EditView";
import ListView from "./ListView";

export default function Demo02_AppForm() {
  const { mode } = useAppSelector(selectFormState)

  return (
    <>
      {mode === 'Add' && <AddView />}

      {mode === 'Edit' && <EditView />}

      <ListView />    
    </>
  )
}
