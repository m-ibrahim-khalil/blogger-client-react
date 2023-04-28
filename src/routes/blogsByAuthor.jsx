import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getBlogsByAuthor } from '../services/blogService';

export async function loader({ params }) {
  console.log(params);
  const blogs = await getBlogsByAuthor(params?.authorId);
  return { blogs };
}

export default function BlogsByAuthor() {
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
        {payload[0].author}'s Blogs
      </Typography>
      <nav>
        {payload.length ? (
          <ul>
            {payload.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
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
