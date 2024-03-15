import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount, selectStatus } from "./counterSlice"
import MyCounter from "./MyCounter"

export default function Counter_AppForm() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)
  const [count0, setCount0] = useState(3)

  return (
    <Container>      
      <Typography variant='h3'>計數器</Typography>
      <Box typography='body1'>以官方範例來實作。展示三種不同實作方法的計數器。</Box>

      {/* 第一種計數器 */}
      <MyCounter value={count0} onChange={setCount0} />

      {/* 第二種計數器 */}
      <Box typography='h1' textAlign='center'>
        {count0}
      </Box>

      {/* command-bar */}
      <Stack direction="row" justifyContent='center' spacing={2}>
        <Button variant='contained' onClick={() => setCount0(c => c + 1)}>＋１</Button>
        <Button variant='contained' onClick={() => setCount0(c => c - 1)}>－１</Button>
      </Stack>

      <Divider variant='middle' sx={{ my: 2 }} />

      {/* 第三種計數器 */}
      <Typography variant='h4'>Redux 計數器</Typography>
      <Box typography='h1' textAlign='center'>
        {count}&nbsp;<span style={{ fontSize:'0.5em'}}>{status}</span>
      </Box>

      {/* command-bar */}
      <Stack direction="row" justifyContent='center' spacing={2}>
        <Button variant='contained' onClick={() => dispatch(increment())}>＋１</Button>
        <Button variant='contained' onClick={() => dispatch(decrement())}>－１</Button>
        <Button variant='contained' onClick={() => dispatch(incrementByAmount(count0))}>Add Amount</Button>
        <Button variant='contained' onClick={() => dispatch(incrementIfOdd(count0))}>Add If Odd</Button>
        <Button variant='contained' onClick={() => dispatch(incrementAsync(count0))}>Add Async</Button>
      </Stack>

    </Container>
  );
}
