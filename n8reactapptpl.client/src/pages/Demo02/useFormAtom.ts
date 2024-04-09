import { IDemo02_Profile } from "../../DTO/Demo02/IDemo02_Profile"
import { IDemo02_FormData } from "../../DTO/Demo02/IDemo02_FormData"
import { DefaultValue, atom, selector } from "recoil"

export interface Demo02_FormState {
  mode: EditMode,
  dataList: IDemo02_Profile[],
  qryArgs: string,  // keyword query
  dataAim?: string, // the id of the dataList
  formData?: IDemo02_FormData,
}

const initialState: Demo02_FormState = {
  mode: 'List',
  dataList: [],
  qryArgs: '',
  dataAim: undefined,
  formData: undefined,
}

export const demo02Atom = atom<Demo02_FormState>({
  key: 'demo02',
  default: initialState
})

//-----------------------------------------------------------------------------
/**
 * 一般並不需要拆開單一 auto 取各個屬性值。而是自多個 atoms 組合出複合狀態值才對。
 */

export const selectMode = selector<EditMode>({
  key: 'demo04/mode',
  get: ({ get }) => (get(demo02Atom).mode),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo02Atom, prev => ({ ...prev, mode: newValue }))
  }
});

export const selectDataList = selector<IDemo02_Profile[]>({
  key: 'demo04/dataList',
  get: ({ get }) => (get(demo02Atom).dataList),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo02Atom, prev => ({ ...prev, dataList: newValue }))
  }
});

export const selectQryArgs = selector<string>({
  key: 'demo04/qryArgs',
  get: ({ get }) => (get(demo02Atom).qryArgs),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo02Atom, prev => ({ ...prev, qryArgs: newValue }))
  }
});

export const selectDataAim = selector<string | undefined>({
  key: 'demo04/dataAim',
  get: ({ get }) => (get(demo02Atom).dataAim),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo02Atom, prev => ({ ...prev, dataAim: newValue }))
  }
});

export const selectFormData = selector<IDemo02_FormData | undefined>({
  key: 'demo04/formData',
  get: ({ get }) => (get(demo02Atom).formData),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo02Atom, prev => ({ ...prev, formData: newValue }))
  }
});
