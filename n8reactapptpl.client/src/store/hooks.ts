import { useDispatch, useSelector } from "react-redux"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// `buildCreateSlice` allows us to create a slice with async thunks.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
