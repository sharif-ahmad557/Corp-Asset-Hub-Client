import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth.jsx";
import useRole from "../../hooks/useRole"; // নিশ্চিত করুন আপনার useRole হুকটি [role, isLoading] রিটার্ন করে
import {
  IoMoon,
  IoSunny,
  IoLogOutOutline,
  IoPersonOutline,
  IoBriefcaseOutline,
  IoPeopleOutline,
  IoCubeOutline,
  IoAddCircleOutline,
  IoListOutline,
  IoRocketOutline,
  IoChevronDown,
  IoLogInOutline,
} from "react-icons/io5";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // আপডেট ১: isLoading স্টেটটি বের করে আনা হলো
  const [role, isLoading] = useRole();

  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinDropdownOpen, setIsJoinDropdownOpen] = useState(false);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Toggle
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

  // Custom NavItem Component
  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative font-medium transition-colors duration-300 ${
          isActive ? "text-primary" : "text-base-content/70 hover:text-primary"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <motion.span
              layoutId="underline"
              className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-blue-600 to-violet-600"
            />
          )}
        </>
      )}
    </NavLink>
  );

  // --- MENU LINKS ---
  const publicLinks = (
    <>
      <li>
        <NavItem to="/">Home</NavItem>
      </li>
      <li>
        <NavItem to="/features">Features</NavItem>
      </li>
      <li>
        <NavItem to="/pricing">Pricing</NavItem>
      </li>
      <li>
        <NavItem to="/about">About Us</NavItem>
      </li>
      <li>
        <NavItem to="/contact">Contact</NavItem>
      </li>
    </>
  );

  const employeeLinks = (
    <>
      <li>
        <NavLink to="/my-assets" className="justify-between">
          <span className="flex items-center gap-2">
            <IoCubeOutline /> My Assets
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-team" className="justify-between">
          <span className="flex items-center gap-2">
            <IoPeopleOutline /> My Team
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/request-asset" className="justify-between">
          <span className="flex items-center gap-2">
            <IoAddCircleOutline /> Request Asset
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-profile" className="justify-between">
          <span className="flex items-center gap-2">
            <IoPersonOutline /> Profile
          </span>
        </NavLink>
      </li>
    </>
  );

  const hrLinks = (
    <>
      <li>
        <NavLink to="/asset-list">
          <span className="flex items-center gap-2">
            <IoListOutline /> Asset List
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-asset">
          <span className="flex items-center gap-2">
            <IoAddCircleOutline /> Add Asset
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-requests">
          <span className="flex items-center gap-2">
            <IoBriefcaseOutline /> All Requests
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-employee-list">
          <span className="flex items-center gap-2">
            <IoPeopleOutline /> Employee List
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/upgrade-package">
          <span className="flex items-center gap-2">
            <IoRocketOutline className="text-secondary" /> Upgrade Package
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile">
          <span className="flex items-center gap-2">
            <IoPersonOutline /> Profile
          </span>
        </NavLink>
      </li>
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar fixed top-0 z-50 w-full px-4 sm:px-8 transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-lg border-b border-base-200 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <AnimatePresence>
            {isMobileMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-64 border border-base-200"
              >
                {publicLinks}
                {!user && (
                  <>
                    <div className="divider my-1"></div>
                    <li className="menu-title">Join AssetVerse</li>
                    <li>
                      <NavLink to="/join-hr">
                        <IoBriefcaseOutline /> Join as HR Manager
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/join-employee">
                        <IoPeopleOutline /> Join as Employee
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className="text-primary">
                        <IoLogInOutline /> Login
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/navlogo.png"
            alt="AssetVerse Logo"
            className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8 text-base font-medium">
          {publicLinks}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-base-200 text-base-content">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "dark"}
          />
          <IoSunny className="swap-on w-6 h-6 text-yellow-500" />
          <IoMoon className="swap-off w-5 h-5" />
        </label>

        {/* Auth Logic */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar online ring-2 ring-transparent hover:ring-primary transition-all duration-300"
            >
              <div className="w-10 rounded-full">
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
              className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200 animate-in fade-in slide-in-from-top-5 duration-200"
            >
              <li className="pointer-events-none mb-2">
                <div className="flex flex-col items-start gap-1 p-2 bg-base-200/50 rounded-xl">
                  <span className="font-bold text-base">
                    {user?.displayName}
                  </span>

                  {/* আপডেট ২: Role Loading State */}
                  {isLoading ? (
                    <span className="loading loading-dots loading-xs text-primary"></span>
                  ) : (
                    <span className="text-xs uppercase tracking-wider opacity-60 font-semibold badge badge-sm badge-outline">
                      {role || "No Role"}
                    </span>
                  )}
                </div>
              </li>

              <div className="divider my-1"></div>

              {/* আপডেট ৩: মেনু লোডিং স্পিনার */}
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <span className="loading loading-spinner loading-md text-primary bg-gradient-to-r from-blue-600 to-violet-600"></span>
                </div>
              ) : (
                <div className="space-y-1">
                  {role === "hr" && hrLinks}
                  {role === "employee" && employeeLinks}

                  {/* যদি রোল না পাওয়া যায় */}
                  {!role && (
                    <div className="text-center py-2 text-xs text-error">
                      Please check connection <br /> or contact admin.
                    </div>
                  )}
                </div>
              )}

              <div className="divider my-1"></div>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-error hover:bg-error/10 hover:text-error font-semibold"
                >
                  <IoLogOutOutline className="text-lg" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="btn btn-ghost font-medium hover:bg-base-200"
            >
              Login
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setIsJoinDropdownOpen(true)}
              onMouseLeave={() => setIsJoinDropdownOpen(false)}
            >
              <button className="btn btn-primary px-6 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 border-none text-white hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                Get Started{" "}
                <IoChevronDown
                  className={`transition-transform duration-300 ${
                    isJoinDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isJoinDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-base-100 rounded-xl shadow-2xl border border-base-200 overflow-hidden"
                  >
                    <div className="p-2">
                      <Link
                        to="/join-hr"
                        className="flex items-start gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors group"
                      >
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <IoBriefcaseOutline className="text-xl" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-base-content">
                            Join as HR Manager
                          </p>
                          <p className="text-xs text-base-content/60">
                            Manage assets & teams
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/join-employee"
                        className="flex items-start gap-3 p-3 hover:bg-base-200 rounded-lg transition-colors group"
                      >
                        <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-lg group-hover:bg-violet-600 group-hover:text-white transition-colors">
                          <IoPeopleOutline className="text-xl" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-base-content">
                            Join as Employee
                          </p>
                          <p className="text-xs text-base-content/60">
                            Request & track items
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
