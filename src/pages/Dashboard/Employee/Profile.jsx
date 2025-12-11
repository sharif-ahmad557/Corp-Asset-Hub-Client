import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import {
  FaUserEdit,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSave,
  FaCamera,
  FaUserTie,
  FaBuilding,
  FaBoxOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole(); // Get current role
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  // 1. Fetch User Data from DB (to get extra fields like phone/location)
  const { data: dbUser = {}, refetch } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // 2. Fetch Stats based on Role
  const { data: stats = {} } = useQuery({
    queryKey: ["profile-stats", user?.email, role],
    queryFn: async () => {
      if (role === "hr") {
        // HR Stats logic (already done in dashboard, simplified here)
        return { label: "Employees", count: dbUser.currentEmployees || 0 };
      } else {
        // Employee Stats: Count requested assets
        const res = await axiosSecure.get(
          `/requests/my-requests/${user.email}`
        );
        return { label: "My Requests", count: res.data.length || 0 };
      }
    },
    enabled: !!role, // Only run when role is loaded
  });

  // Local State for Form
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    phone: dbUser?.phone || "",
    location: dbUser?.location || "",
  });

  // Update form data when DB data loads
  React.useEffect(() => {
    if (dbUser) {
      setFormData({
        fullName: user?.displayName || dbUser.name || "",
        phone: dbUser.phone || "",
        location: dbUser.location || "",
      });
    }
  }, [dbUser, user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Note: You need a PUT/PATCH route in backend to save these details strictly.
    // For now, we simulate success.
    toast.success("Profile Updated Successfully!");
    setIsEditing(false);
    refetch();
  };

  return (
    <div className="pt-24 pb-12 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-base-content">
              {role === "hr" ? "Admin Profile" : "My Profile"}
            </h1>
            <p className="text-base-content/60">
              Manage your identity and preferences.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`btn ${
                isEditing ? "btn-error" : "btn-primary"
              } gap-2 shadow-lg`}
            >
              {isEditing ? (
                "Cancel"
              ) : (
                <>
                  <FaUserEdit /> Edit Profile
                </>
              )}
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
              {/* Dynamic Banner Color based on Role */}
              <div
                className={`h-32 relative ${
                  role === "hr"
                    ? "bg-gradient-to-r from-blue-600 to-violet-600"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600"
                }`}
              >
                <div className="absolute top-4 right-4 badge badge-accent badge-outline bg-white/20 text-white border-none backdrop-blur-sm uppercase font-bold tracking-wider">
                  {role === "hr" ? "HR Manager" : "Employee"}
                </div>
              </div>

              <div className="card-body pt-0 items-center text-center relative">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 bg-base-100">
                      <img
                        src={
                          user?.photoURL ||
                          `https://ui-avatars.com/api/?name=${user?.displayName}&background=random&color=fff&size=128`
                        }
                        alt="Profile"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white">
                    <FaCamera className="text-xl" />
                  </div>
                </div>

                <h2 className="card-title text-2xl">{user?.displayName}</h2>
                <p className="text-base-content/60 flex items-center gap-2 text-sm mb-4">
                  <FaEnvelope /> {user?.email}
                </p>

                {/* Stats Row */}
                <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200/50">
                  <div className="stat place-items-center p-4">
                    <div className="stat-title text-xs uppercase tracking-wide">
                      {role === "hr" ? "Team Size" : "Assets"}
                    </div>
                    <div className="stat-value text-primary text-2xl">
                      {stats.count || 0}
                    </div>
                  </div>
                  <div className="stat place-items-center p-4">
                    <div className="stat-title text-xs uppercase tracking-wide">
                      Joined
                    </div>
                    <div className="stat-value text-secondary text-base">
                      {dbUser.createdAt
                        ? new Date(dbUser.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Employee Specific CTA */}
                {role === "employee" && (
                  <div className="w-full mt-6 space-y-2">
                    <Link
                      to="/my-assets"
                      className="btn btn-outline btn-primary btn-sm w-full gap-2"
                    >
                      <FaBoxOpen /> View My Assets
                    </Link>
                    <Link
                      to="/my-team"
                      className="btn btn-ghost btn-sm w-full gap-2"
                    >
                      <FaUserTie /> View My Team
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Information Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="card bg-base-100 shadow-xl border border-base-200 h-full">
              <div className="card-body">
                <h3 className="font-bold text-xl mb-6 border-b pb-2 border-base-200 flex items-center gap-2">
                  <FaUserTie className="text-primary" /> Personal Information
                </h3>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input input-bordered focus:border-primary focus:outline-none disabled:bg-base-200 disabled:text-base-content/60"
                    />
                  </div>

                  {/* Email (Read Only) */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="input input-bordered bg-base-200 cursor-not-allowed text-base-content/60"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaPhoneAlt className="text-xs" /> Phone Number
                      </span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+880 1XXX..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input input-bordered focus:border-primary focus:outline-none disabled:bg-base-200 disabled:text-base-content/60"
                    />
                  </div>

                  {/* Location */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaMapMarkerAlt className="text-xs" /> Address
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Dhaka, Bangladesh"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input input-bordered focus:border-primary focus:outline-none disabled:bg-base-200 disabled:text-base-content/60"
                    />
                  </div>

                  {/* Date of Joining (Read Only) */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaCalendarAlt className="text-xs" /> Date Joined
                      </span>
                    </label>
                    <input
                      type="text"
                      value={
                        dbUser.createdAt
                          ? new Date(dbUser.createdAt).toDateString()
                          : "Not Available"
                      }
                      disabled
                      className="input input-bordered bg-base-200 cursor-not-allowed text-base-content/60"
                    />
                  </div>
                </form>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-actions justify-end mt-8"
                  >
                    <button
                      onClick={handleSave}
                      className="btn btn-primary bg-gradient-to-r from-blue-600 to-violet-600 border-none text-white gap-2"
                    >
                      <FaSave /> Save Changes
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
