import React from "react";
import { NavLink } from "react-router";
import { MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSicure from "../../hooks/useAxiosSicure";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
  },
};

export default function LatestTuitionPosts() {
  const axiosSicure = useAxiosSicure();

  const { data: latestTuitions = [], isLoading } = useQuery({
    queryKey: ["latest-tuitions"],
    queryFn: async () => {
      const response = await axiosSicure.get("/latest-tuitions");
      return response.data;
    },
  });

  return (
    <section className="py-10 bg-[#fcfdfe] dark:bg-[#030712] relative overflow-hidden">
      {/* Background Decorative Elements using your Primary Color */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#03373d]/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b4ce46]/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>New Opportunities Updated</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Latest <span className="text-primary">Tuition</span> Posts
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium">
            Explore the most recent tutoring opportunities at your fingertips. 
            Find your perfect match and start your teaching journey today.
          </p>
        </div>

        {/* Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {latestTuitions.map((tuition) => (
            <motion.div
              key={tuition._id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/60 dark:border-gray-800/60 p-7 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div className="flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-black uppercase tracking-tighter rounded-lg border border-gray-200 dark:border-gray-700">
                    {tuition.classLevel}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Monthly Budget</span>
                    <span className="text-xl font-black text-primary">৳{tuition.budget}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 line-clamp-2 leading-snug group-hover:text-primary transition-colors min-h-[56px]">
                   Need {tuition.subject} Tutor
                </h3>

                {/* Info List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <MapPin className="w-5 h-5 text-primary group-hover:text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 truncate">{tuition.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 flex items-center justify-center bg-secondary/10 rounded-xl group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                      <Clock className="w-5 h-5 text-secondary group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Weekly Schedule</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{tuition.schedule} Days Per Week</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <NavLink
                to={`/all-tuition/${tuition._id}`}
                className="relative overflow-hidden group/btn w-full py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="relative z-10">View Details</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform" />
              </NavLink>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Link */}
        <div className="mt-16 text-center">
            <NavLink 
              to="/all-tuitions" 
              className="inline-flex items-center gap-3 px-8 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-gray-500 hover:text-primary hover:border-primary/50 font-black text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Explore All Vacancies <ArrowRight className="w-4 h-4 text-primary" />
            </NavLink>
        </div>
      </div>
    </section>
  );
}