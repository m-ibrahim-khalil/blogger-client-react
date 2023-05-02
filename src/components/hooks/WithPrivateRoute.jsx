import React from 'react';
import { Navigate } from 'react-router-dom';

function WithPrivateRoute({ children }) {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/signin" />;
}

export default WithPrivateRoute;
