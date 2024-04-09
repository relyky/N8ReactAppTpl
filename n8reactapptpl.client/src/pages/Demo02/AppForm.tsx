import { useRecoilValue } from "recoil";
import AddView from "./AddView";
import EditView from "./EditView";
import ListView from "./ListView";
import { selectMode } from "./useFormAtom";

export default function Demo02_AppForm() {
  const mode = useRecoilValue(selectMode)

  return (
    <>
      {mode === 'Add' && <AddView />}

      {mode === 'Edit' && <EditView />}

      <ListView />    
    </>
  )
}
