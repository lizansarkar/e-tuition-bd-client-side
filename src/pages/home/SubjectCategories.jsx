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
  {
    id: 1,
    name: "Mathematics",
    tutors: "1.2k+",
    icon: <Calculator />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    name: "Physics",
    tutors: "850+",
    icon: <Atom />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: 3,
    name: "Chemistry",
    tutors: "640+",
    icon: <Beaker />,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: 4,
    name: "English",
    tutors: "980+",
    icon: <Languages />,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    id: 5,
    name: "Programming",
    tutors: "450+",
    icon: <Code />,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    id: 6,
    name: "Biology",
    tutors: "520+",
    icon: <Globe />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: 7,
    name: "Fine Arts",
    tutors: "310+",
    icon: <Palette />,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    id: 8,
    name: "Music",
    tutors: "200+",
    icon: <Music />,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export default function SubjectCategories() {
  return (
    <section className="py-24 bg-white dark:bg-[#020617] relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="w-3 h-3" />
            <span>Top Categories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Explore by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Subjects
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            আপনার পছন্দের বিষয়টি বেছে নিন এবং সেরা টিউটরদের সাথে পড়ালেখা শুরু
            করুন।
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/20 overflow-hidden">
                {/* Background Decor */}
                <div
                  className={`absolute -right-4 -bottom-4 w-24 h-24 ${item.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
                ></div>

                <div
                  className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500`}
                >
                  {React.cloneElement(item.icon, {
                    size: 28,
                    strokeWidth: 2.5,
                  })}
                </div>

                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mb-4">
                  {item.tutors} Tutors
                </p>

                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Browse All <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-gray-900 dark:bg-primary/10 text-white dark:text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 shadow-xl cursor-pointer">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}
