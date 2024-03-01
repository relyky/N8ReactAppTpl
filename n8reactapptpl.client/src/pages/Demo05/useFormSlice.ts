import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IWeatherForecast } from "../../DTO/Demo/IWeatherForecast"
import { IDemo05_QryArgs } from "../../DTO/Demo/IDemo05_QryArgs"

export interface Demo05_FormState {
  dataList: IWeatherForecast[]
  qryArgs: IDemo05_QryArgs
}

export const initQryArgs: IDemo05_QryArgs = {
  count: 5,
  city: '',
}

const initialState: Demo05_FormState = {
  dataList: [],
  qryArgs: initQryArgs
}

// create simple reducer with `createSlice`.
const formSlice = createSlice({
  name: "demo05",
  initialState,
  reducers: {
    inputQryArgs: (state, action: PayloadAction<{ name: string, value: unknown }>) => {
      const { name, value } = action.payload
      state.qryArgs = { ...state.qryArgs, [name]: value }
    },
    setQryArgs: (state, action: PayloadAction<IDemo05_QryArgs>) => {
      state.qryArgs = { ...action.payload }
    },
    setDataList: (state, action: PayloadAction<IWeatherForecast[]>) => {
      state.dataList = [...action.payload]
    },
  },
  selectors: {
    selectFormState: state => state,
  },
});

// export this slice
export default formSlice
// export this actions
export const { setDataList, setQryArgs, inputQryArgs } = formSlice.actions
// export this selectors
export const { selectFormState } = formSlice.selectors
