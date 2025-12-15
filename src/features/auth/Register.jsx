import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { Mail, User, Lock, Phone, UserCog, EyeOff, Eye } from "lucide-react";
import useAuth from "../../hooks/UseAuth";
import useAxiosSicure from "../../hooks/useAxiosSicure";

export default function Register() {
  const { registerUser, updateUserProfile, signInWithGoogle } = useAuth();
  const axiosSicure = useAxiosSicure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setRegisterError("");

    try {
      // 1. Firebase Register & Profile Update (No Change)
      const result = await registerUser(data.email, data.password);
      const firebaseUser = result.user;

      await updateUserProfile({
        displayName: data.name,
      }); // 2. Prepare Data for MongoDB Save (No Change)

      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role, // ⭐ Ekhane Role pawa jachhe
        firebaseUID: firebaseUser.uid,
        photoURL: firebaseUser.photoURL || null,
      }; // 3. Send data to Backend to save user information (No Change)

      const backendResponse = await axiosSicure.post(`/users`, userData);
      console.log("Database Save Response:", backendResponse.data); // 4. ⭐ ROLE-BASED REDIRECTION (Eita change kora holo) ⭐

      alert(
        `Registration Successful as ${data.role}! Redirecting to dashboard.`
      );
      const userRole = data.role; // Newly registered user er role

      if (userRole === "Tutor") {
        navigate("/dashboard/tutorHome"); // Ba apnar shothik Tutor route
      } else if (userRole === "Student") {
        navigate("/dashboard/studentHome"); // Ba apnar shothik Student route
      } else {
        // Default fallback (Jodi Admin role theke thake, kintu ekhane dewa nei)
        navigate("/dashboard");
      }
    } catch (error) {
      // ... Error handling (No Change)
      console.error("Registration Error:", error); // ...
    }
  };

  // 2. Google Login Handler (Modified to save data in Backend)
  const handleGoogleLogin = async () => {
    setRegisterError("");
    try {
      // 1. Firebase Sign In (No Change)
      const result = await signInWithGoogle();
      const firebaseUser = result.user; // 2. Prepare Data for MongoDB Save/Check (No Change)

      const userData = {
        // ...
        role: "Student", // Default role // ...
      }; // 3. Send data to Backend to save or check if user exists

      const backendResponse = await axiosSicure.post(`/users`, userData); // ⭐ Backend theke fire asha role
      const fetchedRole = backendResponse.data.role || "Student";

      console.log(
        "Database Save/Check Response (Google):",
        backendResponse.data
      ); // 4. ⭐ ROLE-BASED REDIRECTION FOR GOOGLE LOGIN ⭐

      alert(`Login Successful as ${fetchedRole}!`);
      if (fetchedRole === "Tutor") {
        navigate("/dashboard/tutorHome");
      } else if (fetchedRole === "Student") {
        navigate("/dashboard/studentHome");
      } else if (fetchedRole === "Admin") {
        // Google login-e Admin hole
        navigate("/dashboard/adminHome");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="bg-base-100 flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl border border-gray-200 dark:bg-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
          Join eTuitionBD
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Register as a Student or Tutor
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 1. Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <User className="w-4 h-4" /> Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* 2. Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <Mail className="w-4 h-4" /> Email
              </span>
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 3. Password Field with Visibility Toggle */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <Lock className="w-4 h-4" /> Password
              </span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                className="input input-bordered w-full pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {/* Icons */}
                {showPassword ? <EyeOff></EyeOff> : <Eye></Eye>}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* 4. Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <Phone className="w-4 h-4" /> Phone Number
              </span>
            </label>
            <input
              type="text"
              placeholder="+8801XXXXXXXXX"
              className="input input-bordered w-full"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* 5. Role Selection (Student/Tutor) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <UserCog className="w-4 h-4" /> Select Role
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("role", { required: "Role selection is required" })}
              defaultValue=""
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Student">Student</option>
              <option value="Tutor">Tutor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Global Firebase/Backend Error */}
          {registerError && (
            <p className="text-red-600 text-sm font-medium mt-3">
              {registerError}
            </p>
          )}

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full text-lg">
              Register
            </button>
          </div>
        </form>

        {/* Link to Social Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <Link
            to="/login"
            className="text-primary font-semibold ml-1 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
