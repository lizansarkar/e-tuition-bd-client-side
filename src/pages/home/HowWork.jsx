import React from "react";
import { motion } from "framer-motion";
import { UserPlus, FileText, CheckCircle, ArrowRight } from "lucide-react"; // ArrowRight icon add kora holo

// 🚩 Framer Motion Variants for Staggered Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each step appears one after another
      delayChildren: 0.1,
    },
  },
};

// Framer Motion Variants for Step Card (Upward slide-in)
const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15, // Damping barano holo jate animation smooth hoy
    },
  },
};

// HowWork.jsx er shobcheye uporer dike variants section-e add korun:
const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { 
            type: 'spring', 
            stiffness: 70, 
            duration: 0.8 
        } 
    }
};

// 🚩 Step Data
const workSteps = [
  {
    id: 1,
    icon: UserPlus,
    title: "1. Create Profile & Post",
    description:
      "Parents/Students register and post their specific tuition needs, including subject, class, location, and preferred salary.",
  },
  {
    id: 2,
    icon: FileText,
    title: "2. Receive Tutor Applications",
    description:
      "Verified tutors review the post and submit their detailed profiles/applications. We also send expert tutor CVs.",
  },
  {
    id: 3,
    icon: CheckCircle,
    title: "3. Interview & Select Tutor",
    description:
      "Review applications, interview suitable tutors, and finalize the one that perfectly matches your learning requirements.",
  },
];

// Reusable Step Component with Motion
const WorkStep = ({ step, isLast }) => {
  const Icon = step.icon;

  return (
    // 🚩 Step card with responsive styling
    <motion.div
      className="relative flex flex-col items-center text-center px-4 pt-10 pb-8 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
    >
      {/* 🚩 Connector: Horizontal Dashed Line with Arrow (Large Screens) */}
      {!isLast && (
        <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-[95%] w-[100px] pointer-events-none">
          <ArrowRight className="w-10 h-10 text-primary animate-pulse" />
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-full border-t-4 border-dashed border-primary/50"></div>
        </div>
      )}

      {/* 🚩 Connector: Vertical Dashed Line (Mobile/Tablet) */}
      {!isLast && (
        <div className="md:hidden absolute inset-x-0 bottom-0 h-[2rem] w-full flex justify-center">
          <div className="w-0 border-l-4 border-dashed border-gray-300 dark:border-gray-700 h-full"></div>
        </div>
      )}

      {/* Icon Circle (Animated on hover) */}
      <motion.div
        className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary text-primary flex items-center justify-center mb-6 shadow-xl cursor-default absolute -top-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 15px 25px rgba(109, 219, 90, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="w-10 h-10 text-primary" strokeWidth={2.5} />
      </motion.div>

      {/* Title and Description */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-4">
        {step.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 max-w-xs px-2">
        {step.description}
      </p>
    </motion.div>
  );
};

export default function HowWork() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        {/* 🚩 Section Heading with Right-to-Left Animation */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible" // Scroll korle animation chalu hobe
          viewport={{ once: false, amount: 0.5 }} // Ekbar chalbe jokhon 50% dekha jabe
          variants={slideInFromRight}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            The <span className="text-primary">3 Simple Steps</span> to Find a
            Tutor
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">
            Connecting parents, students, and expert tutors seamlessly.
          </p>
        </motion.div>

        {/* 🚩 Steps Grid (3 Column Layout) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-y-20 md:gap-y-0 gap-x-12 relative"
          initial="hidden"
          whileInView="visible" // Animation runs when user scrolls to this section
          viewport={{ once: true, amount: 0.4 }} // Animation runs only once
          variants={containerVariants}
        >
          {workSteps.map((step, index) => (
            <WorkStep
              key={step.id}
              step={step}
              isLast={index === workSteps.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
