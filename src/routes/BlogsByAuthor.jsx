import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { BlogListCard } from '../includes/components';
import { getBlogsByAuthor } from '../services';

export async function loader({ params }) {
  const blogs = await getBlogsByAuthor(params?.authorId);
  return { blogs };
}

export default function BlogsByAuthor() {
  const [page, setPage] = useState(1);
  const { blogs } = useLoaderData();
  const navigate = useNavigate();
  const { payload, totalPages } = blogs;

  const handleChange = (event, value) => {
    setPage(value);
    navigate(`/?page=${value}`);
  };

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {payload.length ? (
        <>
          <Typography
            variant="h6"
            align="center"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#863812',
            }}
          >
            {payload[0].author}&#39;s Blogs
          </Typography>
          <Divider />
          <div>
            {payload.map((blog) => (
              <BlogListCard key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      ) : (
        <Typography
          variant="h6"
          align="center"
          style={{
            fontFamily: 'Poppins',
            color: '#863812',
          }}
        >
          <i>No blogs</i>
        </Typography>
      )}
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Box>
  );
}
