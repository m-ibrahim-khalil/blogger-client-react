import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuth } from '../context/authContext';
import { SingleLineTextField } from '../includes/components';
import { register } from '../services/authService';
import { getAuthUsername } from '../utils/jwt';
import validateFormData from '../utils/inputValidation';
import ButtonLoading from '../components/common/Button/Loading';

export async function action({ request }) {
  console.log('Signup: action');
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
  const [loading, setLoading] = useState(true);
  const data = useActionData();
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthUser, isLoggedIn } = useAuth();
  const status = data?.status || null;

  useEffect(() => {
    console.log('Signup: useEffect');
    if (isLoggedIn) return navigate(`/`);
    if (status === 'REGISTER_SUCCESS') {
<<<<<<< Updated upstream
      console.log(status);
=======
      setLoading(false);
>>>>>>> Stashed changes
      setIsLoggedIn(true);
      setAuthUser(getAuthUsername());
      return navigate(`/`);
    }
    setLoading(false);
    setIsLoggedIn(false);
    setAuthUser(null);
    // return navigate('/signup');
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

        <Form method="post" id="signup-form" onSubmit={() => setLoading(true)}>
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
            {/* <ButtonSubmit>Sign Up</ButtonSubmit> */}
            <ButtonLoading loading={loading} endIcon={<LockOpenIcon />}>
              <span>Sign Up</span>
            </ButtonLoading>
          </Box>
        </Form>
        <Link to="/signin">Already have an account? Sign in</Link>
      </Box>
    </Container>
  );
}

export default Signup;
