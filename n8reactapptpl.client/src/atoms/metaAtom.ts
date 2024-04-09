import { atom, selector } from "recoil"
import type { AlertColor } from "@mui/material"

export interface MetaSliceState {
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

const initialState: MetaSliceState = {
  blocking: false,
  topAlertSeverity: undefined,
  topAlertText: undefined,
  darkTheme: false,
}

export const metaAtom = atom({
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
    const { severity, text } = newValue as ITopAlert
    set(metaAtom, prev => ({
      ...prev,
      severity: severity,
      text: text
    }))
  },
});

export const selectDarkTheme = selector<boolean>({
  key: 'selectDarkTheme',
  get: ({ get }) => (get(metaAtom).darkTheme),
  set: ({ set }) => {
    /* toggleTheme */
    set(metaAtom, prev => ({ ...prev, darkTheme: !prev.darkTheme }))
  },
});
