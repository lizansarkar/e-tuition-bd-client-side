import React from 'react'
import UseAuth from '../hooks/UseAuth'
import Loading from '../components/common/Loading';
import { Navigate, useLocation } from 'react-router';

export default function PrivateRoute({children}) {
  const {user, loading} = UseAuth();
  const location = useLocation();

  if(loading) {
    return <Loading></Loading>
  }

  if(!user) {
    return <Navigate state={location.pathname} to="/register"></Navigate>
  }

  return children;
}