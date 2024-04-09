import { useCallback, useMemo } from 'react'
import { usePostData } from '../../hooks/useHttp';
import { IDemo02_Profile } from '../../DTO/Demo02/IDemo02_Profile';
import { IDemo02_FormData } from '../../DTO/Demo02/IDemo02_FormData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { demo02Atom, selectDataAim, selectDataList, selectMode, selectFormData, selectQryArgs } from './useFormAtom';

export default function Demo02_Handler() {
  const postData = usePostData()
  const { dataList } = useRecoilValue(demo02Atom)
  const setQryArgs = useSetRecoilState(selectQryArgs)
  const setDataList = useSetRecoilState(selectDataList)
  const setMode = useSetRecoilState(selectMode)
  const setDataAim = useSetRecoilState(selectDataAim)
  const setFormData = useSetRecoilState(selectFormData)

  // 直接用 call Promise
  const qryDataList = useCallback((keyword?: string) => {
    postData<IDemo02_Profile[]>(`api/Demo02/QryDataList?keyword=${keyword}`)
      .then(dataList => {
        setQryArgs(keyword ?? '')
        setDataList(dataList)
      })
  }, [postData, setDataList, setQryArgs])

  const addFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/AddFormData', formData)
      .then(profile => {
        setDataList([profile, ...dataList])
        setMode('List')
      })
  }, [dataList, postData, setDataList, setMode])

  const pickItemToEdit = useCallback((item: IDemo02_Profile) => {
    setDataAim(item.formNo)
    setMode('Edit')
  }, [setDataAim, setMode])

  const getFormData = useCallback((formNo?: string) => {
    if (typeof formNo !== 'string') return; // validation
    postData<IDemo02_FormData>(`api/Demo02/GetFormData?formNo=${formNo}`)
      .then(formData => {
        setFormData(formData)
      })
  }, [postData, setFormData])

  const updFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/UpdFormData', formData)
      .then(profile => {
        const idx = dataList.findIndex(c => c.formNo === profile.formNo)
        const before = dataList.slice(0, idx)
        const after = dataList.slice(idx + 1)
        setDataList([...before, profile, ...after]) // splice at idx
        setMode('List')
      })
  }, [dataList, postData, setDataList, setMode])

  const delFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>(`api/Demo02/DelFormData?formNo=${formData.formNo}`)
      .then(() => {
        const idx = dataList.findIndex(c => c.formNo === formData.formNo)
        const before = dataList.slice(0, idx)
        const after = dataList.slice(idx + 1)
        setDataList([...before, ...after]) // remove at idx
        setMode('List')
      })
  }, [dataList, postData, setDataList, setMode])

  // 回傳 handlers
  return useMemo(() =>
    ({ setMode, qryDataList, addFormData, pickItemToEdit, getFormData, updFormData, delFormData }),
    [setMode, qryDataList, addFormData, pickItemToEdit, getFormData, updFormData, delFormData]);
}
