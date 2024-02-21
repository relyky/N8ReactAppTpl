import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./hooks";
import { ILoginArgs, ILoginResult } from "../server-dto";
import Swal from "sweetalert2"

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

function postData<TResult>(url: string, args?: object): Promise<TResult> {
  const headers = {
    'Content-Type': 'application/json'
  }

  return new Promise<TResult>((resolve, reject) => {
    fetch(url, {
      headers,
      body: JSON.stringify(args),
      cache: 'no-cache',
      credentials: 'omit',
      method: 'POST',
      referrer: 'no-referrer',
    }).then(resp => {
      if (resp.ok) {
        resolve(resp.json());
        return;
      }

      throw resp;
    }).catch((xhr: Response) => {
      xhr.text().then(errMsg => {
        reject(new ResponseError(errMsg, xhr.status, xhr.statusText))
        return;
      });
    });
  });
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
    //selectCount: counter => counter.value,
    //selectStatus: counter => counter.status,
  },
});

// export this slice
export default counterSlice
// export this actions
export const { loginAsync } = counterSlice.actions
//// export this selectors
//export const { selectCount, selectStatus } = counterSlice.selectors