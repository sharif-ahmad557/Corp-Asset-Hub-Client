import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import useRole from "../../hooks/useRole";
import { IoMoon, IoSunny } from "react-icons/io5";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole(); // আমাদের কাস্টম হুক থেকে রোল আনছি
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Theme Toggle Logic
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- MENU LINKS GENERATION BASED ON ROLE ---
  const publicLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink to="/join-employee">Join as Employee</NavLink>
          </li>
          <li>
            <NavLink to="/join-hr">Join as HR Manager</NavLink>
          </li>
        </>
      )}
    </>
  );

  const employeeLinks = (
    <>
      <li>
        <NavLink to="/my-assets">My Assets</NavLink>
      </li>
      <li>
        <NavLink to="/my-team">My Team</NavLink>
      </li>
      <li>
        <NavLink to="/request-asset">Request Asset</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
    </>
  );

  const hrLinks = (
    <>
      <li>
        <NavLink to="/asset-list">Asset List</NavLink>
      </li>
      <li>
        <NavLink to="/add-asset">Add Asset</NavLink>
      </li>
      <li>
        <NavLink to="/all-requests">All Requests</NavLink>
      </li>
      <li>
        <NavLink to="/my-employee-list">Employee List</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm fixed z-50 px-4 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {publicLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold text-primary gap-0"
        >
          Asset<span className="text-secondary">Verse</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {publicLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <label className="swap swap-rotate hover:scale-110 transition-transform">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "dark"}
          />
          <IoSunny className="swap-on fill-current w-6 h-6 text-yellow-500" />
          <IoMoon className="swap-off fill-current w-6 h-6 text-gray-500" />
        </label>

        {/* Authenticated User Menu */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div className="w-10 rounded-full border border-primary ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt="User"
                  src={
                    user?.photoURL ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="menu-title text-center">{user?.displayName}</li>
              <div className="divider my-0"></div>

              {/* Role Based Dropdown Items */}
              {role === "hr" && hrLinks}
              {role === "employee" && employeeLinks}
              {!role && (
                <li>
                  <span className="text-warning">Verifying Role...</span>
                </li>
              )}

              <div className="divider my-0"></div>
              <li>
                <button onClick={handleLogout} className="text-error font-bold">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm rounded-md">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
