import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import ButtonGeneric from '../components/generics/ButtonSubmit';
import TextFieldGeneric from '../components/generics/TextFieldGeneric';
import { useAuth } from '../context/authContext';
import { register } from '../services/authService';
import { getAuthUsername } from '../utils/jwt';

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = {};
  if (!updates?.username.trim()) {
    errors.username = "Username can't be empty or space";
  }
  if (!updates?.email.includes('@')) {
    errors.email = "That doesn't look like an email address";
  }
  if (updates?.password?.length < 6) {
    errors.password = 'Password must be > 6 characters';
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const { status } = await register(updates);
  return { status };
}

function Signup() {
  const data = useActionData();
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthUser, isLoggedIn } = useAuth();
  const status = data?.status || null;

  useEffect(() => {
    if (isLoggedIn) return navigate(`/`);
    if (status === 'REGISTER_SUCCESS') {
      setIsLoggedIn(true);
      setAuthUser(getAuthUsername());
      return navigate(`/`);
    }
    setIsLoggedIn(false);
    setAuthUser(null);
    return navigate('/signup');
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
          Sign up
        </Typography>
        {status && (
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: status === 'REGISTER_SUCCESS' ? 'green' : 'red',
            }}
          >
            {status}
          </Typography>
        )}

        <Form method="post" id="signup-form">
          <Box sx={{ mt: 3 }}>
            <TextFieldGeneric
              id="username"
              name="username"
              placeholder="Username"
            />
            {data?.username && (
              <span style={{ color: 'red' }}>{data?.username}</span>
            )}
            <TextFieldGeneric
              id="email"
              name="email"
              placeholder="Email Adress"
            />
            {data?.email && <span style={{ color: 'red' }}>{data.email}</span>}
            <TextFieldGeneric
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            {data?.password && (
              <span style={{ color: 'red' }}>{data.password}</span>
            )}
            <ButtonGeneric label="Sign Up" />
          </Box>
        </Form>
        <Link to="/signin">Already have an account? Sign in</Link>
      </Box>
    </Container>
  );
}

export default Signup;
