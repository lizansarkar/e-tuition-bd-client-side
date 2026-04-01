import React from "react";
import { Link } from "react-router";
import logoPath from "../../assets/logo.png";
import { motion } from "framer-motion";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiFacebookFill,
  RiTwitterXFill,
  RiLinkedinFill,
  RiInstagramLine,
} from "react-icons/ri";

const Footer = () => {
  const aboutPlatform =
    "eTuitionBD bridges the gap between learners and expert tutors. Learn anything, anytime, anywhere with our dedicated support.";

  const contactInfo = {
    email: "support@etuitionbd.com",
    phone: "+880 1XXXXXXXXX",
    address: "123, Tejgaon Road, Dhaka, Bangladesh",
  };

  const socialLinks = [
    { icon: RiFacebookFill, href: "https://facebook.com", color: "hover:bg-blue-600 hover:text-white" },
    { icon: RiTwitterXFill, href: "https://x.com", color: "hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white" },
    { icon: RiLinkedinFill, href: "https://linkedin.com", color: "hover:bg-blue-700 hover:text-white" },
    { icon: RiInstagramLine, href: "https://instagram.com", color: "hover:bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:text-white" },
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Tuition Listings", to: "/tuitions" },
    { label: "Find a Tutor", to: "/tutors" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-[#0B1120] text-gray-700 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-6 py-16">
        {/* Grid System - 4 Columns on Large Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Logo + About */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <img
                src={logoPath}
                alt="eTuitionBD"
                className="h-12 w-auto object-contain brightness-100 dark:brightness-110 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              {aboutPlatform}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm hover:text-primary dark:hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 group">
                <RiMailLine className="text-lg text-primary mt-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Email</span>
                  <a href={`mailto:${contactInfo.email}`} className="text-sm dark:text-gray-200 hover:text-primary transition-colors break-all">{contactInfo.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <RiPhoneLine className="text-lg text-primary mt-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Phone</span>
                  <a href={`tel:${contactInfo.phone}`} className="text-sm dark:text-gray-200 hover:text-primary transition-colors">{contactInfo.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <RiMapPinLine className="text-lg text-primary mt-1" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Address</span>
                  <span className="text-sm dark:text-gray-200 leading-relaxed">{contactInfo.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Follow Us</h3>
            <p className="text-sm mb-6">Join our community on social media to stay updated.</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, color }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-300 ${color}`}
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-primary font-bold tracking-wide">eTuitionBD</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;