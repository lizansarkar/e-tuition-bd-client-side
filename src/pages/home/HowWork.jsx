import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, CheckCircle } from 'lucide-react';

// 🚩 Framer Motion Variants for Staggered Animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.3, // Each step appears one after another
            delayChildren: 0.2 
        } 
    }
};

// Framer Motion Variants for Step Card (Upward slide-in)
const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            type: 'spring', 
            stiffness: 100, 
            damping: 10 
        } 
    }
};

// 🚩 Step Data
const workSteps = [
    {
        id: 1,
        icon: UserPlus,
        title: "1. Create Profile & Post",
        description: "Parents/Students register and post their specific tuition needs, including subject, class, location, and preferred salary."
    },
    {
        id: 2,
        icon: FileText,
        title: "2. Receive Tutor Applications",
        description: "Verified tutors review the post and submit their detailed profiles/applications. We also send expert tutor CVs."
    },
    {
        id: 3,
        icon: CheckCircle,
        title: "3. Interview & Select Tutor",
        description: "Review applications, interview suitable tutors, and finalize the one that perfectly matches your learning requirements."
    },
];

// Reusable Step Component with Motion
const WorkStep = ({ step, isLast }) => {
    const Icon = step.icon;
    
    return (
        <motion.div 
            className="relative flex flex-col items-center text-center px-4"
            variants={stepVariants}
        >
            {/* 🚩 Dashed Arrow Connector (Only show if not the last step) */}
            {!isLast && (
                <div className="hidden lg:block absolute right-0 top-1/4 transform translate-x-1/2 w-full">
                    {/* Arrow path (Tailwind border/SVG) - simple dashed line used here */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1 w-full border-t-4 border-dashed border-gray-300 dark:border-gray-700"></div>
                </div>
            )}
            
            {/* Icon Circle (Animated on hover) */}
            <motion.div 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 border-4 border-primary text-primary flex items-center justify-center mb-6 shadow-xl cursor-default"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(109, 219, 90, 0.4)" }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={2.5}/>
            </motion.div>
            
            {/* Title and Description */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-xs">
                {step.description}
            </p>
        </motion.div>
    );
};


export default function HowWork() {
    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                
                {/* Section Heading */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        The <span className="text-primary">3 Simple Steps</span> to Find a Tutor
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">
                        Connecting parents, students, and expert tutors seamlessly.
                    </p>
                </div>

                {/* 🚩 Steps Grid (3 Column Layout) */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* 🚩 Dashed Line for Mobile/Tablet View (Vertical Line) */}
                    <div className="md:hidden absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0 border-l-4 border-dashed border-gray-300 dark:border-gray-700"></div>

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