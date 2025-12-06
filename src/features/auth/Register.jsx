import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
import axios from 'axios';
import { Mail, User, Lock, Phone, UserCog } from 'lucide-react';

export default function Register() {
    const { registerUser, updateUserProfile } = UseAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [registerError, setRegisterError] = useState('');

    const onSubmit = async (data) => {
        setRegisterError(''); // Previous error clear kora holo

        try {
            // 1. Firebase Register
            const result = await registerUser(data.email, data.password);
            const firebaseUser = result.user;

            // 2. Update Firebase Profile (Name)
            await updateUserProfile({
                displayName: data.name
            });
            
            // 3. Prepare Data for MongoDB Save
            const userData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: data.role, // Student or Tutor
                firebaseUID: firebaseUser.uid,
                // Optional: profilePic: firebaseUser.photoURL,
                // Optional: createdAt: new Date()
            };

            const backendResponse = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/register-user`, 
                userData
            );
            
            console.log("Database Save Response:", backendResponse.data);

            // Success message or redirection
            alert(`Registration Successful as ${data.role}! Please login.`);
            navigate('/login');

        } catch (error) {
            console.error("Registration Error:", error);
            // Firebase error message set kora holo
            if (error.code === 'auth/email-already-in-use') {
                setRegisterError('This email is already registered.');
            } else if (error.code === 'auth/weak-password') {
                setRegisterError('Password should be at least 6 characters.');
            } else {
                setRegisterError('Registration failed. Please check your network or try again.');
            }
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
                            <span className="label-text flex items-center gap-1"><User className="w-4 h-4"/> Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* 2. Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-1"><Mail className="w-4 h-4"/> Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="input input-bordered w-full"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* 3. Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-1"><Lock className="w-4 h-4"/> Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Minimum 6 characters"
                            className="input input-bordered w-full"
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {/* 4. Phone */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-1"><Phone className="w-4 h-4"/> Phone Number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="+8801XXXXXXXXX"
                            className="input input-bordered w-full"
                            {...register("phone", { required: "Phone number is required" })}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* 5. Role Selection (Student/Tutor) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text flex items-center gap-1"><UserCog className="w-4 h-4"/> Select Role</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            {...register("role", { required: "Role selection is required" })}
                            defaultValue="" // Default value set
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="Student">Student</option>
                            <option value="Tutor">Tutor</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                    </div>

                    {/* Global Firebase/Backend Error */}
                    {registerError && <p className="text-red-600 text-sm font-medium mt-3">{registerError}</p>}
                    
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full text-lg">Register</button>
                    </div>
                </form>

                <p className="text-center text-sm mt-4">
                    Already have an account? 
                    <Link to="/login" className="text-primary font-semibold ml-1 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}