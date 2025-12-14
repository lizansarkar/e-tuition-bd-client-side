import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BadgeAlert, Check, Clock, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import useAuth from "../../../hooks/UseAuth";
import useAxiosSicure from "../../../hooks/useAxiosSicure";
import Swal from "sweetalert2";

export default function TutorMyApplications() {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSicure();

  // 1. Fetching Tutor's Applications using React Query
  const {
    data: applications = [], // Default to an empty array
    isLoading,
    error,
    refetch, // Data update korle re-fetch korar jonno
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      if (!user?.email) return []; // User na thakle fetch korbe na

      // Backend route call kora holo
      const res = await axiosSecure.get(`/tutor/applications/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !authLoading, // User email thakle ebong loading na thakle shuru hobe
  });

  const handleDelete = (applicationId, tutorName) => {
    Swal.fire({
      title: `Delete application by ${tutorName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/applications/${applicationId}`);

        if (res.data.deletedCount > 0) {
          Swal.fire(
            "Deleted!",
            "Your application has been deleted.",
            "success"
          );
          refetch(); // ✅ Data refresh korar jonne
        } else {
          Swal.fire("Error", "Failed to delete the application.", "error");
        }
      }
    });
  };

  const handleUpdate = (app) => {
    // Example: Using Swal.fire to get new salary
    Swal.fire({
      title: `Update Salary for ${app.tutorName}`,
      input: "text",
      inputValue: app.expectedSalary,
      showCancelButton: true,
      confirmButtonText: "Update",
      inputValidator: (value) => {
        if (!value || isNaN(value) || Number(value) <= 0) {
          return "Please enter a valid amount";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newSalary = Number(result.value);

        // 🚩 Step 2: Prepare updated data
        const updatedData = {
          expectedSalary: newSalary,
        };

        // 🚩 Step 3: API call
        const res = await axiosSecure.patch(
          `/applications/${app._id}`,
          updatedData
        );

        if (res.data.modifiedCount > 0) {
          Swal.fire(
            "Updated!",
            "Application salary updated successfully.",
            "success"
          );
          refetch(); // ✅ Data refresh korar jonne
        } else {
          Swal.fire("Not Updated", "No changes were made.", "info");
        }
      }
    });
  };

  // --- Loading State Handling ---
  if (isLoading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error loading applications: {error.message}
      </div>
    );
  }

  // --- Status Badge Component ---
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="badge badge-success text-white">
            Approved <Check className="w-4 h-4 ml-1" />
          </span>
        );
      case "Pending":
        return (
          <span className="badge badge-warning text-white">
            Pending <Clock className="w-4 h-4 ml-1" />
          </span>
        );
      case "Rejected":
        return (
          <span className="badge badge-error text-white">
            Rejected <BadgeAlert className="w-4 h-4 ml-1" />
          </span>
        );
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  // --- Main Component Render ---
  return (
    <div className="py-10 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            My Applications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Track the status of your tuition applications.
          </p>
        </header>

        {applications.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
              You have not submitted any applications yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
            <table className="table w-full">
              {/* Table head */}
              <thead className="text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th>#</th>
                  <th>Tuition Subject</th>
                  <th>Expected Salary</th>
                  <th>Application Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <th>{index + 1}</th>

                    {/* Tuition Subject/Title (Assuming a 'tuitionTitle' field exists or can be derived) */}
                    <td className="font-medium text-gray-900 dark:text-white">
                      {/* Note: Apnar application object-e tuition er detail na thakle, eti 'tuitionId' theke fetch korte hobe */}
                      {app.tuitionTitle ||
                        "Tuition ID: " + app.tuitionId.substring(0, 8) + "..."}
                    </td>

                    {/* Budget Offer */}
                    <td>
                      <span className="font-bold text-primary">
                        {app.expectedSalary} BDT
                      </span>
                    </td>

                    {/* Application Date */}
                    <td>
                      {app.appliedAt &&
                        format(new Date(app.appliedAt), "MMM dd, yyyy")}
                    </td>

                    {/* Status */}
                    <td>{getStatusBadge(app.status)}</td>

                    {/* Actions */}
                    <td>
                      {app.status === "Pending" ? (
                        <div className="space-x-2">
                          {/* Update Button */}
                          <button
                            className="btn btn-sm text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition duration-150 mx-2 cursor-pointer"
                            data-tip="Update Application"
                            onClick={() => handleUpdate(app)} // ✅ Handler attached
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {/* Delete Button */}
                          <button
                            className="btn btn-sm tooltip text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            data-tip="Delete Application"
                            onClick={() => handleDelete(app._id, app.tutorName)} // ✅ Handler attached
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Locked
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
