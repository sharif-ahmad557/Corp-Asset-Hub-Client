import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const EmployeeRegister = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // 1. Firebase User Create
      await createUser(data.email, data.password);

      // 2. Update Name & Photo 
      await updateUserProfile(data.name, data.image);

      // 3. Prepare User Data for Database
      const userInfo = {
        name: data.name,
        email: data.email,
        image: data.image, 
        role: "employee",
        dateOfBirth: data.dateOfBirth,
        createdAt: new Date(),
      };

      // 4. Save User in Backend Database
      await axiosPublic.post("/users", userInfo);

      toast.success("Registration successful! Please login.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-20 px-4 relative overflow-hidden">
      <Helmet>
        <title>AssetMinder | Join as Employee</title>
      </Helmet>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-200 z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">
              Join as Employee
            </h2>
            <p className="text-base-content/60 text-sm mt-2">
              Create an account to start tracking assets.
            </p>
          </div>

          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${
                errors.name ? "input-error" : ""
              }`}
            />
            {errors.name && (
              <span className="text-error text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Profile Picture URL
              </span>
            </label>
            <input
              type="url"
              {...register("image", { required: "Image URL is required" })}
              placeholder="https://example.com/photo.png"
              className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${
                errors.image ? "input-error" : ""
              }`}
            />
            {errors.image && (
              <span className="text-error text-xs mt-1">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@company.com"
              className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${
                errors.email ? "input-error" : ""
              }`}
            />
            {errors.email && (
              <span className="text-error text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password with Toggle */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                placeholder="******"
                className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 pr-10 ${
                  errors.password ? "input-error" : ""
                }`}
              />
              <span
                className="absolute top-3.5 right-3 cursor-pointer text-base-content/50 hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-error text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Date of Birth</span>
            </label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
              className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${
                errors.dateOfBirth ? "input-error" : ""
              }`}
            />
            {errors.dateOfBirth && (
              <span className="text-error text-xs mt-1">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              disabled={loading}
              className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <p className="text-center mt-6 text-sm text-base-content/70">
            Already have an account?{" "}
            <Link to="/login" className="link link-secondary font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegister;
