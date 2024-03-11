import { useCallback, useMemo } from 'react'
import { useDownloadFile } from '../../hooks/useHttp'

export default function Demo03_Handler() {
  const download = useDownloadFile()

  /// ※一般來說 dispatch 放在最後一行。

  const downloadFile = useCallback((filename: string) => {
    download(`api/Demo05/DownloadFile?fileName=${filename}`)
  }, [download])

  // 回傳 handlers
  return useMemo(() =>
    ({ downloadFile }),
    [downloadFile]);
}
