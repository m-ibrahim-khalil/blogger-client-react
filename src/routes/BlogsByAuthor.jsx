// import { Box } from '@mui/material';
// import { useLoaderData, useNavigate } from 'react-router-dom';
// import { getBlogsByAuthor } from '../services';
// import { ListView } from './BlogListView';
// import { Spinner } from '../components/Pages';

// export async function loader({ params, request }) {
//   console.log('BlogAuthor Loader');
//   const url = new URL(request.url);
//   const page = url.searchParams.get('page') || 1;
//   const blogs = await getBlogsByAuthor(params?.authorId, page);
//   return { blogs };
// }

// export default function BlogsByAuthor() {
//   console.log('BlogAuthor Componenet');

//   return (
//     <Box
//       sx={{
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       {state === 'loading' && <Spinner />}
//       <ListView items={blogs} />
//     </Box>
//   );
// }
