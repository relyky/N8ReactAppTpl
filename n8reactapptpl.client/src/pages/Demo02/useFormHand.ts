import { useCallback, useMemo } from 'react'
import { usePostData } from '../../hooks/useHttp';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectFormState, setDataAim, setDataList, setEditMode, setFormData, setQryArgs } from './useFormSlice';
import { IDemo02_Profile } from '../../DTO/Demo02/IDemo02_Profile';
import { IDemo02_FormData } from '../../DTO/Demo02/IDemo02_FormData';

export default function Demo02_Handler() {
  const dispatch = useAppDispatch()
  const postData = usePostData()
  const { dataList } = useAppSelector(selectFormState)

  /// ※一般來說 dispatch 放在最後一行。

  // 直接用 call Promise
  const qryDataList = useCallback((keyword?: string) => {
    postData<IDemo02_Profile[]>(`api/Demo02/QryDataList?keyword=${keyword}`)
      .then(dataList => {
        dispatch(setQryArgs(keyword ?? ''))
        dispatch(setDataList(dataList))
      })
  }, [dispatch, postData])

  const addFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/AddFormData', formData)
      .then(profile => {
        dispatch(setDataList([profile, ...dataList]))
        dispatch(setEditMode('List'))
      })
  }, [dataList, dispatch, postData])

  const pickItemToEdit = useCallback((item: IDemo02_Profile) => {
    dispatch(setDataAim(item.formNo))
    dispatch(setEditMode('Edit'))
  }, [dispatch])

  const getFormData = useCallback((formNo?: string) => {
    if (typeof formNo !== 'string') return; // validation
    postData<IDemo02_FormData>(`api/Demo02/GetFormData?formNo=${formNo}`)
      .then(formData => {
        dispatch(setFormData(formData))
      })
  }, [dispatch, postData])

  const updFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/UpdFormData', formData)
      .then(profile => {
        const idx = dataList.findIndex(c => c.formNo === profile.formNo)
        const before = dataList.slice(0, idx)
        const after = dataList.slice(idx + 1)
        dispatch(setDataList([...before, profile, ...after])) // splice at idx
        dispatch(setEditMode('List'))
      })
  }, [dataList, dispatch, postData])

  const delFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>(`api/Demo02/DelFormData?formNo=${formData.formNo}`)
      .then(() => {
        const idx = dataList.findIndex(c => c.formNo === formData.formNo)
        const before = dataList.slice(0, idx)
        const after = dataList.slice(idx + 1)
        dispatch(setDataList([...before, ...after])) // remove at idx
        dispatch(setEditMode('List'))
      })
  }, [dataList, dispatch, postData])

  // 回傳 handlers
  return useMemo(() =>
    ({ qryDataList, addFormData, pickItemToEdit, getFormData, updFormData, delFormData }),
    [qryDataList, addFormData, pickItemToEdit, getFormData, updFormData, delFormData]);
}
