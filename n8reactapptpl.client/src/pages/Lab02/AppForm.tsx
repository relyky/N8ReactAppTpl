import { Button, Container, Typography } from "@mui/material"
import { useMetaAction } from "../../atoms/metaAtom";
import Swal from "sweetalert2";

export default function Lab02_AppForm() {
  const { customActionAsync } = useMetaAction()

  return (
    <Container>
      <Typography variant='h3'>實驗室二號</Typography>
      <Button onClick={handleClick}>測試 Recoil customAction </Button>
    </Container>
  )

  async function handleClick() {
    const result = await customActionAsync('foo bar baz')
    Swal.fire('customAction', `${result}`)
  }
}
