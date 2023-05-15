import { Button } from '@mui/material';
import React from 'react';

// eslint-disable-next-line react/prop-types
function ButtonSubmit({ children, ...rest }) {
  return (
    <Button
      type="submit"
      fullWidth
      color="primary"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default ButtonSubmit;
