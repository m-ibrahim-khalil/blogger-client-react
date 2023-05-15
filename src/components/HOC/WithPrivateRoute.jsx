import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

function WithPrivateRoute({ children }) {
  console.log('Private Route');
  const { authUser } = useAuth();
  const { username } = useParams();

  if (authUser) {
    if (!username) return children;
    if (username && authUser === username) return children;
    return <Navigate to="/signin" />;
  }

  return <Navigate to="/signin" />;
}

export default WithPrivateRoute;
