import { useQuery } from "@tanstack/react-query";
import React, { useRef, useEffect } from "react";
import { useParams } from "react-router";
import useAxiosSicure from "../../../hooks/useAxiosSicure";
import { DollarSign, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Payment = () => {
  const { paymentId } = useParams();
  const axiosSecure = useAxiosSicure();

  const { isLoading, data: tutor } = useQuery({
    queryKey: ["tutor", paymentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${paymentId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      expectedSalary: tutor.expectedSalary,
      tuitionId: tutor.tuitionId,
      tutorEmail: tutor.tutorEmail,
      tutorName: tutor.tutorName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  // --- GSAP Animation for Glow Effect on Load ---
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [tutor]);

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Fallback if data is missing after loading (safety)
  if (!tutor) {
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg m-10">
        <p className="text-xl text-red-500">
          Error: Tutor data could not be loaded.
        </p>
      </div>
    );
  }

  // --- Main Design ---
  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 bg-gray-50 bg-white">
      <div
        ref={cardRef}
        className="w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden transition-all duration-500"
      >
        {/* Glow/Border Effect (Tailwind utility for shadow/glow) */}
        <div className="absolute inset-0 bg-gradient-to-br rounded-2xl z-0 pointer-events-none"></div>

        <div className="relative z-10 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Confirm Payment
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            You are about to hire
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 ml-1">
              {tutor.tutorName}
            </span>
          </p>

          {/* Salary Box (Animated/Glow) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            className="bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-xl mb-8 shadow-inner border border-indigo-200 dark:border-indigo-700"
          >
            <p className="text-xl text-gray-700 dark:text-gray-200">
              Payment Amount:
            </p>
            <h2 className="text-5xl font-extrabold text-primary dark:text-indigo-300 mt-2 flex items-center justify-center">
              <DollarSign className="w-8 h-8 mr-1" />
              {tutor.expectedSalary}
            </h2>
          </motion.div>

          {/* Payment Button (Animated) */}
          <motion.button
            onClick={handlePayment}
            className="btn w-full py-3 text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] 
                                   bg-primary hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/50 dark:shadow-indigo-800/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Confirm Pay
          </motion.button>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            * You will be redirected to the secure Stripe payment gateway.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
