import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  IoCubeOutline,
  IoDiamondOutline,
  IoRocketOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const HrRegister = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Basic");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const packages = [
    {
      name: "Basic",
      employees: 5,
      price: 5,
      icon: <IoCubeOutline className="text-3xl" />,
      colorClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
      desc: "Perfect for startups",
    },
    {
      name: "Standard",
      employees: 10,
      price: 8,
      icon: <IoRocketOutline className="text-3xl" />,
      colorClass: "bg-violet-100 text-violet-600 dark:bg-violet-900/30",
      desc: "Great for growing teams",
      badge: "Popular",
    },
    {
      name: "Premium",
      employees: 20,
      price: 15,
      icon: <IoDiamondOutline className="text-3xl" />,
      colorClass: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
      desc: "For established companies",
    },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createUser(data.email, data.password);

      // Update with Personal Profile Image
      await updateUserProfile(data.name, data.profileImage);

      const pkg = packages.find((p) => p.name === selectedPackage);
      const limit = pkg ? pkg.employees : 5;

      const userInfo = {
        name: data.name,
        email: data.email,
        image: data.profileImage, // HR's personal photo
        role: "hr",
        companyName: data.companyName,
        companyLogo: data.companyLogo, // Company Logo
        dateOfBirth: data.dateOfBirth,
        packageLimit: limit,
        currentEmployees: 0,
        subscription: selectedPackage.toLowerCase(),
        createdAt: new Date(),
      };

      await axiosPublic.post("/users", userInfo);
      toast.success("HR Account Created! Please Login.");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-20 px-4 flex items-center justify-center">
      <Helmet>
        <title>AssetMinder | Join as HR</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto w-full">
        {/* Left Side: Package Selection */}
        <div className="flex-1 space-y-8 flex flex-col justify-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Start Your <br />
              <span className="text-base-content">Management Journey</span>
            </h1>
            <p className="text-lg text-base-content/70">
              Select a package that best fits your company's size. You can
              seamlessly upgrade as you grow.
            </p>
          </div>

          <div className="space-y-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                onClick={() => setSelectedPackage(pkg.name)}
                className={`relative group p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-5 bg-base-100 shadow-sm hover:shadow-md hover:scale-[1.02]
                  ${
                    selectedPackage === pkg.name
                      ? `border-primary ring-2 ring-primary/10 shadow-lg`
                      : "border-transparent hover:border-base-300"
                  }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 right-4 badge badge-secondary badge-sm uppercase font-bold tracking-wider shadow-sm">
                    {pkg.badge}
                  </span>
                )}
                <div
                  className={`p-3 rounded-xl ${pkg.colorClass} transition-colors`}
                >
                  {pkg.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-bold text-lg transition-colors ${
                      selectedPackage === pkg.name
                        ? "text-primary"
                        : "text-base-content"
                    }`}
                  >
                    {pkg.name} Package
                  </h3>
                  <p className="text-sm text-base-content/60">
                    {pkg.desc} •{" "}
                    <span className="font-semibold">
                      {pkg.employees} Members
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-base-content">
                    ${pkg.price}
                  </p>
                  <p className="text-xs text-base-content/50">/month</p>
                </div>
                <div className="text-2xl text-primary">
                  {selectedPackage === pkg.name ? (
                    <IoCheckmarkCircle className="text-3xl" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-base-300 group-hover:border-primary/50 transition-colors"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="card flex-1 w-full max-w-md shadow-2xl bg-base-100 ml-auto border border-base-200">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6 text-base-content">
              Register Company
            </h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "HR Name is required" })}
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

            {/* NEW: Profile Picture URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Profile Picture URL
                </span>
              </label>
              <input
                type="url"
                {...register("profileImage", {
                  required: "Profile image is required",
                })}
                placeholder="https://example.com/me.png"
                className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${
                  errors.profileImage ? "input-error" : ""
                }`}
              />
              {errors.profileImage && (
                <span className="text-error text-xs mt-1">
                  {errors.profileImage.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Company Name</span>
              </label>
              <input
                type="text"
                {...register("companyName", {
                  required: "Company Name is required",
                })}
                placeholder="Company Ltd."
                className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${
                  errors.companyName ? "input-error" : ""
                }`}
              />
              {errors.companyName && (
                <span className="text-error text-xs mt-1">
                  {errors.companyName.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Company Logo URL
                </span>
              </label>
              <input
                type="url"
                {...register("companyLogo", {
                  required: "Logo URL is required",
                })}
                placeholder="https://example.com/logo.png"
                className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${
                  errors.companyLogo ? "input-error" : ""
                }`}
              />
              {errors.companyLogo && (
                <span className="text-error text-xs mt-1">
                  {errors.companyLogo.message}
                </span>
              )}
            </div>

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
                placeholder="hr@company.com"
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
                className="btn btn-primary w-full text-lg shadow-lg shadow-primary/30"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Complete Registration"
                )}
              </button>
              <p className="text-xs text-center mt-3 text-base-content/60">
                You selected the{" "}
                <span className="font-bold text-primary uppercase">
                  {selectedPackage}
                </span>{" "}
                plan.
              </p>
            </div>

            <div className="divider my-4 text-base-content/40">OR</div>

            <p className="text-center text-sm text-base-content/70">
              Already registered?{" "}
              <Link to="/login" className="link link-primary font-bold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HrRegister;
