import React from "react";
import UseAuth from "../hooks/UseAuth";
import Loading from "../components/common/Loading";
import UseRole from "../hooks/UseRole";
import Forbidden from "../components/unCommon/Forbidden";

export default function AdminRoute({children}) {
  const { loading } = UseAuth();
  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== 'admin') {
    return <Forbidden></Forbidden>
  }

  return children;
}
