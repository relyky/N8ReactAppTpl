import { useMemo } from "react"
import { DefaultValue, atom, selector, useRecoilCallback } from "recoil"
import type { AlertColor } from "@mui/material"

export interface MetaState {
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

  const toggleTheme = useRecoilCallback(({ set }) => () => {
    set(selectDarkTheme, prev => !prev);
  }, []);

  return useMemo(() =>
    ({ toggleTheme }),
    [toggleTheme])
}

//export function useMetaAction() {
//  const setDarkTheme = useSetRecoilState(selectDarkTheme)

//  // ¦^¶Ç handlers
//  return useMemo(() =>
//  ({
//    toggleTheme: () => {
//      setDarkTheme(prev => !prev);
//      console.log('toggleTheme');
//    },
//  }), [setDarkTheme]);
//}
