import React, { useState } from "react";
// ✅ Shothik import: react-router-dom
import { NavLink } from "react-router";
import {
  FileText,
  Pencil,
  Trash2,
  MapPin,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import UseAuth from "../../../hooks/UseAuth";
import useAxiosSicure from "../../../hooks/useAxiosSicure";
import EditTuitionModal from "./EditTuitionModal";
import Loading from "../../../components/ui/Loading";

// Helper to determine status color (No change needed)
const getStatusColor = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700 border-green-300";
    case "Pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Rejected":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

const MyTuitions = () => {
  // 1. Hooks for Authentication and API
  const { user } = UseAuth();
  const axiosSicure = useAxiosSicure();

  // 🚩 NEW STATE: Modal handling er jonno
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);

  // 2. Fetch Tuition Posts (using tanstack/react-query)
  const {
    data: tuitions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myTuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSicure.get(`/tuition-posts?email=${user.email}`);
      return res.data;
    },
  });

  // 🚩 NEW FUNCTION: Edit button click korle modal kholbe
  const handleEditClick = (tuition) => {
    setSelectedTuition(tuition);
    setIsModalOpen(true);
  };

  // ❌ Delete Functionality (Integrated with axiosSicure and Swal)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Backend API: DELETE /post-new-tuition/:id
        axiosSicure
          .delete(`/post-new-tuition/${id}`)
          .then((res) => {
            console.log("Delete Response:", res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your tuition post has been deleted.",
                icon: "success",
              });
              refetch(); // Refresh the list after successful deletion
            } else {
              Swal.fire(
                "Error",
                "Failed to delete the post. Post not found.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Deletion Error:", error);
            Swal.fire("Error", "Failed to delete the post.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading data. Please check your network or server status.
      </div>
    );
  }

  // Convert tuition._id (MongoDB) to tuition.id for compatibility with existing UI code
  const formattedTuitions = tuitions.map((t) => ({
    ...t,
    id: t._id,
    appliedTutors: t.appliedTutors || 0,
  }));

  return (
    <section className="p-4 md:p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header and Post New Tuition Button */}
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My Tuitions
          </h1>

          {/* 📝 Post New Tuition Button */}
          <NavLink
            to="/dashboard/student/post-new-tuition"
            className="btn bg-primary text-white hover:bg-primary/90 font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Post New Tuition
          </NavLink>
        </div>

        {formattedTuitions.length === 0 ? (
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold dark:text-white">
              No tuition posts found!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Click 'Post New Tuition' to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (md and up) */}
            <div className="hidden md:block bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Subject & Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Tutor Apps
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {formattedTuitions.map((tuition) => (
                    <tr
                      key={tuition.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150"
                    >
                      {/* ... (Details sections: Subject, Location, Budget, Tutors, Status - unchanged) ... */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tuition.subject}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-primary" />{" "}
                          {tuition.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white font-medium flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          {tuition.budget?.toLocaleString() || "N/A"} BDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <NavLink
                          to={`/dashboard/student/applied-tutors/${tuition.id}`}
                          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <Users className="w-4 h-4 text-blue-600" />
                          {tuition.appliedTutors} Applications
                        </NavLink>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                            tuition.status
                          )}`}
                        >
                          {tuition.status === "Approved" ? (
                            <CheckCircle className="w-3 h-3 mr-1 mt-0.5" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1 mt-0.5" />
                          )}{" "}
                          {tuition.status}
                        </span>
                      </td>

                      {/* Actions - Edit button changed to call handleEditClick */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* ✏️ Edit Button: Changed to standard button for modal */}
                        <button
                          onClick={() => handleEditClick(tuition)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition duration-150 mx-2 cursor-pointer"
                          title="Edit Post"
                        >
                          <Pencil className="w-5 h-5 inline-block" />
                        </button>

                        {/* ❌ Delete Button (Unchanged) */}
                        <button
                          onClick={() => handleDelete(tuition.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition duration-150 mx-2 cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-5 h-5 inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🚩 Mobile Card View (Below md) */}
            <div className="md:hidden space-y-4">
              {formattedTuitions.map((tuition) => (
                <motion.div
                  key={tuition.id}
                  className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* ... (Details - Unchanged) ... */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {tuition.subject}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                        tuition.status
                      )}`}
                    >
                      {tuition.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4 border-t border-b py-3 border-dashed border-gray-200 dark:border-gray-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />{" "}
                      {tuition.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" /> Budget:{" "}
                      {tuition.budget?.toLocaleString() || "N/A"} BDT
                    </p>
                    <NavLink
                      to={`/dashboard/student/applied-tutors/${tuition.id}`}
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Users className="w-4 h-4 text-blue-600" />{" "}
                      {tuition.appliedTutors} Applications
                    </NavLink>
                  </div>

                  {/* Actions - Edit button changed to call handleEditClick */}
                  <div className="flex justify-end gap-3 pt-2">
                    {/* ✏️ Edit Button: Changed to standard button for modal */}
                    <button
                      onClick={() => handleEditClick(tuition)}
                      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-1 p-2 rounded"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>

                    {/* ❌ Delete Button (Unchanged) */}
                    <button
                      onClick={() => handleDelete(tuition.id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-1 p-2 rounded"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* 🚩 NEW: Edit Modal Component */}
      {/* selectedTuition thakle shudhu modal render hobe */}
      {selectedTuition && (
        <EditTuitionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tuitionData={selectedTuition}
          refetchList={refetch}
        />
      )}
    </section>
  );
};

export default MyTuitions;
