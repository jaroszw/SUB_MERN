import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/context';

export const ProtectedRoute = () => {
  const [state] = useContext(UserContext);

  if (state.loading) {
    return <h1>Spinner</h1>;
  }

  return state.data ? <Outlet /> : <Navigate to="/" />;
};
