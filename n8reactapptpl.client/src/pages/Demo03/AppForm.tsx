import { Button, Container, Typography } from "@mui/material"
import useFormHand from "./useFormHand"
//import { downloadFile } from "../../tools/httpHelper"

export default function Demo03_AppForm() {
  const handler = useFormHand()

  return (
    <Container>
      <Typography variant='h3'>DEMO03</Typography>

      <Button variant='contained' onClick={()=>handler.downloadFile('測試檔名.xls')}>直接下載檔案</Button>

    </Container>
  )

  //function handleDownload2() {
  //  downloadFile('api/Demo05/DownloadFile')
  //}
}
