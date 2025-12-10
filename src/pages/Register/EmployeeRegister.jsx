import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios"; // ✅ require → import

const EmployeeRegister = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // 1. Firebase User Create
      const result = await createUser(data.email, data.password);

      // 2. Update Name & Photo
      await updateUserProfile(
        data.name,
        "https://i.ibb.co/T0x6c6z/profile.png"
      );

      // 3. Prepare User Data for Database
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "employee",
        dateOfBirth: data.dateOfBirth,
        createdAt: new Date(),
      };

      // 4. Save User in Backend Database
      await axios.post("http://localhost:5000/users", userInfo);

      toast.success("Registration successful! Please login.");

      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-10">
      <Helmet>
        <title>AssetVerse | Join as Employee</title>
      </Helmet>

      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            Join as Employee
          </h2>

          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-error text-sm">Name is required</span>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-error text-sm">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="input input-bordered"
            />
            {errors.password?.type === "required" && (
              <span className="text-error text-sm">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-error text-sm">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="input input-bordered"
            />
            {errors.dateOfBirth && (
              <span className="text-error text-sm">
                Date of Birth is required
              </span>
            )}
          </div>

          <div className="form-control mt-6">
            <button disabled={loading} className="btn btn-primary">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegister;
