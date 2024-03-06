import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form"

export default function ValidationSummary() {
  const {
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  const errorsMsg = errors && Object.entries(errors).map(
    ([name, value]) => ({
      name,
      type: value!.type,
      message: value!.message
    }));

  //console.log('TabPageC.errors', { errors, errorsMsg })
  return (
    <Box>
      <Box typography='h6'>validation summary</Box>
      <Box component='pre' sx={{ color: 'error.main' }}>
        {Array.isArray(errorsMsg) && errorsMsg.map((msg, idx) =>
          (<div key={idx}>{JSON.stringify(msg)}</div>)
        )}
      </Box>
    </Box>
  )
}