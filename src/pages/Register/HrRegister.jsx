import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const HrRegister = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Basic"); // Default package

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Create User in Firebase
      const result = await createUser(data.email, data.password);

      // 2. Update Profile (Name & Photo)
      // Note: In real app, we should upload companyLogo to ImgBB and use that URL.
      // For now, we are taking direct URL string from input as per simple flow, or use default.
      await updateUserProfile(data.name, data.companyLogo);

      // 3. Save User to Database (HR Role)
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "hr",
        companyName: data.companyName,
        companyLogo: data.companyLogo,
        dateOfBirth: data.dateOfBirth,
        packageLimit: 5, // Basic Package default limit
        currentEmployees: 0,
        subscription: selectedPackage.toLowerCase(), // basic, standard, premium
        createdAt: new Date(),
      };

      await axiosPublic.post("/users", userInfo);

      toast.success("HR Account Created! Please Login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <Helmet>
        <title>AssetVerse | Join as HR</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left Side: Package Selection Info */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-primary">
            Start Your Management Journey
          </h1>
          <p className="text-lg">
            Choose a package that fits your company needs. You can upgrade
            anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Package Card */}
            <div
              className={`card bg-base-100 shadow-xl border-2 cursor-pointer transition-all ${
                selectedPackage === "Basic"
                  ? "border-primary scale-105"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedPackage("Basic")}
            >
              <div className="card-body">
                <h2 className="card-title text-primary">Basic (Default)</h2>
                <p>5 Employees</p>
                <p className="text-2xl font-bold">
                  $5 <span className="text-sm font-normal">/month</span>
                </p>
                <div className="badge badge-secondary">Selected</div>
              </div>
            </div>

            {/* Standard Package Card */}
            <div
              className={`card bg-base-100 shadow-xl border-2 cursor-pointer transition-all ${
                selectedPackage === "Standard"
                  ? "border-primary scale-105"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedPackage("Standard")}
            >
              <div className="card-body">
                <h2 className="card-title text-secondary">Standard</h2>
                <p>10 Employees</p>
                <p className="text-2xl font-bold">
                  $8 <span className="text-sm font-normal">/month</span>
                </p>
              </div>
            </div>

            {/* Premium Package Card */}
            <div
              className={`card bg-base-100 shadow-xl border-2 cursor-pointer transition-all ${
                selectedPackage === "Premium"
                  ? "border-primary scale-105"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedPackage("Premium")}
            >
              <div className="card-body">
                <h2 className="card-title text-accent">Premium</h2>
                <p>20 Employees</p>
                <p className="text-2xl font-bold">
                  $15 <span className="text-sm font-normal">/month</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="card flex-1 w-full max-w-md shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-2xl font-bold text-center mb-2">
              Register Company
            </h2>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="HR Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-error text-sm">Name is required</span>
              )}
            </div>

            {/* Company Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                {...register("companyName", { required: true })}
                placeholder="Company Ltd."
                className="input input-bordered"
              />
              {errors.companyName && (
                <span className="text-error text-sm">
                  Company Name is required
                </span>
              )}
            </div>

            {/* Company Logo */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Logo URL</span>
              </label>
              <input
                type="url"
                {...register("companyLogo", { required: true })}
                placeholder="https://example.com/logo.png"
                className="input input-bordered"
              />
              {errors.companyLogo && (
                <span className="text-error text-sm">Logo URL is required</span>
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
                placeholder="hr@company.com"
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
                placeholder="******"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-error text-sm">Min 6 chars required</span>
              )}
            </div>

            {/* DOB */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                {...register("dateOfBirth", { required: true })}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <button disabled={loading} className="btn btn-primary">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up & Pay Later"
                )}
              </button>
              <p className="text-xs text-center mt-2 text-gray-500">
                Note: You will start with the Basic plan (5 employees). Upgrade
                later via Dashboard.
              </p>
            </div>

            <p className="text-center mt-4">
              Already registered?{" "}
              <Link to="/login" className="text-secondary font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HrRegister;
