import { useMemo } from "react"
import { TextField } from "@mui/material"
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form"

export default function ATextField(props: {
  name: string,
  type?: string,
  label?: string,
  required?: boolean,
  helperText?: string,
  rules?: RegisterOptions<FieldValues, string>,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  const rules = useMemo(() => (
    props.required
      ? { ...(props.rules ?? {}), required: `${props.label} 為必填欄位` }
      : props.rules
  ), [props.label, props.required, props.rules])

  return (
    <TextField
      label={props.label}
      type={props.type}
      required={props.required}
      error={!!errors[props.name]}
      helperText={(errors[props.name] ? errors[props.name]?.message : props.helperText) as string}
      {...register(props.name, rules)}
    />
  )
}