import { DatePicker } from "@mui/x-date-pickers"
import { useContext, useMemo } from "react"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"
import * as dfs from "date-fns"
import { FormRowContext, FormRowFieldSize } from "./FormRow"
import { Grid } from "@mui/material"

// ※注意：此元件的 value 屬性只接受 Date 型別。
// 因 DatePicker 與 date-fns 綁定所以只接受 Date 型別。
// 讓人無言的 DatePicker！包了三層元件才做出想要的結果。
export default function ADateField(props: {
  name: string,
  label?: string,
  required?: boolean,
  helperText?: string,
  minDate?: Date,
  maxDate?: Date,
  size?: FormRowFieldSize
  //rules?: RegisterOptions<FieldValues, string>,
  min?: [value: Date, message: string],
  max?: [value: Date, message: string],
  validate?: (value: Date, formValues: FieldValues) => string | boolean,
}) {
  const {
    control,
    setValue,
  } = useFormContext() // retrieve all hook methods

  const formRow = useContext(FormRowContext)

  const rules = useMemo(() => {
    const rules: RegisterOptions<FieldValues, string> = {}
    if (props.required)
      rules.required = `${props.label} 為必填欄位`

    if (props.min)
      rules.min = {
        value: props.min[0] as unknown as number, //※ Date 的原生 type 為 number。(囧)此處只能強制轉型讓 IntelliSense 判斷為成功
        message: `${props.label} ${props.min[1]}`
      }

    if (props.max)
      rules.max = {
        value: props.max[0] as unknown as number, //※ Date 的原生 type 為 number。(囧)此處只能強制轉型讓 IntelliSense 判斷為成功
        message: `${props.label} ${props.max[1]}`
      }

    if (props.validate)
      rules.validate = props.validate

    return rules
  }, [props.label, props.max, props.min, props.required, props.validate])

  const fieldElement = (
    <Controller
      control={control}
      name={props.name}
      rules={rules}
      render={({ field, fieldState }) => (
        <DatePicker
          {...field}
          label={props.label}
          minDate={props.minDate}
          maxDate={props.maxDate}
          slotProps={{
            textField: { // fill-in TextField
              required: props.required ,
              error: !!fieldState.error,
              helperText: fieldState.error?.message || props.helperText,
              fullWidth: Boolean(formRow), // 有 FormRow 就填滿格子
              onChange: (value: Date) => {
                //※ 此處 onChange: (value:Date) => void 已驗證為正確。系統此處推論了錯誤的型別！
                //console.log('DatePicker.textField.onChange', { value }) // for debug
                setValue(field.name, dfs.isValid(value) ? value : null, { shouldDirty: true, shouldValidate: true })
              }
            },
          }}
        />
      )}
    />
  )

  if (formRow) {
    const [xs, sm, md, lg, xl] = props.size ?? formRow.size
    return (
      <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        {fieldElement}
      </Grid>
    )
  }

  return (<>{fieldElement}</>)
}