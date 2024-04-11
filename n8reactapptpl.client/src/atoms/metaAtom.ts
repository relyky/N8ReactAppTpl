import { useMemo } from "react"
import { DefaultValue, atom, selector, useRecoilCallback } from "recoil"
import type { AlertColor } from "@mui/material"

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

export const metaAtom = atom<MetaState>({
  key: 'meta',
  default: initialState
})

//-----------------------------------------------------------------------------

export const selectBlocking = selector<boolean>({
  key: 'selectBlocking',
  get: ({ get }) => (get(metaAtom).blocking),
  set: ({ set }, newValue) => {
    set(metaAtom, prev => ({ ...prev, blocking: newValue as boolean }))
  },
});

export const selectTopAlert = selector<ITopAlert | undefined>({
  key: 'selectTopAlert',
  get: ({ get }) => {
    const { topAlertSeverity: severity, topAlertText: text } = get(metaAtom)
    if (severity && text) return { severity, text }
    return undefined
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(metaAtom, prev => ({
        ...prev,
        topAlertSeverity: newValue?.severity,
        topAlertText: newValue?.text
      }))
  },
});

export const selectDarkTheme = selector<boolean>({
  key: 'selectDarkTheme',
  get: ({ get }) => (get(metaAtom).darkTheme),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(metaAtom, prev => ({ ...prev, darkTheme: newValue }))
  },
});

//-----------------------------------------------------------------------------

export function useMetaAction() {

  /// 將得到同步函式
  /// toggleTheme(): void
  const toggleTheme = useRecoilCallback(({ set }) => () => {
    set(selectDarkTheme, prev => !prev);
  }, []);

  /// 將得到非同步函式
  /// customActionAsync(args: string): Promise<string>
  const customActionAsync = useRecoilCallback(({ snapshot, set }) => async (args: string) => {
    const metaValue = await snapshot.getPromise(metaAtom) // 效果同 get(metaAtom) 取 atom 值。
    console.debug('customAction →', { metaValue })
    set(selectDarkTheme, prev => !prev); // 更新到目標 atom。
    return `來自 customAction 的輸入 ${args}`
  }, []);

  return useMemo(() =>
    ({ toggleTheme, customActionAsync }),
    [toggleTheme, customActionAsync])
}
