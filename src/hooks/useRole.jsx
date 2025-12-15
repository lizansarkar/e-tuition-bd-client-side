import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSicure from "./useAxiosSicure";

export default function UseRole() {
  const { user } = UseAuth(); // user object (jeykhane role nei)
  const axiosSecure = useAxiosSicure();
  const userEmail = user?.email;
  // console.log("UseRole hook called for:", userEmail);

  const { isLoading: roleLoading, data: role = "student" } = useQuery({
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
