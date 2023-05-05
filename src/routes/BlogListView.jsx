import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import BlogListCard from '../components/generics/BlogListCard';

function BlogListView() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { blogs } = useLoaderData();
  const { payload, totalPages } = blogs;

  const handleChange = (event, value) => {
    setPage(value);
    navigate(`/?page=${value}`);
  };

  const drawer = (
    <div>
      <Typography
        variant="h6"
        align="center"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          color: '#863812',
        }}
      >
        Blog List
      </Typography>
      <Divider />
      <div>
        {payload.map((blog) => (
          <BlogListCard key={blog.id} blog={blog} />
        ))}
      </div>
      <Divider />
      <Outlet />
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </div>
  );

  return (
    <Box component="nav" aria-label="blog list">
      {drawer}
    </Box>
  );
}

export default BlogListView;
