import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  IoBriefcaseOutline,
  IoPeopleOutline,
  IoKeyOutline,
} from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue, // Needed for Demo Login
    formState: { errors },
  } = useForm();

  // 1. Email/Password Login
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // 2. Google Login Trigger
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      setGoogleUser(result.user);
      // Check if user exists in DB, if not show modal, else redirect (Logic simplified for UI demo)
      // Ideally, you should check DB here. For now, we show modal to ensure role selection on first Google login.
      document.getElementById("role_modal").showModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 3. Handle Role Selection
  const handleRoleSelect = async (selectedRole) => {
    if (!googleUser) return;

    if (selectedRole === "employee") {
      const userInfo = {
        name: googleUser.displayName,
        email: googleUser.email,
        role: "employee",
        dateOfBirth: null,
        createdAt: new Date(),
      };

      try {
        await axiosPublic.post("/users", userInfo);
        toast.success("Login Successful as Employee");
        navigate(from, { replace: true });
      } catch (err) {
        console.error(err);
        // If user already exists, navigate anyway
        navigate(from, { replace: true });
      }
    } else if (selectedRole === "hr") {
      document.getElementById("role_modal").close();
      navigate("/join-hr");
      toast("Please complete HR registration", { icon: "📝" });
    }
  };

  // 4. Demo Login Logic (Requirement #6)
  const handleDemoLogin = (role) => {
    if (role === "hr") {
      setValue("email", "hr@assetminder.com");
      setValue("password", "123456");
    } else {
      setValue("email", "employee@assetminder.com");
      setValue("password", "123456");
    }
    toast.success(`${role.toUpperCase()} credentials autofilled!`);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <Helmet>
        <title>AssetMinder | Login</title>
      </Helmet>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-5xl w-full shadow-2xl rounded-3xl overflow-hidden bg-base-100 z-10">
        {/* Left Side: Brand & Visuals */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-900 to-violet-900 p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Welcome Back!
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Access your dashboard to manage assets, track inventory, and
              streamline your workflow with <strong>AssetMinder</strong>.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-blue-200">
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full border-2 border-blue-900"
                  src="https://i.pravatar.cc/100?img=1"
                  alt="User"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-blue-900"
                  src="https://i.pravatar.cc/100?img=2"
                  alt="User"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-blue-900"
                  src="https://i.pravatar.cc/100?img=3"
                  alt="User"
                />
              </div>
              <span>Join 10k+ users today.</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:w-1/2 p-8 lg:p-12 bg-base-100">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-base-content">Login</h2>
            <p className="text-base-content/60 mt-2">
              Enter your details below.
            </p>
          </div>

          {/* Demo Login Buttons (Req #6) */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleDemoLogin("hr")}
              className="btn btn-sm btn-outline btn-info flex-1 gap-2"
            >
              <IoKeyOutline /> Demo HR
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("employee")}
              className="btn btn-sm btn-outline btn-success flex-1 gap-2"
            >
              <IoKeyOutline /> Demo Employee
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
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
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                disabled={loading}
                className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="divider my-6 text-base-content/40">OR</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full hover:bg-base-200 hover:text-base-content hover:border-base-300"
          >
            <FcGoogle className="text-xl mr-2" /> Continue with Google
          </button>

          <p className="text-center mt-6 text-sm text-base-content/70">
            Don't have an account? <br className="sm:hidden" />
            <Link
              to="/join-employee"
              className="link link-primary font-bold hover:text-primary-focus"
            >
              Join as Employee
            </Link>{" "}
            or{" "}
            <Link
              to="/join-hr"
              className="link link-secondary font-bold hover:text-secondary-focus"
            >
              Join as HR
            </Link>
          </p>
        </div>
      </div>

      {/* --- ROLE SELECTION MODAL --- */}
      <dialog id="role_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center p-8">
          <h3 className="font-bold text-2xl text-primary mb-2">
            Welcome to AssetMinder!
          </h3>
          <p className="py-2 text-base-content/70">
            You're successfully signed in. How would you like to proceed?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => handleRoleSelect("employee")}
              className="btn h-auto py-6 flex-1 flex-col gap-3 btn-outline hover:btn-primary border-2 group"
            >
              <div className="p-3 bg-base-200 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                <IoPeopleOutline className="text-3xl" />
              </div>
              <span>
                Continue as
                <br />
                <strong className="text-lg">Employee</strong>
              </span>
            </button>

            <button
              onClick={() => handleRoleSelect("hr")}
              className="btn h-auto py-6 flex-1 flex-col gap-3 btn-outline hover:btn-secondary border-2 group"
            >
              <div className="p-3 bg-base-200 rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                <IoBriefcaseOutline className="text-3xl" />
              </div>
              <span>
                Register as
                <br />
                <strong className="text-lg">HR Manager</strong>
              </span>
            </button>
          </div>

          <div className="modal-action justify-center mt-6">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Login;
