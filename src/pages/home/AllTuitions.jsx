import React, { useState, useEffect } from "react";
import { Search, MapPin, BookOpen, Clock, Filter, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import Loading from "../../components/ui/Loading";
import { NavLink } from "react-router";

export default function AllTuitions() {
  const axiosSicure = useAxiosSicure();
  const [displayTuitions, setDisplayTuitions] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;

  // TanStack Query দিয়ে ডাটা ফেচিং (সার্চ এবং পেজ সহ)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["all-approved-tuitions", page, search],
    queryFn: async () => {
      const res = await axiosSicure.get(
        `/all-approved-tuitions?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.tuitions) {
      if (page === 0) setDisplayTuitions(data.tuitions);
      else {
        setDisplayTuitions((prev) => {
          const newData = data.tuitions.filter(
            (newItem) => !prev.some((oldItem) => oldItem._id === newItem._id)
          );
          return [...prev, ...newData];
        });
      }
    }
  }, [data, page]);

  if (isLoading && page === 0) return <Loading />;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* --- Hero & Search Section --- */}
      <div className="bg-primary/5 py-16 border-b border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
          >
            Find Your Perfect <span className="text-primary">Tuition Job</span>
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto text-sm md:text-base">
            Browse through approved tuition requirements and apply to the ones that match your expertise.
          </p>

          {/* Search Bar - Challenge Part */}
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by subject or location (e.g. Dhaka, Physics)..."
              className="w-full pl-14 pr-32 py-4 md:py-5 bg-white dark:bg-gray-900 rounded-2xl shadow-xl focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-800"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0); // সার্চ করলে পেজ আবার ০ থেকে শুরু হবে
              }}
            />
            <button className="absolute right-3 top-3 bottom-3 px-6 bg-primary text-white rounded-xl font-bold hidden md:block">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <div className="w-2 h-8 bg-primary rounded-full"></div>
            Available Jobs ({data?.totalCount || 0})
          </h2>
          
          {/* Sorting Dropdown (Optional Challenge) */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost gap-2 border border-gray-200 dark:border-gray-800 rounded-lg capitalize">
              <Filter className="w-4 h-4" /> Sort By <ChevronDown className="w-4 h-4" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-200">
              <li><a>Newest First</a></li>
              <li><a>Budget: High to Low</a></li>
            </ul>
          </div>
        </div>

        {/* --- Tuition Grid --- */}
        {displayTuitions.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
             <p className="text-gray-400 italic">No tuition jobs found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {displayTuitions.map((tuition, index) => (
              <motion.div
                key={tuition._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-[2rem] hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className="absolute top-0 right-0 px-6 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-bl-2xl">
                   {tuition.status || "Approved"}
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <BookOpen className="text-primary w-7 h-7" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                      {tuition.subject} Tutor
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">Class: {tuition.classLevel}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="truncate">{tuition.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>{tuition.schedule}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-gray-50 dark:border-gray-800">
                  <div>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">{tuition.budget}</span>
                    <span className="text-xs text-gray-400 ml-1 font-bold">BDT/Month</span>
                  </div>
                  <NavLink
                    to={`/all-tuition/${tuition._id}`}
                    className="btn btn-primary btn-sm rounded-xl px-5 normal-case"
                  >
                    Details
                  </NavLink>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- See More Button --- */}
        {displayTuitions.length < (data?.totalCount || 0) && (
          <div className="text-center mt-16">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isFetching}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-primary font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              {isFetching ? <span className="loading loading-spinner"></span> : "Load More Opportunities"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}