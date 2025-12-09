import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  X,
  Check,
} from "lucide-react";
import useAxiosSicure from "../../../hooks/useAxiosSicure";
import useAuth from "../../../hooks/UseAuth";


const AppliedTutors = () => {
  // 1. URL theke tuition ID extract kora
  const { tuitionId } = useParams();
  const axiosSicure = useAxiosSicure();
  const { user } = useAuth();

  // 2. Data Fetch Kora: Specific tuition-er jonno applied tutors list
  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    // tuitionId must exist to enable the query
    queryKey: ["appliedTutors", tuitionId],
    enabled: !!tuitionId && !!user?.email,
    queryFn: async () => {
      const res = await axiosSicure.get(`/applied-tutors/${tuitionId}`);
      return res.data;
    },
  });

  // Handle Action... (Unchanged)
  const handleAction = async (tutorEmail, action) => {
    const actionText = action === "accept" ? "Accept" : "Reject";

    Swal.fire({
      title: `${actionText} this tutor?`,
      text: `You are about to ${actionText.toLowerCase()} the application.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "accept" ? "#10B981" : "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: `Yes, ${actionText} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSicure.put("/applications/update-status", {
            tuitionId,
            tutorEmail,
            status: action === "accept" ? "Accepted" : "Rejected",
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: `Tutor application has been ${actionText.toLowerCase()}ed.`,
              icon: "success",
            });
            refetch();
          } else {
            Swal.fire(
              "Info",
              "Status was already set or failed to update.",
              "info"
            );
          }
        } catch (error) {
          console.error("Action Error:", error);
          Swal.fire(
            "Error",
            `Failed to ${actionText.toLowerCase()} the application.`,
            "error"
          );
        }
      }
    });
  };

  // --- Loading, Error, and Missing ID States ---
  if (!tuitionId) {
    // ✅ NEW CHECK: Jodi tuitionId na thake
    return (
      <div className="text-center py-20 text-red-500">
        Error: Tuition ID is missing in the URL.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-20 text-xl dark:text-gray-300">
        Loading tutor applications for Tuition ID: {tuitionId}...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading applications. Please try again later.
      </div>
    );
  }

  // --- Main UI Rendering ---
  return (
    <motion.section
      className="p-4 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4">
          Tutor Applications for Post ID:
          {/* ✅ FIX: Conditional rendering use kora holo */}
          <span className="text-primary ml-2">
            {tuitionId.length > 8
              ? `${tuitionId.substring(0, 8)}...`
              : tuitionId}
          </span>
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold dark:text-white">
              No applications received yet!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Wait for tutors to apply to your tuition post.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <motion.div
                key={app.tutorEmail}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border-t-4 border-primary/70 dark:border-primary/50 transition-all hover:shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-4 border-b pb-3 dark:border-gray-600">
                  <User className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {app.tutorName || "Unknown Tutor"}
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                    **Qualification:** {app.qualification || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    **Experience:** {app.experience || "Not specified"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    **Email:** {app.tutorEmail}
                  </p>
                  {app.contactNumber && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      **Contact:** {app.contactNumber}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t dark:border-gray-600 flex flex-col gap-2">
                  <p className="font-semibold text-base dark:text-white">
                    Status:
                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </p>

                  {app.status === "Pending" && (
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleAction(app.tutorEmail, "accept")}
                        className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition duration-200"
                      >
                        <Check className="w-4 h-4" /> Accept
                      </button>
                      <button
                        onClick={() => handleAction(app.tutorEmail, "reject")}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition duration-200"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}
                  {app.status !== "Pending" && (
                    <p className="mt-3 text-center text-sm italic text-gray-500 dark:text-gray-400">
                      Action taken.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default AppliedTutors;
