import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Mail,
  Briefcase,
  DollarSign,
  Clock,
  Calendar,
  MapPin,
  Loader,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { format } from "date-fns";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import Loading from "../../components/ui/Loading";

export default function AllTutor() {
  const axiosSecure = useAxiosSicure();

  // --- 1. Data Fetching Logic ---
  const {
    data: applications = [], // Default empty array for safety
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pendingApplications"],
    queryFn: async () => {
      // Backend API call to fetch ONLY pending applications
      const res = await axiosSecure.get(`/all-applications/pending`);
      return res.data;
    },
  });

  // --- 2. Hire/Accept Functionality (Placeholder for next step) ---
  const handleHire = (application) => {
    // Eita apnar poroborti step. Afatoto shudhu alert dewa holo.
    Swal.fire({
      title: "Tutor Hiring Placeholder",
      text: `You are attempting to HIRE or ACCEPT ${application.tutorName} for tuition ID ${application.tuitionId}.`,
      icon: "info",
      confirmButtonText: "Okay",
    });
    // Porobortite ekhane PATCH API call kore application status 'Accepted' korte hobe.
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each card will appear slightly after the previous one
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // --- 3. Loading, Error, Empty State Handling ---
  if (isLoading) {
    return <Loading></Loading>
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error: Failed to fetch applications from server.
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 flex items-center justify-center">
          <FileText className="w-6 h-6 mr-3" /> No pending tutor applications
          found.
        </p>
      </div>
    );
  }

  // --- 4. Main Component Render (Grid Layout) ---
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b-2 pb-2">
        Pending Tutor Applications ({applications.length})
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {applications.map((app) => (
          <motion.div
            key={app._id}
            variants={itemVariants}
            className="card bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
          >
            <div className="card-body p-5">
              <div className="badge badge-warning text-white font-bold mb-3">
                {app.status}
              </div>

              {/* Tutor Details */}
              <h3 className="text-xl font-bold text-primary mb-2">
                {app.tutorName || "Unknown Tutor"}
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                {/* Email */}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span>{app.tutorEmail}</span>
                </div>

                {/* Qualification */}
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                  <p className="leading-tight">
                    <span className="font-semibold block">Qualification:</span>{" "}
                    {app.qualifications || "N/A"}
                  </p>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>Experience: {app.experience || "N/A"}</span>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700 my-3"></div>

                {/* Salary & Budget */}
                <div className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">
                      Salary: ৳{app.expectedSalary}
                    </span>
                  </div>
                  <div className="text-xs font-medium badge badge-outline badge-primary">
                    Budget: ৳{app.tuitionBudget}
                  </div>
                </div>

                {/* Applied Date */}
                <div className="flex items-center gap-2 pt-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-xs italic">
                    Applied On:{" "}
                    {app.appliedAt
                      ? format(new Date(app.appliedAt), "MMM dd, yyyy")
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-primary btn-sm w-full"
                  onClick={() => handleHire(app)}
                >
                  Review & Hire (Next Step)
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
