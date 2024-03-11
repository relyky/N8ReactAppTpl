import { useCallback, useMemo } from 'react'
import { IWeatherForecast } from '../../DTO/Demo/IWeatherForecast'
import { usePostData } from '../../hooks/useHttp';
import { useAppDispatch } from '../../store/hooks';
import { setDataList, setQryArgs } from './useFormSlice';
import { IDemo05_QryArgs } from '../../DTO/Demo/IDemo05_QryArgs';

export default function Demo05_Handler() {
  const dispatch = useAppDispatch()
  const postData = usePostData()
  //const state = useAppSelector(selectFormState)

  /// ※一般來說 dispatch 放在最後一行。

  // 直接用 call Promise
  const qryDataList2 = useCallback((qryArgs: IDemo05_QryArgs) => {
    postData<IWeatherForecast[]>('api/demo05/getweatherforecast', qryArgs)
      .then(dataList => {
        dispatch(setQryArgs(qryArgs))
        dispatch(setDataList(dataList))
      })
  }, [dispatch, postData])

  const downloadFile = useCallback((qryArgs: IDemo05_QryArgs) => {
    throw new Erroe('未實作')
    downloadFile('api/Demo05/DownloadFile', qryArgs)
  }, [])

  //// 直接用 call Promise
  //const qryDataList = useCallback(() => {
  //  postData<IWeatherForecast[]>('api/demo05/getweatherforecast', state.qryArgs)
  //    .then(dataList => dispatch(setDataList(dataList)))
  //}, [dispatch, postData, state.qryArgs])

  //// 或用 async/await 語法
  //const populateWeatherData = useCallback(async () => {
  //  const data = await postData<IWeatherForecast[]>('api/weatherforecast', state.qryArgs)
  //  dispatch(setDataList(data))
  //}, [dispatch, postData])

  //const changeQryArgs = useCallback<React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>((e) => {
  //  dispatch(inputQryArgs({ name: e.target.name, value: e.target.value }))
  //}, [dispatch])

  //const resetQryArgs = useCallback(() => {
  //  dispatch(setQryArgs(initQryArgs))
  //}, [dispatch])

  // 回傳 handlers
  return useMemo(() =>
    ({ qryDataList2 }),
    [qryDataList2]);
}
