import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { updateBlog } from '../services/blogService';

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateBlog(params.blogId, updates);
  return redirect(`/`);
}

export default function EditBlog() {
  const { blog } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="Title"
          type="text"
          name="title"
          defaultValue={blog.title}
        />
      </p>

      <label>
        <span>Description</span>
        <textarea name="description" defaultValue={blog.description} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
