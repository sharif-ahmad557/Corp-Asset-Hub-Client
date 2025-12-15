import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth.jsx";
import useRole from "../../hooks/useRole";
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
  IoClose,
  IoGridOutline,
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
      setIsDrawerOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Close helpers
  const closeDrawer = () => setIsDrawerOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Custom NavItem Component (For Top Menu)
  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={closeMobileMenu} // Close menu on click
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

  // Custom Drawer Link Component (For Side Drawer)
  const DrawerLink = ({ to, icon, label }) => (
    <NavLink
      to={to}
      onClick={closeDrawer}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
          isActive
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "hover:bg-base-200 text-base-content/80"
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`navbar fixed top-0 z-40 w-full px-4 sm:px-8 transition-all duration-300 ${
          isScrolled
            ? "bg-base-100/80 backdrop-blur-md shadow-lg border-b border-base-200 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="navbar-start">
          {/* --- MOBILE MENU (FIXED) --- */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              // Toggle logic fixed here
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <IoGridOutline className="h-6 w-6" />
            </div>

            {/* Dropdown Content */}
            {isMobileMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200"
              >
                {publicLinks}

                {/* Mobile specific join links if not logged in */}
                {!user && (
                  <>
                    <div className="divider my-1"></div>
                    <li>
                      <Link to="/login" onClick={closeMobileMenu}>
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
              </ul>
            )}
          </div>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 ml-2 lg:ml-0">
            <img src="/navlogo.png" alt="logo" className="w-20 h-20" />
          </Link>
        </div>

        {/* Center Menu (Desktop) */}
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
            // --- USER PROFILE TRIGGER (OPENS DRAWER) ---
            <div
              className="btn btn-ghost btn-circle avatar online ring-2 ring-transparent hover:ring-primary transition-all duration-300 cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}
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
          ) : (
            // --- LOGIN / JOIN BUTTONS (DESKTOP) ---
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
                      className="absolute right-0 top-full mt-2 w-72 bg-base-100 rounded-xl shadow-2xl border border-base-200 overflow-hidden p-2"
                    >
                      <Link
                        to="/join-hr"
                        className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg"
                      >
                        <IoBriefcaseOutline className="text-xl text-blue-600" />
                        <div>
                          <p className="font-bold text-sm">Join as HR</p>
                        </div>
                      </Link>
                      <Link
                        to="/join-employee"
                        className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg"
                      >
                        <IoPeopleOutline className="text-xl text-violet-600" />
                        <div>
                          <p className="font-bold text-sm">Join as Employee</p>
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

      {/* --- SIDE DRAWER (FULL HEIGHT) --- */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-base-100 z-[70] shadow-2xl border-l border-base-200 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-base-200 bg-base-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-base-content/70">Menu</h3>
                <button
                  onClick={closeDrawer}
                  className="btn btn-sm btn-circle btn-ghost hover:bg-error/10 hover:text-error"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>

              {/* User Info Card */}
              <div className="p-6 flex flex-col items-center text-center border-b border-base-200">
                <div className="avatar mb-4">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user?.photoURL ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                      }
                      alt="User"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-bold">{user?.displayName}</h4>
                <p className="text-sm text-base-content/60 mb-2">
                  {user?.email}
                </p>
                {isLoading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  <div className="badge badge-primary badge-outline uppercase text-xs font-bold tracking-wider">
                    {role || "User"}
                  </div>
                )}
              </div>

              {/* Navigation Links (Scrollable Area) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
                      label="Upgrade Package"
                    />
                    <DrawerLink
                      to="/profile"
                      icon={<IoPersonOutline />}
                      label="Profile"
                    />
                  </>
                )}
              </div>

              {/* Footer (Logout) */}
              <div className="p-4 border-t border-base-200 bg-base-50">
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-outline w-full flex items-center justify-center gap-2"
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
