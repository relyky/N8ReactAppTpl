import { Button, styled } from "@mui/material";
// icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

// ref¡÷[Material UI\File upload](https://mui.com/material-ui/react-button/#file-upload)

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload(props: {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      < VisuallyHiddenInput type="file" onChange={props.onChange} />
    </Button>
  );

  //function handleChange(e: React.ChangeEvent<HTMLInputElement>)
  //{
  //  const uploadFile = e.target.files[0];
  //}
}