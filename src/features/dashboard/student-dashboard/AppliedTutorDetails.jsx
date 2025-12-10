import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck, XCircle, DollarSign, Edit3, Loader } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/UseAuth";
import useAxiosSicure from "../../../hooks/useAxiosSicure";

export default function AppliedTutorDetails() {
  // 1. URL theke tuitionId extract kora
  // Note: Apnar router setup-e ei ID thakte hobe: /dashboard/student/applied-tutors/:tuitionId
  const { tuitionId } = useParams();

  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSicure();

  // 2. Fetching Applied Tutors
  const {
    data: applications = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appliedTutors", tuitionId],
    queryFn: async () => {
      if (!tuitionId) return [];
      // Backend Route call kora
      const res = await axiosSecure.get(`/applications/${tuitionId}`);
      return res.data;
    },
    // Query shudhu tokhon cholbe jokhon tuitionId available thakbe
    enabled: !!tuitionId && !authLoading,
  });

  // --- Status Badge Component ---
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="badge badge-success text-white">
            Approved <CheckCheck className="w-4 h-4 ml-1" />
          </span>
        );
      case "Pending":
        return (
          <span className="badge badge-warning text-white">
            Pending <Loader className="w-4 h-4 ml-1 animate-spin" />
          </span>
        );
      case "Rejected":
        return (
          <span className="badge badge-error text-white">
            Rejected <XCircle className="w-4 h-4 ml-1" />
          </span>
        );
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  // --- 3. Handle Reject Logic (Frontend function) ---
  const handleReject = async (applicationId) => {
    // Confirm dialog use kora uchit (e.g., SweetAlert)
    if (!window.confirm("Are you sure you want to reject this application?")) {
      return;
    }

    try {
      // Backend route to update status to 'Rejected'
      await axiosSecure.patch(`/applications/reject/${applicationId}`); // Need to implement this route
      toast.success("Application rejected successfully!");
      refetch(); // Refetch data to update the UI
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject application.");
    }
  };

  // --- 4. Handle Approve Logic (Frontend function) ---
  const handleApprove = (application) => {
    // Core Logic: Redirect to payment page with necessary details
    // e.g., tuitionId, tutorName, expectedSalary, applicationId

    // This is where you would redirect to your Stripe Checkout / Payment Page
    // Example Redirection (Eita apnar Payment Integration-er opor nirbhor korbe)
    // Note: For now, we will just show a toast message. Payment integration is complex.

    // We will assume the payment logic is handled by a separate route/page (e.g., /checkout/:applicationId)

    const checkoutUrl = `/dashboard/student/checkout/${application._id}`;

    // Temporary toast and console log for demonstration
    toast.success(
      `Redirecting to payment for Tutor: ${application.tutorName} (Salary: ${application.expectedSalary} BDT)`
    );
    console.log(`REDIRECTING to: ${checkoutUrl}`);

    // window.location.href = checkoutUrl; // Actual redirection
  };

  // --- Loading & Error Handling ---
  if (isLoading || authLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !tuitionId) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Error: Tuition ID is missing or failed to load tutors.
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
          No tutors have applied to this post yet.
        </p>
      </div>
    );
  }

  // --- Main Component Render ---
  return (
    <div className="py-10 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            🧑‍🏫 Applied Tutors for Tuition ID: {tuitionId.substring(0, 8)}...
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Review applications and manage your tutor selection.
          </p>
        </header>

        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-primary"
            >
              <div className="flex justify-between items-start mb-4 border-b pb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {app.tutorName}
                </h3>
                <div>{getStatusBadge(app.status)}</div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div>
                  <p className="font-semibold text-primary flex items-center gap-2">
                    <DollarSign className="w-5 h-5" /> Expected Salary:
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">
                      {app.expectedSalary} BDT
                    </span>
                  </p>
                  <p>
                    Qualifications:{" "}
                    <span className="font-medium">{app.qualifications}</span>
                  </p>
                  <p>
                    Experience:{" "}
                    <span className="font-medium">{app.experience}</span>
                  </p>
                </div>
                <div className="md:text-right">
                  {/* Profile Picture Placeholder - assuming you have a tutorProfilePic field */}
                  {/* <img src={app.tutorProfilePic || '/placeholder.jpg'} alt={app.tutorName} className="w-16 h-16 rounded-full mx-auto md:ml-auto md:mr-0 mb-2"/> */}
                  <p className="text-sm text-gray-500">
                    Applied On: {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t dark:border-gray-700 flex justify-end gap-4">
                {app.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleReject(app._id)}
                      className="btn btn-error btn-outline text-white hover:text-white"
                    >
                      <XCircle className="w-5 h-5" /> Reject
                    </button>

                    <button
                      onClick={() => handleApprove(app)}
                      className="btn btn-success text-white"
                    >
                      <CheckCheck className="w-5 h-5" /> Approve / Go to Payment
                    </button>
                  </>
                )}
                {app.status === "Approved" && (
                  <button className="btn btn-disabled">Tutor Approved</button>
                )}
                {app.status === "Rejected" && (
                  <button className="btn btn-disabled">
                    Application Rejected
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
