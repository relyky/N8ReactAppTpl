import { Box, Button, Container, Typography } from "@mui/material";
import Swal from "sweetalert2";

export default function Demo01_AppForm() {
  return (
    <Container>
      <Typography variant='h3'>這是 Demo01</Typography>
      <Box typography='body1'>測試 SweetAlert</Box>
      <Button variant='contained' onClick={handleSuccess}>success</Button>
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
