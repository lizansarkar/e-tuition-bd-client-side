import React, { useState, useEffect, useRef } from "react";
import { Users, GraduationCap, MapPin, Trophy, Sparkles } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

// Counter logic for that "Infinite" feel
const Counter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const count = useSpring(0, { stiffness: 40, damping: 20 });
  
  const display = useTransform(count, (latest) => {
    const num = Math.floor(latest);
    if (num >= 1000) return (num / 1000).toFixed(1) + "k+";
    return num + (value.includes("%") ? "%" : "+");
  });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
      count.set(numericValue);
    } else {
      count.set(0);
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const statsData = [
  { id: 1, label: "Total Tutors", value: "4500", icon: <GraduationCap />, color: "bg-primary", lightBg: "bg-primary/5" },
  { id: 2, label: "Active Students", value: "12000", icon: <Users />, color: "bg-secondary", lightBg: "bg-secondary/10" },
  { id: 3, label: "Cities Covered", value: "25", icon: <MapPin />, color: "bg-blue-600", lightBg: "bg-blue-600/5" },
  { id: 4, label: "Success Rate", value: "99%", icon: <Trophy />, color: "bg-amber-500", lightBg: "bg-amber-500/10" },
];

export default function Stats() {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* Background Decorative Elements - Matching your theme */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Grid adjusted to match your larger box style (xl:grid-cols-3 or 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Box Design matches your LatestTuitionPosts card style */}
              <div className="h-full p-10 md:p-12 rounded-[3rem] bg-white dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col items-center text-center min-h-[380px] relative overflow-hidden">
                
                {/* Top Accent Line */}
                <div className={`absolute top-0 left-0 w-full h-2 ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                {/* Icon Container - Matching your item style */}
                <div className={`w-16 h-16 rounded-2xl ${stat.lightBg} flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner`}>
                  {React.cloneElement(stat.icon, { 
                    size: 32, 
                    className: stat.id === 2 ? "text-secondary" : stat.id === 3 ? "text-blue-600" : stat.id === 4 ? "text-amber-500" : "text-primary",
                    strokeWidth: 2.5 
                  })}
                </div>

                {/* Counter Number */}
                <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter transition-colors group-hover:text-primary">
                  <Counter value={stat.value} />
                </h3>

                {/* Label */}
                <p className="text-[11px] uppercase tracking-[0.25em] font-black text-gray-400 dark:text-gray-500 mb-6">
                  {stat.label}
                </p>

                {/* Decorative Dots - Your signature style */}
                <div className="flex gap-1.5 mt-auto">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${stat.id === 1 ? 'bg-primary' : stat.id === 2 ? 'bg-secondary' : 'bg-gray-300'} opacity-20 group-hover:opacity-100 transition-all duration-500`} 
                      style={{ transitionDelay: `${i * 100}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}