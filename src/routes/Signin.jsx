/* eslint-disable react/no-unescaped-entities */
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import ButtonSubmit from '../components/generics/ButtonSubmit';
import TextFieldGeneric from '../components/generics/TextFieldGeneric';
import { login } from '../services/authService';

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = {};
  if (!updates?.username.trim()) {
    errors.username = "Username can't be empty or space";
  }

  if (updates?.password?.length < 4) {
    errors.password = 'Password must be > 4 characters';
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  const { status } = await login(updates);
  return { status, updates };
}

function Signin() {
  const data = useActionData();
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.status === 'LOGIN_SUCCESS') {
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      localStorage.setItem(
        'currentUser',
        JSON.stringify(data?.updates?.username.toLowerCase())
      );
      return navigate(`/`);
    }
    localStorage.setItem('isAuthenticated', JSON.stringify(false));
    localStorage.setItem('currentUser', JSON.stringify(null));
    return navigate(`/signin`);
  }, [data?.status]);

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
            />
            {data?.username && <span>{data?.username}</span>}
            <TextFieldGeneric
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            {data?.password && <span>{data?.password}</span>}
            <ButtonSubmit label="Sign In" />
          </Box>
        </Form>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </Box>
    </Container>
  );
}

export default Signin;
