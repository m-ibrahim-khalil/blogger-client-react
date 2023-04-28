/* eslint-disable react/no-unescaped-entities */
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import ButtonSubmit from '../components/generics/ButtonSubmit';
import TextFieldGeneric from '../components/generics/TextFieldGeneric';
import { login } from '../services/authService';

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const { status } = await login(updates);
  if (status === 'LOGIN_SUCCESS') {
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    localStorage.setItem('currentUser', JSON.stringify(updates?.username));
    return redirect(`/`);
  }
  localStorage.setItem('isAuthenticated', JSON.stringify(false));
  localStorage.setItem('currentUser', JSON.stringify(null));
  return redirect(`/signin`);
}

function Signin() {
  const [username, setUsername] = useState('');
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
          Sign In
        </Typography>
        <Form method="post" id="signin-form">
          <Box sx={{ mt: 1 }}>
            <TextFieldGeneric
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextFieldGeneric
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonSubmit label="Sign In" />
          </Box>
        </Form>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </Box>
    </Container>
  );
}

export default Signin;
