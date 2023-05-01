import { redirect, useLoaderData } from 'react-router-dom';
import BlogCard from '../components/generics/BlogCard';
import { deleteBlog, getBlogById } from '../services/blogService';

export async function loader({ params }) {
  const blog = await getBlogById(params.blogId);
  return { blog };
}

export async function action({ params }) {
  await deleteBlog(params.blogId);
  return redirect('/');
}

export default function BlogView() {
  const { blog } = useLoaderData();
  const blogPost = {
    avatar: 'https://placekitten.com/g/200/200',
    favorite: true,
    ...blog,
  };

  return <BlogCard blog={blogPost} />;
}
