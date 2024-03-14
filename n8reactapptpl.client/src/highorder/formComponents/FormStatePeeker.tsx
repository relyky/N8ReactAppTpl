import { UseFormReturn, useFormContext } from "react-hook-form"

/// 取出該 Form 所有狀態以呈現在前端 UI。
/// 比如：用 getValues() 查看現在表單內容
/// 比如：用 isValid, isDirty, isSubmitted 等查看表單狀態
export function FormStatePeeker(props: {
  render: (context: UseFormReturn) => JSX.Element
}) {
  const context = useFormContext() // retrieve all hook methods
  return props.render(context)
}

// 範例：用 getValues() 查看現在表單內容
//<FormStatePeeker render={({ getValues }) => (
//  <Box>
//    <Typography variant='h6'>formData</Typography>
//    <pre>
//      {JSON.stringify(getValues(), null, ' ')}
//    </pre>
//  </Box>
//)} />

// 範例：用 isValid, isDirty, isSubmitted 等查看表單狀態
//<FormStatePeeker render={({
//  formState: { isDirty, isValidating, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount }
//}) => (
//  <Stack direction="row" spacing={1}>
//    <Chip label="isDirty" color="warning" disabled={!isDirty} />
//    <Chip label="isValidating" color="info" disabled={!isValidating} />
//    <Chip label="isValid" color="info" disabled={!isValid} />
//    <Chip label="isSubmitting" color="info" disabled={!isSubmitting} />
//    <Chip label={`isSubmitted (${submitCount})`} color="info" disabled={!isSubmitted} />
//    <Chip label="isSubmitSuccessful" color="success" disabled={!isSubmitSuccessful} />
//  </Stack>
//)} />
