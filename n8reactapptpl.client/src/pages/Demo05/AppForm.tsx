import { useEffect } from 'react'
import { Box, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import { selectFormState } from './useFormSlice'
import useFormHand from './useFormHand'
import { IDemo05_QryArgs } from '../../DTO/Demo/IDemo05_QryArgs'
import { ATextField, FormContainer, ResetCommand, SubmitCommand } from '../../highorder/formComponents/all'

export default function Demo05_AppForm() {
  const { qryArgs, dataList } = useAppSelector(selectFormState)
  const handler = useFormHand()

  // form init
  useEffect(() => {
    // dataList 為空值時才自動初始查詢。保留狀態。
    if (dataList.length <= 0)
      handler.qryDataList2(qryArgs)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Typography variant='h3'>Demo05 天氣預報/查詢報表</Typography>
      <Box color='info.main' sx={{ pb: 2 }}>This component demonstrates fetching data from the server.</Box>

      {/* 查詢面板 */}
      <FormContainer<IDemo05_QryArgs> defaultValues={qryArgs}>
        <Stack spacing={1} direction="row" alignItems='flex-start' sx={{ p: 1 }}>
          <ATextField name='city' label='City' size='small' />
          <ATextField name='count' type='number' label='Count' placeholder='需 6 筆以上。' size='small'
            min={[6, '需 6 筆以上']} />
          <SubmitCommand onSubmit={handler.qryDataList2} />
          <ResetCommand />
        </Stack>
      </FormContainer>

      {/* 查詢面板(舊)
      <Stack spacing={{ xs: 1 }} direction="row" sx={{ p: 1 }}>
        <TextField label='City' name='city' value={qryArgs.city} onChange={handler.changeQryArgs} size='small' />
        <TextField label='Count' name='count' value={qryArgs.count} onChange={handler.changeQryArgs} size='small' type='number'
          placeholder='需 5 筆以上。' />
        <Button variant='contained' onClick={handler.qryDataList}>查詢</Button>
        <Button variant='outlined' onClick={handler.resetQryArgs}>重置</Button>
      </Stack> */}

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
