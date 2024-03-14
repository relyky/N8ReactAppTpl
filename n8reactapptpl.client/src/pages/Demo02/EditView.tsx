import { useEffect } from "react";
import { Button, Container, Toolbar, Typography } from "@mui/material";
import { selectFormState, setEditMode } from "./useFormSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ATextField, FormContainer, FormRow, ResetCommand, SubmitCommand } from "../../highorder/formComponents/all";
import useFormHand from "./useFormHand";
import { IDemo02_FormData } from "../../DTO/Demo02/IDemo02_FormData";

export default function EditView() {
  const dispatch = useAppDispatch()
  const { dataAim, formData } = useAppSelector(selectFormState)
  const handler = useFormHand()

  // form init
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handler.getFormData(dataAim), [])

  return (
    <Container>
      <Typography variant='h3'>CRUD-EditView</Typography>
      <Typography variant='h4'>{dataAim}</Typography>

      <FormContainer<IDemo02_FormData> defaultValues={formData}>
        <pre>
          {JSON.stringify(formData, null, ' ')}
        </pre>

        <FormRow>
          <ATextField name='formTitle' label='表單抬頭' gridSize={[12]} />
          <ATextField name='fieldA' label='欄位Ａ' />
          <ATextField name='fieldB' label='欄位Ｂ' />
          <ATextField name='fieldC' label='欄位Ｃ' />
        </FormRow>

        <Toolbar sx={{ gap: 2, justifyContent: 'center' }}>
          <SubmitCommand onSubmit={handler.addFormData} />
          <ResetCommand />
          <Button variant='outlined' onClick={() => dispatch(setEditMode('List'))}>返回</Button>
        </Toolbar>
      </FormContainer>
    </Container>
  )
}