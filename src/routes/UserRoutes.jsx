import { Routes, Route } from 'react-router-dom';
import { NotFoundPage, UsersLayout } from '../includes/components';
// import User from './UserView';
// import UpdatePassword from './UpdatePassword';

export default function UserRoutes() {
  return (
    <Routes>
      <Route element={<UsersLayout />}>
        {/* <Route path=":username" element={<User />} />
        <Route path=":username/updatePassword" element={<UpdatePassword />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
