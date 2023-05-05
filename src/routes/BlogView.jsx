import { redirect, useLoaderData } from 'react-router-dom';
import BlogCard from '../components/generics/BlogCard';
import { deleteBlog, getBlogById } from '../services/blogService';

export async function loader({ params }) {
  const blog = await getBlogById(params.blogId);
  return { blog };
}

export async function action({ params }) {
  await deleteBlog(params.blogId);
  return redirect('/blogs');
}

export default function BlogView() {
  const { blog } = useLoaderData();
  const blogPost = {
    avatar: '/images/cats.jpg',
    favorite: true,
    ...blog,
  };

  return <BlogCard blog={blogPost} />;
}
