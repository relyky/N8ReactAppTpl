import { useCallback, useMemo } from 'react'
import { IWeatherForecast } from '../../DTO/Demo/IWeatherForecast'
import { usePostData } from '../../hooks/useHttp';
import { IDemo05_QryArgs } from '../../DTO/Demo/IDemo05_QryArgs';
import { useSetAtom } from 'jotai';
import { demo05Atom } from './atoms';
//import { useSetRecoilState } from 'recoil';
//import { selectDataList, selectQryArgs } from './atoms';

export default function Demo05_Handler() {
  const setter = useSetAtom(demo05Atom)
  //const setQryArgs = useSetRecoilState(selectQryArgs)
  //const setDataList = useSetRecoilState(selectDataList)
  const postData = usePostData()

  // 直接用 call Promise
  const qryDataList2 = useCallback((qryArgs: IDemo05_QryArgs) => {
    postData<IWeatherForecast[]>('api/demo05/getweatherforecast', qryArgs)
      .then(dataList => {
        setter({qryArgs, dataList})
        //setQryArgs(qryArgs)
        //setDataList(dataList)
      })
  }, [postData, setter])

  // 回傳 handlers
  return useMemo(() =>
    ({ qryDataList2 }),
    [qryDataList2]);
}
