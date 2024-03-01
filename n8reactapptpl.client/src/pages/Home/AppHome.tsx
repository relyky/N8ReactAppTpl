import { Box, Container, Typography } from "@mui/material";

export default function Home_AppForm() {
  return (
    <Container>
      <Typography variant='h3'>這是首頁</Typography>
      <Box typography='body1' color='info.main'>首頁為特例不用登入</Box>
    </Container>
  )
}
