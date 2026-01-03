import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import { Mail, Lock, LogIn, ShieldCheck, Eye, EyeOff } from "lucide-react"; // Eye এবং EyeOff যোগ করা হয়েছে
import useAxiosSicure from "../../hooks/useAxiosSicure";
import Loading from "../../components/ui/Loading";

export default function Login() {
  const { signInUser, signInWithGoogle } = UseAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSicure();

  const handleDemoAdmin = () => {
    setValue("email", "admin@gmail.com");
    setValue("password", "123456Aa");
    setLoginError("");
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const redirectToDashboard = async (email) => {
    try {
      const res = await axiosSecure.get(`/users/${email}/role`);
      const role = res.data.role;

      if (role === "admin") {
        navigate("/dashboard/admin", { replace: true });
      } else if (role === "Tutor") {
        navigate("/dashboard/tutor", { replace: true });
      } else if (role === "Student") {
        navigate("/dashboard/student", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (roleError) {
      console.error("Role Check Error:", roleError);
      navigate("/dashboard", { replace: true });
    }
  };

  const onSubmit = async (data) => {
    setLoginError("");
    setIsSubmitting(true);
    try {
      await signInUser(data.email, data.password);
      await redirectToDashboard(data.email);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setLoginError("Invalid email or password.");
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError("");
    try {
      const result = await signInWithGoogle();
      await redirectToDashboard(result.user.email);
    } catch (error) {
      setLoginError("Google sign-in failed.");
    }
  };

  return (
    <div className="w-full bg-[#ffffff] p-8 rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden">
      {/* Demo Admin Badge */}
      <button
        onClick={handleDemoAdmin}
        type="button"
        className="cursor-pointer absolute top-0 right-0 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-xl transition-all flex items-center gap-1 border-b border-l border-primary/20 z-20"
      >
        <ShieldCheck className="w-3 h-3" /> Quick Admin Access
      </button>

      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mt-2">
        Welcome Back!
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
        Sign in to access your dashboard.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center gap-1 font-medium">
              <Mail className="w-4 h-4" /> Email
            </span>
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className="input input-bordered w-full focus:outline-primary"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field with Eye Toggle */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center gap-1 font-medium">
              <Lock className="w-4 h-4" /> Password
            </span>
          </label>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              className="input input-bordered w-full pr-12 focus:outline-primary"
              {...register("password", { required: "Password is required" })}
            />
            {/* Eye Toggle Button */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-primary p-1 transition-colors cursor-pointer"
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

        <div className="flex justify-end text-sm">
          <Link
            to="/forgot-password"
            className="text-gray-500 hover:text-primary hover:underline transition-all"
          >
            Forgot Password?
          </Link>
        </div>

        {loginError && (
          <p className="text-red-600 text-sm font-medium text-center">
            {loginError}
          </p>
        )}

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary text-secondary w-full text-lg shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loading />
            ) : (
              <>
                <LogIn className="w-5 h-5" /> Log In
              </>
            )}
          </button>
        </div>
      </form>

      {/* Demo Admin Button */}
      <div className="mt-4">
        <button
          onClick={handleDemoAdmin}
          type="button"
          className="btn btn-xs btn-ghost w-full text-primary hover:bg-primary/5 flex items-center gap-1"
        >
          Click here for Admin Credentials
        </button>
      </div>

      <div className="divider text-xs text-gray-400 my-6 uppercase tracking-widest">
        OR
      </div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full shadow-sm"
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
          className="text-primary font-bold ml-1 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
