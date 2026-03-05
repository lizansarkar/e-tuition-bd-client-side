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
  { id: 1, name: "MD. Arifur R. A.", university: "North South University", location: "Dhaka", isPremium: true, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 2, name: "Md.Sadequzzaman Sadeq", university: "Sher-E-Bangla Agriculture", location: "Dhaka", isPremium: true, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 3, name: "Swath Shahin M.", university: "Ahsanullah University", location: "Dhaka", isPremium: true, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 4, name: "Rehan Ahmed", university: "Southeast University", location: "Dhaka", isPremium: true, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 5, name: "Ayesha Siddiqa", university: "University of Dhaka", location: "Chittagong", isPremium: false, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
  { id: 6, name: "Fahim Feroz", university: "BUET (CSE)", location: "Online", isPremium: true, photoURL: "https://i.ibb.co.com/DH2pZ0dV/photo-1640951613773-54706e06851d.jpg" },
];

const TutorCard = ({ tutor }) => {
  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden h-[420px]">
      
      {/* Premium Badge */}
      {tutor.isPremium && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-full shadow-lg animate-bounce">
            <Star className="w-4 h-4 text-white fill-current" />
          </div>
        </div>
      )}

      {/* Profile Image with Ring Effect */}
      <div className="relative z-10 mt-4">
        <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-primary/20 p-1 group-hover:border-primary transition-all duration-500">
          <img
            src={tutor.photoURL}
            alt={tutor.name}
            className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md border border-gray-100 dark:border-gray-700">
          <CheckCircle className="w-5 h-5 text-green-500 fill-green-50" />
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 flex-grow">
        <h3 className="text-xl font-black text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
          {tutor.name}
        </h3>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{tutor.university}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{tutor.location}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <NavLink
        to={`/tutor/${tutor.id}`}
        className="mt-6 w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
      >
        View Profile
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </NavLink>
    </div>
  );
};

export default function LatestTutors() {
  return (
    <section className="py-20 md:py-28 bg-[#f8fafc] dark:bg-[#020617] relative overflow-hidden">
      
      {/* background glass shapes */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-2 justify-center md:justify-start">
              <Sparkles className="w-4 h-4" />
              <span>Verified Experts</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Premium</span> Tutors
            </h2>
          </div>

          <NavLink
            to="/all-tutors"
            className="group px-8 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-gray-900 dark:text-white hover:border-primary/50 transition-all flex items-center gap-2 shadow-sm"
          >
            Explore All
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-primary" />
          </NavLink>
        </div>

        {/* Unique Coverflow Swiper */}
        <div className="py-10">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="premium-swiper"
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 4, spaceBetween: 50 },
            }}
          >
            {mockTutors.map((tutor) => (
              <SwiperSlide key={tutor.id} className="max-w-[350px]">
                <TutorCard tutor={tutor} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Styles for Swiper Pagination */}
      <style>{`
        .premium-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
        }
        .premium-swiper .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 6px;
          background: #3b82f6; /* Adjust to your primary color */
          transition: all 0.3s ease;
        }
        .swiper-slide {
            transition: all 0.5s ease;
        }
        .swiper-slide-active {
            transform: scale(1.05);
            z-index: 10;
        }
      `}</style>
    </section>
  );
}