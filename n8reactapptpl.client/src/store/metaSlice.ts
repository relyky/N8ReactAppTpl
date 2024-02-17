import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface MetaSliceState {
  blocking: boolean
  error: Error | null
  [key: string]: unknown
}

const initialState: MetaSliceState = {
  blocking: false,
  error: null,
}

// create simple reducer with `createSlice`.
const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setBlocking: (state, action: PayloadAction<boolean>) => {
      state.blocking = action.payload
    },
    setError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload
    },
    setErrorBlocking: (state, action: PayloadAction<{ error: Error | null, blocking: boolean }>) => {
      const { error, blocking } = action.payload
      state.error = error
      state.blocking = blocking
    },
    assignMeta: (state, action: PayloadAction<object>) => {
      return { ...state, ...action.payload }
    },
  }
});

// export this slice
export default metaSlice
// export this actions
export const { setBlocking, setError, setErrorBlocking, assignMeta } = metaSlice.actions
