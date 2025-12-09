import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { MapPin, BookOpen, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import useAxiosSicure from "../../hooks/useAxiosSicure";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AllTuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosSicure = useAxiosSicure();

  // ✅ Data Fetching Logic
  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        // Backend endpoint call: Replace with your actual base URL
        const response = await axiosSicure.get("/all-approved-tuitions");
        setTuitions(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch tuitions:", err);
        setError("Failed to load tuitions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, [axiosSicure]);

  if (loading) {
    // 🚩 Loading UI: Apnar project requirement-e full-screen spinner use korte hobe
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">{error}</div>
    );
  }

  if (tuitions.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        No approved tuition posts available right now.
      </div>
    );
  }

  // --- Main Display Component ---
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-16">
          Available <span className="text-primary">Tuition Jobs</span> (
          {tuitions.length})
        </h1>

        {/* Grid Layout: Dynamic Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Database data mapping */}
          {tuitions.map((tuition) => (
            <motion.div
              key={tuition._id}
              className="bg-base-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              variants={cardVariants}
            >
              {/* Card Content */}
              {/* ⚠️ NOTE: title field apnar database-e nei, tai subject and class use kora holo */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                {tuition.subject} Tutor for Class {tuition.classLevel}
              </h3>

              {/* Details Grid */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 border-t border-b border-dashed border-gray-300 dark:border-gray-700 py-3 mb-4">
                {/* Subject (Use the actual subject from DB) */}
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {tuition.subject} ({tuition.classLevel})
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{tuition.location}</span>
                </div>

                {/* Time/Schedule (Use the actual schedule field) */}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Schedule: {tuition.schedule}</span>
                </div>

                {/* Details/Description (Optional) */}
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-full italic text-xs">
                    {tuition.details}
                  </span>
                </div>
              </div>

              {/* Footer: Salary and View Details Button */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-extrabold text-green-600 dark:text-green-400">
                  Budget: {tuition.budget} BDT
                </span>

                {/* Link to Details Page */}
                <NavLink
                  to={`/tuition/${tuition._id}`}
                  className="btn btn-sm bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  View Details
                </NavLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
