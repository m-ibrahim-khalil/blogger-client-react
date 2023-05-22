import { redirect, useLoaderData } from 'react-router-dom';
import { BlogForm } from '../includes/components';
import { updateBlog } from '../services';
import { getAuthUsername } from '../utils/jwt';
import validateFormData from '../utils/formDataValidation';

export async function action({ request, params }) {
  console.log('Edit Componenet: action');
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = validateFormData(updates);

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
  console.log('Editblog Componenet');
  if (authenticateUser !== blog?.author) {
    return <p>You have no access to edit the blog</p>;
  }

  return <BlogForm blog={blog} option="Edit" />;
}
