import React from "react";
import { Link } from "react-router";
import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentCancelled() {
  // Animation variants for the whole card
  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  // Animation variants for the button (bounce effect)
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(252, 165, 165, 0.5)", // Red glow on hover
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-6 sm:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-red-300 dark:border-red-700 relative overflow-hidden text-center"
      >
        {/* Background wash / Visual cue for error */}
        <div className="absolute inset-0 bg-red-500/10 dark:bg-red-900/20 opacity-50 z-0 pointer-events-none"></div>

        <div className="relative z-10">
          {/* Error Icon */}
          <motion.div
            initial={{ rotate: 0, scale: 0.5 }}
            animate={{ rotate: [0, 10, -10, 0], scale: 1 }}
            transition={{
              duration: 1,
              type: "tween",
              ease: "easeInOut",
            }}
            className="mb-6 mx-auto"
          >
            <XCircle className="w-20 h-20 text-red-600 dark:text-red-400 mx-auto" />
          </motion.div>
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Payment Cancelled!
          </h2>
          {/* Message */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            The transaction was interrupted or cancelled by the user.{" "}
            <br className="hidden sm:inline" />
            Please try again to complete the hiring process.
          </p>
          {/* Button with Animation and Error Theme */}
          <Link to="/dashboard/student/applied-tutors">
            <motion.button
              className="btn w-full py-3 text-lg font-bold flex items-center justify-center bg-red-700 hover:bg-red-600 text-white   transition duration-300 hover:shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Plz Try Again
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
