import { Button, ButtonPropsColorOverrides } from "@mui/material"
import { OverridableStringUnion } from '@mui/types';
import { FieldValues, useFormContext } from "react-hook-form"
import Swal from "sweetalert2";

export function SubmitCommand<TFieldValues extends FieldValues>(props: {
  onSubmit: (data: TFieldValues, reset: () => void) => void,
  label?: string,
  color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning', ButtonPropsColorOverrides>
}) {
  const {
    handleSubmit,
    reset,
  } = useFormContext<TFieldValues>()

  return (
    <Button variant='contained' color={props.color ?? 'primary'} onClick={handleSubmit((data) => {
      if (import.meta.env.DEV) {
        console.debug('SubmitCommand', { data })
      }

      props.onSubmit(data, reset)
    })}>
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

export function ReconfirmCommand<TFieldValues extends FieldValues>(props: {
  onSubmit: (data: TFieldValues, reset: () => void) => void,
  label?: string,
  color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning', ButtonPropsColorOverrides>
}) {
  const {
    handleSubmit,
    reset,
  } = useFormContext<TFieldValues>()

  return (
    <Button variant='contained' color={props.color ?? 'error'} onClick={handleSubmit((data) => {
      if (import.meta.env.DEV) {
        console.debug('ReconfirmCommand', { data })
      }

      Swal.fire({
        title: '再確認一次',
        text: '確定要執行嗎？',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '是的',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.isConfirmed) {
          props.onSubmit(data, reset)
        }
      })
    })}>
      {props.label ?? '送出'}
    </Button>
  )
}