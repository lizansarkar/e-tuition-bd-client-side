import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import { Mail, Lock, LogIn } from "lucide-react";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import Loading from "../../components/ui/Loading";

export default function Login() {
  const { signInUser, signInWithGoogle } = UseAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSicure();

  const redirectToDashboard = async (email) => {
    try {
      const res = await axiosSecure.get(`/users/role`);
      const role = res.data.role;

      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "tutor") {
        navigate("/dashboard/tutor");
      } else if (role === "student") {
        navigate("/dashboard/student");
      } else {
        navigate("/dashboard");
      }
    } catch (roleError) {
      console.error("Role Check Error:", roleError);
      setLoginError(
        "Login successful, but failed to fetch role. Redirecting to default dashboard."
      );
      navigate("/dashboard");
    }
  };

  // 1. Email/Password Login Handler
  const onSubmit = async (data) => {
    setLoginError("");
    setIsSubmitting(true);

    try {
      await signInUser(data.email, data.password);

      await redirectToDashboard(data.email);
    } catch (error) {
      console.error("Login Error:", error);
      // Firebase error messages handle kora holo
      if (error.code === "auth/invalid-credential") {
        setLoginError(
          "Invalid email or password. Please check your credentials."
        );
      } else if (error.code === "auth/user-not-found") {
        setLoginError("No user found with this email.");
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Google Login Handler
  const handleGoogleLogin = async () => {
    setLoginError("");
    try {
      const result = await signInWithGoogle();
      console.log("Google Sign In Successful:", result.user);

      await redirectToDashboard(result.user.email);
    } catch (error) {
      console.error("Google Login Error:", error);
      setLoginError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="w-full bg-[#ffffff] p-8 rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
        Welcome Back!
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
        Sign in to access your dashboard.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 1. Email Field */}
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
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* 2. Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center gap-1">
              <Lock className="w-4 h-4" /> Password
            </span>
          </label>
          <input
            type="password"
            placeholder="Your Password"
            className="input input-bordered w-full"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password Link (Optional but good practice) */}
        <div className="flex justify-end text-sm">
          <Link to="/forgot-password" className="text-black hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Global Error Message */}
        {loginError && (
          <p className="text-red-600 text-sm font-medium mt-3 text-center">
            {loginError}
          </p>
        )}

        {/* 3. Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary text-secondary w-full text-lg"
            disabled={isSubmitting} // Submitting hole button disable hobe
          >
            {isSubmitting ? (
              <Loading></Loading>
            ) : (
              <>
                <LogIn className="w-5 h-5" /> Log In
              </>
            )}
          </button>
        </div>
      </form>

      {/* OR Divider */}
      <div className="divider text-sm text-gray-500 dark:text-gray-400 my-6">
        OR
      </div>

      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
        disabled={isSubmitting}
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

      <p className="text-center text-sm mt-8">
        Don't have an account?
        <Link
          to="/register"
          className="text-primary font-semibold ml-1 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
