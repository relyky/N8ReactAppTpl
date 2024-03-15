import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IDemo02_Profile } from "../../DTO/Demo02/IDemo02_Profile"
import { IDemo02_FormData } from "../../DTO/Demo02/IDemo02_FormData"

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

// create simple reducer with `createSlice`.
const formSlice = createSlice({
  name: "demo02",
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<EditMode>) => {
      state.mode = action.payload
    },
    setDataList: (state, action: PayloadAction<IDemo02_Profile[]>) => {
      state.dataList = action.payload
    },
    setQryArgs: (state, action: PayloadAction<string>) => {
      state.qryArgs = action.payload
    },
    setDataAim: (state, action: PayloadAction<string>) => {
      state.dataAim = action.payload
    },
    setFormData: (state, action: PayloadAction<IDemo02_FormData>) => {
      state.formData = action.payload
    },
  },
  selectors: {
    selectFormState: state => state,
  },
});

// export this slice
export default formSlice
// export this actions
export const { setDataList, setQryArgs, setEditMode, setDataAim, setFormData } = formSlice.actions
// export this selectors
export const { selectFormState } = formSlice.selectors
