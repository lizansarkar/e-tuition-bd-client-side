import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCheck, Clock, Trash2, ArrowUpCircle } from "lucide-react";
import toast from "react-hot-toast"; // For notifications
import useAxiosSicure from "../../../hooks/useAxiosSicure";

export default function PendingApproval() {
  const axiosSecure = useAxiosSicure();
  const queryClient = useQueryClient();

  // 1. Fetching Pending Tuition Posts
  const {
    data: pendingPosts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pendingPosts"],
    queryFn: async () => {
      // Backend API hit kora holo:
      const res = await axiosSecure.get("/aprove-posts");
      return res.data;
    },
  });

  // 2. Mutation for Approving a Post
  const approveMutation = useMutation({
    mutationFn: async (postId) => {
      // Backend API hit kora holo: /api/admin/approve-post/:id
      const res = await axiosSecure.patch(`/aprove-posts/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      // Status successfully update howar por, UI refresh korar jonno cache invalid kora holo
      queryClient.invalidateQueries(["pendingPosts"]);
      toast.success("Tuition post approved successfully!");
    },
    onError: (err) => {
      toast.error("Failed to approve post. Try again.");
      console.error("Approval Error:", err);
    },
  });

  const handleApprove = (postId) => {
    if (window.confirm("Are you sure you want to approve this tuition post?")) {
      approveMutation.mutate(postId);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading pending posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading data: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <Clock className="w-6 h-6 text-yellow-500" /> Pending Approvals (
        {pendingPosts.length})
      </h2>
      <p className="text-gray-600 mb-8">
        Review and approve tuition requests submitted by users.
      </p>

      <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
        {pendingPosts.length === 0 ? (
          <div className="p-6 text-center text-lg text-green-600">
            <CheckCheck className="w-8 h-8 mx-auto mb-2" />
            All pending posts have been approved!
          </div>
        ) : (
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-primary text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Subject & Class</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Budget</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {pendingPosts.map((post, index) => (
                <tr
                  key={post._id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold">{post.subject}</div>
                    <div className="text-sm text-gray-500">
                      Class: {post.classLevel}
                    </div>
                    <div className="text-xs text-gray-400">
                      By: {post.userEmail}
                    </div>
                  </td>
                  <td className="py-3 px-4">{post.location}</td>
                  <td className="py-3 px-4 font-mono text-green-700">
                    ৳ {post.budget}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge ${
                        post.status === "Pending"
                          ? "badge-warning"
                          : "badge-success"
                      } text-xs font-semibold`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleApprove(post._id)}
                      className="btn btn-sm btn-success text-white hover:bg-green-700 disabled:opacity-50"
                      disabled={approveMutation.isLoading}
                      title="Approve Post"
                    >
                      {approveMutation.isLoading ? (
                        "Approving..."
                      ) : (
                        <ArrowUpCircle className="w-5 h-5" />
                      )}
                    </button>
                    {/* Optional: Delete button */}
                    {/* <button className="btn btn-sm btn-error ml-2" title="Delete Post"><Trash2 className="w-5 h-5" /></button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
