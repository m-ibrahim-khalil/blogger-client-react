import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import ButtonSubmit from '../generics/ButtonSubmit';
import TextFieldGeneric from '../generics/TextFieldGeneric';



function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = (e)=>{
        e.preventDefault();
        console.log(username, password);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                <Avatar >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form onSubmit={handleSignin} noValidate>
                    <Box sx={{ mt: 1 }}>
                        <TextFieldGeneric
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextFieldGeneric
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ButtonSubmit label="Sign In" />
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default Signin;
