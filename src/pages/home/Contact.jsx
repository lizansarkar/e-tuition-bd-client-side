import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  // 🚩 Note: Ei form-ti ekhon shudhu client-side-e ache.
  // Backend integration (e.g., using Axios/fetch to an API endpoint)
  // er jonyo apnake 'handleSubmit' function-ti likhte hobe.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ekhane API call er logic thakbe
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.header className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out for tuition inquiries,
            partnerships, or support.
          </p>
        </motion.header>

        {/* Main Content: Form and Info Side-by-Side */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* 1. 📧 CONTACT FORM SECTION */}
          <motion.div
            className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              />

              {/* Email Address */}
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              />

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject (e.g., Tutor Application / Tuition Inquiry)"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              />

              {/* Message */}
              <textarea
                placeholder="Your Message"
                rows="4"
                required
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 hover:bg-secondary cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* 2. 📍 CONTACT INFO & MAP SECTION */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Contact Details Cards */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md transition hover:shadow-lg">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Call Us
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    +880 1XXXXXXXXX
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md transition hover:shadow-lg">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Email Us
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    support@etuitionbd.com
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md transition hover:shadow-lg">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Working Hours
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sun - Thu: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.div
              className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-600"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 mr-2" />
                Map Location Placeholder (Google Maps Embed Link Here)
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
