import React from 'react';
import { Outlet } from 'react-router-dom';
import { ButtonOutlined } from '../common/Button';

function UsersLayout() {
  return (
    <div>
      <ButtonOutlined>Go back</ButtonOutlined>
      <Outlet />
    </div>
  );
}

export default UsersLayout;
