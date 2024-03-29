import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

interface FormValues {
  fieldA: string
  fieldB: string
  fieldC: number
  fieldD: string // Date:yyyy-mm-dd
}

const initState: FormValues = {
  fieldA: '',
  fieldB: '',
  fieldC: 0,
  fieldD: dayjs().format('YYYY-MM-DD')
}

const minDate = dayjs().add(2,'day').format('YYYY-MM-DD')

export default function TabPageA() {
  const [formData, setFormData] = useState(initState)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value})
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert('已送出封包。')
    setFormData(initState)
  }

  return (
    <Box>
      <Typography variant='h5'>原生 input/validation</Typography>
      <form onSubmit={handleSubmit}>
        <input type='text' name='fieldA' value={formData.fieldA} onChange={handleChange} required placeholder='ABC' pattern='ABC' />
        <input type='text' name='fieldB' value={formData.fieldB} onChange={handleChange} required placeholder='中文' pattern='中文' />
        <input type='number' name='fieldC' value={formData.fieldC} onChange={handleChange} required min={3} max={7} />
        <input type='date' name='fieldD' value={formData.fieldD} onChange={handleChange} required min={minDate} />
        <button type='submit'>送出封包</button>
      </form>

      <Typography variant='h6'>formData</Typography>
      <pre>
        {JSON.stringify(formData, null, ' ')}
      </pre>
    </Box>
  )
}
