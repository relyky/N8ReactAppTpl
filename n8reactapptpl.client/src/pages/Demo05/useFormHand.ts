import { useCallback, useMemo } from 'react'
import { IWeatherForecast } from '../../DTO/Demo/IWeatherForecast'
import { usePostData } from '../../hooks/useHttp';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initQryArgs, inputQryArgs, selectFormState, setDataList, setQryArgs } from './useFormSlice';

export default function Demo05_AppForm() {
  const dispatch = useAppDispatch()
  const postData = usePostData()
  const state = useAppSelector(selectFormState)

  /// ���@��ӻ� dispatch ��b�̫�@��C

  // ������ call Promise
  const qryDataList = useCallback(() => {
    postData<IWeatherForecast[]>('api/demo05/getweatherforecast', state.qryArgs)
      .then(dataList => dispatch(setDataList(dataList)))
  }, [dispatch, postData, state.qryArgs])

  //// �Υ� async/await �y�k
  //const populateWeatherData = useCallback(async () => {
  //  const data = await postData<IWeatherForecast[]>('api/weatherforecast', state.qryArgs)
  //  dispatch(setDataList(data))
  //}, [dispatch, postData])

  const changeQryArgs = useCallback<React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>((e) => {
    dispatch(inputQryArgs({ name: e.target.name, value: e.target.value }))
  }, [dispatch])

  const resetQryArgs = useCallback(() => {
    dispatch(setQryArgs(initQryArgs))
  }, [dispatch])

  // �^�� handlers
  return useMemo(() =>
    ({ qryDataList, changeQryArgs, resetQryArgs }),
    [qryDataList, changeQryArgs, resetQryArgs]);
}
