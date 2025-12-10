import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import { IoCloseCircle } from "react-icons/io5";

export default function ApplyModal({
  isOpen,
  onClose,
  tuitionId,
  user,
  tuitionBudget,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSicure();

  // Mutation for submitting the application
  const applicationMutation = useMutation({
    mutationFn: async (applicationData) => {
      // Backend API hit kora holo: /applications
      const res = await axiosSecure.post("/applications", applicationData);
      return res.data;
    },
    onSuccess: () => {
      toast.success(
        "Application submitted successfully! Check 'My Applications' in your dashboard."
      );
      reset();
      onClose();
    },
    onError: (err) => {
      console.error("Application submission error:", err);
      // Check for specific backend errors (e.g., already applied)
      if (err.response?.status === 409) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Youre allready applied. Failed to submit application. Please try again.");
      }
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    // Prepare final application payload
    const applicationData = {
      tuitionId: tuitionId,
      tutorEmail: user.email,
      tutorName: user.displayName || data.name,
      qualifications: data.qualifications,
      experience: data.experience,
      expectedSalary: parseFloat(data.expectedSalary),
      tuitionBudget: tuitionBudget,
      status: "Pending",
      appliedAt: new Date(),
    };

    applicationMutation.mutate(applicationData);
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer"
          disabled={applicationMutation.isLoading}
        >
          <IoCloseCircle className="text-2xl"/>
        </button>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
          Apply for this Tuition
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Fill in your professional details to submit your application.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name (Read-only) */}
          <div className="form-control">
            <label className="label">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName || "N/A"}
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              readOnly
            />
          </div>

          {/* Email (Read-only) */}
          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              defaultValue={user?.email || "N/A"}
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              readOnly
            />
          </div>

          {/* Qualifications */}
          <div className="form-control">
            <label className="label">
              Qualifications <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="e.g., BSc in Physics (DU), HSC Science"
              className="textarea textarea-bordered h-24 w-full"
              {...register("qualifications", {
                required: "Qualifications are required",
              })}
            ></textarea>
            {errors.qualifications && (
              <p className="text-red-500 text-xs mt-1">
                {errors.qualifications.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="form-control">
            <label className="label">
              Relevant Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="e.g., 3 years teaching experience in secondary level math"
              className="textarea textarea-bordered h-24 w-full"
              {...register("experience", {
                required: "Experience details are required",
              })}
            ></textarea>
            {errors.experience && (
              <p className="text-red-500 text-xs mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Expected Salary */}
          <div className="form-control">
            <label className="label">
              Expected Salary (BDT/Month){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder={`e.g., ${tuitionBudget} (Original Budget)`}
              className="input input-bordered w-full"
              {...register("expectedSalary", {
                required: "Expected Salary is required",
                min: { value: 0, message: "Salary cannot be negative" },
              })}
            />
            {errors.expectedSalary && (
              <p className="text-red-500 text-xs mt-1">
                {errors.expectedSalary.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control pt-4">
            <button
              type="submit"
              className="btn btn-primary w-full text-lg"
              disabled={applicationMutation.isLoading}
            >
              {applicationMutation.isLoading
                ? "Submitting..."
                : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
