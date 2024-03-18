import { Box, Button, Container, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { selectAuthed, selectAuthing } from "../../store/accountSlice";

export default function Home_AppForm() {
  const isAuthed = useAppSelector(selectAuthed)
  const isAuthing = useAppSelector(selectAuthing)

  return (
    <Container>
      <Typography variant='h3'>這是首頁</Typography>
      <Box typography='body1' color='info.main'>首頁為特例不用登入</Box>

      {!(isAuthed || isAuthing) &&
        <Button href="login" size='large' sx={{ fontSize: '2rem' }}>{`前往登入》`}</Button>}

    </Container>
  )
}
