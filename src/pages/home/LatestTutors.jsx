import React from "react";
import { NavLink } from "react-router";
import { MapPin, CheckCircle, GraduationCap, ArrowRight, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

// Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, FreeMode } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const mockTutors = [
  {
    id: 1,
    name: "MD. Arifur R. A.",
    university: "North South University",
    location: "Dhaka",
    subjects: "Math, Physics",
    isPremium: true,
    photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
  {
    id: 2,
    name: "Md.Sadequzzaman Sadeq",
    university: "Sher-E-Bangla Agriculture University",
    location: "Dhaka",
    subjects: "Biology, Chemistry",
    isPremium: true,
    photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
  {
    id: 3,
    name: "Swath Shahin M.",
    university: "Ahsanullah University of Science & Tech",
    location: "Dhaka",
    subjects: "CSE, Programming",
    isPremium: true,
    photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
  {
    id: 4,
    name: "Rehan Ahmed",
    university: "Southeast University",
    location: "Dhaka",
    subjects: "English, IELTS",
    isPremium: true,
    photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg",
  },
];

const TutorCard = ({ tutor }) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="group bg-white dark:bg-gray-900/40 backdrop-blur-xl border border-gray-100 dark:border-gray-800 p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden h-full cursor-pointer"
    >
      {/* 🚩 Decorative Gradient Background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>

      {/* 🚩 Premium Badge */}
      {tutor.isPremium && (
        <div className="absolute top-5 right-5 z-10">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-gradient-to-r from-amber-400 to-yellow-600 p-1.5 rounded-full shadow-lg"
          >
            <Star className="w-4 h-4 text-white fill-white" />
          </motion.div>
        </div>
      )}

      {/* Avatar Section */}
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-[2rem] p-1.5 bg-gradient-to-tr from-primary to-blue-500 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
          <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-white">
            <img
              src={tutor.photoURL}
              alt={tutor.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
        {/* Verification Icon */}
        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-2xl p-1.5 shadow-xl border border-gray-50 dark:border-gray-700">
          <CheckCircle className="w-6 h-6 text-green-500 fill-green-50" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-6 flex-grow">
        <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
          {tutor.name}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
           <Award className="w-3 h-3" />
           <span>Certified Tutor</span>
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <span className="font-medium line-clamp-1">{tutor.university}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-red-400" />
            <span className="font-medium">{tutor.location}, Bangladesh</span>
          </div>
        </div>
      </div>

      {/* Profile Button */}
      <NavLink
        to={`/tutor/${tutor.id}`}
        className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-xs uppercase tracking-tighter rounded-2xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center gap-2 group/btn"
      >
        View Profile
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </NavLink>
    </motion.div>
  );
};

export default function LatestTutors() {
  return (
    <section className="py-24 bg-[#fcfdfe] dark:bg-[#030712] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="text-left">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-4"
            >
               <span className="w-8 h-[2px] bg-primary"></span>
               Top Rated
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Premium</span> Tutors
            </h2>
          </div>

          <NavLink
            to="/all-tutors"
            className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-2xl font-bold hover:border-primary/50 transition-all shadow-sm active:scale-95"
          >
            See All Experts
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-primary" />
          </NavLink>
        </div>

        {/* Swiper Slider */}
        <div className="relative group">
          <Swiper
            modules={[Pagination, Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={1}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            className="pb-16"
          >
            {mockTutors.map((tutor) => (
              <SwiperSlide key={tutor.id} className="h-auto">
                <TutorCard tutor={tutor} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/*  Custom Swiper Pagination Styling (Global CSS বা স্টাইল ট্যাগে দিতে পারেন) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet-active {
          background: #007bff !important; /* আপনার primary color */
          width: 25px !important;
          border-radius: 5px !important;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
      `}} />
    </section>
  );
}