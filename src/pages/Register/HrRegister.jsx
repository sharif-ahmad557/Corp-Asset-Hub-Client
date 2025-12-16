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
      color: "blue",
      desc: "Perfect for startups",
    },
    {
      name: "Standard",
      employees: 10,
      price: 8,
      icon: <IoRocketOutline className="text-3xl" />,
      color: "violet",
      desc: "Great for growing teams",
      badge: "Popular",
    },
    {
      name: "Premium",
      employees: 20,
      price: 15,
      icon: <IoDiamondOutline className="text-3xl" />,
      color: "amber",
      desc: "For established companies",
    },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.companyLogo);

      const userInfo = {
        name: data.name,
        email: data.email,
        role: "hr",
        companyName: data.companyName,
        companyLogo: data.companyLogo,
        dateOfBirth: data.dateOfBirth,
        packageLimit: 5,
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
    <div className="min-h-screen bg-base-200 py-10 px-4 flex items-center">
      <Helmet>
        <title>AssetVerse | Join as HR</title>
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto w-full">
        {/* Left Side: Modern Package Selection */}
        <div className="flex-1 space-y-8 flex flex-col justify-center">
          <div>
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
                className={`relative group p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center gap-5 bg-base-100 shadow-sm hover:shadow-md
                  ${
                    selectedPackage === pkg.name
                      ? `border-primary bg-primary/5 ring-1 ring-primary`
                      : "border-transparent hover:border-base-300"
                  }`}
              >
                {/* Badge for Popular Item */}
                {pkg.badge && (
                  <span className="absolute -top-3 right-4 badge badge-secondary badge-sm uppercase font-bold tracking-wider">
                    {pkg.badge}
                  </span>
                )}

                {/* Icon Box */}
                <div
                  className={`p-3 rounded-xl bg-${pkg.color}-100 dark:bg-${pkg.color}-900/20 text-${pkg.color}-600`}
                >
                  {pkg.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3
                    className={`font-bold text-lg ${
                      selectedPackage === pkg.name ? "text-primary" : ""
                    }`}
                  >
                    {pkg.name} Package
                  </h3>
                  <p className="text-sm text-base-content/60">
                    {pkg.desc} • {pkg.employees} Members
                  </p>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-2xl font-bold">${pkg.price}</p>
                  <p className="text-xs text-base-content/50">/month</p>
                </div>

                {/* Selection Indicator */}
                <div className="text-2xl text-primary">
                  {selectedPackage === pkg.name ? (
                    <IoCheckmarkCircle />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-base-300 group-hover:border-primary/50"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="card flex-1 w-full max-w-md shadow-2xl bg-base-100 ml-auto border border-base-200">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6">
              Register Company
            </h2>

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
            </div>

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
            </div>

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
            </div>

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
            </div>

            {/* Password with Toggle */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="******"
                  className="input input-bordered w-full pr-10"
                />
                <span
                  className="absolute top-3.5 right-3 cursor-pointer text-gray-500 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <span className="text-error text-sm">Min 6 chars required</span>
              )}
            </div>

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
              <p className="text-xs text-center mt-3 text-gray-500">
                You selected the{" "}
                <span className="font-bold text-primary">
                  {selectedPackage}
                </span>{" "}
                plan.
              </p>
            </div>

            <div className="divider my-4">OR</div>

            <p className="text-center">
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
