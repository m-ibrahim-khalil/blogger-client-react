import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import React, { useState } from 'react';
import ButtonGeneric from '../generics/ButtonSubmit';
import TextFieldGeneric from '../generics/TextFieldGeneric';


function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(username, password, email, confirmPassword);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column' , alignItems: "center"}}>
               
                <Avatar >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                
                <form onSubmit={handleSignUp} noValidate>
                    <Box sx={{ mt: 3 }}>
                        <TextFieldGeneric
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextFieldGeneric
                            id="email"
                            placeholder="Email Adress"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextFieldGeneric
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ButtonGeneric label="Sign Up" onClick={handleSignUp} />
                    </Box>
                </form>
                <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                </Link>
            </Box>
        </Container>
    );
}

export default Signup;
