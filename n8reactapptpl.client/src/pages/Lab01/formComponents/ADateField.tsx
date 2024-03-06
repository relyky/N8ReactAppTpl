import { DatePicker } from "@mui/x-date-pickers"
import { useMemo } from "react"
import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form"
import * as dfs from "date-fns"

// ※注意：此元件的 value 屬性只接受 Date 型別。
// 因 DatePicker 與 date-fns 綁定所以只接受 Date 型別。
// 讓人無言的 DatePicker！包了三層元件才做出想要的結果。
export default function ADateField(props: {
  name: string,
  label?: string,
  required?: boolean,
  helperText?: string,
  rules?: RegisterOptions<FieldValues, string>,
  minDate?: Date,
  maxDate?: Date,
}) {
  const {
    control,
    setValue,
  } = useFormContext() // retrieve all hook methods

  const rules = useMemo(() => (
    props.required
      ? { ...(props.rules ?? {}), required: `${props.label} 為必填欄位` }
      : props.rules
  ), [props.label, props.required, props.rules])

  return (
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
}