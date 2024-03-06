import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import * as dfs from "date-fns";
import FormContainer from "./formComponents/FormContainer";
import ATextField from "./formComponents/ATextField";
import ValidationSummary from "./formComponents/ValidationSummary";
import ADateField from "./formComponents/ADateField";
import FormStatePeeker from "./formComponents/FormStatePeeker";
import { ResetCommand, SubmitCommand } from "./formComponents/FormCommands";
import Swal from "sweetalert2";

interface FormValues {
  fieldA: string
  fieldB: string
  fieldC: number
  fieldD: Date | null
}

const initState: FormValues = {
  fieldA: 'ABC',
  fieldB: '中文',
  fieldC: 4,
  fieldD: dfs.startOfToday()
}

const minDate = dfs.addDays(dfs.startOfToday(), 2) // dayjs().add(2, 'day')

export default function TabPageD() {

  function handleSubmit(data: FormValues, reset: () => void) {
    const json = JSON.stringify(data, null, ' ')
    Swal.fire('已送出封包。', json, 'success')
      .then(() => {
        // 成功送出後重置表單輸入狀態。
        reset()
        Swal.fire('已重置表單。', undefined, 'info')
      })
  }

  return (
    <FormContainer<FormValues>
      defaultValues={initState}
      onError={(errors) => {
        console.log('FormContainer.onError', { errors })
      }}
    >
      <Typography variant='h5'>@MUI/Hook Form as <b>high-order components</b></Typography>

      <FormStatePeeker render={({
        formState: { isDirty, isValidating, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount }
      }) => (
        <Stack direction="row" spacing={1}>
          <Chip label="isDirty" color="warning" disabled={!isDirty} />
          <Chip label="isValidating" color="info" disabled={!isValidating} />
          <Chip label="isValid" color="info" disabled={!isValid} />
          <Chip label="isSubmitting" color="info" disabled={!isSubmitting} />
          <Chip label={`isSubmitted (${submitCount})`} color="info" disabled={!isSubmitted} />
          <Chip label="isSubmitSuccessful" color="success" disabled={!isSubmitSuccessful} />
        </Stack>
      )} />

      <Paper sx={{ p: 2, my: 2 }}>
        <ATextField name='fieldA' label='Field A' required helperText='我是此欄位說明'
          minLength={[3, '長度必需為3。']}
          pattern={[/ABC\w*/, '必需是ABCx。']}
          validate={(value: string) => !value.endsWith('Z') ? '必需用Z結束。' : true} />

        <ATextField name='fieldB' label='欄位Ｂ' required helperText='我是此欄位說明'
          pattern={[/中文/, '值必需是`中文`。']} />

        <ATextField name='fieldC' type='number' label='Field C' required helperText='我是此欄位說明'
          min={[3, '必需3以上。']}
          max={[7, '必需7以下。']} />

        <ADateField name='fieldD' label='選擇日期' required helperText='我是此欄位說明' minDate={minDate}
          min={[minDate, `需在${dfs.format(minDate, 'yyyy/MM/dd')}之後。`]} />

        <SubmitCommand onSubmit={handleSubmit} />
        <ResetCommand />
      </Paper>

      <ValidationSummary />

      <FormStatePeeker render={({ getValues }) => (
        <Box>
          <Typography variant='h6'>formData</Typography>
          <pre>
            {JSON.stringify(getValues(), null, ' ')}
          </pre>
        </Box>
      )} />

    </FormContainer>
  )
}
