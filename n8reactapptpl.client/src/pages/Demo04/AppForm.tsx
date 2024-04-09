import { Box, Container, Typography } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRecoilValue } from "recoil";
import InputFileUpload from "./InputFileUpload"
import useFormHand from "./useFormHand"
import { IDemoBiz_UploadDetail } from "../../DTO/Demo/IDemoBiz_UploadDetail"
import { demo04Atom } from "./useFormAtom";

const columns: GridColDef[] = [
  { field: 'unitName', headerName: '單位', width:200 },
  { field: 'amount1', headerName: '數值１' },
  { field: 'amount2', headerName: '數值２' },
  { field: 'amount3', headerName: '數值３' },
  { field: 'amount4', headerName: '數值４' },
  { field: 'amount5', headerName: '數值５' },
];

export default function Demo04_AppForm() {
  const { fileInfo, dataList } = useRecoilValue(demo04Atom)
  const handler = useFormHand()

  return (
    <Container>
      <Typography variant='h3'>上傳檔案</Typography>

      <InputFileUpload onChange={handler.handleFileChange} />

      <Box sx={{ my: 1 }}>{`上傳檔案:${fileInfo?.name} | ${fileInfo?.size} | ${fileInfo?.type}`}</Box>

      <DataGrid 
        getRowId={(c: IDemoBiz_UploadDetail) => c.unitName }
        rows={dataList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />

    </Container>
  )
}
