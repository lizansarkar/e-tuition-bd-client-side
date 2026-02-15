import React from "react";
import { data, NavLink } from "react-router";
import { MapPin, BookOpen, Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import Loading from "../../components/ui/Loading";

// Animation settings
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LatestTuitionPosts() {
  const axiosSicure = useAxiosSicure();

  // ✅ ডাটাবেস থেকে ডাটা আনা
  const { data: latestTuitions = [], isLoading } = useQuery({
    queryKey: ["latest-tuitions"],
    queryFn: async () => {
      const response = await axiosSicure.get("/latest-tuitions");
      return response.data;
    },
  });

  console.log("My Data:", latestTuitions)

  // if (isLoading) return <Loading />;

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 md:mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              <span className="text-primary">Latest</span> Tuition Posts
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base font-medium">
              Find the best teaching opportunities near you
            </p>
          </div>

          <NavLink
            to="/all-tuitions"
            className="group flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
          >
            See All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        {/* Dynamic Grid Layout */}
        {latestTuitions.map((tuition) => (
          <motion.div
            key={tuition._id}
            className="group bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-gray-100 dark:border-gray-700"
            variants={cardVariants}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Class: {tuition.classLevel}
                </span>
                <span className="text-gray-400 text-[10px]">
                  {tuition.createdAt
                    ? new Date(tuition.createdAt).toLocaleDateString()
                    : "Recently"}
                </span>
              </div>

              {/* 🚩 এখানে পরিবর্তন: title এর বদলে subject ও classLevel দেখানো হয়েছে */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                Need a tutor for {tuition.subject} (Class {tuition.classLevel})
              </h3>

              <div className="space-y-3.5 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-50 dark:border-gray-700/50 pt-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {tuition.subject}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <span>{tuition.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <span>{tuition.schedule} Days/Week</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-2 pt-4 border-t border-gray-50 dark:border-gray-700/50">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">
                  Salary
                </span>
                <span className="text-lg font-black text-primary">
                  {tuition.budget} <small className="text-[10px]">BDT</small>
                </span>
              </div>

              <NavLink
                to={`/all-tuition/${tuition._id}`}
                className="px-4 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-xs font-bold rounded-xl hover:bg-primary transition-colors"
              >
                Details
              </NavLink>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
