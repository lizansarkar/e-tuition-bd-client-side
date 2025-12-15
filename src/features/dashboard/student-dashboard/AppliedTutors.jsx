import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck, XCircle, DollarSign, Loader } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSicure";
import Swal from "sweetalert2";
import Loading from "../../../components/ui/Loading";

export default function AppliedTutors() {
  const { tuitionId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    isLoading,
    error,
  } = useQuery({
    // Key is changed to fetch ALL data
    queryKey: ["allAppliedTutors"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications`);
      return res.data;
    },
  });

  // --- Status Badge Component ---
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="badge badge-success text-white">
            Approved <CheckCheck className="w-4 h-4 ml-1" />
          </span>
        );
      case "Pending":
        return (
          <span className="badge badge-warning text-white">
            Pending <Loader className="w-4 h-4 ml-1 animate-spin" />
          </span>
        );
      case "Rejected":
        return (
          <span className="badge badge-error text-white">
            Rejected <XCircle className="w-4 h-4 ml-1" />
          </span>
        );
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  const handleReject = (applicationId, tutorName) => {
    Swal.fire({
      title: `Reject ${tutorName}'s application?`,
      text: "This action will reject the application and cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 🚩 Step 2.1: Backend API call
          const res = await axiosSecure.patch(
            `/applications/reject/${applicationId}`
          );

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Rejected!",
              text: `${tutorName}'s application has been rejected.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            // 🚩 Step 2.2: Data refresh kora
            refetch();
          } else {
            Swal.fire("Error", "Application status not changed.", "error");
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
  // --- Loading and Error Handling ---
  if (isLoading) {
    return <Loading></Loading>
  }
  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error: Failed to fetch applications. Check backend server and the
        `/applications/all` route.
      </div>
    );
  }
  if (applications.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
          No applications found in the database.
        </p>
      </div>
    );
  }

  // --- Main Component Render (Data Display in a Table) ---
  return (
    <div className="p-4 md:p-10 container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Tutor Applications List
      </h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <table className="table w-full">
          <thead>
            <tr className="text-lg">
              <th>Tutor</th>
              <th>Qualifications & Exp.</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {/* Tutor Name & Email */}
                <td>
                  <div className="font-bold">{app.tutorName}</div>
                  <div className="text-sm opacity-50">{app.tutorEmail}</div>
                </td>
                {/* Qualifications and Experience */}
                <td>
                  {app.qualifications}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {app.experience}
                  </span>
                </td>
                {/* Expected Salary */}
                <td className="font-bold text-lg text-green-600">
                  {app.expectedSalary} BDT
                </td>
                {/* Status */}
                <td>{getStatusBadge(app.status)}</td>

                {/* Actions (Buttons) */}
                <th>
                  {app.status === "Pending" ? (
                    <div className="flex flex-col space-y-2">
                      <Link
                        to={`/dashboard/student/payments/${app._id}`}
                        className="btn btn-success btn-sm text-white"
                      >
                        Approve
                      </Link>
                      <Link
                        onClick={() => handleReject(app._id, app.tutorName)}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        Reject
                      </Link>
                    </div>
                  ) : (
                    <button className="btn btn-disabled btn-sm">
                      {app.paymentStatus}
                    </button>
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
