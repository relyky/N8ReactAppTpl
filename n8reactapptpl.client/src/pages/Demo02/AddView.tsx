import { Button, Container, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setEditMode } from "./useFormSlice";
import { IDemo02_FormData } from "../../DTO/Demo02/IDemo02_FormData";
import { ResetCommand, SubmitCommand } from "../../highorder/formComponents/FormCommands";
import FormContainer from "../../highorder/formComponents/FormContainer";
import FormRow from "../../highorder/formComponents/FormRow";
import ATextField from "../../highorder/formComponents/ATextField";
import useFormHand from "./useFormHand";

const initFormData: IDemo02_FormData = {
  formNo: '',
  formTitle: '',
  updDtm: undefined,
  fieldA: '',
  fieldB: '',
  fieldC: '',
}

export default function AddView() {
  const dispatch = useAppDispatch()
  const handler = useFormHand()

  return (
    <Container>
      <Typography variant='h3'>CRUD-AddView</Typography>

      <FormContainer<IDemo02_FormData> defaultValues={initFormData}>
        <FormRow>
          <ATextField name='formTitle' label='表單抬頭' gridSize={[12]} />
          <ATextField name='fieldA' label='欄位Ａ' />
          <ATextField name='fieldB' label='欄位Ｂ' />
          <ATextField name='fieldC' label='欄位Ｃ' />
        </FormRow>

        <Stack spacing={1} direction="row" justifyContent='center' sx={{ p: 1 }}>
          <SubmitCommand onSubmit={handler.addFormData} />
          <ResetCommand />
          <Button variant='outlined' onClick={() => dispatch(setEditMode('List'))}>返回</Button>
        </Stack>
      </FormContainer>

    </Container>
  )
}
