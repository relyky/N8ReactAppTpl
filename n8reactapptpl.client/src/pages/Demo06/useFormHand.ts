import { useCallback, useMemo } from 'react'
import { usePostData } from '../../hooks/useHttp';
import { IDemo02_Profile } from '../../DTO/Demo02/IDemo02_Profile';
import { IDemo02_FormData } from '../../DTO/Demo02/IDemo02_FormData';
import { useFormState } from '../../atoms/formStateAtom';

export default function Demo02_Handler() {
  const postData = usePostData()
  const [{ dataList }, setFormState] = useFormState<Demo06_FormState>()

  // 直接用 call Promise
  const qryDataList = useCallback((keyword?: string) => {
    postData<IDemo02_Profile[]>(`api/Demo02/QryDataList?keyword=${keyword}`)
      .then(dataList => {
        setFormState(prev => ({
          ...prev,
          qryArgs: keyword ?? '',
          dataList: dataList,
        }))
      })
  }, [postData, setFormState])

  const addFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/AddFormData', formData)
      .then(profile => {
        setFormState(prev => ({
          ...prev,
          dataList: [profile, ...dataList],
          mode: 'List',
        }))
      })
  }, [dataList, postData, setFormState])

  const pickItemToEdit = useCallback((item: IDemo02_Profile) => {
    setFormState(prev => ({
      ...prev,
      dataAim: item.formNo,
      mode: 'Edit',
    }))
  }, [setFormState])

  const getFormData = useCallback((formNo?: string) => {
    if (typeof formNo !== 'string') return; // validation
    postData<IDemo02_FormData>(`api/Demo02/GetFormData?formNo=${formNo}`)
      .then(formData => {
        setFormState(prev => ({
          ...prev,
          formData: formData,
        }))
      })
  }, [postData, setFormState])

  const updFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>('api/Demo02/UpdFormData', formData)
      .then(profile => {
        const idx = dataList.findIndex(c => c.formNo === profile.formNo)
        const before = dataList.slice(0, idx)
        const after = dataList.slice(idx + 1)

        setFormState(prev => ({
          ...prev,
          dataList: [...before, profile, ...after],
          mode: 'List',
        }))
      })
  }, [dataList, postData, setFormState])

  const delFormData = useCallback((formData: IDemo02_FormData) => {
    postData<IDemo02_Profile>(`api/Demo02/DelFormData?formNo=${formData.formNo}`)
      .then(() => {
        const idx = dataList.findIndex(c => c.formNo === formData.formNo)
        const before = dataList.slice(0, idx)
        const after = dataList.slice(idx + 1)

        setFormState(prev => ({
          ...prev,
          dataList: [...before, ...after], // remove at idx
          mode: 'List',
        }))
      })
  }, [dataList, postData, setFormState])

  const setMode = useCallback((mode: EditMode) => {
    setFormState(prev => ({
      ...prev,
      mode: mode,
    }))
  }, [setFormState])

  // 回傳 handlers
  return useMemo(() =>
    ({ setMode, qryDataList, addFormData, pickItemToEdit, getFormData, updFormData, delFormData }),
    [setMode, qryDataList, addFormData, pickItemToEdit, getFormData, updFormData, delFormData]);
}
