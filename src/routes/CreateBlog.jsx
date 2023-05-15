import { redirect } from 'react-router-dom';
import { BlogForm } from '../includes/components';
import { createBlog } from '../services';
import validateFormData from '../utils/inputValidation';

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const errors = validateFormData(updates);

  if (Object.keys(errors).length) {
    return errors;
  }

  const { status, payload } = await createBlog(updates);
  if (status === 'CREATE_FAIL') throw new Error(payload);
  return redirect(`/blogs/${payload.id}`);
}

export default function CreateBlog() {
  return <BlogForm option="Create" />;
}
