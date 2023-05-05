import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import UserCard from '../components/generics/UserCard';
import {
  deleteUserByUsername,
  getUserByUsername,
} from '../services/userService';
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

  return (
    <>
      <UserCard user={userCard} />
      <Outlet />
    </>
  );
}
