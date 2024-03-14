import { Button, Container, Toolbar, Typography } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setEditMode } from "./useFormSlice";
import { IDemo02_FormData } from "../../DTO/Demo02/IDemo02_FormData";
import useFormHand from "./useFormHand";
import { ATextField, FormContainer, FormRow, ResetCommand, SubmitCommand } from "../../highorder/formComponents/all";

const initFormData: IDemo02_FormData = {
  formNo: '',
  formTitle: '',
  expectDate: '',
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
      <Typography variant='h3' gutterBottom>CRUD-AddView</Typography>

      <FormContainer<IDemo02_FormData> defaultValues={initFormData}>
        <FormRow>
          <ATextField name='formTitle' label='表單抬頭' gridSize={[12]} />
          <ATextField name='expectDate' label='預計日期' placeholder='YYYY/MM/DD' />
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
