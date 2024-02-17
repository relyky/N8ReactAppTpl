import type { AlertColor } from "@mui/material"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface MetaSliceState {
  blocking: boolean
  topAlertSeverity: AlertColor | null
  topAlertText: string | null
  [key: string]: unknown
}

const initialState: MetaSliceState = {
  blocking: false,
  topAlertSeverity: null,
  topAlertText: null
}

// create simple reducer with `createSlice`.
const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setBlocking: (state, action: PayloadAction<boolean>) => {
      state.blocking = action.payload
    },
    setTopAlert: (state, action: PayloadAction<{ severity: AlertColor, text: string } | null>) => {
      if (action.payload) {
        const { severity, text } = action.payload
        state.topAlertSeverity = severity
        state.topAlertText = text
      }
      else {
        state.topAlertSeverity = null
        state.topAlertText = null
      }
    },
    assignMeta: (state, action: PayloadAction<object>) => {
      return { ...state, ...action.payload }
    },
  },
  selectors: {
    selectBlocking: meta => meta.blocking,
    selectTopAlert: meta => {
      if (meta.topAlertSeverity && meta.topAlertText)
        return {
          severity: meta.topAlertSeverity,
          text: meta.topAlertText
        }
    },
  },
});

// export this slice
export default metaSlice
// export this actions
export const { setBlocking, setTopAlert, assignMeta } = metaSlice.actions
// export this selectors
export const { selectTopAlert, selectBlocking } = metaSlice.selectors
