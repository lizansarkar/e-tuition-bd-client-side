import React from "react";
import UseAuth from "../hooks/UseAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/ui/Loading";

export default function PrivateRoute({ children }) {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/register"></Navigate>;
  }

  // if (requiredRole && role !== requiredRole) {
  //   // Logged in but wrong role: Redirect to a forbidden/unauthorized page or their own dashboard
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children;
}
