import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Button, Container, Typography } from '@mui/material';
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import ButtonSubmit from '../components/generics/ButtonSubmit';
import { updateBlog } from '../services/blogService';

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = {};
  if (!updates?.title.trim()) {
    errors.title = "Title can't be empty or space";
  }

  if (updates?.description?.length < 6) {
    errors.description = "Description can't be empty or space";
  }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }
  await updateBlog(params.blogId, updates);
  return redirect(`/`);
}

export default function EditBlog() {
  const { blog } = useLoaderData();
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
            <TextareaAutosize
              maxRows={2}
              id="title"
              name="title"
              aria-label="Title"
              placeholder="Title"
              defaultValue={blog.title}
              style={{ width: 600 }}
            />
            {errors?.title && <span>{errors?.title}</span>}
            <span>Description</span>
            <TextareaAutosize
              maxRows={4}
              id="description"
              name="description"
              aria-label="Description"
              placeholder="Description"
              defaultValue={blog.description}
              style={{ width: 600 }}
            />
            {errors?.description && <span>{errors?.description}</span>}
            <ButtonSubmit label="Save" />
            <Button
              type="button"
              color="primary"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Form>
      </Box>
    </Container>
  );
}
