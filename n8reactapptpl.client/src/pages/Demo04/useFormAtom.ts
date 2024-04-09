import { DefaultValue, atom, selector } from "recoil"
import { IDemoBiz_UploadDetail } from "../../DTO/Demo/IDemoBiz_UploadDetail"

export interface FileInfo {
  name: string,
  size: number,
  type: string,
}

export interface Demo04_FormState {
  dataList: IDemoBiz_UploadDetail[]
  fileInfo?: FileInfo
}

const initialState: Demo04_FormState = {
  dataList: [],
  fileInfo: undefined,
}

export const demo04Atom = atom<Demo04_FormState>({
  key: 'demo04',
  default: initialState
})

//-----------------------------------------------------------------------------
/**
 * 一般並不需要拆開單一 auto 取各個屬性值。而是自多個 atoms 組合出複合狀態值才對。
 */

export const selectFileInfo = selector<FileInfo | undefined>({
  key: 'demo04/selectFileInfo',
  get: ({ get }) => (get(demo04Atom).fileInfo),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo04Atom, prev => ({ ...prev, qryArgs: newValue }))
  }
});

export const selectDataList = selector<IDemoBiz_UploadDetail[]>({
  key: 'demo04/selectDataList',
  get: ({ get }) => (get(demo04Atom).dataList),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo04Atom, prev => ({ ...prev, dataList: newValue }))
  }
});
