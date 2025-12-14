import React, { use, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import useAxiosSicure from "../../../hooks/useAxiosSicure";

export default function PaymentSuccess() {

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSicure();
  console.log("Payment Success Session ID:", sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
      })
      console.log("Fetching details for session ID:", sessionId);
    }
  }
  , [sessionId, axiosSecure]);

  // Animation variants for the success card
  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  // Animation variants for the icon (bounce and rotation)
  const iconVariants = {
    initial: { scale: 0.5, rotate: -90 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        delay: 0.4,
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-6 sm:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-green-300 dark:border-green-700 relative overflow-hidden text-center"
      >
        {/* Background wash / Visual cue for success (Green glow) */}
        <div className="absolute inset-0 bg-green-500/10 dark:bg-green-900/20 opacity-50 z-0 pointer-events-none"></div>

        <div className="relative z-10">
          {/* Success Icon with Animation */}
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
            className="mb-6 mx-auto"
          >
            <CheckCircle className="w-20 h-20 text-green-600 dark:text-green-400 mx-auto" />
          </motion.div>

          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Payment Successful!
          </h2>

          {/* Message */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Your transaction was completed successfully. The tutor has been
            hired!
          </p>

          {/* Button to return to dashboard */}
          <Link to="/dashboard/student">
            <motion.button
              className="btn w-full py-3 text-lg font-bold flex items-center justify-center
                                       bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/50 
                                       transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go to Dashboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
