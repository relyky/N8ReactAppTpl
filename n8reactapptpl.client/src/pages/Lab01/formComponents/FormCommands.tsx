import { Button } from "@mui/material"
import { FieldValues, UseFormReset, useFormContext } from "react-hook-form"

export function SubmitCommand<TFieldValues extends FieldValues>(props: {
  onSubmit: (data: TFieldValues, reset: UseFormReset<TFieldValues>) => void,
  label?: string,
}) {
  const {
    handleSubmit,
    reset,
  } = useFormContext<TFieldValues>()

  return (
    <Button variant='contained' color='primary' onClick={handleSubmit((data) => props.onSubmit(data, reset))}>
      {props.label ?? '送出'}
    </Button>
  )
}

export function ResetCommand(props: {
  label?: string
}) {
  const {
    reset,
  } = useFormContext()

  return (
    <Button variant='outlined' color='primary' onClick={() => reset()}>
      {props.label ?? '重置'}
    </Button>
  )
}