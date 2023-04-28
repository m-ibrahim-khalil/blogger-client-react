import { Box, Typography } from '@mui/material';
import React from 'react';
import { Form, Link, useLoaderData } from 'react-router-dom';

function SideBar() {
  const { blogs } = useLoaderData();
  const { payload } = blogs;

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h4" align="inherit">
        Blog List
      </Typography>
      <Form method="post">
        <button type="submit">Create Blog</button>
      </Form>
      <nav>
        {payload.length ? (
          <ul>
            {payload.map((blog) => (
              <li key={blog.id}>
                <Link to={`blogs/${blog.id}`}>
                  {blog.title} {blog.favorite && <span>★</span>}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No blogs</i>
          </p>
        )}
      </nav>
    </Box>
  );
}

export default SideBar;
