import { useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { selectFormState, setEditMode } from "./useFormSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useFormHand from "./useFormHand";

export default function EditView() {
  const dispatch = useAppDispatch()
  const { dataAim, formData } = useAppSelector(selectFormState)
  const handler = useFormHand()

  // form init
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handler.getFormData(dataAim!), [])

  return (
    <Container>
      <Typography variant='h3'>CRUD-EditView</Typography>
      <Typography variant='h4'>{dataAim}</Typography>

      <pre>
        {JSON.stringify(formData, null, ' ')}
      </pre>

      <Button onClick={() => dispatch(setEditMode('List'))}>返回</Button>
    </Container>
  )
}