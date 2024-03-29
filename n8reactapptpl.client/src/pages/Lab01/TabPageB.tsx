import { Box, Button, TextField, Typography } from "@mui/material";
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { isValid, addDays, startOfToday } from "date-fns";
import { useState } from "react";

interface FormValues {
  fieldA: string
  fieldB: string
  fieldC: number
  fieldD: Date | null
}

const initState: FormValues = {
  fieldA: '',
  fieldB: '',
  fieldC: 0,
  fieldD: startOfToday()
}

const minDate = addDays(startOfToday(), 2) // dayjs().add(2, 'day')

export default function TabPageB() {
  const [formData, setFormData] = useState(initState)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert('已送出封包。')
    setFormData(initState)
  }

  return (
    <Box>
      <Typography variant='h5'>@MUI input/原生validation</Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ p: 2 }} >
        <TextField label='Field A' name='fieldA' value={formData.fieldA} onChange={handleChange} required placeholder='ABC'
          inputProps={{ pattern: "ABC" }} />

        <TextField label='欄位Ｂ' name='fieldB' value={formData.fieldB} onChange={handleChange} required placeholder='中文'
          inputProps={{ pattern: "中文" }} />

        <TextField label='Field C' name='fieldC' type='number' value={formData.fieldC} onChange={handleChange} required
          inputProps={{ min: 3, max: 7 }} />

        <DatePicker label='日期' name='fieldD' value={formData.fieldD} onChange={handleDateChange}
          minDate={minDate} /* required */ />

        <Button variant='contained' type='submit'>送出封包</Button>
      </Box>

      <Typography variant='h6'>formData</Typography>
      <pre>
        {JSON.stringify(formData, null, ' ')}
      </pre>
    </Box>
  )

  function handleDateChange(value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) {
    console.log('handleDateChange', { value, context })
    setFormData({ ...formData, fieldD: isValid(value) ? value : null });
  }
}
