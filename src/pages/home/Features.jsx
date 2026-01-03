import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Home, Globe, Zap, Users } from "lucide-react";

const featuresData = [
  {
    id: 1,
    title: "Home Tutoring",
    description: "Personalized learning at your comfort.",
    icon: Home,
    pos: "md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2", // Added md: prefix
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Online Tutoring",
    description: "Flexible learning from anywhere.",
    icon: Globe,
    pos: "md:top-1/2 md:right-0 md:translate-x-1/2 md:-translate-y-1/2",
    color: "from-purple-500 to-pink-400",
  },
  {
    id: 3,
    title: "Crash Program",
    description: "Fast-track your exam prep.",
    icon: Zap,
    pos: "md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2",
    color: "from-amber-500 to-orange-400",
  },
  {
    id: 4,
    title: "Batch Tutoring",
    description: "Group learning, better results.",
    icon: Users,
    pos: "md:top-1/2 md:left-0 md:-translate-x-1/2 md:-translate-y-1/2",
    color: "from-emerald-500 to-teal-400",
  },
];

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      // Desktop: Absolute | Mobile: Relative (Hidden on mobile via parent)
      className={`absolute z-40 w-48 md:w-64 ${feature.pos}`}
    >
      <div className="relative group p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-none transition-all duration-300">
        <div
          className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="mt-6 text-center">
          <h4 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            {feature.title}
          </h4>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Features() {
  const rotatingCircleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.to(rotatingCircleRef.current, {
      rotate: 360,
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    gsap.to(containerRef.current, {
      y: 15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="py-24 bg-[#ffffff] dark:bg-gray-900 overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-semibold tracking-widest uppercase text-sm"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4"
          >
            Tutoring <span className="text-primary italic">Method</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Wrapper: Flex Column for Mobile, Block for Desktop */}
        <div className="flex flex-col items-center">
          
          {/* Visual Container */}
          <div className="relative flex justify-center items-center h-[300px] md:h-[700px] w-full">
            {/* Background Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-10">
              <div
                className="absolute w-[200px] h-[200px] md:w-[600px] md:h-[600px] border border-primary rounded-full animate-ping"
                style={{ animationDuration: "4s" }}
              ></div>
              <div className="absolute w-[280px] h-[280px] md:w-[800px] md:h-[800px] border border-gray-400 rounded-full"></div>
            </div>

            <div
              ref={containerRef}
              className="relative w-[200px] h-[200px] md:w-[500px] md:h-[500px] flex items-center justify-center"
            >
              {/* Rotating Dashed Circle */}
              <div
                ref={rotatingCircleRef}
                className="absolute inset-0 border-2 border-dashed border-primary/40 rounded-full"
              ></div>

              {/* Center Image */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className="relative z-50 w-32 h-32 md:w-64 md:h-64 rounded-full p-2 bg-white dark:bg-gray-800 shadow-2xl"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src="https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg"
                    alt="Center"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Desktop Feature Points: Hidden on mobile, Absolute on Desktop */}
              <div className="hidden md:block">
                {featuresData.map((feature) => (
                  <FeatureCard key={feature.id} feature={feature} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View Content: Shows only on mobile, neatly below the image */}
          <div className="mt-10 w-full grid grid-cols-1 gap-6 md:hidden px-2">
            {featuresData.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg border-l-4 border-primary"
                >
                  <div
                    className={`w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md text-white`}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}