import { useState } from 'react'
import { Box, Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { selectFormState } from './useFormSlice'
import useFormHand from './useFormHand'

export default function Demo05_AppForm() {
  const { qryArgs, dataList } = useAppSelector(selectFormState)
  const handler = useFormHand()

  // form init
  useState(() => handler.qryDataList())

  return (
    <Container>
      <Typography variant='h3'>Demo05 天氣預報/查詢報表</Typography>
      <Box color='info.main' sx={{ pb: 2 }}>This component demonstrates fetching data from the server.</Box>

      {/* toolbar */}
      <Stack spacing={{ xs: 1 }} direction="row" sx={{p:1}}>
        <TextField label='City' name='city' value={qryArgs.city} onChange={handler.changeQryArgs} size='small' />
        <TextField label='Count' name='count' value={qryArgs.count} onChange={handler.changeQryArgs} size='small' type='number'
          placeholder='需 5 筆以上。' />

        <Button variant='contained' onClick={handler.qryDataList}>查詢</Button>
        <Button variant='outlined' onClick={handler.resetQryArgs}>重置</Button>
      </Stack>

      {dataList && <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Temp. (C)</TableCell>
              <TableCell align="right">Temp. (F)</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.date}</TableCell>
                <TableCell align="right">{item.temperatureC}</TableCell>
                <TableCell align="right">{item.temperatureF}</TableCell>
                <TableCell>{item.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Container>
  );
}
