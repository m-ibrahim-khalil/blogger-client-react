// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Pagination from '@mui/material/Pagination';
// import Typography from '@mui/material/Typography';
// import { useState } from 'react';
// import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
// import { BlogListCard, Spinner } from '../includes/components';

// export function ListView({ items }) {
//   console.log('Listview Componenet');
//   const [searchParams] = useSearchParams();
//   const [page, setPage] = useState(parseInt(searchParams.get('page'), 10) || 1);
//   const navigate = useNavigate();
//   const { payload: blogs, totalPages } = items;

//   const handleChange = (event, value) => {
//     setPage(value);
//     navigate(`/blogs/?page=${value}`);
//   };

//   return (
//     <>
//       <Typography
//         variant="h6"
//         align="center"
//         style={{
//           fontFamily: 'Poppins',
//           fontWeight: 'bold',
//           color: '#863812',
//         }}
//       >
//         {blogs.length ? 'Blog List' : 'No Blog Found'}
//       </Typography>
//       {blogs.length && (
//         <>
//           <Divider />
//           <div>
//             {blogs.map((blog) => (
//               <BlogListCard key={blog.id} blog={blog} />
//             ))}
//           </div>
//           <Divider />
//           <Pagination count={totalPages} page={page} onChange={handleChange} />
//         </>
//       )}
//     </>
//   );
// }

// function BlogListView() {
//   const blogs = [
//     {
//       id: 1,
//       title: 'test',
//       description: 'Hello world',
//       author: { username: 'ibrahim' },
//     },
//     {
//       id: 2,
//       title: 'test',
//       description: 'Hello world',
//       author: { username: 'ibrahim' },
//     },
//     {
//       id: 3,
//       title: 'test',
//       description: 'Hello world',
//       author: { username: 'ibrahim' },
//     },
//   ];
//   const state = 'loading';
//   return (
//     <Box component="nav" aria-label="blog list">
//       {state === 'loading' && <Spinner />}
//       <ListView items={blogs} />
//     </Box>
//   );
// }

// export default BlogListView;
