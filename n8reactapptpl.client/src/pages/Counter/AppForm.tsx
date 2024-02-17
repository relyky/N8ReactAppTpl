import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount, selectStatus } from "./counterSlice"

export default function Counter_AppForm() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)
  const f_blocking = useAppSelector(store => store.meta.blocking)
  const [count0, setCount0] = useState(3)

  return (
    <Container>
      {f_blocking && <Typography variant='h1'>f_blocking</Typography>}
      
      <Typography variant='h3'>計數器</Typography>
      <Box typography='h1' textAlign='center'>
        {count0}
      </Box>
      <Box textAlign='center'>
        <Button variant='contained' onClick={() => setCount0(c => c + 1)}>＋１</Button>
      </Box>

      <Divider variant='middle' sx={{ my: 2 }} />
      <Typography variant='h4'>Redux 計數器</Typography>
      <Box typography='h1' textAlign='center'>
        {count}&nbsp;<span style={{ fontSize:'0.5em'}}>{status}</span>
      </Box>
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
