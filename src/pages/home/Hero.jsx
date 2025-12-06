import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

import heroImage from "../../assets/hero.png";

export default function Hero() {
  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2, // Chhoto chhoto kore shob elements ashbe
        duration: 0.8,
      },
    },
  };

  // Animation variants for the image
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 1.2,
      },
    },
  };

  // Discord-er moto halka 'Glow' effect-er jonyo ekta pseudo-element use kora holo.
  // Eita Tailwind CSS config file-e custom class hishebe add korte paren:
  // utility: .bg-glow { background: radial-gradient(circle at center, #caeb6640 0%, transparent 70%); }

  return (
    <motion.div
      className="relative overflow-hidden dark:bg-gray-900 min-h-[70vh] md:min-h-[85vh] flex items-center"
      initial="hidden"
      animate="visible"
    >
      {/* 🚩 Background Glowing Effect (Discord-er background effect-er moto) */}
      {/* Eita Tailwind-e custom class banate hobe (jemon: bg-glow) */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-full h-full bg-gradient-radial from-primary/30 via-transparent to-transparent animate-pulse-slow">
          {/* Eta shamanno animated glow effect debe. Custom Tailwind config dorkar */}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* ডান দিক: Heading, Nitikotha and Buttons */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            variants={textVariants}
          >
            {/* Shobcheye boro Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4"
              variants={textVariants}
            >
              <span className="text-primary block">
                Find Your Perfect Tutor
              </span>
              Achieve Academic Success.
            </motion.h1>

            {/* Nitikotha / Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
              variants={textVariants}
            >
              Bangladesh's most trusted platform for connecting students with
              verified, expert home and online tutors across all subjects and
              classes.
            </motion.p>

            {/* Buttons (Duita Button) */}
            <motion.div
              className="flex justify-center md:justify-start gap-4"
              variants={textVariants}
            >
              {/* Button 1: Find Tutor */}
              <NavLink
                to="/tutors"
                className="btn btn-lg bg-primary text-white hover:bg-primary-focus transition-all shadow-lg font-bold"
                onClick={() => console.log("Find Tutors Clicked")}
              >
                Find a Tutor
              </NavLink>

              {/* Button 2: Post a Tuition Request */}
              <NavLink
                to="/post-tuition"
                className="btn btn-lg btn-outline border-2 border-primary text-primary hover:bg-primary/10 transition-all font-semibold"
                onClick={() => console.log("Post Tuition Clicked")}
              >
                Post Tuition Request
              </NavLink>
            </motion.div>
          </motion.div>

          {/* বাম দিক: Image (Responsive: Mobile-e niche chole jabe) */}
          <motion.div
            className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
            variants={imageVariants}
          >
            <img
              src={heroImage}
              alt="Student studying with tutor illustration"
              className="w-full max-w-sm md:max-w-md h-auto rounded-xl transition-transform hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
