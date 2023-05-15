import Avatar from '@material-ui/core/Avatar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Container, Typography } from '@mui/material';
import { Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import { ButtonOutlined, SingleLineTextField } from '../includes/components';
import { updateUserByUsername } from '../services';

export async function action({ request, params }) {
  console.log('Update Password Action');
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = {};
  if (updates?.oldPassword?.length < 6) {
    errors.oldPassword = 'Password must be > 6 characters';
  }
  if (updates?.newPassword?.length < 6) {
    errors.newPassword = 'Password must be > 6 characters';
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  const { status, payload } = await updateUserByUsername(
    params.username,
    updates
  );

  if (status === 'UPDATE_FAIL') throw new Error(payload);
  return redirect(`/users/${params.username}`);
}

export default function UpdatePassword() {
  const navigate = useNavigate();
  const errors = useActionData();
  console.log('Update Password');

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
          <BorderColorIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Form method="put" id="update-pass">
          <Box sx={{ mt: 1 }}>
            <span>Old Password</span>
            <SingleLineTextField
              placeholder="Enter New Password"
              type="password"
              name="oldPassword"
            />
            {errors?.oldPassword && (
              <span style={{ color: 'red' }}>{errors.oldPassword}</span>
            )}
            <br />
            <span>New Password</span>
            <SingleLineTextField
              placeholder="Enter New Password"
              type="password"
              name="newPassword"
            />
            {errors?.newPassword && (
              <span style={{ color: 'red' }}>{errors.newPassword}</span>
            )}
            <ButtonOutlined>Update</ButtonOutlined>
            <ButtonOutlined
              onClick={(event) => {
                event.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </ButtonOutlined>
          </Box>
        </Form>
      </Box>
    </Container>
  );
}
