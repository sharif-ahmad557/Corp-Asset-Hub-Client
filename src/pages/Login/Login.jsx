import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { IoBriefcaseOutline, IoPeopleOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icon import
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
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const {
    register,
    handleSubmit,
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
      }
    } else if (selectedRole === "hr") {
      document.getElementById("role_modal").close();
      navigate("/join-hr");
      toast("Please complete HR registration", { icon: "📝" });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>AssetVerse | Login</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ml-0 lg:ml-10">
          <h1 className="text-5xl font-bold text-primary">Login now!</h1>
          <p className="py-6 max-w-md">
            Access your asset management dashboard securely. Join thousands of
            companies managing their assets efficiently.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-error text-sm">Email is required</span>
              )}
            </div>

            {/* Password Input with Toggle */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full pr-10"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute top-3.5 right-3 cursor-pointer text-gray-500 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <span className="text-error text-sm">Password is required</span>
              )}
            </div>

            <div className="form-control mt-6">
              <button disabled={loading} className="btn btn-primary">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
            >
              <FcGoogle className="text-xl mr-2" /> Continue with Google
            </button>

            <p className="text-center mt-4 text-sm">
              New here? <br />
              <Link to="/join-employee" className="link link-primary font-bold">
                Join as Employee
              </Link>{" "}
              or{" "}
              <Link to="/join-hr" className="link link-secondary font-bold">
                Join as HR
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* --- ROLE SELECTION MODAL --- */}
      <dialog id="role_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-2xl text-primary mb-4">
            Welcome to AssetVerse!
          </h3>
          <p className="py-2 text-gray-500">
            Please select how you want to continue:
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              onClick={() => handleRoleSelect("employee")}
              className="btn h-auto py-4 flex-1 flex-col gap-2 btn-outline hover:btn-primary"
            >
              <IoPeopleOutline className="text-4xl" />
              <span>
                Continue as
                <br />
                <strong className="text-lg">Employee</strong>
              </span>
            </button>

            <button
              onClick={() => handleRoleSelect("hr")}
              className="btn h-auto py-4 flex-1 flex-col gap-2 btn-outline hover:btn-secondary"
            >
              <IoBriefcaseOutline className="text-4xl" />
              <span>
                Register as
                <br />
                <strong className="text-lg">HR Manager</strong>
              </span>
            </button>
          </div>

          <div className="modal-action justify-center">
            <form method="dialog">
              <button className="btn btn-ghost btn-sm">Cancel</button>
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
