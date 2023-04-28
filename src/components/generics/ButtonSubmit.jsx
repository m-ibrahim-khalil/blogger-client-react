import { Button } from '@mui/material';
import React from 'react';

// eslint-disable-next-line react/prop-types
function ButtonSubmit({ label, color = 'primary' }) {
  return (
    <Button
      type="submit"
      fullWidth
      color={color}
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      {label}
    </Button>
  );
}

export default ButtonSubmit;
