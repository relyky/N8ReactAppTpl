import { useCallback, useMemo } from 'react'
import { usePostData } from '../../hooks/useHttp';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectFormState, setDataAim, setDataList, setEditMode, setFormData, setQryArgs } from './useFormSlice';
import { IDemo02_QryArgs } from '../../DTO/Demo02/IDemo02_QryArgs';
import { IDemo02_Profile } from '../../DTO/Demo02/IDemo02_Profile';
import { IDemo02_FormData } from '../../DTO/Demo02/IDemo02_FormData';

export default function Demo02_Handler() {
  const dispatch = useAppDispatch()
  const postData = usePostData()
  const { dataList } = useAppSelector(selectFormState)

  /// ※一般來說 dispatch 放在最後一行。

  // 直接用 call Promise
  const qryDataList = useCallback((qryArgs: IDemo02_QryArgs) => {
    postData<IDemo02_Profile[]>('api/Demo02/QryDataList', qryArgs)
      .then(dataList => {
        dispatch(setQryArgs(qryArgs))
        dispatch(setDataList(dataList))
      })
  }, [dispatch, postData])

  const addFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/AddFormData', formData)
      .then(profile => {
        dispatch(setDataList([...dataList, profile]))
        dispatch(setEditMode('List'))
      })
  }, [dataList, dispatch, postData])

  const pickItemToEdit = useCallback((item: IDemo02_Profile) => {
    dispatch(setDataAim(item.formNo))
    dispatch(setEditMode('Edit'))
  }, [dispatch])

  const getFormData = useCallback((formNo: string) => {
    postData<IDemo02_FormData>(`api/Demo02/GetFormData?formNo=${formNo}`)
      .then(formData => {
        dispatch(setFormData(formData))
      })
  }, [dispatch, postData]) 

  // 回傳 handlers
  return useMemo(() =>
    ({ qryDataList, addFormData, pickItemToEdit, getFormData }),
    [qryDataList, addFormData, pickItemToEdit, getFormData]);
}
