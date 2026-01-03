import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, GraduationCap, Users, Shield, Zap } from "lucide-react";
import { Link } from "react-router";
import logoPath from "../../assets/logo.png";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Animation variants for cards/items
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function About() {
  const image_url = "/src/pages/about/learning.jpg";

  return (
    <section className="bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. 🚀 HERO & INTRODUCTION */}
        <motion.header
          className="text-center mb-16 md:mb-20"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
            <div className="flex justify-center items-center">
              <Link to="/" className="text-2xl font-extrabold ml-2 sm:ml-0">
                <img
                  className="h-[50px] w-[200px]"
                  src={logoPath}
                  alt="eTuitionBD Logo"
                />
              </Link>
            </div>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your trusted platform connecting students and experienced tutors
            across Bangladesh for personalized and effective learning.
          </p>
        </motion.header>

        {/* 2. 📚 COMPANY STORY & IMAGE */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pioneering Personalized Education
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              Founded on the principle that every student deserves tailored
              attention, eTuitionBD was created to bridge the gap between
              quality education and accessibility. We started small, focusing on
              hyper-local tutoring, and have now expanded to offer a robust
              online platform that caters to all classes and subjects,
              nationwide.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              We use technology to match students with verified, top-tier
              tutors, ensuring that learning is always effective, engaging, and
              aligned with individual goals.
            </p>
          </div>

          {/* Responsive Image Card */}
          <motion.div
            className="order-1 md:order-2 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={image_url}
              alt="Student and tutor collaborating on study material"
              className="w-full h-72 object-cover object-center"
            />
          </motion.div>
        </motion.div>

        {/* 3. 🎯 MISSION & VISION */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Our Core Purpose
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* MISSION CARD */}
            <motion.div
              className="p-8 bg-primary/10 dark:bg-primary/20 rounded-xl shadow-lg border-l-4 border-primary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Target className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To provide the most efficient, transparent, and accessible
                platform for private tutoring in Bangladesh, empowering students
                to achieve academic excellence and tutors to build sustainable
                careers.
              </p>
            </motion.div>

            {/* VISION CARD */}
            <motion.div
              className="p-8 bg-primary/10 dark:bg-primary/20 rounded-xl shadow-lg border-l-4 border-primary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Eye className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Our Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To be the leading educational technology solution in South Asia,
                revolutionizing one-on-one teaching by fostering a community of
                trust, learning, and growth.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 4. ✅ WHY CHOOSE US (VALUES) */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
            Why Choose eTuitionBD?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1: Quality */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-t-4 border-yellow-500"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <GraduationCap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                Verified Tutors
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Strict vetting process ensures high-quality teaching standards.
              </p>
            </motion.div>

            {/* Value 2: Trust */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-t-4 border-green-500"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                Secure Payments
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Transparent payment system for both students and tutors.
              </p>
            </motion.div>

            {/* Value 3: Accessibility */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-t-4 border-blue-500"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                Flexible Modes
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose between home tutoring, online, or batch programs.
              </p>
            </motion.div>

            {/* Value 4: Innovation */}
            <motion.div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-t-4 border-primary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                Tech-Driven Match
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Intelligent algorithms to find the perfect learning partner for
                you.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
