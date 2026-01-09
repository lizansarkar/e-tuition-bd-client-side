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
    "eTuitionBD bridges the gap between learners and expert tutors. Learn anything, anytime, anywhere.";

  const contactInfo = {
    email: "support@etuitionbd.com",
    phone: "+880 1XXXXXXXXX",
    address: "123, Tejgaon Road, Dhaka, Bangladesh",
  };

  const socialLinks = [
    { icon: RiFacebookFill, href: "https://facebook.com", color: "hover:text-blue-600" },
    { icon: RiTwitterXFill, href: "https://x.com", color: "hover:text-black dark:hover:text-white" },
    { icon: RiLinkedinFill, href: "https://linkedin.com", color: "hover:text-blue-700" },
    { icon: RiInstagramLine, href: "https://instagram.com", color: "hover:text-pink-600" },
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Tuition Listings", to: "/tuitions" },
    { label: "Find a Tutor", to: "/tutors" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo + About */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block">
              <img
                src={logoPath}
                alt="eTuitionBD"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm max-w-md">{aboutPlatform}</p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm hover:text-primary-500 dark:hover:text-primary-400 transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-base font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <RiMailLine className="text-lg text-primary-500" />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <RiPhoneLine className="text-lg text-primary-500" />
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <RiMapPinLine className="text-lg text-primary-500 mt-1" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <h3 className="text-base font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, color }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className={`text-2xl ${color} transition`}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} eTuitionBD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;