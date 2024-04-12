import { useCallback, useMemo } from 'react'
import { useUploadFile } from '../../hooks/useHttp';
import { IDemoBiz_UploadDetail } from '../../DTO/Demo/IDemoBiz_UploadDetail';
import { demo04Atom } from './atoms';
import { useAtomUpdater } from '../../atoms/extention';
//import { useSetRecoilState } from 'recoil';
//import { selectDataList, selectFileInfo } from './atoms';

export default function Demo04_Handler() {
  const { assignProps } = useAtomUpdater(demo04Atom)
  //const setFileInfo = useSetRecoilState(selectFileInfo)
  //const setDataList = useSetRecoilState(selectDataList)
  const upload = useUploadFile()

  // 直接用 call Promise
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList && fileList.length > 0) {
      const uploadFile = fileList[0]; // 上傳一個檔案

      const { name, size, type } = uploadFile
      const fileInfo = { name, size, type }
      assignProps({ fileInfo })
      //setFileInfo({ name, size, type })

      const formData = new FormData();
      formData.append('files', uploadFile, uploadFile.name);

      upload<IDemoBiz_UploadDetail[]>('api/Demo05/UploadFile', formData)
        .then(dataList => {
          assignProps({ dataList })
          //setDataList(dataList)
        })
    }
  }, [assignProps, upload])

  // 回傳 handlers
  return useMemo(() =>
    ({ handleFileChange }),
    [handleFileChange]);
}
