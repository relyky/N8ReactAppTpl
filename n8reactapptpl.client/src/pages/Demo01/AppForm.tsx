import { Box, Container, Typography } from "@mui/material"
import { useRecoilValue } from "recoil";
import { accountAtom } from "../../atoms/accountAtom";

export default function Demo01_AppForm() {
  const accountState = useRecoilValue(accountAtom);

  return (
    <Container>
      <Typography variant='h3'>環境參數與授權狀態</Typography>
      <Box typography='h6'>前端環境參數</Box>
      <Box component='pre' sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(import.meta.env, null, ' ')}
      </Box>

      <Box typography='h6'>授權狀態</Box>
      <Box component='pre' sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(accountState, null, ' ')}
      </Box>

    </Container>
  )
}
