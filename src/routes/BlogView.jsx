import { redirect, useLoaderData } from 'react-router-dom';
import { BlogDetailsCard } from '../includes/components';
import { deleteBlog, getBlogById } from '../services';

export async function loader({ params }) {
  console.log('Get single blog loader');
  const blog = await getBlogById(params.blogId);
  return { blog };
}

export async function action({ params }) {
  console.log('Delete blog action');
  await deleteBlog(params.blogId);
  return redirect('/blogs');
}

export default function BlogView() {
  const { blog } = useLoaderData();
  console.log('BlogView Componenet');
  const blogPost = {
    avatar: '/images/cats.jpg',
    favorite: true,
    ...blog,
  };

  return <BlogDetailsCard blog={blogPost} />;
}
