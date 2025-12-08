// EditTuitionModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSicure from "../../../hooks/useAxiosSicure";
import useAuth from "../../../hooks/UseAuth";

const EditTuitionModal = ({ isOpen, onClose, tuitionData, refetchList }) => {
  const axiosSicure = useAxiosSicure();
  const { user } = useAuth();

  // tuitionData theke form state initialize kora hocche
  const [formData, setFormData] = useState({
    subject: "",
    classLevel: "",
    location: "",
    budget: "",
    details: "",
    schedule: "",
  });

  useEffect(() => {
    if (tuitionData) {
      // MongoDB _id ke baad diye baki data state-e set kora
      setFormData({
        subject: tuitionData.subject || "",
        classLevel: tuitionData.classLevel || "",
        location: tuitionData.location || "",
        budget: tuitionData.budget || "",
        details: tuitionData.details || "",
        schedule: tuitionData.schedule || "",
      });
    }
  }, [tuitionData]);

  if (!isOpen || !tuitionData) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email address add kora update korar jonno (jehetu ami age suggest korechilam)
    const dataToSend = {
      ...formData,
      userEmail: user?.email, // Ensure email is resent for data consistency
    };

    try {
      // Backend API: PUT /post-new-tuition/:id
      const res = await axiosSicure.put(
        `/post-new-tuition/${tuitionData.id}`,
        dataToSend
      );

      console.log("Update Response:", res.data);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Your tuition post has been updated successfully and is Pending review.",
          icon: "success",
        });
        onClose(); // Modal bondho kora
        refetchList(); // MyTuitions list refresh kora
      } else {
        Swal.fire("Info", "No changes were made to the post.", "info");
        onClose();
      }
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire("Error", "Failed to update the tuition post.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Tuition Post: {tuitionData.subject}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {/* Class Level Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Class Level
            </label>
            <input
              type="text"
              name="classLevel"
              value={formData.classLevel}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {/* Location Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {/* Budget Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Budget (BDT)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {/* Schedule Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Schedule Details
            </label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {/* Details Field (Use Textarea for details) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Details / Requirements
            </label>
            <textarea
              name="details"
              rows="3"
              value={formData.details}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditTuitionModal;
