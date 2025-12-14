import React from "react";
import { motion } from "framer-motion";

// 🚩 Framer Motion Variants for the pulsing effect
const pulseVariants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6], // Pulse from 60% opacity to 100% and back
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// --- Reusable Skeleton Components ---

// 1. Title/Header Skeleton
const SkeletonHeader = () => (
  <motion.div
    className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"
    variants={pulseVariants}
    initial="initial"
    animate="animate"
  />
);

// 2. Line Skeleton
const SkeletonLine = ({ width = "full" }) => (
  <motion.div
    className={`h-4 bg-gray-200 dark:bg-gray-700 rounded-sm mb-2`}
    style={{ width: width === "full" ? "100%" : width }}
    variants={pulseVariants}
    initial="initial"
    animate="animate"
  />
);

// 3. Button/Action Skeleton
const SkeletonButton = () => (
  <motion.div
    className="h-10 w-24 bg-primary/30 rounded-lg mt-4"
    variants={pulseVariants}
    initial="initial"
    animate="animate"
  />
);

// --- Main Loading Component ---

export default function Loading() {
  return (
    // 🚩 Full Screen Overlay (Center the loader)
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/80 z-[9999]">
      {/* 🚩 Education-Themed Loader Container (Looks like an open book or document) */}
      <div className="w-11/12 max-w-lg p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-primary relative overflow-hidden">
        {/* Visual Accent (Book Spine/Bookmark Look) */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-primary opacity-20 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>

        {/* 1. Header/Title Section */}
        <SkeletonHeader />

        {/* 2. Content/Text Lines (Represents a lesson or document) */}
        <div className="mt-6">
          <SkeletonLine width="90%" />
          <SkeletonLine width="95%" />
          <SkeletonLine width="80%" />
          <SkeletonLine width="60%" />
          <SkeletonLine width="92%" />
          <SkeletonLine width="85%" />
          <SkeletonLine width="70%" />
        </div>

        {/* 3. Action/Footer Section */}
        <div className="mt-8 flex justify-end">
          <SkeletonButton />
        </div>
      </div>

      {/* Optional: Descriptive Text below the loader */}
      <div className="absolute bottom-1/4 mt-16 text-gray-700 dark:text-gray-300 text-lg font-medium">
        Loading resources...
      </div>
    </div>
  );
}
