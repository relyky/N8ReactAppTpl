import { IDemo02_Profile } from "../../DTO/Demo02/IDemo02_Profile"
import { IDemo02_FormData } from "../../DTO/Demo02/IDemo02_FormData"
import { atom } from "recoil"

export interface Demo02_FormState {
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

const ATOM_KEY = 'demo02'
export const demo02Atom = atom<Demo02_FormState>({
  key: ATOM_KEY,
  default: initialState
})
