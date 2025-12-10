import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";


const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      // Note: In real app, we might need to save Google user to DB here if first time
      toast.success("Google Login Successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
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
    </div>
  );
};

export default Login;
