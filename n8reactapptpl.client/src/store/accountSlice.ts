import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./hooks";
import { ILoginArgs, ILoginResult } from "../server-dto";
import Swal from "sweetalert2"
import { ResponseError, postData } from "../hooks/useHttp";

export enum AuthStatus {
  Guest = "Guest",
  Authing = "Authing",
  Authed = "Authed"
}

export interface AccountState {
  loginUserId: string
  loginUserName: string
  status: AuthStatus
  authToken?: string
  expiredTime?: Date
}

//-----------------------------------------------------------------------------

const initialState: AccountState = {
  loginUserId: '',
  loginUserName: '來賓',
  status: AuthStatus.Guest,
  authToken: undefined,
  expiredTime: undefined,
}

const counterSlice = createAppSlice({
  name: "account",
  initialState,
  reducers: create => ({
    resetAccount: create.reducer(() => ({ ...initialState })),
    setAccount: create.reducer((_, action: PayloadAction<AccountState>) => ({ ...action.payload })),
    loginAsync: create.asyncThunk(
      async (args: ILoginArgs) => {
        try {
          const data = await postData<ILoginResult>('api/Account/Login', args)
          return data
        }
        catch (err: unknown) {
          if (err instanceof ResponseError)
            Swal.fire("登入失敗！", `${err.status} ${err.statusText}`, 'error');
          throw err; //※一定要 throw 否則將判定為成功。
        }
      },
      {
        pending: (state) => {
          state.status = AuthStatus.Authing
        },
        fulfilled: (state, action) => {
          const { loginUserId, loginUserName, expiredTime, authToken } = action.payload
          state.loginUserId = loginUserId
          state.loginUserName = loginUserName
          state.expiredTime = expiredTime
          state.authToken = authToken
          state.status = AuthStatus.Authed
        },
        rejected: () => initialState,
      },
    ),
  }),
  selectors: {
    selectAuthed: state => state.status === AuthStatus.Authed && typeof state.authToken === 'string', // && state.expiredTime < new,
    selectAuthing: state => state.status === AuthStatus.Authing,
  },
});

// export this slice
export default counterSlice
// export this actions
export const { loginAsync } = counterSlice.actions
// export this selectors
export const { selectAuthed, selectAuthing } = counterSlice.selectors