import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import ButtonGeneric from '../components/generics/ButtonSubmit';
import TextFieldGeneric from '../components/generics/TextFieldGeneric';
import { register } from '../services/authService';

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const { status } = await register(updates);
  if (status === 'REGISTER_SUCCESS') {
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    localStorage.setItem(
      'currentUser',
      JSON.stringify(updates?.username.toLowerCase())
    );
    return redirect(`/`);
  }
  return redirect(`/signup`);
}

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Form method="post" id="signup-form">
          <Box sx={{ mt: 3 }}>
            <TextFieldGeneric
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextFieldGeneric
              id="email"
              name="email"
              placeholder="Email Adress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextFieldGeneric
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonGeneric label="Sign Up" />
          </Box>
        </Form>
        <Link to="/signin">Already have an account? Sign in</Link>
      </Box>
    </Container>
  );
}

export default Signup;
