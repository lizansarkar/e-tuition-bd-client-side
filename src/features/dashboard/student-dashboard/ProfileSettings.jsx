import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Mail, Phone, Image, Settings, Save, Loader } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSicure from "../../../hooks/useAxiosSicure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/ui/Loading";

export default function ProfileSettings() {
  const { user, loading, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSicure();

  const [profileData, setProfileData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    role: "",
  });

  // --- 1. Data Fetching ---
  const {
    data: fetchedUser,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/user-profile?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (fetchedUser) {
      setProfileData({
        displayName: fetchedUser.displayName || "",
        phone: fetchedUser.phone || "",
        photoURL: fetchedUser.photoURL || "",
        role: fetchedUser.role || "N/A",
      });
    }
  }, [fetchedUser]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // --- 2. Form Submission Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data ready for MongoDB
    const dataToUpdateMongoDB = {
      displayName: profileData.displayName,
      phone: profileData.phone,
      photoURL: profileData.photoURL,
    };

    // Data ready for Firebase/Context (shudhu displayName o photoURL lagbe)
    const dataToUpdateFirebase = {
      displayName: profileData.displayName,
      photoURL: profileData.photoURL,
    };

    try {
      // 1. Update MongoDB data
      const res = await axiosSecure.patch(
        `/user-profile/${user.email}`,
        dataToUpdateMongoDB
      );

      if (res.data.modifiedCount > 0) {
        // 2. Update Auth Context / Firebase Profile
        // Ekhane single object hishebe pathano holo, jeta AuthProvider-e expect kora hoyechhe
        await updateUserProfile(dataToUpdateFirebase);

        Swal.fire(
          "Success!",
          "Profile successfully updated. Navbar will reflect changes now.",
          "success"
        );
        refetch(); // Refetch MongoDB data to update the form fields
      } else {
        Swal.fire("Info", "No changes detected.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  // ... (rest of the component's render logic, which is already correct) ...
  // Ekhane ami shudhu loading/error check shob dewa holo.
  if (loading || isLoading) {
    return <Loading></Loading>
  }

  // Main Component Render
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
        <Settings className="w-7 h-7 mr-3 text-indigo-500" />
        Profile Settings
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-10">
        {/* Profile Avatar and Info */}
        <div className="flex flex-col items-center mb-8 border-b dark:border-gray-700 pb-6">
          <img
            src={
              profileData.photoURL ||
              "https://via.placeholder.com/150?text=Profile"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500 dark:ring-indigo-400 mb-4"
          />
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {profileData.displayName}
            </p>
            <p
              className={`badge text-xs mt-1 ${
                profileData.role === "Admin"
                  ? "badge-error"
                  : profileData.role === "Tutor"
                  ? "badge-warning"
                  : "badge-info"
              } text-white`}
            >
              Role: {profileData.role}
            </p>
          </div>
        </div>

        {/* Profile Update Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center dark:text-gray-300">
                <User className="w-4 h-4 mr-2" /> Display Name
              </span>
            </div>
            <input
              type="text"
              name="displayName"
              value={profileData.displayName}
              onChange={handleChange}
              placeholder="Your Name"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </label>

          {/* Phone Number */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center dark:text-gray-300">
                <Phone className="w-4 h-4 mr-2" /> Phone Number (For Contact)
              </span>
            </div>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              placeholder="e.g., 01xxxxxxxxx"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </label>

          {/* Photo URL */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center dark:text-gray-300">
                <Image className="w-4 h-4 mr-2" /> Photo URL
              </span>
            </div>
            <input
              type="url"
              name="photoURL"
              value={profileData.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/your-image.jpg"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </label>

          {/* Email (Read-only) */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text flex items-center dark:text-gray-300">
                <Mail className="w-4 h-4 mr-2" /> Email (Cannot be changed)
              </span>
            </div>
            <input
              type="email"
              value={user.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full text-lg flex items-center"
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
