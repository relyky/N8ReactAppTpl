import { useContext, useMemo } from "react"
import { Grid, TextField, TextFieldPropsSizeOverrides } from "@mui/material"
import { OverridableStringUnion } from '@mui/types';
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form"
import { FormRowContext, FormRowFieldSize } from "./FormRow"

//rules:
// required: string
// min: number
// max: number
// minLength: number
// maxLength: number
// pattern: RegEx: /^[A-Za-z]+$/i 
// validate: ()=>boolean

export function ATextField(props: {
  name: string,
  type?: string,
  label?: string,
  required?: boolean,
  placeholder?: string,
  helperText?: string,
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
  gridSize?: FormRowFieldSize
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

  const formRow = useContext(FormRowContext)

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

  const fieldElement = (
    <TextField
      label={props.label}
      type={props.type}
      required={props.required}
      placeholder={props.placeholder}
      error={Boolean(errors[props.name])}
      helperText={(errors[props.name] ? errors[props.name]?.message : props.helperText) as string}
      size={props.size}
      fullWidth={Boolean(formRow)} /* 有 FormRow 就填滿格子 */
      {...register(props.name, rules)}
    />
  )

  if (formRow) {
    const [xs, sm, md, lg, xl] = props.gridSize ?? formRow.gridSize
    return (
      <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        {fieldElement}
      </Grid>
    )
  }

  return (<>{fieldElement}</>)
}