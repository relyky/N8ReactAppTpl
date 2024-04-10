import { useRecoilValue } from "recoil";
import AddView from "./AddView";
import EditView from "./EditView";
import ListView from "./ListView";
import { demo02Atom } from "./atoms";

export default function Demo02_AppForm() {
  const { mode } = useRecoilValue(demo02Atom)

  return (
    <>
      {mode === 'Add' && <AddView />}

      {mode === 'Edit' && <EditView />}

      <ListView />
    </>
  )
}
