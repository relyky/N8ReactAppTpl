import { Paper, Toolbar, Typography } from "@mui/material";
import { ADateField, ATextField, FormContainer, FormRow, ResetCommand, SubmitCommand } from "../../highorder/formComponents/all";

type FormValues = {
  firstName: string
  lastName: string
  birtyday: Date
};

const initState: FormValues = {
  firstName: '聰明',
  lastName: '郝',
  birtyday: new Date(2001, 12, 29),
}

export default function Labbing02() {

  return (
    <FormContainer<FormValues> defaultValues={initState} >
      <Typography variant='h3'>欄位部局 Field Layout</Typography>

      <Paper sx={{ p: 2, my: 2 }}>
        <FormRow gridSize={[12, 6, 4, 3, 2]} >
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
          <ATextField name='firstName' label='名稱' gridSize={[12, 6]} size='small' placeholder='abc' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' gridSize={[12, 6]} size='small' placeholder='我是日期' />
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
        </FormRow>
      </Paper>

      <Paper sx={{ p: 2, my: 2 }}>
        <ATextField name='firstName' label='名稱' />
        <ATextField name='lastName' label='姓氏' />
        <ADateField name='birtyday' label='生日' />
        <ATextField name='firstName' label='名稱' />
        <ATextField name='lastName' label='姓氏' />
        <ADateField name='birtyday' label='生日' />
      </Paper>

      <Toolbar sx={{ gap: 2, justifyContent: 'center' }}>
        <SubmitCommand onSubmit={handleSubmit} />
        <ResetCommand />
      </Toolbar>

    </FormContainer>
  );

  function handleSubmit(data: FormValues) {
    console.log('handleSubmit', data)
  }
}
