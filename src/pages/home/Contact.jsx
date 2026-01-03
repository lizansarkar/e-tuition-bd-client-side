import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Mail, Phone, Send } from "lucide-react";
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

      if (response.data.insertedId || response.data.acknowledged || response.data.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for contacting us. We will get back to you soon.",
          icon: "success",
          confirmButtonColor: "#570df8",
          confirmButtonText: "Great!",
          background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
          color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        });
        reset();
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        title: "Connection Failed!",
        text: error.response?.data?.message || "Could not connect to server. Please check your internet or backend.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Get In <span className="text-primary italic">Touch</span>
          </h1>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full Name"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:bg-gray-700 dark:text-white transition-all"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                  placeholder="Email Address"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:bg-gray-700 dark:text-white transition-all"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>

              <div>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>

              <motion.button
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
              >
                {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : <><Send size={20} /> Send Message</>}
              </motion.button>
            </form>
          </motion.div>

          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Phone size={24} /></div>
                <div><p className="text-sm text-gray-500">Call Us</p><p className="font-bold dark:text-white">+880 1700-000000</p></div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Mail size={24} /></div>
                <div><p className="text-sm text-gray-500">Email Us</p><p className="font-bold dark:text-white">support@etuitionbd.com</p></div>
              </div>
            </div>

            <div className="h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57903.129524320436!2d91.81995543343588!3d24.89968434771694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d1c0997a%3A0xafc6405d7429188d!2sSylhet!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}