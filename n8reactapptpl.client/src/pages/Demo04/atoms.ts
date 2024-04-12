//import { DefaultValue, atom, selector } from "recoil"
import { atom } from "jotai"
import { IDemoBiz_UploadDetail } from "../../DTO/Demo/IDemoBiz_UploadDetail"

interface FileInfo {
  name: string,
  size: number,
  type: string,
}

interface Demo04_FormState {
  dataList: IDemoBiz_UploadDetail[]
  fileInfo?: FileInfo
}

//-----------------------------------------------------------------------------

const initialState: Demo04_FormState = {
  dataList: [],
  fileInfo: undefined,
}

export const demo04Atom = atom(initialState)
demo04Atom.debugLabel = 'demo04Atom'

//const ATOM_KEY = 'demo04'
//export const demo04Atom = atom<Demo04_FormState>({
//  key: ATOM_KEY,
//  default: initialState
//})

//-----------------------------------------------------------------------------
/**
 * 一般並不需要拆開單一 auto 取各個屬性值。而是自多個 atoms 組合出複合狀態值才對。
 */

//export const selectFileInfo = selector<FileInfo | undefined>({
//  key: `${ATOM_KEY}/fileInfo`,
//  get: ({ get }) => (get(demo04Atom).fileInfo),
//  set: ({ set }, newValue) => {
//    if (!(newValue instanceof DefaultValue))
//      set(demo04Atom, prev => ({ ...prev, qryArgs: newValue }))
//  }
//});

//export const selectDataList = selector<IDemoBiz_UploadDetail[]>({
//  key: `${ATOM_KEY}/dataList`,
//  get: ({ get }) => (get(demo04Atom).dataList),
//  set: ({ set }, newValue) => {
//    if (!(newValue instanceof DefaultValue))
//      set(demo04Atom, prev => ({ ...prev, dataList: newValue }))
//  }
//});
