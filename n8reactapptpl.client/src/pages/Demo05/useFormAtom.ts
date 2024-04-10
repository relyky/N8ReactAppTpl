import { DefaultValue, atom, selector } from "recoil"
import { IWeatherForecast } from "../../DTO/Demo/IWeatherForecast"
import { IDemo05_QryArgs } from "../../DTO/Demo/IDemo05_QryArgs"

export interface Demo05_FormState {
  dataList: IWeatherForecast[]
  qryArgs: IDemo05_QryArgs
}

export const initQryArgs: IDemo05_QryArgs = {
  count: 5,
  city: '',
}

const initialState: Demo05_FormState = {
  dataList: [],
  qryArgs: initQryArgs
}

const ATOM_KEY = 'demo05'
export const demo05Atom = atom({
  key: ATOM_KEY,
  default: initialState
})

//-----------------------------------------------------------------------------
/**
 * 一般並不需要拆開單一 auto 取各個屬性值。而是自多個 atoms 組合出複合狀態值才對。
 */

export const selectQryArgs = selector<IDemo05_QryArgs>({
  key: `${ATOM_KEY}/qryArgs`,
  get: ({ get }) => (get(demo05Atom).qryArgs),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo05Atom, prev => ({ ...prev, qryArgs: newValue }))
  }
});

export const selectDataList = selector<IWeatherForecast[]>({
  key: `${ATOM_KEY}/dataList`,
  get: ({ get }) => (get(demo05Atom).dataList),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue))
      set(demo05Atom, prev => ({ ...prev, dataList: newValue }))
  }
});
