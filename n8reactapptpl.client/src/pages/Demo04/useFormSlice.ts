import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IDemoBiz_UploadDetail } from "../../DTO/Demo/IDemoBiz_UploadDetail"

export interface FileInfo {
  name: string,
  size: number,
  type: string,
}

export interface Demo05_FormState {
  dataList: IDemoBiz_UploadDetail[]
  fileInfo?: FileInfo
}

const initialState: Demo05_FormState = {
  dataList: [],
  fileInfo: undefined,
}

// create simple reducer with `createSlice`.
const formSlice = createSlice({
  name: "demo04",
  initialState,
  reducers: {
    setFileInfo: (state, action: PayloadAction<FileInfo>) => {
      state.fileInfo = action.payload
    },
    setDataList: (state, action: PayloadAction<IDemoBiz_UploadDetail[]>) => {
      state.dataList = action.payload
    },
  },
  selectors: {
    selectFormState: state => state,
  },
});

// export this slice
export default formSlice
// export this actions
export const { setDataList, setFileInfo } = formSlice.actions
// export this selectors
export const { selectFormState } = formSlice.selectors
