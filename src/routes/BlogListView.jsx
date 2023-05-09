import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { BlogListCard } from '../includes/components';

function BlogListView() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get('page'), 10) || 1);
  const navigate = useNavigate();
  const { blogs } = useLoaderData();
  const { payload, totalPages } = blogs;

  const handleChange = (event, value) => {
    setPage(value);
    navigate(`/blogs/?page=${value}`);
  };

  return (
    <Box component="nav" aria-label="blog list">
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
          <i>No Blogs Found</i>
        </Typography>
      )}
    </Box>
  );
}

export default BlogListView;
