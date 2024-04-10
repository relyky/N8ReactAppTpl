import { useCallback, useMemo } from 'react'
import { useUploadFile } from '../../hooks/useHttp';
import { IDemoBiz_UploadDetail } from '../../DTO/Demo/IDemoBiz_UploadDetail';
import { useSetRecoilState } from 'recoil';
import { selectDataList, selectFileInfo } from './atoms';

export default function Demo05_Handler() {
  const setFileInfo = useSetRecoilState(selectFileInfo)
  const setDataList = useSetRecoilState(selectDataList)
  const upload = useUploadFile()

  // 直接用 call Promise
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList && fileList.length > 0) {
      const uploadFile = fileList[0]; // 上傳一個檔案

      const { name, size, type } = uploadFile
      setFileInfo({ name, size, type })

      const formData = new FormData();
      formData.append('files', uploadFile, uploadFile.name);

      upload<IDemoBiz_UploadDetail[]>('api/Demo05/UploadFile', formData)
        .then(dataList => {
          setDataList(dataList)
        })
    }
  }, [setDataList, setFileInfo, upload])

  // 回傳 handlers
  return useMemo(() =>
    ({ handleFileChange }),
    [handleFileChange]);
}
