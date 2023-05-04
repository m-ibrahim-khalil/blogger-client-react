import { redirect } from 'react-router-dom';
import BlogForm from '../components/generics/BlogForm';
import { createBlog } from '../services/blogService';

export async function action({ request }) {
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

  const { status, payload } = await createBlog(updates);
  if (status === 'CREATE_FAIL') throw new Error(payload);
  return redirect(`/blogs/${payload.id}`);
}

export default function CreateBlog() {
  //   const blog = { title: '', description: '' };
  return <BlogForm />;
}
