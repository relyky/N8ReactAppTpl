import { atom, selector, useResetRecoilState, useSetRecoilState } from "recoil";
import { AuthStatus, AccountState } from '@/store/accountSlice'
import { ResponseError, postData } from "../tools/httpHelper";
import { ILoginUserInfo } from "../DTO/Account/ILoginUserInfo";
import { ILoginArgs } from "../DTO/Account/ILoginArgs";
import Swal from "sweetalert2";

const initialState: AccountState = {
  loginUserId: '',
  loginUserName: '來賓',
  status: AuthStatus.Guest,
  expiredTime: undefined,
}

export const accountAtom = atom({
  key: 'account',
  default: initialState
})

export const selectAuthed = selector({
  key: 'selectAuthed',
  get: ({ get }) => {
    const state = get(accountAtom)
    return state.status === AuthStatus.Authed // // && state.expiredTime < NOW,
  },
});

export const selectAuthing = selector({
  key: 'selectAuthing',
  get: ({ get }) => {
    const state = get(accountAtom)
    return state.status === AuthStatus.Authing // // && state.expiredTime < NOW,
  },
});

//-----------------------------------------------------------------------------

async function doLoginAsync(args: ILoginArgs): Promise<ILoginUserInfo> {
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
}

export function useAccountHook() {
  const setAccount = useSetRecoilState(accountAtom)
  const resetAccount = useResetRecoilState(accountAtom);

  async function loginAsync(args: ILoginArgs): Promise<void> {
    try {
      setAccount(prev => ({ ...prev, status: AuthStatus.Authing }))
      const { loginUserId, loginUserName, expiredTime } = await doLoginAsync(args);
      setAccount({
        loginUserId: loginUserId,
        loginUserName: loginUserName,
        status: AuthStatus.Authed,
        expiredTime: expiredTime,
      })
    }
    catch (err: unknown) {
      resetAccount()
    }
  }

  async function logoutAsync() {
    try {
      setAccount(prev => ({ ...prev, status: AuthStatus.Authing }))
      await postData('api/Account/Logout');
      resetAccount()
    } catch (err: unknown) {
      resetAccount()
    }
  }

  async function refillLoginUserAsync() {
    try {
      setAccount(prev => ({ ...prev, status: AuthStatus.Authing }))
      const { loginUserId, loginUserName, expiredTime } = await postData<ILoginUserInfo>('api/Account/GetLoginUser')
      setAccount({
        loginUserId: loginUserId,
        loginUserName: loginUserName,
        status: AuthStatus.Authed,
        expiredTime: expiredTime,
      })
    } catch (err: unknown) {
      resetAccount()
    }
  }

  return [loginAsync, logoutAsync, refillLoginUserAsync]
}
