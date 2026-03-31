import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Mail, Phone, Send, MapPin } from "lucide-react"; // MapPin অ্যাড করা হয়েছে
import useAxiosSicure from "../../hooks/useAxiosSicure";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const axiosSicure = useAxiosSicure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosSicure.post("/contacts", data);

      if (
        response.data.insertedId ||
        response.data.acknowledged ||
        response.data.success
      ) {
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for contacting us. We will get back to you soon.",
          icon: "success",
          confirmButtonColor: "#570df8",
          confirmButtonText: "Great!",
          background: document.documentElement.classList.contains("dark")
            ? "#1f2937"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
        });
        reset();
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        title: "Connection Failed!",
        text:
          error.response?.data?.message ||
          "Could not connect to server. Please check your internet or backend.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-6 md:py-12 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Get In <span className="text-primary italic">Touch</span>
            </h1>
            <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            {/* Added Sub-text */}
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Have questions or need assistance? Our team is here to help! Send
              us a message and we'll respond as quickly as possible.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 text-center justify-center">
              <span className="w-8 h-1 bg-primary rounded-full inline-block"></span>
              Send Us a Message
              <span className="w-8 h-1 bg-primary rounded-full inline-block"></span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Full Name"
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:text-white transition-all shadow-sm"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Email Address"
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:text-white transition-all shadow-sm"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:text-white transition-all shadow-sm"
                />
                {errors.subject && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              <div>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:text-white transition-all shadow-sm resize-none"
                />
                {errors.message && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <motion.button
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/40 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <Send
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="flex items-center gap-5 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                  <Phone size={26} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                    Call Us
                  </p>
                  <p className="font-extrabold text-lg dark:text-white">
                    +880 1700-000000
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="flex items-center gap-5 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                  <Mail size={26} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                    Email Us
                  </p>
                  <p className="font-extrabold text-lg dark:text-white">
                    support@etuitionbd.com
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Map Section */}
            <div className="h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 relative group">
              {/* Overlay for better integration */}
              <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors"></div>
              <iframe
                title="Saint Martin Island Map"
                src="https://maps.google.com/maps?q=22.6620,92.1611&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
