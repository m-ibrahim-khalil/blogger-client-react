import { redirect, useLoaderData } from 'react-router-dom';
import BlogForm from '../components/generics/BlogForm';
import { updateBlog } from '../services/blogService';
import { getAuthUsername } from '../utils/jwt';

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = {};
  if (!updates?.title.trim()) {
    errors.title = "Title can't be empty or space";
  }

  if (!updates?.description.trim()) {
    errors.description = "Description can't be empty or space";
  }

  if (Object.keys(errors).length) {
    return errors;
  }
  const { status, payload } = await updateBlog(params.blogId, updates);
  if (status === 'UPDATE_FAIL') throw new Error(payload);
  return redirect(`/blogs/${params.blogId}`);
}

export default function EditBlog() {
  const { blog } = useLoaderData();
  const authenticateUser = getAuthUsername();
  if (authenticateUser !== blog?.author) {
    return <p>You have no access to edit the blog</p>;
  }

  return <BlogForm blog={blog} />;
}
