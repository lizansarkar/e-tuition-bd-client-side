import React from "react";
import { NavLink } from "react-router";
import { MapPin, BookOpen, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

// 🚩 Dummy Data (Backend-er data ashar aage ei data use kora hobe)
const mockTuitions = [
  {
    id: 1,
    title: "Urgent Math & Physics Tutor for Class 9 (English Version)",
    subject: "Math, Physics (Class 9)",
    location: "Mirpur DOHS, Dhaka",
    salary: "8,000 - 10,000 BDT/Month",
    time: "3 Days/Week (Evening)",
    studentCount: 1,
  },
  {
    id: 2,
    title: "Tutor for IELTS Preparation (Speaking Focused)",
    subject: "English (IELTS)",
    location: "Bashundhara R/A, Dhaka",
    salary: "5,000 - 7,000 BDT/Month",
    time: "2 Days/Week (Flexible)",
    studentCount: 1,
  },
  {
    id: 3,
    title: "General Science Tutor for Class 6 (Home Visit)",
    subject: "General Science, Bangla",
    location: "Chittagong University Area",
    salary: "4,500 - 6,000 BDT/Month",
    time: "3 Days/Week (Morning)",
    studentCount: 2,
  },
  {
    id: 4,
    title: "University Level C++ Programming Help",
    subject: "Computer Science (C++)",
    location: "Online/Remote",
    salary: "Negotiable (Hourly Rate)",
    time: "4 Hours/Week (Weekend)",
    studentCount: 1,
  },
  {
    id: 5,
    title: "Admission Coaching for Medical Entrance",
    subject: "Biology, Chemistry",
    location: "Kallyanpur, Dhaka",
    salary: "12,000 - 15,000 BDT/Month",
    time: "5 Days/Week (Afternoon)",
    studentCount: 1,
  },
  {
    id: 6,
    title: "Piano Lesson for Beginners (Child)",
    subject: "Music (Piano)",
    location: "Gulshan 1, Dhaka",
    salary: "3,000 - 4,000 BDT/Month",
    time: "1 Day/Week (Friday)",
    studentCount: 1,
  },
  {
    id: 7,
    title: "Arabic Language Tutor for Basic Learning",
    subject: "Arabic (Basic)",
    location: "Mohammadpur, Dhaka",
    salary: "3,500 - 5,000 BDT/Month",
    time: "2 Days/Week (Evening)",
    studentCount: 1,
  },
  {
    id: 8,
    title: "Business Studies (BBA) Semester Final Support",
    subject: "Accounting, Finance",
    location: "Online/Remote",
    salary: "8,000 - 10,000 BDT/Month",
    time: "Flexible",
    studentCount: 1,
  },
];

// Animation for card entrance
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LatestTuitionPosts() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header: Heading and See All Button */}
        <div className="flex justify-between items-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            <span className="text-primary mr-2">Latest</span> Tuition Posts
          </h2>

          {/* 🚩 See All Button (Apnar design-er moto) */}
          <NavLink
            to="/all-tuitions"
            className="btn btn-sm md:btn-md bg-primary text-white hover:bg-primary/90 transition-all font-semibold flex items-center gap-1"
          >
            See All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </NavLink>
        </div>

        {/* Grid Layout: 4x2 (8 Cards) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {mockTuitions.slice(0, 8).map((tuition, index) => (
            <motion.div
              key={tuition.id}
              className="bg-base-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              variants={cardVariants}
            >
              {/* Card Content */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-snug truncate">
                {tuition.title}
              </h3>

              {/* Details Grid */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 border-t border-b border-dashed border-gray-300 dark:border-gray-700 py-3 mb-4">
                {/* Subject */}
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {tuition.subject}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{tuition.location}</span>
                </div>

                {/* Time/Schedule */}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>{tuition.time}</span>
                </div>

                {/* Students */}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    {tuition.studentCount} Student
                    {tuition.studentCount > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Footer: Salary and Apply Button */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-extrabold text-green-600 dark:text-green-400">
                  {tuition.salary}
                </span>
                <NavLink
                  to={`/tuition/${tuition.id}`}
                  className="btn btn-sm bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  View Details
                </NavLink>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
