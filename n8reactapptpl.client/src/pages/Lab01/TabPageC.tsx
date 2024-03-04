import { Box, Button, TextField, Typography } from "@mui/material";
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, isValid, addDays } from "date-fns";
import { useState } from "react";

interface FormState {
  fieldA: string
  fieldB: string
  fieldC: number
  fieldD: string | null
}

const initState: FormState = {
  fieldA: '',
  fieldB: '',
  fieldC: 0,
  fieldD: format(new Date(), 'yyyy/MM/dd')
}

const minDate = format(addDays(new Date(), 2), 'yyyy/MM/dd') // dayjs().add(2, 'day')

export default function TabPageC() {
  const [formData, setFormData] = useState(initState)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert('�w�e�X�ʥ]�C')
    setFormData(initState)
  }

  return (
    <Box>
      <Typography variant='h5'>@MUI input/react-hook-form validation</Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ p: 2 }} >
        <TextField label='Field A' name='fieldA' value={formData.fieldA} onChange={handleChange} required placeholder='ABC'
          inputProps={{ pattern: "ABC" }} />

        <TextField label='����' name='fieldB' value={formData.fieldB} onChange={handleChange} required placeholder='����'
          inputProps={{ pattern: "����" }} />

        <TextField label='Field C' name='fieldC' type='number' value={formData.fieldC} onChange={handleChange} required
          inputProps={{ min: 3, max: 7 }} />

        <DatePicker label='���' name='fieldD' value={formData.fieldD} onChange={handleDateChange}
          minDate={minDate} /* required */ />

        <Button variant='contained' type='submit'>�e�X�ʥ]</Button>
      </Box>

      <Typography variant='h6'>formData</Typography>
      <pre>
        {JSON.stringify(formData, null, ' ')}
      </pre>
    </Box>
  )

  function handleDateChange(value: string | null, context: PickerChangeHandlerContext<DateValidationError>) {
    console.log('handleDateChange', { value, context })

    setFormData({ ...formData, fieldD: value && isValid(value) ? format(value, 'yyyy-MM-dd') : null });
  }
}
