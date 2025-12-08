import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  BookOpen,
  Clock,
} from "lucide-react";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSicure from "../../../hooks/useAxiosSicure";
import useAuth from "../../../hooks/UseAuth";



const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const InputLabel = ({ icon: Icon, children }) => (
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
    <Icon size={18} className="mr-2" /> {children}
  </label>
);

export default function PostNewTuition({
  existingPost = null,
  onActionSuccess,
}) {
  const axiosSicure = useAxiosSicure();

  const isEditMode = !!existingPost;
  const initialFormData = existingPost || {
    subject: "",
    classLevel: "",
    location: "",
    budget: "",
    details: "",
    schedule: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormData,
  });

  const { user } = useAuth();

  useEffect(() => {
    reset(initialFormData);
  }, [existingPost, reset]);

  const onSubmit = async (data) => {

    // Apnar backend API-te pathanor shothik URL
    if (!user || !user.email) {
      Swal.fire(
        "Error",
        "You must be logged in to post a tuition request.",
        "error"
      );
      return;
    }
    const url = isEditMode
      ? `/post-new-tuition/${existingPost._id}` // MongoDB ID _id use kora holo
      : "/post-new-tuition";
    const method = isEditMode ? "put" : "post"; // axios method lowercase

    const finalData = {
      ...data,
      userEmail: user.email,
    };

    try {
      // Use axiosSicure for the API call
      const res = await axiosSicure[method](url, finalData);
      console.log(
        `Tuition Post ${isEditMode ? "Update" : "Create"} Response:`,
        res.data
      );

      if (res.data.insertedId || res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Tuition post ${
            isEditMode ? "updated" : "created"
          } successfully!`,
        });

        if (!isEditMode) reset();
        if (onActionSuccess) onActionSuccess(res.data); // Notify parent component (e.g., to refetch data)
      }
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Failed to submit the request. Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Use axiosSicure for the DELETE API call
        const deleteUrl = `/post-new-tuition/${existingPost._id}`;
        const res = await axiosSicure.delete(deleteUrl);

        console.log("Delete Response:", res.data);

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your tuition post has been deleted.",
            icon: "success",
          });
          if (onActionSuccess) onActionSuccess({ deleted: true }); // Notify parent to refresh/redirect
        } else {
          Swal.fire(
            "Error",
            "Failed to delete the post. Post not found.",
            "error"
          );
        }
      } catch (err) {
        console.error("Deletion Error:", err.response?.data || err.message);
        Swal.fire(
          "Error",
          err.response?.data?.message || "Failed to delete the post.",
          "error"
        );
      }
    }
  };

  return (
    // ... (Return JSX code same thakbe) ...
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          className="p-8 md:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-4 border-primary/20">
            {isEditMode
              ? "✏️ Edit Existing Tuition Post"
              : "📝 Create New Tuition Post"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 1. Subject */}
            {/* ... Input fields with register() ... */}
            <div>
              <InputLabel icon={BookOpen}>
                Subject Name (e.g., Physics, Bangla)
              </InputLabel>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                className="input-field"
                placeholder="Specify the main subject"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* 2. Class Level */}
            <div>
              <InputLabel icon={BookOpen}>
                Class/Level (e.g., Class 10, HSC, University)
              </InputLabel>
              <input
                type="text"
                {...register("classLevel", {
                  required: "Class level is required",
                })}
                className="input-field"
                placeholder="Specify the class or academic level"
              />
              {errors.classLevel && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.classLevel.message}
                </p>
              )}
            </div>

            {/* 3. Location */}
            <div>
              <InputLabel icon={MapPin}>
                Preferred Location (e.g., Gulshan, Mirpur-10, Online)
              </InputLabel>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="input-field"
                placeholder="Physical area or 'Online'"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* 4. Budget */}
            <div>
              <InputLabel icon={DollarSign}>
                Monthly Budget (e.g., 5000 ৳ - 8000 ৳)
              </InputLabel>
              <input
                type="text"
                {...register("budget", { required: "Budget is required" })}
                className="input-field"
                placeholder="Mention budget in Taka (৳)"
              />
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.budget.message}
                </p>
              )}
            </div>

            {/* 5. Schedule */}
            <div>
              <InputLabel icon={Clock}>Preferred Schedule/Days</InputLabel>
              <input
                type="text"
                {...register("schedule")}
                className="input-field"
                placeholder="e.g., 3 days/week, Evening slot"
              />
            </div>

            {/* 6. Details */}
            <div>
              <InputLabel icon={Edit}>Detailed Requirements</InputLabel>
              <textarea
                {...register("details", { required: "Details are required" })}
                rows="4"
                className="input-field"
                placeholder="Mention specific syllabus, tutor experience needed, and other details."
              ></textarea>
              {errors.details && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.details.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-lg shadow-md transition-all ${
                  isEditMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-primary hover:bg-primary/90"
                } text-white`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEditMode ? (
                  <>
                    <Edit size={20} /> Update Post
                  </>
                ) : (
                  <>
                    <Send size={20} /> Post Tuition Request
                  </>
                )}
              </motion.button>

              {isEditMode && (
                <motion.button
                  type="button"
                  onClick={handleDelete}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 size={20} /> Delete Post
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
    // ... (Return JSX code end) ...
  );
}
