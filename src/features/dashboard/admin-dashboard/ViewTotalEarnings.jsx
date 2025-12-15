// ViewTotalEarnings.jsx (Frontend) - Final Sajjito Version

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  Globe,
  Banknote,
  TrendingUp,
  Trash2,
  Calendar,
  User,
} from "lucide-react";
import Loading from "../../../components/ui/Loading";
import Swal from "sweetalert2";
import useAxiosSicure from "../../../hooks/useAxiosSicure";

// Fixed Limit for Pagination
const ITEMS_PER_PAGE = 10;

export default function ViewTotalEarnings() {
  const axiosSecure = useAxiosSicure();
  const [page, setPage] = useState(0); // Current Page Index

  // --- Data Fetching Logic (With Pagination Params) ---
  const {
    data: earningsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["adminTotalEarnings", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-total-earnings`, {
        params: {
          page: page,
          limit: ITEMS_PER_PAGE,
        },
      });
      return res.data;
    },
    initialData: { totalEarnings: 0, allTransactions: [], totalCount: 0 },
  });

  const { totalEarnings, allTransactions, totalCount } = earningsData;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // --- Load More Handler ---
  const handleLoadMore = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  // --- Deletion Handler ---
  const handleDeleteTransaction = (id) => {
    Swal.fire({
      title: "Apni ki nishchit?",
      text: "Apni ei transaction-ti platform theke delete korte chachhen. Ei kaaj firey newa jabe na!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Haan, Delete Kore Dao!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/payments/${id}`);

          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Transaction shothikbhabe delete kora hoyechhe.", "success");
            refetch(); // Data refetch korar jonne
          } else {
            Swal.fire("Error!", "Delete korte shomoshya hoyechhe.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Server-e shomoshya. Delete kora hoyni.", "error");
        }
      }
    });
  };

  // --- Loading/Error States ---
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center py-20 text-red-600">
        Data fetch korar shomoy shomoshya hoyechhe.
      </div>
    );

  // --- Main Render Logic ---
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
        <Globe className="w-7 h-7 mr-3 text-primary" />
        Total Platform Earnings (Admin View)
      </h2>

      {/* Total Earnings Card */}
      <div className="bg-white p-6 rounded-xl shadow-2xl mb-8 border-l-8 border-primary transform hover:scale-[1.01] transition-transform duration-300">
        <div className="flex items-center gap-4">
          <Banknote className="w-12 h-12 text-primary" />
          <h3 className="text-xl font-light uppercase text-gray-600">
            Platform-er Mot Income
          </h3>
        </div>
        <p className="text-6xl font-extrabold text-primary mt-4">
          <TrendingUp className="w-8 h-8 inline-block mr-2 text-green-500" />
          {totalEarnings.toLocaleString("en-IN", {
            style: "currency",
            currency: "BDT",
          })}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {totalCount} successful transactions-er opor nirbhor kore.
        </p>
      </div>

      {/* Transaction History Table */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Transactions ({allTransactions.length} items shown, Total {totalCount})
      </h3>

      {allTransactions.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <DollarSign className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p>Kono payment transaction ekhono record kora hoyni.</p>
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
                <th>Tutor Info</th>
                <th>Student Info</th>
                <th>Transaction ID</th>
                <th>Tracking ID</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-700 text-sm font-light">
              {allTransactions.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="border-b border-gray-200 hover:bg-yellow-50/20 transition-colors duration-150"
                >
                  {/* Sl. No. with Pagination Context */}
                  <td>{page * ITEMS_PER_PAGE + index + 1}</td>

                  {/* Date */}
                  <td>
                    <Calendar className="w-3 h-3 inline mr-1 text-gray-500" />
                    {payment?.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString("en-GB")
                      : "N/A"}
                  </td>

                  {/* Amount */}
                  <td className="font-extrabold text-green-700">
                    {payment?.amount
                      ? payment.amount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "BDT",
                        })
                      : "0.00 BDT"}
                  </td>

                  {/* Tutor Info */}
                  <td>
                    <div className="font-semibold flex items-center">
                      <User className="w-3 h-3 mr-1 text-indigo-500" />
                      {payment.tutorName || "N/A"}
                    </div>
                    <span className="text-xs text-indigo-500">
                      {payment.tutorEmail || "N/A"}
                    </span>
                  </td>

                  {/* Student Info */}
                  <td>
                    <span className="text-sm text-gray-700">
                      {payment.studentEmail || "N/A"}
                    </span>
                  </td>

                  {/* Transaction ID */}
                  <td className="text-xs text-gray-500">
                    {payment.transactionId || "N/A"}
                  </td>
                  
                  {/* Tracking ID */}
                  <td className="font-medium text-indigo-600 text-xs">
                    {payment.trackingId || "N/A"}
                  </td>
                  
                  {/* Action (Delete Button) */}
                  <td>
                    <button
                      onClick={() => handleDeleteTransaction(payment._id)}
                      className="btn btn-sm btn-error text-white tooltip"
                      data-tip="Delete Transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Load More Button */}
      {totalCount > allTransactions.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="btn btn-primary px-10"
            disabled={isLoading || allTransactions.length >= totalCount}
          >
            {isLoading
              ? "Loading..."
              : `See More (${totalCount - allTransactions.length} Remaining)`}
          </button>
        </div>
      )}
    </div>
  );
}