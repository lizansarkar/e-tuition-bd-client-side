import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  FileText,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

// 🚩 Dummy Data (Backend theke ashar aage ei data use kora hobe)
const mockTuitions = [
  {
    id: "TUT001",
    subject: "Higher Math (Class 10)",
    location: "Mirpur 10, Dhaka",
    budget: 8500,
    status: "Approved",
    appliedTutors: 4,
    createdAt: "2025-11-28",
  },
  {
    id: "TUT002",
    subject: "English & IELTS Preparation",
    location: "Online/Remote",
    budget: 12000,
    status: "Pending",
    appliedTutors: 0,
    createdAt: "2025-12-01",
  },
  {
    id: "TUT003",
    subject: "Physics (A-Level)",
    location: "Gulshan 2, Dhaka",
    budget: 15000,
    status: "Approved",
    appliedTutors: 7,
    createdAt: "2025-12-05",
  },
  {
    id: "TUT004",
    subject: "General Science (Class 6)",
    location: "Chittagong",
    budget: 5000,
    status: "Rejected",
    appliedTutors: 0,
    createdAt: "2025-12-06",
  },
];

const MyTuitions = () => {
  const [tuitions, setTuitions] = useState(mockTuitions);

  // ❌ Delete Functionality (Logic based on your requirement)
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete tuition post ${id}?`)) {
      // Logic to send delete request to backend and then update state
      const updatedTuitions = tuitions.filter((t) => t.id !== id);
      setTuitions(updatedTuitions);
      alert(`Tuition Post ${id} successfully deleted!`);
    }
  };

  // Helper to determine status color
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
            to="/dashboard/post-new-tuition"
            className="btn bg-primary text-white hover:bg-primary/90 font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Post New Tuition
          </NavLink>
        </div>

        {/* 🚩 Desktop Table View (md and up) */}
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
              {tuitions.map((tuition) => (
                <tr
                  key={tuition.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150"
                >
                  {/* Subject & Location */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {tuition.subject}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-primary" />{" "}
                      {tuition.location}
                    </div>
                  </td>

                  {/* Budget */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white font-medium flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      {tuition.budget.toLocaleString()} BDT
                    </div>
                  </td>

                  {/* Applied Tutors */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NavLink
                      to={`/dashboard/applied-tutors/${tuition.id}`}
                      className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Users className="w-4 h-4 text-blue-600" />
                      {tuition.appliedTutors} Applications
                    </NavLink>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                        tuition.status
                      )}`}
                    >
                      <Clock className="w-3 h-3 mr-1 mt-0.5" /> {tuition.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* ✏️ Edit Button */}
                    <NavLink
                      to={`/dashboard/edit-tuition/${tuition.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition duration-150 mx-2"
                      title="Edit Post"
                    >
                      <Pencil className="w-5 h-5 inline-block" />
                    </NavLink>

                    {/* ❌ Delete Button */}
                    <button
                      onClick={() => handleDelete(tuition.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition duration-150 mx-2"
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
          {tuitions.map((tuition) => (
            <motion.div
              key={tuition.id}
              className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: tuition.id.slice(-1) * 0.1 }}
            >
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
                  <MapPin className="w-4 h-4 text-primary" /> {tuition.location}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" /> Budget:{" "}
                  {tuition.budget.toLocaleString()} BDT
                </p>
                <NavLink
                  to={`/dashboard/applied-tutors/${tuition.id}`}
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Users className="w-4 h-4 text-blue-600" />{" "}
                  {tuition.appliedTutors} Applications
                </NavLink>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <NavLink
                  to={`/dashboard/edit-tuition/${tuition.id}`}
                  className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition-all"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(tuition.id)}
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MyTuitions;
