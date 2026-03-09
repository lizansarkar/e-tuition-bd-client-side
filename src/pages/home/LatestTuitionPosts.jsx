import React from "react";
import { NavLink } from "react-router";
import { MapPin, BookOpen, Clock, ArrowRight, Banknote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import Loading from "../../components/ui/Loading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
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

  // if (isLoading) return <Loading />;

  return (
    <section className="py-24 bg-[#fcfdfe] dark:bg-[#030712] relative overflow-hidden">
      {/* Background Decorative Elements - সাইটকে জীবন্ত করার জন্য */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>New Opportunities Updated</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">Tuition</span> Posts
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-lg">
            সবচেয়ে সেরা টিউটরিং পোস্টগুলো এখন আপনার হাতের মুঠোয়। আজই আপনার পছন্দের টিউটরশিপটি খুঁজে নিন।
          </p>
        </div>

        {/* Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {latestTuitions.map((tuition) => (
            <motion.div
              key={tuition._id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 p-7 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(8,112,184,0.15)] transition-all duration-500 flex flex-col h-full overflow-hidden relative"
            >
              {/* Card Gradient Top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              <div className="flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px] font-black uppercase tracking-widest rounded-lg">
                    {tuition.classLevel}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Budget</span>
                    <span className="text-xl font-black text-primary">৳{tuition.budget}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 line-clamp-2 leading-tight group-hover:text-primary transition-colors min-h-[56px]">
                   Need {tuition.subject} Tutor
                </h3>

                {/* Details List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 group/item">
                    <div className="w-11 h-11 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Location</p>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{tuition.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group/item">
                    <div className="w-11 h-11 flex items-center justify-center bg-orange-50 dark:bg-orange-900/20 rounded-2xl group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Schedule</p>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{tuition.schedule} Days/Week</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <NavLink
                to={`/all-tuition/${tuition._id}`}
                className="relative overflow-hidden group/btn w-full py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-sm transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="relative z-10 uppercase tracking-tighter">View Application</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </NavLink>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Link */}
        <div className="mt-16 text-center">
            <NavLink to="/all-tuitions" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition-colors">
                View All Available Posts <ArrowRight className="w-4 h-4" />
            </NavLink>
        </div>
      </div>
    </section>
  );
}