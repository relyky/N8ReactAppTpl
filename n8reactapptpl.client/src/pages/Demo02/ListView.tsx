import { useRef } from "react";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography, styled, tableCellClasses } from "@mui/material";
import useFormHand from "./useFormHand";
import { demo02Atom } from "./atoms";
import { useAtomValue } from "jotai";

export default function ListView() {
  const refKeyword = useRef<HTMLInputElement>()
  const { qryArgs: keyword, dataList, mode } = useAtomValue(demo02Atom)
  const handler = useFormHand()

  if (mode !== 'List') return; // d-none
  return (
    <Container>
      <Typography variant='h3'>CRUD-ListView</Typography>

      <Toolbar sx={{ gap: 1, width: { xs: '100%', sm: '80%', md: '60%' } }}>
        <TextField placeholder='關鍵字查詢' defaultValue={keyword} inputRef={refKeyword} size='small' sx={{ width: '100%' }} />
        <Button variant='contained' onClick={() => handler.qryDataList(refKeyword.current?.value)}>查詢</Button>
        <Button variant='outlined' onClick={() => handler.setMode('Add')}>新增</Button>
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
                <TableBodyCell>{item.formNo}</TableBodyCell>
                <TableBodyCell>{item.formTitle}</TableBodyCell>
                <TableBodyCell>{item.updDtm}</TableBodyCell>
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
}));

const TableBodyCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 34,
    color: theme.palette.text.secondary,
  },
}));
