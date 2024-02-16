import { Box, Button, Container, Typography } from "@mui/material"
import { useState } from "react"

export default function Counter_AppForm() {
  const [count, setCount] = useState(0)
  return (
    <Container>
      <Typography variant='h3'>計數器</Typography>
      <Box typography='h1' textAlign='center'>
        {count}
      </Box>
      <Box textAlign='center'>
        <Button variant='contained' onClick={() => setCount(c => c + 1)}>＋１</Button>
      </Box>
    </Container>
  );
}
