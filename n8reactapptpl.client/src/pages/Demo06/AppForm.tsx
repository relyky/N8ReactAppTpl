import { useFormReset } from "../../atoms/formStateAtom";
import AddView from "./AddView";
import EditView from "./EditView";
import ListView from "./ListView";

export default function Demo06_AppForm() {
  const { mode } = useFormReset<Demo06_FormState>()

  return (
    <>
      {mode === 'Add' && <AddView />}

      {mode === 'Edit' && <EditView />}

      <ListView />    
    </>
  )
}
