import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as dfs from "date-fns";
import { Controller, useForm } from "react-hook-form";

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

export default function TabPageC() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, isValidating, isDirty, isSubmitSuccessful, },
    getValues,
    control,
  } = useForm<FormValues>({ defaultValues: initState, criteriaMode: "all", });

  const onSubmit = handleSubmit((data) => {
    const json = JSON.stringify(data, null, ' ')
    alert('已送出封包。' + json)
    reset()
  });

  //required
  //min
  //max
  //minLength
  //maxLength
  //pattern: /^[A-Za-z]+$/i
  //validate

  const errorsMsg = Object.entries(errors).map(
    ([name, value]) => ({
      name,
      type: value.type,
      message: value.message
    })
  );

  //console.log('TabPageC.errors', errors)
  return (
    <Box>
      <Typography variant='h5'>@MUI input/React Hook Form validation</Typography>

      <p>{`isDirty:${isDirty} | isValid:${isValid} | isValidating:${isValidating} | isSubmitSuccessful:${isSubmitSuccessful}`}</p>
      <Box typography='h6'>errors</Box>

      <pre>
        {Array.isArray(errorsMsg) && errorsMsg.map((msg) =>
          (<div>{JSON.stringify(msg)}</div>)
        )}
      </pre>

      <Box component='form' noValidate onSubmit={onSubmit} sx={{ p: 2 }} >
        <TextField
          label='Field A'
          required
          error={!!errors['fieldA']}
          helperText={errors['fieldA'] ? errors['fieldA'].message : '我是此欄位說明'}
          {...register('fieldA', {
            required: '為必填欄位',
            minLength: {
              value: 3,
              message: '長度必需為3'
            },
            pattern: {
              value: /ABC/,
              message: '必需是ABC'
            }
          })}
        />

        <TextField
          label='欄位Ｂ'
          required
          error={!!errors['fieldB']}
          helperText={errors['fieldB'] ? errors['fieldB'].message : '我是此欄位說明'}
          {...register('fieldB', {
            required: '必填欄位',
            pattern: {
              value: /中文/,
              message: '值必需是"中文"'
            }
          })}
        />

        <TextField
          label='Field C'
          type='number'
          required
          error={!!errors['fieldC']}
          helperText={errors['fieldC'] ? errors['fieldC'].message : '我是此欄位說明'}
          {...register('fieldC', {
            required: '為必填欄位',
            min: {
              value: 3,
              message: '必需3以上'
            },
            max: {
              value: 7,
              message: '必需7以下'
            }
          })}
        />

        {/* 讓人無言的 DatePicker。
            因 DatePicker 與 date-fns 綁定所以只接受 Date 型別。 */}
        <Controller
          control={control}
          name="fieldD"
          rules={{
            required: '為必填欄位',
            min: {
              value: minDate as unknown as number, //※(囧)此處只能強制轉型讓 IntelliSense 判斷為成功
              message: `日期需在${dfs.format(minDate, 'yyyy/MM/dd')}之後。`
            }
          }}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              label='日期'
              minDate={minDate}
              maxDate={undefined}
              slotProps={{
                textField: {
                  required: true,
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          )}
        />

        <Button variant='contained' type='submit'>送出封包</Button>
      </Box>

      <Typography variant='h6'>formData</Typography>
      <pre>
        {JSON.stringify(getValues(), null, ' ')}
      </pre>
    </Box>
  )
}
