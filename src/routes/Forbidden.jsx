import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon - Fix Applied Here */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1, 
            rotate: [0, 10, -10, 10, -10, 0] // Keyframes for shaking
          }}
          transition={{ 
            duration: 0.6, 
            type: "tween", // 'spring' er poriborte 'tween' use kora holo
            ease: "easeInOut" 
          }}
          className="flex justify-center mb-6"
        >
          <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-full">
            <ShieldAlert className="w-20 h-20 text-red-600 dark:text-red-500" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Access Denied
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Oops! It looks like you don't have permission to access this page.
          This area is restricted to administrators only.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline border-gray-300 dark:border-gray-600 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn btn-primary flex items-center gap-2 text-white"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-gray-400 dark:text-gray-500 italic"
        >
          Error Code: 403 - Forbidden
        </motion.p>
      </div>
    </div>
  );
}