import { useMemo } from "react"
import { TextField } from "@mui/material"
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form"

{/* 考慮調整 rules 語法由：
    <ATextField name='fieldA' label='Field A' required helperText='我是此欄位說明'
      rules={{
        minLength: { value: 3, message: '長度必需為3' },
        pattern: { value: /ABC/, message: '必需是ABC' }
      }} />

    變成 => 可以少2行，若有十個欄位就少20行。
    <ATextField name='fieldA' label='Field A' required helperText='我是此欄位說明'
        minLength={[3, '長度必需為3']}
        pattern={[/ABC/, '必需是ABC']} />
*/}

//rules:
// required: string
// min: number
// max: number
// minLength: number
// maxLength: number
// pattern: RegEx: /^[A-Za-z]+$/i 
// validate: ()=>boolean

export default function ATextField(props: {
  name: string,
  type?: string,
  label?: string,
  required?: boolean,
  helperText?: string,
  //rules?: RegisterOptions<FieldValues, string>,
  minLength?: [value: number, message: string],
  maxLength?: [value: number, message: string],
  pattern?: [value: RegExp, message: string]
  min?: [value: number, message: string],
  max?: [value: number, message: string],
  validate?: (value: string, formValues: FieldValues) => string | boolean,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  //const rules = useMemo(() => (
  //  props.required
  //    ? { ...(props.rules ?? {}), required: `${props.label} 為必填欄位` }
  //    : props.rules
  //), [props.label, props.required, props.rules])

  const rules = useMemo(() => {
    const rules: RegisterOptions<FieldValues, string> = {}
    if (props.required)
      rules.required = `${props.label} 為必填欄位`

    if (props.minLength)
      rules.minLength = {
        value: props.minLength[0],
        message: `${props.label} ${props.minLength[1]}`
      }

    if (props.maxLength)
      rules.maxLength = {
        value: props.maxLength[0],
        message: `${props.label} ${props.maxLength[1]}`
      }

    if (props.pattern)
      rules.pattern = {
        value: props.pattern[0],
        message: `${props.label} ${props.pattern[1]}`
      }

    if (props.min)
      rules.min = {
        value: props.min[0],
        message: `${props.label} ${props.min[1]}`
      }

    if (props.max)
      rules.max = {
        value: props.max[0],
        message: `${props.label} ${props.max[1]}`
      }
    
    if (props.validate)
      rules.validate = props.validate

    return rules
  }, [props.label, props.max, props.maxLength, props.min, props.minLength, props.pattern, props.required, props.validate])

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