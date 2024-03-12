import { useCallback, useMemo } from 'react'
import { useDownloadFile } from '../../hooks/useHttp'

export default function Demo03_Handler() {
  const download = useDownloadFile()

  /// ���@��ӻ� dispatch ��b�̫�@��C

  const downloadFile = useCallback((filename: string) => {
    download(`api/Demo05/DownloadFile?fileName=${filename}`)
  }, [download])

  // �^�� handlers
  return useMemo(() =>
    ({ downloadFile }),
    [downloadFile]);
}
