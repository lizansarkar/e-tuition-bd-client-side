import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  MapPin,
  BookOpen,
  DollarSign,
  Clock,
  Users,
  CalendarCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import ApplyModal from "./ApplyModal";
import useAuth from "../../hooks/UseAuth";
import UseRole from "../../hooks/UseRole"; 
import Loading from "../../components/ui/Loading";

export default function TuitionDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSicure();
  const { user, loading: authLoading } = useAuth(); 
  const { role, roleLoading } = UseRole(); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching Specific Tuition Post Details
  const {
    data: tuition,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tuitionDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-tuition/${id}`);
      return res.data;
    },
    enabled: !!id, // Only run query if ID is available
  });

  // Combined loading state
  if (isLoading || authLoading || roleLoading) {
    return <Loading></Loading>
  }

  if (error || !tuition) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        {error?.message || "Tuition post not found."}
      </div>
    );
  }

  // Role Check Logic (using role from UseRole hook)
  const isTutor = role === "Tutor"; 
  const isOwner = user?.email === tuition.userEmail;
  
//   console.log("Tuition Details:", tuition);
//   console.log("Logged-in User:", user);
//   console.log("Is Tutor (from UseRole):", isTutor); 

  const handleApplyClick = () => {
    if (!user) {
      toast.error("Please log in to apply for this tuition.");
      return;
    }
    if (!isTutor) { 
      toast.error("Only registered Tutors can apply for tuition jobs.");
      return;
    }
    if (isOwner) {
      toast.error("You cannot apply to your own post.");
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl mb-8 border-t-4 border-primary">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {tuition.subject} Tutor Required for Class {tuition.classLevel}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 text-lg">
            <span className="flex items-center gap-1 font-semibold text-primary">
              <DollarSign className="w-5 h-5" /> Budget: {tuition.budget} BDT
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-5 h-5" /> {tuition.location}
            </span>
          </div>
        </header>

        {/* Details Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Core Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                Job Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {tuition.details}
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
                Key Requirements
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span>
                    Subject(s):{" "}
                    <span className="font-semibold">{tuition.subject}</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span>
                    Class Level:{" "}
                    <span className="font-semibold">
                      Class {tuition.classLevel}
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span>
                    Schedule/Time:{" "}
                    <span className="font-semibold">{tuition.schedule}</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CalendarCheck className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span>
                    Posted On:{" "}
                    <span className="font-semibold">
                      {new Date(tuition.createdAt).toLocaleDateString()}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Apply & Contact Info */}
          <aside className="md:col-span-1 space-y-6">
            <div className="sticky top-20 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-secondary">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Apply?
              </h3>

              {/* Apply Button Logic */}
              <button
                onClick={handleApplyClick}
                className="btn btn-block btn-primary text-white text-lg transition-all"
                disabled={!isTutor || isOwner} 
              >
                Apply Now
              </button>

              {/* Status message/Hint */}
              {user && !isTutor && ( 
                <p className="text-sm text-red-500 mt-2">
                  You must be registered as a Tutor to apply.
                </p>
              )}
              {!user && (
                <p className="text-sm text-yellow-500 mt-2">Log in to apply.</p>
              )}
              {isOwner && (
                <p className="text-sm text-blue-500 mt-2">
                  This is your own post.
                </p>
              )}

              <div className="mt-6 pt-4 border-t dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The Student will review your application and contact you if
                  selected.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* The Application Modal */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tuitionId={tuition._id}
        user={user}
        tuitionBudget={tuition.budget}
      />
    </div>
  );
}