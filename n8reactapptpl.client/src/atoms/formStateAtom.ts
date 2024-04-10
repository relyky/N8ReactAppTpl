import { useEffect } from "react"
import { SetterOrUpdater, atom, useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

export interface FormState {
  mode: EditMode,
  dataList: object[],
  qryArgs: string | object, // keyword query
  dataAim?: string, // the id of the dataList
  formData?: object,
}

const initialState: FormState = {
  mode: 'List',
  dataList: [],
  qryArgs: '',
  dataAim: undefined,
  formData: undefined,
}

const ATOM_KEY = 'formState'
export const formStateAtom = atom({
  key: ATOM_KEY,
  default: initialState
})

//-----------------------------------------------------------------------------
/**
 * 強制轉成有 Type 的版本。注意：所有欄位仍需相容 FormState 設定，不然會死掉。
 */
export function useFormValue<T>() {
  const formState = useRecoilValue(formStateAtom)
  return (formState as T)
}

/**
 * 強制轉成有 Type 的版本。注意：所有欄位仍需相容 FormState 設定，不然會死掉。
 */
export function useFormState<TFormState>()
  : [TFormState, SetterOrUpdater<TFormState>] {
  const [state, setState] = useRecoilState(formStateAtom)
  return [state as TFormState, setState as unknown as SetterOrUpdater<TFormState>]
}

/**
 * 強制轉成有 Type 的版本。注意：所有欄位仍需相容 FormState 設定，不然會死掉。
 */
export function useFormReset<T>() {
  const reset = useResetRecoilState(formStateAtom)

  useEffect(() => {
    reset()
    console.debug('useFormReset.reset()')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (initialState as T)
}

// useFormAction<Demo06_FormState>();