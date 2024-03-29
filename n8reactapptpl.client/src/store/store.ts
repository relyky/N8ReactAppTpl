import { combineSlices, configureStore } from "@reduxjs/toolkit"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import metaSlice from "./metaSlice"
import accountSlice from "./accountSlice"
import counterSlice from "../pages/Counter/counterSlice";
import demo02Slice from "../pages/Demo02/useFormSlice"
import demo04Slice from "../pages/Demo04/useFormSlice"
import demo05Slice from "../pages/Demo05/useFormSlice"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
//const rootReducer = combineSlices(accountSlice, metaSlice , counterSlice)
const rootReducer = combineSlices(
  accountSlice,
  metaSlice,
  demo02Slice,
  demo04Slice,
  demo05Slice,
  counterSlice);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer,
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
// �ΥH�}�o SyncThunk
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export default store;