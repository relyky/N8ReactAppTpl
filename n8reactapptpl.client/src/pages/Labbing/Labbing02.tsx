import { Paper, Toolbar, Typography } from "@mui/material";
import FormContainer from "../../highorder/formComponents/FormContainer";
import ATextField from "../../highorder/formComponents/ATextField";
import FormRow from "../../highorder/formComponents/FormRow";
import { ResetCommand, SubmitCommand } from "../../highorder/formComponents/FormCommands";
import ADateField from "../../highorder/formComponents/ADateField";

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
        <FormRow size={[12, 6, 4, 3, 2]} >
          <ATextField name='firstName' label='名稱' />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' />
          <ATextField name='firstName' label='名稱' size={[12, 6]} />
          <ATextField name='lastName' label='姓氏' />
          <ADateField name='birtyday' label='生日' size={[12, 6]} />
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
