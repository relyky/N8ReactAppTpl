import { useEffect } from "react";
import { Button, Container, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ATextField, FormContainer, FormRow, ReconfirmCommand, ResetCommand, SubmitCommand, ValidationSummary } from "../../highorder/formComponents/all";
import { IDemo02_FormData } from "../../DTO/Demo02/IDemo02_FormData";
import { selectFormState, setEditMode } from "./useFormSlice";
import useFormHand from "./useFormHand";

export default function EditView() {
  const dispatch = useAppDispatch()
  const { dataAim, formData } = useAppSelector(selectFormState)
  const handler = useFormHand()

  // form init
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handler.getFormData(dataAim), [])

  return (
    <Container>
      <Typography variant='h3' gutterBottom>CRUD-EditView</Typography>

      {Boolean(formData) && <FormContainer<IDemo02_FormData> values={formData}>
        <FormRow>
          <ATextField name='formNo' label='表單號碼' readOnly gridSize={[12, 3]} />
          <ATextField name='formTitle' label='表單抬頭' required gridSize={[12, 9]}
            minLength={[7, '表單抬頭 長度不可小於7。']} />
          <ATextField name='expectDate' label='預計日期' placeholder='YYYY/MM/DD' />
          <ATextField name='fieldA' label='欄位Ａ' />
          <ATextField name='fieldB' label='欄位Ｂ' />
          <ATextField name='fieldC' label='欄位Ｃ' />
          <ATextField name='updDtm' label='更新時間' readOnly />
        </FormRow>

        <Toolbar sx={{ gap: 2, justifyContent: 'center' }}>
          <SubmitCommand onSubmit={handler.updFormData} />
          <ReconfirmCommand onSubmit={handler.delFormData} label="刪除" />
          <ResetCommand />
          <Button variant='outlined' onClick={() => dispatch(setEditMode('List'))}>返回</Button>
        </Toolbar>

        <ValidationSummary />
      </FormContainer>}
    </Container>
  )
}