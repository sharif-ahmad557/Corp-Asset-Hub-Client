import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const HRRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  if (user && role === "hr") {
    return children;
  }

  // লগইন আছে কিন্তু HR না হলে লগআউট করে দেওয়া যেতে পারে অথবা Home এ পাঠানো যেতে পারে
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default HRRoute;
