import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { UserDetailsCard } from '../includes/components';
import { deleteUserByUsername, getUserByUsername } from '../services';
import { removeCoockie } from '../utils/jwt';

export async function loader({ params }) {
  const user = await getUserByUsername(params.username);
  return user;
}

export async function action({ params }) {
  await deleteUserByUsername(params.username);
  removeCoockie();
  return redirect(`/blogs`);
}

export default function User() {
  const { payload: user } = useLoaderData();
  const userCard = {
    avatar: '/images/cat.jpg',
    ...user,
  };
  console.log('user view');

  return (
    <>
      <UserDetailsCard user={userCard} />
      <Outlet />
    </>
  );
}
