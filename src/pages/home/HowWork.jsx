import React from "react";
import { motion } from "framer-motion";
import { UserPlus, FileText, CheckCircle, Search } from "lucide-react";

// ---------- motion variants (আগের মতো) ----------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.1 } },
};
const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};
const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70, duration: 0.8 } },
};

// ---------- ৪-ধাপের ডাটা (অরিজিনাল ৩টা + নতুন ১টা) ----------
const workSteps = [
  {
    id: 1,
    icon: UserPlus,
    title: "1. Create Profile & Post",
    description: "Parents/Students register and post their specific tuition needs, including subject, class, location, and preferred salary.",
  },
  {
    id: 2,
    icon: FileText,
    title: "2. Receive Tutor Applications",
    description: "Verified tutors review the post and submit their detailed profiles/applications. We also send expert tutor CVs.",
  },
  {
    id: 3,
    icon: CheckCircle,
    title: "3. Interview & Select Tutor",
    description: "Review applications, interview suitable tutors, and finalize the one that perfectly matches your learning requirements.",
  },
  {
    id: 4,
    icon: Search,
    title: "4. Start Learning Journey",
    description: "Begin your tailored lessons, track progress, and achieve your academic goals with the chosen expert.",
  },
];

// ---------- Single Step (বাম/ডান অল্টারনেটিং) ----------
const WorkStep = ({ step, index }) => {
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      className={`relative flex items-start gap-6 md:gap-10 ${
        isEven ? "flex-row-reverse" : ""
      }`}
    >
      {/* বক্স */}
      <div
        className={`w-full md:w-5/12 ${
          isEven ? "text-right" : "text-left"
        }`}
      >
        <div className="relative flex flex-col items-center text-center px-4 pt-10 pb-8 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          {/* আইকন সার্কল */}
          <motion.div
            className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary text-primary flex items-center justify-center mb-6 shadow-xl absolute -top-12"
            whileHover={{ scale: 1.1, boxShadow: "0 15px 25px rgba(109, 219, 90, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-10 h-10 text-primary" strokeWidth={2.5} />
          </motion.div>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-4">
            {step.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-xs px-2">
            {step.description}
          </p>
        </div>
      </div>

      {/* 🔥 একই wrapper-এ ডট + লাইন – সেন্টার-অ্যালাইন গ্যারান্টেড 🔥 */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        {/* ডট */}
        <span className="z-10 w-6 h-6 rounded-full bg-primary ring-4 ring-white dark:ring-gray-900" />
        {/* লাইন */}
        {index !== workSteps.length - 1 && (
          <span className="w-1 h-24 bg-gray-300 dark:bg-gray-700" />
        )}
      </div>

      {/* মোবাইল সেন্টার-অ্যালাইন */}
      <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-2 flex flex-col items-center">
        <span className="w-5 h-5 rounded-full bg-primary ring-4 ring-white dark:ring-gray-900" />
        {index !== workSteps.length - 1 && (
          <span className="w-1 h-20 bg-gray-300 dark:bg-gray-700 mt-2" />
        )}
      </div>
    </motion.div>
  );
};

// ---------- Main Section ----------
export default function HowWork() {
  return (
    <section className="py-8 md:py-10 bg-base-200 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* হেডিং */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={slideInFromRight}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            The <span className="text-primary">4 Simple Steps</span> to Find a Tutor
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">
            Connecting parents, students, and expert tutors seamlessly.
          </p>
        </motion.div>

        {/* টাইম-লাইন */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative space-y-10 md:space-y-0"
        >
          {workSteps.map((step, idx) => (
            <WorkStep key={step.id} step={step} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}