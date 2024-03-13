import { useCallback, useMemo } from 'react'
import { useUploadFile } from '../../hooks/useHttp';
import { useAppDispatch } from '../../store/hooks';
import { setDataList, setFileInfo } from './useFormSlice';
import { IDemoBiz_UploadDetail } from '../../DTO/Demo/IDemoBiz_UploadDetail';

export default function Demo05_Handler() {
  const dispatch = useAppDispatch()
  const upload = useUploadFile()

  /// ���@��ӻ� dispatch ��b�̫�@��C

  // ������ call Promise
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList && fileList.length > 0) {
      const uploadFile = fileList[0]; // �W�Ǥ@���ɮ�

      const { name, size, type } = uploadFile
      dispatch(setFileInfo({ name, size, type }))

      const formData = new FormData();
      formData.append('files', uploadFile, uploadFile.name);

      upload<IDemoBiz_UploadDetail[]>('api/Demo05/UploadFile', formData)
        .then(dataList => {
          dispatch(setDataList(dataList))
        })
    }
  }, [dispatch, upload])

  // �^�� handlers
  return useMemo(() =>
    ({ handleFileChange }),
    [handleFileChange]);
}
