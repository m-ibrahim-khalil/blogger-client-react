import { TextField } from '@mui/material';

function SingleLineTextField(props) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      autoComplete="confirm-password"
      inputProps={props}
    />
  );
}

export default SingleLineTextField;
