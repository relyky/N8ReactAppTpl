import { IDemo02_Profile } from "../../DTO/Demo02/IDemo02_Profile"
import { IDemo02_FormData } from "../../DTO/Demo02/IDemo02_FormData"
import { atom } from "jotai"

interface Demo02_FormState {
  mode: EditMode,
  dataList: IDemo02_Profile[],
  qryArgs: string,  // keyword query
  dataAim?: string, // the id of the dataList
  formData?: IDemo02_FormData,
}

//-----------------------------------------------------------------------------

const initialState: Demo02_FormState = {
  mode: 'List',
  dataList: [],
  qryArgs: '',
  dataAim: undefined,
  formData: undefined,
}

export const demo02Atom = atom(initialState)
demo02Atom.debugLabel = 'demo02Atom '

//export const demo02Atom = atom<Demo02_FormState>({
//  key: 'demo02',
//  default: initialState
//})
