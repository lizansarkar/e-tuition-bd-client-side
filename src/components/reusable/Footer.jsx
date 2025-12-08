import React from "react";
import { Link } from "react-router";
import logoPath from "../../assets/logo.png";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  X,
  Instagram,
} from "lucide-react";

const Footer = () => {
  // Platform description placeholder
  const aboutPlatform =
    "E-Tuition-BD is your platform for connecting students with expert tutors across various subjects. We aim to make quality education accessible and convenient.";

  // Contact Information
  const contactInfo = {
    email: "support@etuitionbd.com",
    phone: "+880 1XXXXXXXXX",
    address: "123, Tejgaon Road, Dhaka, Bangladesh",
  };

  return (
    // Footer component using DaisyUI footer class and Tailwind styles
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 1. About Platform */}
        <div className="col-span-1">
          <Link to="/" className="text-2xl font-extrabold ml-2 sm:ml-0">
            <img
              className="h-[50px] w-[200px]"
              src={logoPath}
              alt="eTuitionBD Logo"
            />
          </Link>
          <p className="mt-4 text-sm max-w-xs text-gray-600 dark:text-gray-400">
            {aboutPlatform}
          </p>
        </div>

        {/* 2. Quick Links */}
        <nav className="col-span-1">
          <div className="flex flex-col space-y-2">
            <h6 className="footer-title text-lg font-bold text-gray-800 dark:text-white">
              Quick Links
            </h6>
            <Link to="/" className="link link-hover">
              Home
            </Link>
            <Link to="/tuitions" className="link link-hover">
              Tuition Listings
            </Link>
            <Link to="/tutors" className="link link-hover">
              Find a Tutor
            </Link>
            <Link to="/about" className="link link-hover">
              About Us
            </Link>
            <Link to="/contact" className="link link-hover">
              Contact
            </Link>
          </div>
        </nav>

        {/* 3. Contact Information */}
        <nav className="col-span-1">
          <h6 className="footer-title text-lg font-bold text-gray-800 dark:text-white">
            Get in Touch
          </h6>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-primary" />
            <a
              href={`mailto:${contactInfo.email}`}
              className="link link-hover text-sm"
            >
              {contactInfo.email}
            </a>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Phone className="w-5 h-5 text-primary" />
            <a
              href={`tel:${contactInfo.phone}`}
              className="link link-hover text-sm"
            >
              {contactInfo.phone}
            </a>
          </div>
          <div className="flex items-start space-x-2 mt-2">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm">{contactInfo.address}</p>
          </div>
        </nav>

        {/* 4. Social Media Icons */}
        <div className="col-span-1">
          <h6 className="footer-title text-lg font-bold text-gray-800 dark:text-white">
            Follow Us
          </h6>
          <div className="grid grid-flow-col gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition duration-300 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <Facebook className="w-6 h-6" />
            </a>
            {/* New X (Twitter) Logo */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition duration-300 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition duration-300 dark:text-gray-400 dark:hover:text-blue-500"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition duration-300 dark:text-gray-400 dark:hover:text-pink-400"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-center p-4 text-base-content border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 w-full flex justify-center">
        <aside className="text-center">
          {/* aside-er moddher text-o center kora holo */}
          <p className="text-sm">
            Copyright &copy; {new Date().getFullYear()} - All rights reserved by{" "}
            <strong className="text-primary">eTuitionBD.</strong>
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
