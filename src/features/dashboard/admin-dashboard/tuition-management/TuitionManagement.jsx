import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  XCircle,
  Clock,
  Loader,
  User,
  BookOpen,
} from "lucide-react";
import Swal from "sweetalert2"; // Assuming SweetAlert2 is installed
import useAxiosSicure from "../../../../hooks/useAxiosSicure";
import Loading from "../../../../components/ui/Loading";

export default function TuitionManagement() {
  const axiosSecure = useAxiosSicure();

  // --- Data Fetching Logic ---
  const {
    data: tuitionPosts = [],
    isLoading,
    error,
    refetch, // ✅ Status update-er por table refresh korar jonne
  } = useQuery({
    queryKey: ["allTuitionPostsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/all`); // Step 1.A API call
      return res.data;
    },
  });

  // --- Status Update Handler (Common Function) ---
  const handleStatusUpdate = (postId, currentStatus, newStatus) => {
    if (currentStatus !== "Pending") {
      Swal.fire(
        "Action Blocked",
        `This post is already ${currentStatus}.`,
        "info"
      );
      return;
    }

    Swal.fire({
      title: `Confirm ${newStatus}?`,
      text: `Are you sure you want to change the status to ${newStatus}?`,
      icon: newStatus === "Approved" ? "warning" : "error",
      showCancelButton: true,
      confirmButtonColor: newStatus === "Approved" ? "#10B981" : "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: `Yes, ${newStatus} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // API Call: PATCH /tuitions/status/:id (Step 1.B API call)
          const res = await axiosSecure.patch(`/tuitions/status/${postId}`, {
            status: newStatus,
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: newStatus,
              text: `Tuition Post status updated to ${newStatus}.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            refetch(); // ✅ Data refresh kora holo
          } else {
            Swal.fire(
              "Error",
              "Status update failed or no change detected.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error",
            "Failed to connect to the server or update status.",
            "error"
          );
        }
      }
    });
  };

  // --- Helper function for Status Badge ---
  const getStatusBadge = (status) => {
    let colorClass = "";
    let icon = null;
    switch (status) {
      case "Approved":
        colorClass = "badge-success text-white";
        icon = <CheckCircle className="w-3 h-3 mr-1" />;
        break;
      case "Rejected":
        colorClass = "badge-error text-white";
        icon = <XCircle className="w-3 h-3 mr-1" />;
        break;
      case "Pending":
      default:
        colorClass = "badge-warning text-white";
        icon = <Clock className="w-3 h-3 mr-1" />;
        break;
    }
    return (
      <span className={`badge ${colorClass} flex items-center`}>
        {icon} {status}
      </span>
    );
  };

  // --- Loading/Error/Empty States ---
  if (isLoading) {
    return <Loading></Loading>
  }
  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error: Failed to fetch tuition data.
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
        <BookOpen className="w-7 h-7 mr-3" />
        Tuition Management ({tuitionPosts.length} Posts)
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <table className="table w-full">
          <thead>
            <tr className="text-sm uppercase bg-gray-100 dark:bg-gray-700">
              <th>#</th>
              <th>Post Details</th>
              <th>Budget / Tutor Req.</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitionPosts.map((post, index) => (
              <tr
                key={post._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td>{index + 1}</td>

                {/* Post Details */}
                <td>
                  <div className="font-bold">
                    {post.subject || "N/A"} - {post.gradeLevel || "N/A"}
                  </div>
                  <div className="text-sm opacity-70">
                    Area: {post.location}
                  </div>
                  {/* <div className="text-xs mt-1 italic">Posted by: {post.studentEmail}</div> */}
                </td>

                {/* Budget / Requirements */}
                <td>
                  <div className="font-semibold text-green-600 dark:text-green-400">
                    Budget: ${post.budget}
                  </div>
                  <div className="text-sm opacity-70">
                    Medium: {post.medium}
                  </div>
                </td>

                {/* Status */}
                <td>{getStatusBadge(post.status)}</td>

                {/* Actions (Approve/Reject) */}
                <th>
                  {post.status === "Pending" ? (
                    <div className="flex flex-col space-y-2">
                      <button
                        className="btn btn-success btn-xs text-white"
                        onClick={() =>
                          handleStatusUpdate(post._id, post.status, "Approved")
                        }
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        className="btn btn-error btn-xs text-white"
                        onClick={() =>
                          handleStatusUpdate(post._id, post.status, "Rejected")
                        }
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-sm italic ${
                        post.status === "Approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {post.status}
                    </span>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
