import React from "react";
import { Users, GraduationCap, MapPin, Star, Laptop, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const statsData = [
  {
    id: 1,
    label: "Total Tutors",
    value: "4,500+",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "bg-blue-500",
    description: "Verified subject experts"
  },
  {
    id: 2,
    label: "Active Students",
    value: "12,000+",
    icon: <Users className="w-6 h-6" />,
    color: "bg-purple-500",
    description: "Learning every day"
  },
  {
    id: 3,
    label: "Total Cities",
    value: "15+",
    icon: <MapPin className="w-6 h-6" />,
    color: "bg-red-500",
    description: "Across Bangladesh"
  },
  {
    id: 4,
    label: "Success Rate",
    value: "98%",
    icon: <Trophy className="w-6 h-6" />,
    color: "bg-amber-500",
    description: "Satisfied parents"
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white dark:bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {stat.icon}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {stat.label}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {stat.description}
                  </p>
                </div>

                {/* Decorative Line */}
                <div className="mt-6 w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${stat.color} w-0 group-hover:w-full transition-all duration-700`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}