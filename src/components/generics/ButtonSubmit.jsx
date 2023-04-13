import { Button } from '@mui/material';
import React from 'react';

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
