import { useCallback, useMemo } from "react"
import type { AlertColor } from "@mui/material"
import { atom } from "jotai"
import { useAtomCallback } from 'jotai/utils'

interface MetaState {
  blocking: boolean
  topAlertSeverity?: AlertColor
  topAlertText?: string
  darkTheme: boolean
  [key: string]: unknown
}

interface ITopAlert {
  severity: AlertColor,
  text: string
}

//-----------------------------------------------------------------------------

const initialState: MetaState = {
  blocking: false,
  topAlertSeverity: undefined,
  topAlertText: undefined,
  darkTheme: false,
}

export const metaAtom = atom<MetaState>(initialState)
metaAtom.debugLabel = 'metaAtom'

//-----------------------------------------------------------------------------

// derivedAtom / selector
export const selectBlocking = atom(
  (get) => get(metaAtom).blocking,
  (_get, set, blocking: boolean) => {
    set(metaAtom, (prev) => ({ ...prev, blocking })) // 看有否支授 assignProps
  },
)
selectBlocking.debugLabel = 'selectBlocking'

//export const selectBlocking = selector<boolean>({
//  key: 'selectBlocking',
//  get: ({ get }) => (get(metaAtom).blocking),
//  set: ({ set }, newValue) => {
//    set(metaAtom, prev => ({ ...prev, blocking: newValue as boolean }))
//  },
//});

// derivedAtom / selector
export const selectTopAlert = atom(
  (get) => {
    const { topAlertSeverity: severity, topAlertText: text } = get(metaAtom)
    if (severity && text) return { severity, text }
    return undefined
  },
  (_get, set, newValue: ITopAlert | undefined) => {
    set(metaAtom, prev => ({
      ...prev,
      topAlertSeverity: newValue?.severity,
      topAlertText: newValue?.text
    }))
  },
)
selectTopAlert.debugLabel = 'selectTopAlert'

//export const selectTopAlertX = selector<ITopAlert | undefined>({
//  key: 'selectTopAlert',
//  get: ({ get }) => {
//    const { topAlertSeverity: severity, topAlertText: text } = get(metaAtom)
//    if (severity && text) return { severity, text }
//    return undefined
//  },
//  set: ({ set }, newValue) => {
//    if (!(newValue instanceof DefaultValue))
//      set(metaAtom, prev => ({
//        ...prev,
//        topAlertSeverity: newValue?.severity,
//        topAlertText: newValue?.text
//      }))
//  },
//});

// derivedAtom / selector
export const selectDarkTheme = atom(
  (get) => get(metaAtom).darkTheme,
  (_get, set, darkTheme: boolean) => {
    set(metaAtom, (prev) => ({ ...prev, darkTheme })) // 看有否支授 assignProps
  },
)
selectDarkTheme.debugLabel = 'selectDarkTheme'

//export const selectDarkThemeX = selector<boolean>({
//  key: 'selectDarkTheme',
//  get: ({ get }) => (get(metaAtom).darkTheme),
//  set: ({ set }, newValue) => {
//    if (!(newValue instanceof DefaultValue))
//      set(metaAtom, prev => ({ ...prev, darkTheme: newValue }))
//  },
//});

//-----------------------------------------------------------------------------

///useAtomCallback<Result, Args extends unknown[]>(
///  callback: (get: Getter, set: Setter, ...arg: Args) => Result,
///  options ?: Options
///): (...args: Args) => Result
export function useMetaAction() {

  /// 將得到同步函式
  /// toggleTheme(): void
  const toggleTheme = useAtomCallback(
    useCallback((get, set) => {
      set(selectDarkTheme, !get(selectDarkTheme))
    }, []),
  )

  //const toggleTheme = useRecoilCallback(({ set }) => () => {
  //  set(selectDarkTheme, prev => !prev);
  //}, []);


  /// 將得到非同步函式
  /// customActionAsync(arg1: string): Promise<string>
  const customActionAsync = useAtomCallback<Promise<string>, [arg1: string]>(
    useCallback(async (get, set, arg1) => {
      const metaValue = get(metaAtom) // 效果同 get(metaAtom) 取 atom 值。
      console.debug('customAction →', { metaValue })
      set(selectDarkTheme, !get(selectDarkTheme))
      const result = await Promise.resolve(`來自 customAction 的輸入 ${arg1}`)
      return result;
    }, []),
  )

  /// 將得到非同步函式
  /// customActionAsync(args: string): Promise<string>
  //const customActionAsync = useRecoilCallback(({ snapshot, set }) => async (args: string) => {
  //  const metaValue = await snapshot.getPromise(metaAtom) // 效果同 get(metaAtom) 取 atom 值。
  //  console.debug('customAction →', { metaValue })
  //  set(selectDarkTheme, prev => !prev); // 更新到目標 atom。
  //  return `來自 customAction 的輸入 ${args}`
  //}, []);

  return useMemo(() =>
    ({ toggleTheme, customActionAsync }),
    [toggleTheme, customActionAsync])
}
