import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/authContext';
import { ButtonSubmit, SingleLineTextField } from '../includes/components';
import { login } from '../services';
import { getAuthUsername } from '../utils/jwt';
import validateFormData from '../utils/inputValidation';
import ButtonLoading from '../components/common/Button/Loading';

export async function action({ request }) {
  console.log('Signin: Action');
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = validateFormData(updates);
  if (Object.keys(errors).length) {
    return errors;
  }
  const { status } = await login(updates);
  return { status };
}

function Signin() {
  const [loading, setLoading] = useState(true);
  const data = useActionData();
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthUser, isLoggedIn } = useAuth();
  const status = data?.status || null;

  useEffect(() => {
    console.log('SignIn: useEffect');
    if (isLoggedIn) return navigate(`/`);
    if (status === 'LOGIN_SUCCESS') {
      console.log(status);
      setLoading(false);
      setIsLoggedIn(true);
      setAuthUser(getAuthUsername());
      return navigate(`/`);
    }
    setLoading(false);
    setIsLoggedIn(false);
    setAuthUser(null);
    // return navigate('/signin');
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
        <Form method="post" id="signin-form" onSubmit={() => setLoading(true)}>
          <Box sx={{ mt: 1 }}>
            <SingleLineTextField name="username" placeholder="Username" />
            {data?.username && (
              <span style={{ color: 'red' }}>{data?.username}</span>
            )}
            <SingleLineTextField
              type="password"
              name="password"
              placeholder="Password"
            />
            {data?.password && (
              <span style={{ color: 'red' }}>{data?.password}</span>
            )}
            {/* <ButtonSubmit>Sign In</ButtonSubmit> */}
            <ButtonLoading loading={loading} endIcon={<LoginIcon />}>
              <span>Sign In</span>
            </ButtonLoading>
          </Box>
        </Form>
        <Link to="/signup">Don&#39;t have an account? Sign Up</Link>
      </Box>
    </Container>
  );
}

export default Signin;
