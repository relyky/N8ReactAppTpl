import { UseFormReturn, useFormContext } from "react-hook-form"

/// ���X�� Form �Ҧ����A�H�e�{�b�e�� UI�C
/// ��p�G�� getValues() �d�ݲ{�b��椺�e
/// ��p�G�� isValid, isDirty, isSubmitted ���d�ݪ�檬�A
export function FormStatePeeker(props: {
  render: (context: UseFormReturn) => JSX.Element
}) {
  const context = useFormContext() // retrieve all hook methods
  return props.render(context)
}

// �d�ҡG�� getValues() �d�ݲ{�b��椺�e
//<FormStatePeeker render={({ getValues }) => (
//  <Box>
//    <Typography variant='h6'>formData</Typography>
//    <pre>
//      {JSON.stringify(getValues(), null, ' ')}
//    </pre>
//  </Box>
//)} />

// �d�ҡG�� isValid, isDirty, isSubmitted ���d�ݪ�檬�A
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
