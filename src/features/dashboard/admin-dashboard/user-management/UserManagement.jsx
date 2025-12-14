import React from "react";
import { useQuery } from "@tanstack/react-query";

import { User, Mail, Shield, Loader, Edit, Trash2 } from "lucide-react";
import useAxiosSicure from "../../../../hooks/useAxiosSicure";
import Swal from "sweetalert2";

export default function UserManagement() {
  const axiosSecure = useAxiosSicure();

  // --- Data Fetching Logic (TanStack Query) ---
  const {
    data: users = [], // Shob user data
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsersAdmin"],
    queryFn: async () => {
      // Backend API call
      const res = await axiosSecure.get(`/users/all`);
      return res.data;
    },
  });

  // --- Edit Role users management Functionality ---
  const handleEditRole = (user) => {
    const availableRoles = ["Student", "Tutor", "Admin"];

    Swal.fire({
      title: `Change Role for ${user.displayName}`,
      input: "select",
      inputOptions: availableRoles.reduce((acc, role) => {
        acc[role] = role;
        return acc;
      }, {}),
      inputValue: user.role, // Default value current role
      showCancelButton: true,
      confirmButtonText: "Confirm Role Change",
    }).then(async (result) => {
      if (result.isConfirmed && result.value !== user.role) {
        const newRole = result.value;

        // Prepare updated data: Shudhu 'role' field update kora holo
        const updatedData = { role: newRole };

        try {
          // API Call: PATCH /users/:id
          const res = await axiosSecure.patch(
            `/users/${user._id}`,
            updatedData
          );

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Updated!",
              text: `${user.displayName}'s role updated to ${newRole}.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            refetch(); // ✅ Table data refresh kora holo
          } else {
            Swal.fire("Not Updated", "No changes were made.", "info");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update user role.", "error");
        }
      }
    });
  };

  // --- Delete User Functionality ---
  const handleDelete = (userId, displayName) => {
    Swal.fire({
      title: `Are you sure to delete ${displayName}?`,
      text: "This action is irreversible and will delete the account permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete Account!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // API Call: DELETE /users/:id
          const res = await axiosSecure.delete(`/users/${userId}`);

          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `${displayName}'s account has been deleted.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            refetch(); // ✅ Table data refresh kora holo
          } else {
            Swal.fire("Error", "Account deletion failed.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Server error during deletion.", "error");
        }
      }
    });
  };

  // --- Status/Role Badge (for better visual) ---
  const getRoleBadge = (role) => {
    let colorClass = "badge-ghost";
    switch (role) {
      case "Admin":
        colorClass = "badge-error text-white";
        break;
      case "Tutor":
        colorClass = "badge-warning text-white";
        break;
      case "Student":
      default:
        colorClass = "badge-info text-white";
        break;
    }
    return <span className={`badge ${colorClass}`}>{role}</span>;
  };

  // --- Loading, Error, Empty State Handling ---
  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error: Failed to fetch user data.
      </div>
    );
  }
  if (users.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
          No registered users found.
        </p>
      </div>
    );
  }

  // --- Main Component Render (Data Table) ---
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
        <User className="w-7 h-7 mr-3" />
        Users Management ({users.length} Users)
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <table className="table w-full">
          <thead>
            <tr className="text-sm uppercase bg-gray-100 dark:bg-gray-700">
              <th>#</th>
              <th>User Details</th>
              <th>Role / Status</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td>{index + 1}</td>
                {/* User Details (Name, Email, Image) */}
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user.photoURL ||
                            "https://via.placeholder.com/150?text=No+Img"
                          }
                          alt={user.displayName || "User"}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.displayName || "N/A"}
                      </div>
                      <div className="text-sm opacity-70 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Role & Status */}
                <td>
                  {getRoleBadge(user.role)}
                  <br />
                  <button
                    className={`btn btn-primary badge badge-ghost badge-sm mt-1`}
                  >
                    {user.phone ? "Verified" : "Unverified"}
                  </button>
                </td>

                {/* Created At */}
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                {/* Actions (Placeholder for now) */}
                <th>
                  <div className="flex space-x-2">
                    {/* Edit/Update Role Button */}
                    <button
                      className="btn btn-ghost btn-xs text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditRole(user)} // ✅ Handler attached
                      data-tip="Change Role"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {/* Delete Button */}
                    <button
                      className="btn btn-ghost btn-xs text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(user._id, user.displayName)} // ✅ Handler attached
                      data-tip="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
