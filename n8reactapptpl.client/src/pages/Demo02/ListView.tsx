import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectFormState, setEditMode } from "./useFormSlice";
import useFormHand from "./useFormHand";

export default function ListView() {
  const dispatch = useAppDispatch()
  const { qryArgs, dataList } = useAppSelector(selectFormState)
  const { mode } = useAppSelector(selectFormState)
  const handler = useFormHand()

  if (mode !== 'List') return; // d-none
  return (
    <Container>
      <Typography variant='h3'>CRUD-ListView</Typography>

      <Button variant='contained' onClick={() => handler.qryDataList(qryArgs)}>查詢</Button>

      <Button variant='outlined' onClick={() => dispatch(setEditMode('Add'))}>新增</Button>

      {dataList && <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>單號</TableCell>
              <TableCell>抬頭</TableCell>
              <TableCell>異動時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Button onClick={() => handler.pickItemToEdit(item)} size='small'>編輯</Button>
                </TableCell>
                <TableCell>{item.formNo}</TableCell>
                <TableCell>{item.formTitle}</TableCell>
                <TableCell>{item.updDtm}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Container>
  )
}