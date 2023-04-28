import { Form, redirect, useLoaderData } from 'react-router-dom';
import {
  deleteUserByUsername,
  getUserByUsername,
} from '../services/userService';

export async function loader({ params }) {
  const user = await getUserByUsername(params.username);
  console.log(user);
  return user;
}

export async function action({ params }) {
  await deleteUserByUsername(params.username);
  console.log('Del');
  return redirect(`/`);
}

export default function User() {
  const { payload: user } = useLoaderData();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userCard = {
    avatar: 'https://placekitten.com/g/200/200',
    ...user,
  };

  return (
    <div id="user">
      <div>
        <img
          key={userCard.avatar}
          src={userCard.avatar || null}
          alt="user profile"
        />
      </div>

      <div>
        <h1>{userCard.username}</h1>

        <p>{userCard.email}</p>

        {userCard.createdAt && (
          <p>
            Member Since: <span>{userCard.createdAt}</span>
          </p>
        )}

        {/* {userCard?.stories?.length ? (
          <ul>
            {userCard.stories.map((story) => (
              <li key={story.id}>
                <Link to={`blogs/${story.id}`}>{story.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No blogs</i>
          </p>
        )} */}

        <Form action={`blogs/${userCard.id}`}>
          <button type="submit">Show Blogs</button>
        </Form>

        {currentUser === userCard.username ? (
          <div>
            <Form action="update">
              <button type="submit">Update Password</button>
            </Form>
            <Form
              method="delete"
              onSubmit={(event) => {
                // eslint-disable-next-line no-restricted-globals
                if (
                  !confirm('Please confirm you want to delete the account.')
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete Account</button>
            </Form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
