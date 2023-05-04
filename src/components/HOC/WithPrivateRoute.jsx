import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

function WithPrivateRoute({ children }) {
  const { authUser } = useAuth();
  const { username } = useParams();
  console.log(authUser, username);

  if (authUser) {
    if (!username) return children;
    if (username && authUser === username) return children;
    return <Navigate to="/signin" />;
  }

  return <Navigate to="/signin" />;
}

export default WithPrivateRoute;
