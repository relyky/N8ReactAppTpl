import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./hooks"
import Swal from "sweetalert2"
import { ResponseError, postData } from "../tools/httpHelper"
import { ILoginArgs } from "../DTO/Account/ILoginArgs"
import { ILoginUserInfo } from "../DTO/Account/ILoginUserInfo"
//import type { RootState } from "./store"

export enum AuthStatus {
  Guest = "Guest",
  Authing = "Authing",
  Authed = "Authed"
}

export interface AccountState {
  loginUserId: string
  loginUserName: string
  status: AuthStatus
  expiredTime?: Date
}

//-----------------------------------------------------------------------------

const initialState: AccountState = {
  loginUserId: '',
  loginUserName: '來賓',
  status: AuthStatus.Guest,
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
          const msg = await postData<MsgObj>('api/Account/Login', args)
          if (msg.message !== 'Login success.')
            throw new ResponseError(msg.message, 401, 'Unauthorized');

          const loginUser = await postData<ILoginUserInfo>('api/Account/GetLoginUser')
          return loginUser
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
          const { loginUserId, loginUserName, expiredTime } = action.payload
          state.loginUserId = loginUserId
          state.loginUserName = loginUserName
          state.expiredTime = expiredTime
          state.status = AuthStatus.Authed
        },
        rejected: () => initialState,
      },
    ),
    logoutAsync: create.asyncThunk(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_: undefined) => {
        try {
          await postData('api/Account/Logout');
        }
        catch (err: unknown) {
          console.error('logoutAsync.catch', { err })
          if (err instanceof ResponseError)
            Swal.fire("登出失敗！", `${err.status} ${err.statusText} ${err.message}`, 'error');
          throw err; //※一定要 throw 否則將判定為成功。
        }
      },
      {
        pending: (state) => {
          state.status = AuthStatus.Authing
        },
        fulfilled: () => initialState,
        rejected: () => initialState,
      },
    ),
    refillLoginUserAsync: create.asyncThunk(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (_: undefined) => {
        const loginUser = await postData<ILoginUserInfo>('api/Account/GetLoginUser')
        return loginUser
      },
      {
        pending: (state) => {
          state.status = AuthStatus.Authing
        },
        fulfilled: (state, action) => {
          const { loginUserId, loginUserName, expiredTime } = action.payload
          state.loginUserId = loginUserId
          state.loginUserName = loginUserName
          state.expiredTime = expiredTime
          state.status = AuthStatus.Authed
        },
        rejected: () => initialState,
      },
    ),
    requestAccessTokenAsync: create.asyncThunk(
      async () => {
        //throw new Error('未實作！');
      },
      {
        pending: (state) => state,
        fulfilled: (state) => state,
        rejected: (state) => state,
      },
    ),
    refreshAccessTokenAsync: create.asyncThunk(
      async () => {
        //throw new Error('未實作！');
      },
      {
        pending: (state) => state,
        fulfilled: (state) => state,
        rejected: (state) => state,
      },
    ),
  }),
  selectors: {
    selectAuthed: state => state.status === AuthStatus.Authed, // && state.expiredTime < NOW,
    selectAuthing: state => state.status === AuthStatus.Authing,
    selectAccount: state => state,
  },
});

// export this slice
export default counterSlice
// export this actions
export const { loginAsync, logoutAsync, refillLoginUserAsync } = counterSlice.actions
// export this selectors
export const { selectAuthed, selectAuthing, selectAccount } = counterSlice.selectors