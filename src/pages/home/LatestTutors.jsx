import React from "react";
import { NavLink } from "react-router";
import { MapPin, CheckCircle, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

// Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const mockTutors = [
  {
    id: 1,
    name: "MD. Arifur R. A.",
    university: "North South University",
    location: "Dhaka",
    subjects: "Math, Physics",
    isPremium: true,
    photoURL:
      "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg", // Replace with actual tutor photos
  },
  {
    id: 2,
    name: "Md.Sadequzzaman Sadeq",
    university: "Sher-E-Bangla Agrica...",
    location: "Dhaka",
    subjects: "Biology, Chemistry",
    isPremium: true,
    photoURL:
      "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
  {
    id: 3,
    name: "Swath Shahin M.",
    university: "Ahsanullah Universit...",
    location: "Dhaka",
    subjects: "CSE, Programming",
    isPremium: true,
    photoURL:
      "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
  {
    id: 4,
    name: "Rehan",
    university: "Southeast University",
    location: "Dhaka",
    subjects: "English, IELTS",
    isPremium: true,
    photoURL:
      "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
  {
    id: 5,
    name: "Ayesha Siddiqa",
    university: "University of Dhaka",
    location: "Chittagong",
    subjects: "Bangla, General Science",
    isPremium: false,
    photoURL:
      "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
  {
    id: 6,
    name: "Fahim Feroz",
    university: "BUET (CSE)",
    location: "Online",
    subjects: "Math, Higher Math",
    isPremium: true,
    photoURL:
      "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
  {
    id: 7,
    name: "Nusrat Jahan",
    university: "Jahangirnagar Univ.",
    location: "Dhaka",
    subjects: "Arts, History",
    isPremium: false,
    photoURL:
      "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
];

// Framer Motion Variants for Staggered Load
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

// Framer Motion Variants for each Card
const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const TutorCard = ({ tutor }) => {
  const isPremium = tutor.isPremium;
  const premiumColor = "text-[#E5B50A]"; // Golden/Yellow color for Premium tag

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col items-center text-center relative"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
    >
      {/* 🚩 Premium Tag / Badge (Upper Right Corner) */}
      {isPremium && (
        <div className="absolute top-0 right-0 p-2 bg-primary text-white text-xs font-bold rounded-tr-xl rounded-bl-xl shadow-md flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-white fill-primary" />
          Premium
        </div>
      )}

      {/* Avatar Section */}
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden mx-auto shadow-md">
          <img
            src={tutor.photoURL}
            alt={tutor.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* 🚩 Verification/Certification Badge (Lower Center of Avatar) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-1 shadow-xl">
          <CheckCircle
            className={`w-5 h-5 ${
              isPremium ? premiumColor : "text-primary"
            } fill-white dark:fill-gray-800`}
          />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
        {tutor.name}
      </h3>

      {/* University */}
      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-2">
        <GraduationCap className="w-4 h-4 text-primary shrink-0" />
        <span>{tutor.university}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <MapPin className="w-4 h-4 text-red-500 shrink-0" />
        <span>{tutor.location}</span>
      </div>

      {/* See Button (Footer style) */}
      <NavLink
        to={`/tutor/${tutor.id}`}
        className="w-full py-2 bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all font-semibold rounded-lg mt-auto"
      >
        See Profile
      </NavLink>
    </motion.div>
  );
};

export default function LatestTutors() {
  return (
    <motion.section
      className="py-16 md:py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            <span className="text-primary mr-2">Premium</span> Tutors
          </h2>

          {/* 🚩 See All Button */}
          <NavLink
            to="/all-tutors"
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

        {/* 🚩 Swiper Slider Implementation */}
        <div className="relative pb-10">
          {" "}
          {/* Padding bottom for pagination dots */}
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            // Responsive Breakpoints
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true }}
            // navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {mockTutors.map((tutor) => (
              <SwiperSlide key={tutor.id}>
                {/* Framer Motion Item inside SwiperSlide */}
                <motion.div variants={itemVariants}>
                  <TutorCard tutor={tutor} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
}
