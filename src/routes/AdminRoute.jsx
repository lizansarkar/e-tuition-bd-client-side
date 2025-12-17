import React from "react";
import UseAuth from "../hooks/UseAuth";
import UseRole from "../hooks/useRole";

import Loading from "../components/ui/Loading";
import Forbidden from "./Forbidden";

export default function AdminRoute({children}) {
  const { loading } = UseAuth();
  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role?.toLowerCase() !== 'admin') {
    return <Forbidden></Forbidden>
  }

  return children;
}
