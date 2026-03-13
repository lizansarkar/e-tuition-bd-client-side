import React, { useState, useEffect, useRef } from "react";
import { Users, GraduationCap, MapPin, Trophy, Sparkles } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

// Counter logic for that "Infinite" feel whenever it comes into view
const Counter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 }); // 'once: false' ensures it runs every time
  const count = useSpring(0, { stiffness: 50, damping: 20 });
  
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
      count.set(0); // Reset when out of view
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const statsData = [
  { id: 1, label: "Total Tutors", value: "4500", icon: <GraduationCap />, color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" },
  { id: 2, label: "Active Students", value: "12000", icon: <Users />, color: "from-purple-600 to-pink-500", shadow: "shadow-purple-500/20" },
  { id: 3, label: "Cities Covered", value: "25", icon: <MapPin />, color: "from-red-500 to-orange-400", shadow: "shadow-red-500/20" },
  { id: 4, label: "Success Rate", value: "99%", icon: <Trophy />, color: "from-amber-500 to-yellow-300", shadow: "shadow-amber-500/20" },
];

export default function Stats() {
  return (
    <section className="relative py-20 bg-[#f8f8f8] overflow-hidden">
      {/* Background Abstract Shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full p-1 rounded-[2.5rem] bg-gradient-to-b from-white/50 to-white dark:from-gray-800/50 dark:to-gray-900 border border-white/20 dark:border-gray-800 shadow-xl backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
                
                <div className="p-8 flex flex-col items-center text-center">
                  {/* Floating Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} ${stat.shadow} flex items-center justify-center text-white mb-6 transform group-hover:rotate-[10deg] transition-transform duration-500 shadow-2xl`}>
                    {React.cloneElement(stat.icon, { size: 30, strokeWidth: 2.5 })}
                  </div>

                  {/* Counter Number */}
                  <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">
                    <Counter value={stat.value} />
                  </h3>

                  {/* Label */}
                  <p className="text-sm uppercase tracking-[0.2em] font-black text-gray-400 dark:text-gray-500 mb-4">
                    {stat.label}
                  </p>

                  {/* Decorative Elements */}
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stat.color} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} style={{ transitionDelay: `${i * 100}ms` }}></div>
                    ))}
                  </div>
                </div>

                {/* Bottom Highlight Glow */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}