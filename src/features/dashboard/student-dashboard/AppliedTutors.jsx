import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck, XCircle, DollarSign, Loader } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSicure";

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
      const res = await axiosSecure.get(`/applications/all`);
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

  const handleAction = (action, app) => {
    // Dummy logic: Shudhu alert dewa holo
    alert(
      `${action} clicked for ${app.tutorName}. Functional API logic needed here.`
    );
  };

  // --- Loading and Error Handling ---
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
    <div className="p-4 md:p-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        🧑‍🏫 Tutor Applications List
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
                <td className="font-bold text-lg text-red-600 dark:text-red-400">
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
                        to={`/dashboard/student/applied-tutors/reject/${app._id}`}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        Reject
                      </Link>
                    </div>
                  ) : (
                    <button className="btn btn-disabled btn-sm">
                      {app.status}
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
