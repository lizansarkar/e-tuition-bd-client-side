import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Mail, User, Lock, Phone, UserCog, EyeOff, Eye } from "lucide-react";
import useAuth from "../../hooks/UseAuth";
import useAxiosSicure from "../../hooks/useAxiosSicure";
import Swal from "sweetalert2";

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

  const togglePasswordVisibility = (e) => {
    // এটি যাতে ফর্ম সাবমিট না করে ফেলে তাই preventDefault
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setRegisterError("");
    try {
      const result = await registerUser(data.email, data.password);
      const firebaseUser = result.user;

      await updateUserProfile({
        displayName: data.name,
      });

      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        firebaseUID: firebaseUser.uid,
        photoURL: firebaseUser.photoURL || null,
      };

      await axiosSicure.post(`/users`, userData);

      Swal.fire({
        title: "Success!",
        text: `Registration Successful as ${data.role}!`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      const userRole = data.role;
      if (userRole === "tutor") navigate("/dashboard/tutor");
      else if (userRole === "student") navigate("/dashboard/student");
      else if (userRole === "admin") navigate("/dashboard/admin");
      else navigate("/dashboard");
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setRegisterError("");
    try {
      const result = await signInWithGoogle();
      const userData = { role: "student" };
      const backendResponse = await axiosSicure.post(`/users`, userData);
      const fetchedRole = backendResponse.data.role || "student";

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Login Successful as ${fetchedRole}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      if (fetchedRole === "tutor") navigate("/dashboard/tutor");
      else if (fetchedRole === "student") navigate("/dashboard/student");
      else navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-base-100 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
          Join eTuitionBD
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text flex items-center gap-1">
                <User size={16} /> Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary outline-none"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text flex items-center gap-1">
                <Mail size={16} /> Email
              </span>
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field - Fixed Toggle Visibility */}
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text flex items-center gap-1">
                <Lock size={16} /> Password
              </span>
            </label>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ex: 123456Aa"
                className="input input-bordered w-full pr-12 focus:ring-2 focus:ring-primary outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: "Include Upper, Lower case and a Number",
                  },
                })}
              />
              {/* Eye Button - Fixed Always Visible */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-primary p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text flex items-center gap-1">
                <Phone size={16} /> Phone
              </span>
            </label>
            <input
              type="text"
              placeholder="+8801XXXXXXXXX"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary outline-none"
              {...register("phone", { required: "Phone required" })}
            />
          </div>

          {/* Role Selection */}
          <div className="form-control">
            <label className="label font-semibold">
              <span className="label-text flex items-center gap-1">
                <UserCog size={16} /> Role
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("role", { required: "Select a role" })}
              defaultValue=""
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          {registerError && (
            <p className="text-red-600 text-sm mt-2">{registerError}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full text-lg mt-4 shadow-lg"
          >
            Register Account
          </button>
        </form>

        <div className="divider text-gray-400 text-xs">OR CONTINUE WITH</div>

        {/* Google Login - Fixed Logo */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-outline border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 w-full flex items-center justify-center gap-3 transition-all"
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
          <span className="text-gray-700 dark:text-gray-200">Register with Google</span>
        </button>

        <p className="text-center text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-primary font-bold ml-1 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
