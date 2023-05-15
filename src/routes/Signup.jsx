import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { ButtonSubmit, SingleLineTextField } from '../includes/components';
import { register } from '../services/authService';
import { getAuthUsername } from '../utils/jwt';
import validateFormData from '../utils/inputValidation';

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = validateFormData(updates);
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
  }, [status, isLoggedIn]);

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
            <SingleLineTextField
              id="username"
              name="username"
              placeholder="Username"
            />
            {data?.username && (
              <span style={{ color: 'red' }}>{data?.username}</span>
            )}
            <SingleLineTextField
              id="email"
              name="email"
              placeholder="Email Adress"
            />
            {data?.email && <span style={{ color: 'red' }}>{data.email}</span>}
            <SingleLineTextField
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            {data?.password && (
              <span style={{ color: 'red' }}>{data.password}</span>
            )}
            <ButtonSubmit>Sign Up</ButtonSubmit>
          </Box>
        </Form>
        <Link to="/signin">Already have an account? Sign in</Link>
      </Box>
    </Container>
  );
}

export default Signup;
