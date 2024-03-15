import { useRef } from "react";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography, styled, tableCellClasses } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectFormState, setEditMode } from "./useFormSlice";
import useFormHand from "./useFormHand";

export default function ListView() {
  const refKeyword = useRef<HTMLInputElement>()
  const dispatch = useAppDispatch()
  const { qryArgs, dataList } = useAppSelector(selectFormState)
  const { mode } = useAppSelector(selectFormState)
  const handler = useFormHand()

  if (mode !== 'List') return; // d-none
  return (
    <Container>
      <Typography variant='h3'>CRUD-ListView</Typography>

      <Toolbar sx={{ gap: 1, width: { xs: '100%', sm:'80%', md:'60%' } }}>
        <TextField placeholder='關鍵字查詢' defaultValue={qryArgs} inputRef={refKeyword} size='small' sx={{ width: '100%' }} />
        <Button variant='contained' onClick={() => handler.qryDataList(refKeyword.current?.value)}>查詢</Button>
        <Button variant='outlined' onClick={() => dispatch(setEditMode('Add'))}>新增</Button>
      </Toolbar>

      {dataList && <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell></TableHeadCell>
              <TableHeadCell>單號</TableHeadCell>
              <TableHeadCell>抬頭</TableHeadCell>
              <TableHeadCell>異動時間</TableHeadCell>
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

//-----------------------------------------------------------------------------

const TableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));