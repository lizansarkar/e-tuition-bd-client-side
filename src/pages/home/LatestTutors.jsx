import React from "react";
import { NavLink } from "react-router";
import { MapPin, CheckCircle, GraduationCap, ArrowRight, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow, Navigation } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const mockTutors = [
  { id: 1, name: "MD. Arifur R. A.", university: "North South University", location: "Dhaka", rating: 5, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 2, name: "Md.Sadequzzaman Sadeq", university: "Sher-E-Bangla Agriculture", location: "Dhaka", rating: 4.8, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 3, name: "Swath Shahin M.", university: "Ahsanullah University", location: "Dhaka", rating: 5, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 4, name: "Rehan Ahmed", university: "Southeast University", location: "Dhaka", rating: 4.9, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 5, name: "Ayesha Siddiqa", university: "University of Dhaka", location: "Chittagong", rating: 4.7, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
];

const TutorCard = ({ tutor }) => {
  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-7 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden h-[450px]">
      
      {/* 5 Star Rating system */}
      <div className="absolute top-6 right-6 flex gap-0.5 z-20">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3.5 h-3.5 ${i < Math.floor(tutor.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>

      {/* Profile Image */}
      <div className="relative z-10 mt-6">
        <div className="w-28 h-28 rounded-[2rem] overflow-hidden border-4 border-primary/10 p-1 group-hover:border-primary transition-all duration-500 shadow-inner">
          <img
            src={tutor.photoURL}
            alt={tutor.name}
            className="w-full h-full object-cover rounded-[1.5rem] group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-lg border border-gray-50 dark:border-gray-700">
          <CheckCircle className="w-5 h-5 text-green-500 fill-green-50/10" />
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 flex-grow w-full relative z-10">
        <h3 className="text-xl font-black text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {tutor.name}
        </h3>
        
        <div className="mt-4 space-y-3 px-2">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 rounded-xl border border-gray-100 dark:border-gray-700">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="truncate">{tutor.university}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{tutor.location}, BD</span>
          </div>
        </div>
      </div>

      {/* Button: Fixed for Slider Click Issues */}
      <div className="w-full mt-auto relative z-30">
          <NavLink
            to={`/tutor/${tutor.id}`}
            onClick={(e) => e.stopPropagation()} // সোয়াইপ করার সময় ক্লিক প্রোটেকশন
            className="w-full py-4 bg-gray-900 dark:bg-primary/10 text-white dark:text-primary rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-primary/30 cursor-pointer pointer-events-auto z-50"
          >
            View Profile
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
          </NavLink>
      </div>
    </div>
  );
};

export default function LatestTutors() {
  return (
    <section className="py-24 md:py-32 bg-[#f8fafc] dark:bg-[#020617] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Verified Experts</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Elite</span> Tutors
            </h2>
          </div>

          <NavLink
            to="/all-tutors"
            className="group px-10 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-900 dark:text-white hover:border-primary/50 transition-all flex items-center gap-3 shadow-sm hover:shadow-xl cursor-pointer"
          >
            Explore All
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-primary" />
          </NavLink>
        </div>

        {/* Swiper Section */}
        <div className="relative">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            slideToClickedSlide={true} // স্লাইডে ক্লিক করলে সেটি সেন্টারে আসবে
            preventClicks={false} // ক্লিক ইভেন্ট সচল রাখবে
            preventClicksPropagation={false}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="premium-swiper !pb-20"
            breakpoints={{
              320: { slidesPerView: 1.1, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 4, spaceBetween: 40 },
            }}
          >
            {mockTutors.map((tutor) => (
              <SwiperSlide key={tutor.id} className="max-w-[360px] !h-auto">
                <TutorCard tutor={tutor} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Global CSS for Slider Click Fix & UI Enhancement */}
      <style>{`
        .premium-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #3b82f6;
          opacity: 0.2;
        }
        .premium-swiper .swiper-pagination-bullet-active {
          width: 35px;
          border-radius: 8px;
          background: #3b82f6; 
          opacity: 1;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .swiper-slide {
          opacity: 0.4;
          filter: blur(1px);
          transition: all 0.6s ease;
          pointer-events: auto !important; /* ক্লিক সচল করা */
        }
        .swiper-slide-active {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1.05);
          z-index: 50 !important;
        }
        /* নিশ্চিত করা যে বাটন ক্লিক পাচ্ছে */
        .swiper-slide a {
           pointer-events: auto !important;
           user-select: none;
        }
      `}</style>
    </section>
  );
}