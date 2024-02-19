import { Box, Button, Container, Typography } from "@mui/material";
import Swal from "sweetalert2";
import styles from './AppForm.module.css'

export default function Demo01_AppForm() {
  return (
    <Container>
      <Typography variant='h3'>這是 Demo01</Typography>
      <Box typography='body1'>測試 SweetAlert、CSS isolation.</Box>
      <Button variant='contained' onClick={handleSuccess}>success</Button>

      <h3>這是 H3</h3>
      <h3 className={styles.myh3}>這是 H3 with CSS isolation</h3>

    </Container>
  )

  function handleSuccess()
  {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
}
