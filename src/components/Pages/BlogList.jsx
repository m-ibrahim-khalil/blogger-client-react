import { Box } from '@material-ui/core';
import React from 'react';
import Spinner from './Spinner';

function BlogList() {
  const blogs = [
    {
      id: 1,
      title: 'test',
      description: 'Hello world',
      author: { username: 'ibrahim' },
    },
    {
      id: 2,
      title: 'test',
      description: 'Hello world',
      author: { username: 'ibrahim' },
    },
    {
      id: 3,
      title: 'test',
      description: 'Hello world',
      author: { username: 'ibrahim' },
    },
  ];
  const state = 'loading';
  return (
    <Box component="nav" aria-label="blog list">
      {state === 'loading' ? (
        <Spinner />
      ) : (
        blogs.map((blog) => console.log(blog))
      )}
    </Box>
  );
}

export default BlogList;
