import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '../../services';
import validateFormData from '../../utils/formDataValidation';
import { signUp } from '../../features/authSlice';
import { PasswordInputField, TextInputField } from '../common/Form';
import { hasCookie } from '../../utils/jwt';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const registerUserMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('success mutation');
      queryClient.setQueryData(['register', data.username], data);
      queryClient.invalidateQueries(['register'], { exact: true });
    },
  });

  const handleSubmit = (e) => {
    console.log('signup submit');
    e.preventDefault();
    const formData = {
      fullname: e.target.fullname.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const errors = validateFormData(formData);
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }
    registerUserMutation.mutate(formData);
    if (registerUserMutation.isSuccess && hasCookie())
      dispatch(signUp({ authUser: formData.username }));
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInputField
                label="Full Name"
                error={validationErrors?.fullname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInputField
                label="User Name"
                error={validationErrors?.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInputField label="Email" error={validationErrors?.email} />
            </Grid>
            <Grid item xs={12}>
              <PasswordInputField error={validationErrors?.password} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
