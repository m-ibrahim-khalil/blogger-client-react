/* eslint-disable react/no-unescaped-entities */
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import ButtonSubmit from '../components/generics/ButtonSubmit';
import TextFieldGeneric from '../components/generics/TextFieldGeneric';
import { useAuth } from '../context/authContext';
import { login } from '../services/authService';
import { getAuthUsername } from '../utils/jwt';

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = {};
  if (!updates?.username.trim()) {
    errors.username = "Username can't be empty or space";
  }
  if (updates?.password?.length < 6) {
    errors.password = 'Password must be > 6 characters';
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  const { status } = await login(updates);
  return { status };
}

function Signin() {
  const data = useActionData();
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthUser, isLoggedIn } = useAuth();
  const status = data?.status || null;

  useEffect(() => {
    if (isLoggedIn) return navigate(`/`);
    if (status === 'LOGIN_SUCCESS') {
      setIsLoggedIn(true);
      setAuthUser(getAuthUsername());
      return navigate(`/`);
    }
    setIsLoggedIn(false);
    setAuthUser(null);
    return navigate('/signin');
  }, [status]);

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
        {status && (
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: status === 'LOGIN_SUCCESS' ? 'green' : 'red',
            }}
          >
            {status}
          </Typography>
        )}
        <Form method="post" id="signin-form">
          <Box sx={{ mt: 1 }}>
            <TextFieldGeneric
              id="username"
              name="username"
              placeholder="Username"
            />
            {data?.username && (
              <span style={{ color: 'red' }}>{data?.username}</span>
            )}
            <TextFieldGeneric
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            {data?.password && (
              <span style={{ color: 'red' }}>{data?.password}</span>
            )}
            <ButtonSubmit label="Sign In" />
          </Box>
        </Form>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </Box>
    </Container>
  );
}

export default Signin;
