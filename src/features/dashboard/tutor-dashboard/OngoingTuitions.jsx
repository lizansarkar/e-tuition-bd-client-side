import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ListChecks, Clock, User, DollarSign, Calendar } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSicure from "../../../hooks/useAxiosSicure";

export default function OngoingTuitions() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSicure();

  // 🚩 Assumption: user object-e user-er 'role' field ache.
  // Jodi 'role' user object-e na thake, tobe alada API theke fetch korte hobe.
  const userRole = user?.role || "Student"; // Default Student dhore nilam

  // --- Data Fetching Logic ---
  const {
    data: ongoingTuitions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ongoingTuitions", user?.email, userRole],
    queryFn: async () => {
      if (!user?.email) return [];

      const res = await axiosSecure.get(`/ongoing-tuitions`, {
        params: {
          email: user.email,
          role: userRole,
        },
      });
      return res.data;
    },
    enabled: !!user?.email && !loading, // User logged-in holei fetch korbe
  });

  // --- Loading State ---
  if (loading || isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        Error fetching tuition data. Please check your connection.
      </div>
    );
  }

  // --- Empty State ---
  if (ongoingTuitions.length === 0) {
    return (
      <div className="text-center py-20">
        <Clock className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700">
          No Ongoing Tuitions Yet
        </h3>
        <p className="text-gray-500 mt-2">
          {userRole === "Tutor"
            ? "You currently have no approved tuitions."
            : "Your approved applications will appear here as ongoing tuitions."}
        </p>
      </div>
    );
  }

  // --- Main Render Logic ---
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
        <ListChecks className="w-7 h-7 mr-3 text-green-600" />
        Ongoing Tuitions ({ongoingTuitions.length})
      </h2>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th>Sl.</th>
              <th>{userRole === "Tutor" ? "Student Info" : "Tutor Info"}</th>
              <th>Subject</th>
              <th>Class/Level</th>
              <th>Fee</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700 text-sm font-light">
            {ongoingTuitions.map((app, index) => (
              <tr
                key={app._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td>{index + 1}</td>

                {/* Info Column (Opposite User) */}
                <td>
                  <div className="font-semibold flex items-center">
                    <User className="w-4 h-4 mr-2 text-indigo-500" />
                    {userRole === "Tutor" ? app.applicantName : app.tutorName}
                  </div>
                  <span className="text-xs text-gray-500">
                    {userRole === "Tutor" ? app.applicantEmail : app.tutorEmail}
                  </span>
                </td>

                {/* Subject & Level */}
                <td>{app.subject}</td>
                <td>{app.level}</td>

                {/* Fee */}
                <td className="font-bold text-green-600 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {app.fee} BDT
                </td>

                {/* Status */}
                <td>
                  <span className="badge badge-lg bg-green-100 text-green-700 border-none font-medium">
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
