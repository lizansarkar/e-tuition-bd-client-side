import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Clock, Users, Loader } from "lucide-react";
import useAxiosSicure from "../../../hooks/useAxiosSicure";
import useAuth from "../../../hooks/useAuth";

export default function AllSuccessPayment() {
  const axiosSecure = useAxiosSicure();
  const { user } = useAuth();

  // --- Data Fetching Logic (TanStack Query) ---
  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentPayments", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosSecure.get(
        `/payments/student?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // --- Loading, Error, Empty State Handling ---
  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error: Failed to load payment history.
      </div>
    );
  }

  // --- Main Component Render ---
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
        <DollarSign className="w-7 h-7 mr-3 text-green-500" />
        My Successful Payments ({payments.length})
      </h2>

      {payments.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <Users className="w-10 h-10 mx-auto text-gray-500 mb-4" />
          <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            No successful payments found yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <table className="table w-full">
            <thead>
              <tr className="text-sm uppercase bg-gray-100 dark:bg-gray-700">
                <th>#</th>
                <th>Tutor Details</th>
                <th>Amount & Date</th>
                <th>Transaction & Tracking ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td>{index + 1}</td>

                  {/* Tutor Details */}
                  <td>
                    <div className="font-bold">
                      {payment.tutorName || "N/A"}
                    </div>
                    <div className="text-sm opacity-70">
                      {payment.tutorEmail}
                    </div>
                  </td>

                  {/* Amount & Date */}
                  <td>
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      ${payment.amount ? payment.amount.toFixed(2) : "0.00"}
                    </div>
                    <div className="text-xs opacity-80 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>

                  {/* Transaction & Tracking ID */}
                  <td className="max-w-xs">
                    <div className="text-xs font-mono break-all text-gray-600 dark:text-gray-300">
                      <span className="font-bold block text-sm mb-1">
                        Tracking ID:
                      </span>
                      {payment.trackingId || "N/A"}
                    </div>
                    <div className="text-xs font-mono break-all opacity-80 mt-1">
                      <span className="font-bold block text-sm mb-1">
                        Transaction ID:
                      </span>
                      {payment.transactionId || "N/A"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
