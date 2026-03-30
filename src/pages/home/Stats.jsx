import React, { useState, useEffect, useRef } from "react";
import { Users, GraduationCap, MapPin, Trophy } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

// Counter logic
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
  { id: 1, label: "Total Tutors", value: "4500", icon: <GraduationCap />, color: "text-primary", lightBg: "bg-primary/10", hoverBg: "group-hover:bg-primary/20" },
  { id: 2, label: "Active Students", value: "12000", icon: <Users />, color: "text-secondary", lightBg: "bg-secondary/10", hoverBg: "group-hover:bg-secondary/20" },
  { id: 3, label: "Cities Covered", value: "25", icon: <MapPin />, color: "text-blue-600", lightBg: "bg-blue-600/10", hoverBg: "group-hover:bg-blue-600/20" },
  { id: 4, label: "Success Rate", value: "99%", icon: <Trophy />, color: "text-amber-500", lightBg: "bg-amber-500/10", hoverBg: "group-hover:bg-amber-500/20" },
];

export default function Stats() {
  return (
    <section className="relative py-20 overflow-hidden bg-white dark:bg-gray-900">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Main Card */}
              <div className="flex flex-col items-center justify-center text-center p-10 md:p-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 h-full overflow-hidden">
                
                {/* Icon Container */}
                <div className={`w-20 h-20 rounded-3xl ${stat.lightBg} ${stat.hoverBg} flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                  {React.cloneElement(stat.icon, { 
                    size: 38, 
                    className: `${stat.color}`,
                    strokeWidth: 2 
                  })}
                </div>

                {/* Counter Number */}
                <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter transition-colors group-hover:text-primary">
                  <Counter value={stat.value} />
                </h3>

                {/* Label */}
                <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-gray-500 mb-8">
                  {stat.label}
                </p>

                {/* Decorative Dots */}
                <div className="flex gap-2 justify-center">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2.5 h-2.5 rounded-full ${stat.id === 1 ? 'bg-primary' : stat.id === 2 ? 'bg-secondary' : stat.id === 3 ? 'bg-blue-600' : 'bg-amber-500'} opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`} 
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