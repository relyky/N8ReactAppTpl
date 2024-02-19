import type { PayloadAction } from "@reduxjs/toolkit"
import { setBlocking, setTopAlert } from "../../store/metaSlice"
import { createAppSlice } from "../../store/hooks"
import { fetchCount } from "./counterAPI"
import Swal from "sweetalert2"

export interface CounterSliceState {
  value: number
  status: "idle" | "loading" | "failed"
}

const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
}

const counterSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: create => ({
    increment: create.reducer((state) => {
      state.value += 1
    }),
    decrement: create.reducer((state) => {
      state.value -= 1
    }),
    incrementByAmount: create.reducer((state, action: PayloadAction<number>) => {
      state.value += action.payload
    }),
    incrementIfOdd: create.reducer((state, action: PayloadAction<number>) => {
      const currentValue = Math.floor(state.value)
      if (currentValue % 2 === 1 || currentValue % 2 === -1) {
        state.value += action.payload
      }
    }),
    incrementAsync: create.asyncThunk(
      async (amount: number, thunkAPI) => {
        try {
          thunkAPI.dispatch(setBlocking(true))
          const response = await fetchCount(amount) // Promise

          // 可送訊息到 top-alert 區塊
          thunkAPI.dispatch(setTopAlert({ severity: 'success', text: `成功累加 amount: ${amount}。` }))
          // 或顯示訊息
          Swal.fire("incrementAsync", `成功累加 amount: ${amount}。`, 'success')

          // The value we return becomes the `fulfilled` action payload
          return response.data
        }
        catch(err) {
          if (typeof err === 'string') {
            // 可送訊息到 top-alert 區塊
            thunkAPI.dispatch(setTopAlert({ severity: 'error', text: err }))
            // 或顯示訊息
            Swal.fire("incrementAsync", err, 'error')
          }
          throw err //※一定要 throw 否則將判定為成功。
        }
        finally {
          thunkAPI.dispatch(setBlocking(false))
        }
      },
      {
        pending: (state) => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value += action.payload
        },
        rejected: (state) => {
          state.status = "failed"
        },
      },
    ),

  }),
  selectors: {
    selectCount: counter => counter.value,
    selectStatus: counter => counter.status,
  }, // 一般共用性不高，故一般來說沒有實作的價值。
});

// export this slice
export default counterSlice
// export this actions
export const { increment, decrement, incrementByAmount, incrementIfOdd, incrementAsync } = counterSlice.actions
// export this selectors
export const { selectCount, selectStatus } = counterSlice.selectors
