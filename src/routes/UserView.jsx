import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import UserCard from '../components/generics/UserCard';
import {
  deleteUserByUsername,
  getUserByUsername,
} from '../services/userService';

export async function loader({ params }) {
  const user = await getUserByUsername(params.username);
  return user;
}

export async function action({ params }) {
  await deleteUserByUsername(params.username);
  return redirect(`/`);
}

export default function User() {
  const { payload: user } = useLoaderData();
  const userCard = {
    avatar: 'https://placekitten.com/g/200/200',
    ...user,
  };

  return (
    <>
      <UserCard user={userCard} />
      <Outlet />
    </>
  );
}
