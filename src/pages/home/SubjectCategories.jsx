import React from "react";
import {
  Calculator,
  Beaker,
  Languages,
  Atom,
  Globe,
  Music,
  Code,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: 1, name: "Mathematics", tutors: "1.2k+", icon: <Calculator />, color: "text-blue-600", bg: "bg-blue-600/10" },
  { id: 2, name: "Physics", tutors: "850+", icon: <Atom />, color: "text-purple-600", bg: "bg-purple-600/10" },
  { id: 3, name: "Chemistry", tutors: "640+", icon: <Beaker />, color: "text-emerald-600", bg: "bg-emerald-600/10" },
  { id: 4, name: "English", tutors: "980+", icon: <Languages />, color: "text-rose-600", bg: "bg-rose-600/10" },
  { id: 5, name: "Programming", tutors: "450+", icon: <Code />, color: "text-cyan-600", bg: "bg-cyan-600/10" },
  { id: 6, name: "Biology", tutors: "520+", icon: <Globe />, color: "text-orange-600", bg: "bg-orange-600/10" },
  { id: 7, name: "Fine Arts", tutors: "310+", icon: <Palette />, color: "text-pink-600", bg: "bg-pink-600/10" },
  { id: 8, name: "Music", tutors: "200+", icon: <Music />, color: "text-indigo-600", bg: "bg-indigo-600/10" },
];

export default function SubjectCategories() {
  return (
    <section className="py-10 bg-[#fcfdfe] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="w-3 h-3" />
            <span>Academic Excellence</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Explore by <span className="text-primary">Subjects</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Select your preferred subject and start learning with our expert tutors 
            tailored to your academic needs.
          </p>
        </div>

        {/* Categories Grid - 3 columns for that larger box feel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {categories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-visible group text-center cursor-pointer"
            >
              <div className="text-center justify-center flex flex-col items-center">

                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-8 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-inner`}
                >
                  {React.cloneElement(item.icon, {
                    size: 32,
                    strokeWidth: 2.5,
                  })}
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">
                    {item.tutors} Expert Tutors
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-8 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.25em] opacity-40 group-hover:opacity-100 transition-all duration-300">
                  Find Tutors <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 active:scale-95 cursor-pointer">
            Explore All Subjects
          </button>
        </div>
      </div>
    </section>
  );
}