// import { useQuery } from '@tanstack/react-query'
// import React, { use } from 'react'
// import UseAuth from './UseAuth'
// import useAxiosSicure from './useAxiosSicure'

// export default function UseRole() {
//     const {user} = UseAuth()
//     const axiosSecure = useAxiosSicure();
//     const {isLoading: roleLoading, data : role = 'user' } = useQuery({
//         queryKey: ['user-role', user.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/${user.email}/role`)

//             return res.data?.role || 'user';
//         }
//     })
//   return {roleLoading, role}
// }

import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSicure from "./useAxiosSicure";

export default function UseRole() {
  const { user } = UseAuth(); // user object (jeykhane role nei)
  const axiosSecure = useAxiosSicure();
  const userEmail = user?.email;
  // console.log("UseRole hook called for:", userEmail);

  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", userEmail], // Key te email use kora holo
    queryFn: async () => {
      // Email thakleibe API call hobe
      const res = await axiosSecure.get(`/users/${userEmail}/role`);

      return res.data?.role || "user";
    },
    enabled: !!userEmail,
  });
  return { roleLoading, role };
}
