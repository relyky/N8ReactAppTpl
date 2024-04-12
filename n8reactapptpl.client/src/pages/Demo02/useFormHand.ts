import { useCallback, useMemo } from 'react'
import { usePostData } from '../../hooks/useHttp';
import { IDemo02_Profile } from '../../DTO/Demo02/IDemo02_Profile';
import { IDemo02_FormData } from '../../DTO/Demo02/IDemo02_FormData';
import { useAtomValue } from 'jotai';
import { demo02Atom } from './atoms';
import { useAtomUpdater } from '../../atoms/extention';

export default function Demo02_Handler() {
  const postData = usePostData()
  const { dataList } = useAtomValue(demo02Atom)
  const { assignProps, assignValue } = useAtomUpdater(demo02Atom)

  // 直接用 call Promise
  const qryDataList = useCallback((keyword?: string) => {
    postData<IDemo02_Profile[]>(`api/Demo02/QryDataList?keyword=${keyword}`)
      .then(dataList => {
        assignProps({
          qryArgs: keyword ?? '',
          dataList,
        })
      })
  }, [assignProps, postData])

  const addFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/AddFormData', formData)
      .then(profile => {
        assignProps({
          dataList: [profile, ...dataList],
          mode: 'List',
        })
      })
  }, [assignProps, dataList, postData])

  const pickItemToEdit = useCallback((item: IDemo02_Profile) => {
    assignProps({
      dataAim: item.formNo,
      mode: 'Edit',
    })
  }, [assignProps])

  const getFormData = useCallback((formNo?: string) => {
    if (typeof formNo !== 'string') return; // validation
    postData<IDemo02_FormData>(`api/Demo02/GetFormData?formNo=${formNo}`)
      .then(formData => {
        assignProps({ formData })
      })
  }, [assignProps, postData])

  const updFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/UpdFormData', formData)
      .then(profile => {
        const idx = dataList.findIndex(c => c.formNo === profile.formNo)
        const before = dataList.slice(0, idx)
        const after = dataList.slice(idx + 1)

        assignProps({
          dataList: [...before, profile, ...after], // splice at idx
          mode: 'List',
        })
      })
  }, [assignProps, dataList, postData])

  const delFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>(`api/Demo02/DelFormData?formNo=${formData.formNo}`)
      .then(() => {
        const idx = dataList.findIndex(c => c.formNo === formData.formNo)
        const before = dataList.slice(0, idx)
        const after = dataList.slice(idx + 1)

        assignProps({
          dataList: [...before, ...after], // remove at idx
          mode: 'List',
        })
      })
  }, [assignProps, dataList, postData])

  const setMode = useCallback((mode: EditMode) => {
    assignValue('mode', mode)
  }, [assignValue])

  // 回傳 handlers
  return useMemo(() =>
    ({ setMode, qryDataList, addFormData, pickItemToEdit, getFormData, updFormData, delFormData }),
    [setMode, qryDataList, addFormData, pickItemToEdit, getFormData, updFormData, delFormData]);
}
