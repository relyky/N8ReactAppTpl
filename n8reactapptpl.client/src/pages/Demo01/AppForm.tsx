import { Box, Container, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { selectAccount } from "../../store/accountSlice";

export default function Demo01_AppForm() {
  const accountState = useAppSelector(selectAccount);
  return (
    <Container>
      <Typography variant='h3'>環境參數與授權狀態</Typography>

      <Box component='pre' sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
        {JSON.stringify(accountState, null, ' ')}
      </Box>

    </Container>
  )

}
