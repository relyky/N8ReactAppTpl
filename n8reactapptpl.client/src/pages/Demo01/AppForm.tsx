import { Box, Button, Container, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { selectAccount } from "../../store/accountSlice";
import { useState } from "react";
import { usePostData } from "../../hooks/useHttp";

export default function Demo01_AppForm() {
  const postData = usePostData()
  const accountState = useAppSelector(selectAccount);
  const [authInfo, setAuthInfo] = useState<object>();
  return (
    <Container>
      <Typography variant='h3'>環境參數與授權狀態</Typography>

      <Box component='pre' sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(accountState, null, ' ')}
      </Box>

      <Box typography='h6'>AuthInfo</Box>
      <Button variant='contained' onClick={handleGetAuthInfo}>GetAuthInfo</Button>
      <Box component='pre' sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(authInfo, null, ' ')}
      </Box>

    </Container>
  )

  async function handleGetAuthInfo() {
      const info = await postData<object>('api/Account/GetCurrentUser')
      setAuthInfo(info)
  }
}
