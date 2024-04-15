import { useCallback, useMemo } from "react"
import type { AlertColor } from "@mui/material"
import { atom } from "jotai"
import { useAtomCallback } from 'jotai/utils'

interface ITopAlert {
  severity: AlertColor,
  text: string
}

//-----------------------------------------------------------------------------

export const darkThemeAtom = atom<boolean>(false)
darkThemeAtom.debugLabel = 'meta/darkThemeAtom'

export const blockingAtom = atom<boolean>(false)
blockingAtom.debugLabel = 'meta/blockingAtom'

export const topAlertAtom = atom<ITopAlert | undefined>(undefined)
topAlertAtom.debugLabel = 'meta/topAlertAtom'

//-----------------------------------------------------------------------------

// derived atom / selector
export const selectMeta = atom((get) => ({
  darkTheme: get(darkThemeAtom).valueOf(),
  blocking: get(blockingAtom).valueOf(),
  topAlert: { ...get(topAlertAtom) }
}))
selectMeta.debugLabel = 'selectMeta';

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
      set(darkThemeAtom, !get(darkThemeAtom))
    }, []),
  )

  /// 將得到非同步函式
  /// customActionAsync(arg1: string): Promise<string>
  const customActionAsync = useAtomCallback<Promise<string>, [arg1: string]>(
    useCallback(async (get, set, arg1) => {
      const metaValue = get(selectMeta)
      console.debug('customAction →', { metaValue })
      set(darkThemeAtom, !get(darkThemeAtom))
      const result = await Promise.resolve(`來自 customAction 的輸入 ${arg1}`)
      return result;
    }, []),
  )

  return useMemo(() =>
    ({ toggleTheme, customActionAsync }),
    [toggleTheme, customActionAsync])
}
