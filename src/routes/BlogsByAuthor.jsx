import { Box } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { getBlogsByAuthor } from '../services';
import { ListView } from './BlogListView';

export async function loader({ params, request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;
  const blogs = await getBlogsByAuthor(params?.authorId, page);
  return { blogs };
}

export default function BlogsByAuthor() {
  const { blogs } = useLoaderData();

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ListView items={blogs} />
    </Box>
  );
}
