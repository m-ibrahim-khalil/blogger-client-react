import { TextField } from '@mui/material';
import React from 'react';

function TextFieldGeneric(props) {
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

export default TextFieldGeneric;
