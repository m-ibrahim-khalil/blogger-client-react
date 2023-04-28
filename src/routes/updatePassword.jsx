import { Form, redirect, useNavigate } from 'react-router-dom';
import { updateUserByUsername } from '../services/userService';

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateUserByUsername(params.username, updates);
  return redirect('/');
}

export default function UpdatePassword() {
  const navigate = useNavigate();

  return (
    <Form method="put" id="update-pass">
      <p>
        <span>Password</span>
        <input
          placeholder="Enter New Password"
          aria-label="New Password"
          type="text"
          name="password"
        />
      </p>

      <p>
        <button type="submit">Update Password</button>
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
