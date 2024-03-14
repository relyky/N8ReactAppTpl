import { Alert, AlertTitle, Box } from "@mui/material"
import { useFormContext } from "react-hook-form"

export function ValidationSummary() {
  const {
    formState: { errors },
  } = useFormContext() // retrieve all hook methods

  const errorsMsg = errors && Object.entries(errors).map(
    ([name, value]) => ({
      name,
      type: value!.type,
      message: value!.message
    }));

  const hasError = Array.isArray(errorsMsg) && errorsMsg.length > 0;
  if (!hasError) return;

  if (import.meta.env.DEV)
    console.debug('ValidationSummary', { errorsMsg })

  return (
    <Alert severity="error" sx={{ m: 2 }}>
      <AlertTitle>Validation Summary</AlertTitle>
      {errorsMsg.map((msg, idx) =>
        (<Box key={idx}>{`${msg.message}`}</Box>)
      )}
    </Alert>
  )

  //console.log('TabPageC.errors', { errors, errorsMsg })
  //return (
  //  <Box>
  //    <Box typography='h6'>validation summary</Box>
  //    <Box component='pre' sx={{ color: 'error.main' }}>
  //      {Array.isArray(errorsMsg) && errorsMsg.map((msg, idx) =>
  //        (<div key={idx}>{JSON.stringify(msg)}</div>)
  //      )}
  //    </Box>
  //  </Box>
  //)
}