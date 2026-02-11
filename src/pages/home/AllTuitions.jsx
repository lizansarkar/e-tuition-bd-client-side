import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { MapPin, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import Loading from "../../components/ui/Loading";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AllTuitions() {
  const axiosSicure = useAxiosSicure();
  const [displayTuitions, setDisplayTuitions] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 10;

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["all-approved-tuitions", page], // page চেঞ্জ হলেই নতুন API কল হবে
    queryFn: async () => {
      const response = await axiosSicure.get(
        `/all-approved-tuitions?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    keepPreviousData: true, // আগের ডাটা স্ক্রিনে রেখে নতুন ডাটা আনবে
  });

  // ✅ ডেটা লোড করার মেইন লজিক (১০টা ১০টা করে)
  useEffect(() => {
    if (data?.tuitions) {
      if (page === 0) {
        // প্রথমবার শুধুমাত্র প্রথম ১০টি ডাটা দেখাবে
        setDisplayTuitions(data.tuitions);
      } else {
        // পরের বার আগের ১০টার সাথে নতুন ১০টা যোগ হবে
        setDisplayTuitions((prev) => {
          const newData = data.tuitions.filter(
            (newItem) => !prev.some((oldItem) => oldItem._id === newItem._id)
          );
          return [...prev, ...newData];
        });
      }
    }
  }, [data, page]);

  // মেইন লোডিং (পুরো পেজ খালি থাকলে)
  if (isLoading && page === 0) return <Loading />;

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header - Total Count show from API */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-16">
          Available <span className="text-primary">Tuition Jobs</span> ({data?.totalCount || 0})
        </h1>

        {displayTuitions.length === 0 && !isFetching ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl text-gray-500 italic">
            No approved tuition posts available right now.
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {displayTuitions.map((tuition) => (
                <motion.div
                  key={tuition._id}
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-visible group"
                  variants={cardVariants}
                >
                  {/* Tutor Profile Image */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-white">
                      <img 
                        src={tuition.tutorImage || "https://i.ibb.co/5GzXkwq/user.png"} 
                        alt="Tutor" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {tuition.subject} Tutor
                    </h3>
                    <div className="badge badge-primary badge-outline mt-2 text-[10px]">
                      ID: {tuition._id?.slice(-6).toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-50 dark:border-gray-700 pt-5 mt-5 mb-6">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-primary shrink-0" />
                      <span>Class: <b>{tuition.classLevel}</b></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="truncate">{tuition.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{tuition.schedule}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-3 rounded-2xl">
                    <span className="text-md font-extrabold text-green-600 dark:text-green-400">
                      {tuition.budget} BDT
                    </span>
                    <NavLink
                      to={`/all-tuition/${tuition._id}`}
                      className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl"
                    >
                      Details
                    </NavLink>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ✅ See More Logic - শুধুমাত্র তখনই দেখাবে যখন আরও ডাটা থাকবে */}
            {displayTuitions.length < (data?.totalCount || 0) && (
              <div className="text-center mt-20">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={isFetching}
                  className="btn btn-primary px-12 rounded-full font-bold shadow-xl border-none"
                >
                  {isFetching ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "See More Jobs"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}