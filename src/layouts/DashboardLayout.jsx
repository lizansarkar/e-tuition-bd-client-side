import React from "react";
import { Outlet, Navigate } from "react-router";
import useAuth from "../hooks/UseAuth";
import Loading from "../components/ui/Loading";
import UseRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { loading, role } = useAuth();
  const { role: userRole } = UseRole();

  if (loading) {
    return <Loading />;
  }

  if (window.location.pathname === "/dashboard") {
    if (role === "student") return <Navigate to="/dashboard/student" replace />;
    if (role === "tutor") return <Navigate to="/dashboard/tutor" replace />;
    if (role === "admin") return <Navigate to="/dashboard/admin" replace />;

    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* header */}
      <Outlet />
      {/* footer */}
    </div>
  );
};

export default DashboardLayout;
