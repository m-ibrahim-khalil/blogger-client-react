import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { ButtonOutlined } from '../Button';
import { MultiLineTextField } from '../TextField';

export default function BlogForm({ blog }) {
  const errors = useActionData();
  const navigate = useNavigate();
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
          Edit Blog
        </Typography>
        <Form method="post" id="edit-blog-form">
          <Box sx={{ mt: 1 }}>
            <span>Title</span>
            <MultiLineTextField
              minRows={2}
              name="title"
              defaultValue={blog?.title}
            />
            {errors?.title && (
              <span style={{ color: 'red' }}>{errors?.title}</span>
            )}
            <br />
            <span>Description</span>
            <MultiLineTextField
              minRows={6}
              name="description"
              defaultValue={blog?.description}
            />
            {errors?.description && (
              <span style={{ color: 'red' }}>{errors?.description}</span>
            )}
            <ButtonOutlined>Save</ButtonOutlined>
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
