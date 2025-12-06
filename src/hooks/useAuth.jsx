import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function UseAuth() {
  const authInfo = use(AuthContext);
  return authInfo;
}