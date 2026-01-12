import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth.jsx";
import useRole from "../../hooks/useRole";
import Logo from "./Logo"; // Logo Component Import করা হয়েছে
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
  IoGridOutline,
  IoClose,
  IoHomeOutline,
} from "react-icons/io5";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role, isLoading] = useRole();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isScrolled, setIsScrolled] = useState(false);

  // States for Menus
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinDropdownOpen, setIsJoinDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      setIsDrawerOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Close helpers
  const closeDrawer = () => setIsDrawerOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // --- REUSABLE COMPONENTS ---

  // Custom NavItem (Desktop)
  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={closeMobileMenu}
      className={({ isActive }) =>
        `relative font-medium text-sm lg:text-base transition-colors duration-300 ${
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
              className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary"
            />
          )}
        </>
      )}
    </NavLink>
  );

  // Custom Drawer Link (Sidebar/Drawer)
  const DrawerLink = ({ to, icon, label }) => (
    <NavLink
      to={to}
      onClick={closeDrawer}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
          isActive
            ? "bg-primary text-white shadow-md shadow-primary/20"
            : "hover:bg-base-200 text-base-content/80"
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </NavLink>
  );

  // --- MENU LINKS DEFINITION ---
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

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`navbar fixed top-0 z-50 w-full px-4 sm:px-8 transition-all duration-300 ${
          isScrolled
            ? "bg-base-100/90 backdrop-blur-lg shadow-sm border-b border-base-200 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="navbar-start">
          {/* Mobile Menu Toggle */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <IoGridOutline className="h-6 w-6" />
            </div>

            {/* Mobile Dropdown Content (Fixed Margin & Z-Index) */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.ul
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  tabIndex={0}
                  className="menu menu-sm dropdown-content absolute top-14 left-0 mt-4 z-[60] p-4 shadow-2xl bg-base-100 rounded-box w-64 border border-base-200"
                >
                  {publicLinks}
                  {!user && (
                    <>
                      <div className="divider my-2"></div>
                      <li>
                        <Link
                          to="/login"
                          onClick={closeMobileMenu}
                          className="font-bold"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/join-employee" onClick={closeMobileMenu}>
                          Join as Employee
                        </Link>
                      </li>
                      <li>
                        <Link to="/join-hr" onClick={closeMobileMenu}>
                          Join as HR
                        </Link>
                      </li>
                    </>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Brand Logo (Updated with Logo Component) */}
          <div className="ml-2 lg:ml-0">
            <Logo />
          </div>
        </div>

        {/* Center Menu (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6">{publicLinks}</ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-3">
          {/* Theme Toggle */}
          <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm hover:bg-base-200 transition-colors">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "dark"}
            />
            <IoSunny className="swap-on w-5 h-5 text-yellow-500" />
            <IoMoon className="swap-off w-5 h-5 text-blue-500" />
          </label>

          {/* Auth Logic */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* Profile Trigger */}
              <div
                className="avatar cursor-pointer tooltip tooltip-bottom"
                data-tip="Dashboard"
                onClick={() => setIsDrawerOpen(true)}
              >
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 transition-all hover:ring-opacity-80">
                  <img
                    alt="User"
                    src={
                      user?.photoURL ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                    }
                  />
                </div>
              </div>
            </div>
          ) : (
            // --- LOGGED OUT STATE ---
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
                <button className="btn btn-primary px-6 rounded-full text-white shadow-lg shadow-primary/30 flex items-center gap-2 hover:shadow-primary/50 transition-all">
                  Get Started
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
                      className="absolute right-0 top-full mt-4 w-72 bg-base-100 rounded-2xl shadow-2xl border border-base-200 overflow-hidden p-2 z-50"
                    >
                      <Link
                        to="/join-hr"
                        className="flex items-center gap-4 p-3 hover:bg-base-200 rounded-xl group transition-colors"
                      >
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <IoBriefcaseOutline className="text-xl" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Join as HR</p>
                          <p className="text-xs text-base-content/60">
                            Manage assets & teams
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/join-employee"
                        className="flex items-center gap-4 p-3 hover:bg-base-200 rounded-xl group transition-colors"
                      >
                        <div className="p-3 bg-violet-100 text-violet-600 rounded-lg group-hover:bg-violet-600 group-hover:text-white transition-colors">
                          <IoPeopleOutline className="text-xl" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Join as Employee</p>
                          <p className="text-xs text-base-content/60">
                            Request & track assets
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* --- RIGHT SIDE DRAWER --- */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-base-100 z-[100] shadow-2xl flex flex-col border-l border-base-200"
            >
              <div className="p-5 border-b border-base-200 flex justify-between items-center bg-base-100/95 backdrop-blur-md sticky top-0 z-10">
                <h3 className="text-lg font-bold text-base-content">
                  Dashboard Menu
                </h3>
                <button
                  onClick={closeDrawer}
                  className="btn btn-sm btn-circle btn-ghost hover:bg-error hover:text-white transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>

              <div className="p-8 flex flex-col items-center text-center bg-base-200/30 border-b border-base-200">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user?.photoURL ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                      }
                      alt="User"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-base-content">
                  {user?.displayName}
                </h4>
                <p className="text-xs text-base-content/60 mb-4 font-mono">
                  {user?.email}
                </p>
                {isLoading ? (
                  <span className="loading loading-dots loading-xs text-primary"></span>
                ) : (
                  <div
                    className={`badge ${
                      role === "hr" ? "badge-primary" : "badge-secondary"
                    } badge-lg uppercase text-xs font-bold tracking-wider px-4 py-3`}
                  >
                    {role === "hr" ? "HR Manager" : "Employee"}
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <DrawerLink to="/" icon={<IoHomeOutline />} label="Home" />
                {role === "employee" && (
                  <>
                    <DrawerLink
                      to="/my-assets"
                      icon={<IoCubeOutline />}
                      label="My Assets"
                    />
                    <DrawerLink
                      to="/my-team"
                      icon={<IoPeopleOutline />}
                      label="My Team"
                    />
                    <DrawerLink
                      to="/request-asset"
                      icon={<IoAddCircleOutline />}
                      label="Request Asset"
                    />
                    <DrawerLink
                      to="/my-profile"
                      icon={<IoPersonOutline />}
                      label="Profile"
                    />
                  </>
                )}
                {role === "hr" && (
                  <>
                    <DrawerLink
                      to="/asset-list"
                      icon={<IoListOutline />}
                      label="Asset List"
                    />
                    <DrawerLink
                      to="/add-asset"
                      icon={<IoAddCircleOutline />}
                      label="Add Asset"
                    />
                    <DrawerLink
                      to="/all-requests"
                      icon={<IoBriefcaseOutline />}
                      label="All Requests"
                    />
                    <DrawerLink
                      to="/my-employee-list"
                      icon={<IoPeopleOutline />}
                      label="Employee List"
                    />
                    <DrawerLink
                      to="/upgrade-package"
                      icon={<IoRocketOutline className="text-secondary" />}
                      label="Upgrade Plan"
                    />
                    <DrawerLink
                      to="/profile"
                      icon={<IoPersonOutline />}
                      label="Profile"
                    />
                  </>
                )}
              </div>

              <div className="p-4 border-t border-base-200 bg-base-50">
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-outline w-full flex items-center justify-center gap-2 hover:text-white"
                >
                  <IoLogOutOutline className="text-xl" /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
