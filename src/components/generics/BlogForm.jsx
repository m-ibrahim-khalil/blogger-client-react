import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextareaAutosize,
  Typography,
} from '@mui/material';

import React from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import ButtonSubmit from './ButtonSubmit';

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
            <TextareaAutosize
              maxRows={2}
              id="title"
              name="title"
              aria-label="Title"
              placeholder="Title"
              defaultValue={blog?.title}
              style={{ width: 600 }}
            />
            {errors?.title && (
              <span style={{ color: 'red' }}>{errors?.title}</span>
            )}
            <br />
            <span>Description</span>
            <TextareaAutosize
              minRows={6}
              maxRows={10}
              id="description"
              name="description"
              aria-label="Description"
              placeholder="Description"
              defaultValue={blog?.description}
              style={{ width: 600 }}
            />
            {errors?.description && (
              <span style={{ color: 'red' }}>{errors?.description}</span>
            )}
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
