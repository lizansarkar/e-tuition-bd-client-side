import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, History, Banknote, User, FileText } from "lucide-react";
import Loading from "../../../components/ui/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSicure from "../../../hooks/useAxiosSicure";

export default function TutorPaymentHistory() {
  // Naam shothik kora holo
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSicure();

  // --- Data Fetching Logic ---
  const {
    data: revenueData = { totalRevenue: 0, paymentHistory: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tutorRevenue", user?.email],
    queryFn: async () => {
      if (!user?.email) return { totalRevenue: 0, paymentHistory: [] };

      // Backend-e Tutor-er email pathano holo
      const res = await axiosSecure.get(`/tutor-revenue-history`, {
        params: {
          email: user.email,
        },
      });
      return res.data;
    },
    enabled: !!user?.email && !loading,
  });

  const { totalRevenue, paymentHistory } = revenueData;

  // --- Loading State ---
  if (loading || isLoading) {
    return <Loading />;
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        Data anbar shomoy ekta shomoshya hoyechhe. Connection check korun.
      </div>
    );
  }

  // --- Main Render Logic ---
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
        <FileText className="w-7 h-7 mr-3 text-yellow-600" />
        Student Payment History (My Revenue)
      </h2>

      {/* Total Revenue Card */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-xl shadow-2xl mb-8 text-white">
        <div className="flex items-center gap-3">
          <Banknote className="w-10 h-10" />
          <h3 className="text-sm font-light uppercase">
            Net Income (Total Revenue)
          </h3>
        </div>
        <p className="text-5xl font-extrabold mt-2">
          {totalRevenue.toLocaleString("en-IN", {
            style: "currency",
            currency: "BDT",
          })}
        </p>
      </div>

      {/* Payment History Table */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Successful Transactions ({paymentHistory.length})
      </h3>

      {paymentHistory.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <DollarSign className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            Kono successful payment record ekhono paowa jayni.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
          <table className="table w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
                <th>Sl.</th>
                <th>Payment Date</th>
                <th>Amount</th>
                <th>Student Email</th>
                <th>Transaction ID</th>
                <th>Tracking ID</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-700 text-sm font-light">
              {paymentHistory.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td>{index + 1}</td>

                  {/* Payment Date */}
                  <td>
                    {payment?.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString(
                          "en-GB"
                        )
                      : "N/A"}
                  </td>

                  {/* Amount */}
                  <td className="font-bold text-green-600">
                    {payment?.amount
                      ? payment.amount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "BDT",
                        })
                      : "0.00 BDT"}
                  </td>

                  {/* Student Email */}
                  <td>{payment?.studentEmail || "N/A"} </td>

                  {/* Transaction ID */}
                  <td className="text-xs text-gray-500">
                    {payment?.transactionId || "N/A"}{" "}
                  </td>

                  {/* Tracking ID */}
                  <td className="font-medium text-indigo-600">
                    {payment?.trackingId || "N/A"}{" "}
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
