import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, GraduationCap, Users, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import logoPath from "../../assets/logo.png";

// Animation Variants - Smooth and Professional
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function About() {

  return (
    <section className="bg-[#fcfdfe] dark:bg-[#030712] py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. 🚀 HERO SECTION */}
        <motion.div 
          className="text-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex justify-center mb-8">
            <Link to="/">
              <img className="h-16 md:h-20 w-auto object-contain" src={logoPath} alt="eTuitionBD Logo" />
            </Link>
          </div>
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Empowering Education</span>
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
            Connecting Minds, <span className="text-primary">Shaping Futures.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
            Your trusted platform connecting students and experienced tutors
            across Bangladesh for personalized and effective learning.
          </p>
        </motion.div>

        {/* 2. 📚 STORY & IMAGE SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
              Pioneering <span className="text-primary">Personalized</span> Education
            </h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Founded on the principle that every student deserves tailored
                attention, eTuitionBD was created to bridge the gap between
                quality education and accessibility. We started small, focusing on
                hyper-local tutoring, and have now expanded nationwide.
              </p>
              <p className="font-bold text-gray-900 dark:text-white">
                We use technology to match students with verified, top-tier
                tutors, ensuring that learning is always effective and aligned with individual goals.
              </p>
            </div>
          </motion.div>

          {/* Large Luxury Image Card */}
          <motion.div
            className="relative group p-4 rounded-[3.5rem] bg-white dark:bg-gray-900/50 border border-gray-200/60 dark:border-gray-800/60 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://www.ndmscbd.org/uploads/blogs/169595884133310988.jpg"
              alt="Learning Collaboration"
              className="w-full h-[450px] object-cover rounded-[2.5rem]"
            />
            <div className="absolute -bottom-8 -left-8 bg-primary p-8 rounded-3xl shadow-2xl hidden md:block">
               <p className="text-white font-black text-4xl">5+ Years</p>
               <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Of Excellence</p>
            </div>
          </motion.div>
        </div>

        {/* 3. 🎯 MISSION & VISION (Large Card Style) */}
        <motion.div 
          className="grid md:grid-cols-2 gap-10 mb-32"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            variants={fadeInUp}
            className="group p-12 rounded-[3rem] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-visible group"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary">
              <Target size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Our Mission</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              To provide the most efficient, transparent, and accessible
              platform for private tutoring in Bangladesh, empowering students
              to achieve academic excellence and tutors to build sustainable careers.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-visible group"
          >
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 text-blue-600">
              <Eye size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Our Vision</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              To be the leading educational technology solution in South Asia,
              revolutionizing one-on-one teaching by fostering a community of
              trust, learning, and growth.
            </p>
          </motion.div>
        </motion.div>

        {/* 4. ✅ WHY CHOOSE US */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-16">
            Why Choose <span className="text-primary">eTuitionBD?</span>
          </h2>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <GraduationCap />, title: "Verified Tutors", desc: "Strict vetting process for high-quality teaching.", color: "text-amber-500", bg: "bg-amber-500/10" },
              { icon: <Shield />, title: "Secure Payments", desc: "Transparent and safe transactions for everyone.", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: <Users />, title: "Flexible Modes", desc: "Choice between home, online, or batch programs.", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: <Zap />, title: "Tech-Driven Match", desc: "Intelligent algorithms to find your perfect tutor.", color: "text-primary", bg: "bg-primary/10" }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-visible group"
              >
                <div className={`w-14 h-14 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-6`}>
                  {React.cloneElement(value.icon, { size: 28, strokeWidth: 2.5 })}
                </div>
                <h4 className="font-black text-xl text-gray-900 dark:text-white mb-3">{value.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action Footer */}
        <motion.div 
          className="mt-32 text-center p-16 rounded-[4rem] bg-primary text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to Start Learning?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/all-tuitions" className="px-10 py-5 bg-white text-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3">
              Find a Tutor <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="px-10 py-5 bg-transparent border-2 border-white/30 hover:border-white text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95">
              Become a Tutor
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}