import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap'; 
import { Home, Globe, Zap, Users } from 'lucide-react'; 

// 🚩 Feature Data (Positions are based on the main container)
const featuresData = [
    {
        id: 1,
        title: "Home Tutoring",
        description: "Personalized learning at home.",
        icon: Home,
        // Position Class: Top Center (Adjusted for better spacing)
        positionClass: "top-[5%] left-1/2 transform -translate-x-1/2", 
    },
    {
        id: 2,
        title: "Online Tutoring",
        description: "Flexible learning from anywhere.",
        icon: Globe,
        // Position Class: Right Center
        positionClass: "top-1/2 right-[5%] transform translate-x-1/2 -translate-y-1/2 text-left", 
    },
    {
        id: 3,
        title: "Crash Program",
        description: "Fast-track your exam prep.",
        icon: Zap,
        // Position Class: Bottom Center
        positionClass: "bottom-[5%] left-1/2 transform -translate-x-1/2", 
    },
    {
        id: 4,
        title: "Batch Tutoring",
        description: "Group learning, better results.",
        icon: Users,
        // Position Class: Left Center
        positionClass: "top-1/2 left-[5%] transform -translate-x-1/2 -translate-y-1/2 text-right", 
    },
];

// Reusable Feature Point Component (Static Content)
const FeaturePoint = ({ feature, isMobile, containerSize = 600 }) => {
    const Icon = feature.icon;
    const isHorizontal = feature.id === 2 || feature.id === 4;

    // Mobile View
    if (isMobile) {
        // (Mobile view is kept simple and vertical, same as before)
        return (
            <div className="p-4 bg-white dark:bg-gray-800 border-l-4 border-primary shadow-md rounded-lg flex items-start gap-4">
                <Icon className="w-6 h-6 text-primary shrink-0 mt-1"/>
                <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
            </div>
        );
    }

    // Desktop View (Absolute Positioning with connecting lines)
    return (
        <motion.div
            className={`absolute w-40 md:w-56 z-20 ${feature.positionClass} ${isHorizontal ? 'items-center' : 'items-center flex flex-col'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 + feature.id * 0.1 }}
        >
            <div className={`p-4 rounded-xl shadow-lg bg-white dark:bg-gray-800 border-t-4 border-primary/70 transition-all hover:shadow-2xl ${isHorizontal ? 'text-left' : 'text-center'} ${feature.id === 4 ? 'text-right' : ''}`}>
                
                {/* 🚩 Icon Circle (Apnar Blue Marker-er kachhe thaka icon) */}
                <div 
                    className={`w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg absolute transform -translate-y-1/2 ${feature.id === 1 ? 'left-1/2 -translate-x-1/2 top-0' : feature.id === 3 ? 'left-1/2 -translate-x-1/2 bottom-0' : feature.id === 2 ? 'left-0' : 'right-0'}`}
                >
                    <Icon className="w-4 h-4 text-white" />
                </div>
                
                {/* Content Text */}
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 mt-2">
                    {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                </p>
            </div>

            {/* 🚩 Connecting Line/Tir (Blue pen-er moto center-er dike jabe) */}
            {/* The line will start from the text box and go towards the center circle */}
            <div className={`absolute z-10 ${isHorizontal ? 'h-0.5' : 'w-0.5'} bg-gray-300 dark:bg-gray-700`}>
                <div className={`absolute w-full h-full bg-primary/20 ${isHorizontal ? 'left-[100%]' : 'top-[100%]'}`}></div>
            </div>

            {/* Line Positioning adjustments to connect to the center */}
            {/* This is complex CSS logic to position the dashed lines accurately relative to the center circle's edge. */}
            <div className="absolute z-10">
                {/* Vertical Lines (Top/Bottom) */}
                {(feature.id === 1 || feature.id === 3) && (
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 border-r border-dashed border-primary/50 ${feature.id === 1 ? 'bottom-[100%] h-40' : 'top-[100%] h-40'}`}></div>
                )}
                {/* Horizontal Lines (Left/Right) */}
                {(feature.id === 2 || feature.id === 4) && (
                    <div className={`absolute top-1/2 transform -translate-y-1/2 h-0.5 border-b border-dashed border-primary/50 ${feature.id === 2 ? 'right-[100%] w-40' : 'left-[100%] w-40'}`}></div>
                )}
            </div>

        </motion.div>
    );
};


export default function Features() {
    const rotatingCircleRef = useRef(null);
    const headingVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    // 🚩 GSAP Animation for Infinite Rotation Loop on the Dashed Circle only
    useEffect(() => {
        if (rotatingCircleRef.current) {
            gsap.to(rotatingCircleRef.current, {
                rotate: 360, 
                duration: 40, 
                ease: "none", 
                repeat: -1, 
            });
        }
    }, []);


    return (
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-4">
                
                {/* Heading */}
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        <span className="text-primary">Tutoring</span> Method
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">
                        Personalized learning method with flexible options for everyone.
                    </p>
                </motion.div>

                {/* 🚩 Main Circular Layout Container (Image + Features) */}
                <div className="flex justify-center items-center h-[600px] md:h-[750px] relative">
                    
                    {/* The Rotating Dashed Circle (GSAP Target) */}
                    <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
                        <motion.div 
                            ref={rotatingCircleRef} 
                            // 🚩 Glowing Border Effect added via Shadow
                            className="w-full h-full border-2 border-dashed border-primary/50 rounded-full shadow-2xl shadow-primary/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                        </motion.div>
                    </div>

                    {/* 🚩 Center Content (Static Image) - Eita Majhe Static Thakbe */}
                    <motion.div 
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-900 relative z-30"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    >
                        <img 
                            src="https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" // Replace with your Image
                            alt="Tutoring Methods Center" 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                    </motion.div>

                    {/* Feature Points (Positioned Absolutely - Static) */}
                    <div className="hidden md:block absolute w-full h-full">
                        {featuresData.map((feature) => (
                            <FeaturePoint key={feature.id} feature={feature} isMobile={false} />
                        ))}
                    </div>

                    {/* 🚩 Mobile/Small Screen List View */}
                    <div className="md:hidden absolute top-[600px] w-full grid grid-cols-1 gap-6">
                        {featuresData.map((feature) => (
                            <FeaturePoint key={feature.id} feature={feature} isMobile={true} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}