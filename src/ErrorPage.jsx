import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Home, Frown } from "lucide-react"; // Friendly icons use kora holo

export default function ErrorPage() {
  // React Router hook for navigation
  const navigate = useNavigate();

  // State to track the countdown timer
  const [countdown, setCountdown] = useState(5);

  // --- Automatic Redirect Logic (5 seconds) ---
  useEffect(() => {
    // Redirect timer set kora holo
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Jokhon countdown 0 hobe, tokhon home page-e navigate kora hobe
    if (countdown === 0) {
      clearInterval(timer);
      navigate("/"); // Home route-e niye jabe
    }

    // Cleanup function for useEffect
    return () => clearInterval(timer);
  }, [countdown, navigate]); // countdown state change hole abar run hobe

  // --- Framer Motion Variants for Animation ---
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.5)",
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg p-8 sm:p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl text-center border border-gray-200 dark:border-gray-700"
      >
        {/* 404 Visual Indicator */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Frown className="w-20 h-20 text-primary mx-auto mb-4" />
        </motion.div>

        {/* Main Error Text */}
        <h1 className="text-8xl sm:text-9xl font-extrabold text-primary dark:text-primary mb-4 tracking-wider">
          404
        </h1>

        {/* Friendly UI Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Oops! Page Not Found
        </h2>
        <p className="text-md text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find the page you were looking for. It might have been
          moved or deleted.
        </p>

        {/* Redirect Message */}
        <p className="text-lg text-red-500 dark:text-red-400 mb-6 font-semibold">
          Redirecting to home in {countdown} seconds...
        </p>

        {/* Button to go back to home */}
        <motion.button
          onClick={() => navigate("/")}
          className="btn w-full py-3 text-lg font-bold flex items-center justify-center bg-primary hover:bg-gray-600 text-white shadow-lg shadow-indigo-500/50 dark:shadow-indigo-800/50 transition duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Home className="w-5 h-5 mr-2" />
          Go Back Home Instantly
        </motion.button>
      </motion.div>
    </div>
  );
}
