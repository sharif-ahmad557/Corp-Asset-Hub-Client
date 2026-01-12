import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUserEdit,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSave,
  FaCamera,
  FaUserTie,
  FaBoxOpen,
  FaCalendarAlt,
  FaTimes,
  FaShieldAlt,
  FaCrown,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch User Data from DB
  const {
    data: dbUser = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 2. Fetch Stats based on Role
  const { data: stats = {} } = useQuery({
    queryKey: ["profile-stats", user?.email, role],
    queryFn: async () => {
      if (role === "hr") {
        // Use package limit info for HR
        return {
          label: "Employees",
          count: dbUser.currentEmployees || 0,
          limit: dbUser.packageLimit || 0,
        };
      } else {
        // Employee Stats
        const res = await axiosSecure.get(
          `/requests/my-requests/${user.email}`
        );
        return { label: "My Requests", count: res.data.length || 0 };
      }
    },
    enabled: !!role && !!dbUser,
  });

  // Local State for Form
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    companyName: "",
  });

  // Sync Form Data with DB Data
  useEffect(() => {
    if (dbUser) {
      setFormData({
        fullName: user?.displayName || dbUser.name || "",
        phone: dbUser.phone || "",
        location: dbUser.location || "",
        companyName: dbUser.companyName || "",
      });
    }
  }, [dbUser, user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Firebase Profile Update
      if (formData.fullName !== user.displayName) {
        await updateUserProfile(formData.fullName, user.photoURL);
      }

      // 2. Backend Update
      const updateData = {
        name: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        // Company name typically shouldn't be changed easily by HR after registration without verification,
        // but allowing edit here as per generic profile requirements.
        companyName: formData.companyName,
      };

      const res = await axiosSecure.patch(`/users/${user.email}`, updateData);

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        toast.success("Profile Updated Successfully!");
        setIsEditing(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="py-10 lg:py-16 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-base-content">
              Profile Settings
            </h1>
            <p className="text-base-content/60 mt-1">
              Manage your personal information and account security.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`btn ${
                isEditing ? "btn-error btn-outline" : "btn-primary"
              } gap-2 shadow-lg`}
              disabled={isSaving}
            >
              {isEditing ? (
                <>
                  {" "}
                  <FaTimes /> Cancel Editing{" "}
                </>
              ) : (
                <>
                  {" "}
                  <FaUserEdit /> Edit Profile{" "}
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
            transition={{ duration: 0.4 }}
            className="lg:col-span-1 flex flex-col gap-6"
          >
            {/* Identity Info */}
            <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
              <div
                className={`h-32 relative ${
                  role === "hr"
                    ? "bg-gradient-to-r from-blue-600 to-violet-600"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600"
                }`}
              >
                <div className="absolute top-4 right-4 badge badge-neutral bg-black/20 text-white border-none backdrop-blur-sm uppercase font-bold tracking-wider">
                  {role === "hr" ? "HR Manager" : "Employee"}
                </div>
              </div>

              <div className="card-body pt-0 items-center text-center relative">
                {/* Profile Image */}
                <div className="relative -mt-16 mb-4 group">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring-4 ring-base-100 bg-base-100 shadow-lg">
                      <img
                        src={
                          user?.photoURL ||
                          `https://ui-avatars.com/api/?name=${
                            user?.displayName || "User"
                          }&background=random&color=fff&size=128`
                        }
                        alt="Profile"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {/* Camera Icon (Visual) */}
                  <div className="absolute bottom-1 right-2 bg-base-100 rounded-full p-2 shadow-md border border-base-200 text-base-content/70 cursor-pointer hover:text-primary transition-colors">
                    <FaCamera className="text-sm" />
                  </div>
                </div>

                <h2 className="card-title text-2xl text-base-content">
                  {user?.displayName}
                </h2>
                <p className="text-base-content/60 flex items-center justify-center gap-2 text-sm bg-base-200/50 px-3 py-1 rounded-full mt-1">
                  <FaEnvelope className="text-xs" /> {user?.email}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                  <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                    <div className="text-xs uppercase tracking-wide text-base-content/50 font-bold mb-1">
                      {role === "hr" ? "Total Assets" : "Requested"}
                    </div>
                    {/* Assuming logic for total assets would be fetched similarly, using placeholder logic based on requirements scope */}
                    <div className="text-2xl font-bold text-primary">
                      {/* If HR, maybe show assets count, if Employee show requests */}
                      {role === "hr" ? "∞" : stats.count}
                    </div>
                  </div>
                  <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                    <div className="text-xs uppercase tracking-wide text-base-content/50 font-bold mb-1">
                      {role === "hr" ? "Team" : "Team ID"}
                    </div>
                    <div className="text-xl font-bold text-secondary truncate">
                      {role === "hr" ? stats.count : "Affiliated"}
                    </div>
                  </div>
                </div>

                {/* Employee Shortcut */}
                {role === "employee" && (
                  <Link
                    to="/my-assets"
                    className="btn btn-outline btn-primary w-full mt-4 rounded-xl gap-2"
                  >
                    <FaBoxOpen /> View My Assets
                  </Link>
                )}
              </div>
            </div>

            {/* HR Subscription Card (Conditional) */}
            {role === "hr" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white shadow-xl"
              >
                <div className="card-body p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                      <FaCrown className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {dbUser.subscription
                          ? dbUser.subscription.toUpperCase()
                          : "BASIC"}{" "}
                        Plan
                      </h3>
                      <p className="text-xs text-gray-400">
                        Active Subscription
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar for Employee Limit */}
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1 text-gray-300">
                      <span>{stats.count} Employees</span>
                      <span>Limit: {stats.limit}</span>
                    </div>
                    <progress
                      className="progress progress-warning w-full"
                      value={stats.count || 0}
                      max={stats.limit || 5}
                    ></progress>
                  </div>

                  <Link
                    to="/upgrade-package"
                    className="btn btn-sm btn-outline text-white hover:bg-white hover:text-black mt-4 w-full border-white/30"
                  >
                    Upgrade Package
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Edit Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="card bg-base-100 shadow-xl border border-base-200 h-full">
              <div className="card-body p-6 lg:p-10">
                <h3 className="font-bold text-xl mb-6 border-b pb-4 border-base-200 flex items-center gap-2 text-base-content">
                  <FaUserTie className="text-primary" /> Personal Information
                </h3>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/70">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`input input-bordered w-full transition-all ${
                        isEditing
                          ? "focus:input-primary bg-base-100"
                          : "bg-base-200/50 border-transparent cursor-not-allowed text-base-content/70"
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/70">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="input input-bordered bg-base-200/50 border-transparent cursor-not-allowed text-base-content/60"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/70 flex items-center gap-2">
                        <FaPhoneAlt className="text-xs" /> Phone Number
                      </span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder={isEditing ? "e.g. +88017..." : "Not Set"}
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`input input-bordered w-full transition-all ${
                        isEditing
                          ? "focus:input-primary bg-base-100"
                          : "bg-base-200/50 border-transparent cursor-not-allowed text-base-content/70"
                      }`}
                    />
                  </div>

                  {/* Company Name (Mostly for HR, but keeping generic structure) */}
                  {role === "hr" && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content/70 flex items-center gap-2">
                          <FaShieldAlt className="text-xs" /> Company Name
                        </span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        disabled={!isEditing} // Usually company name shouldn't change easily, but keeping editable for requirement
                        className={`input input-bordered w-full transition-all ${
                          isEditing
                            ? "focus:input-primary bg-base-100"
                            : "bg-base-200/50 border-transparent cursor-not-allowed text-base-content/70"
                        }`}
                      />
                    </div>
                  )}

                  {/* Location */}
                  <div
                    className={`form-control ${
                      role === "employee" ? "md:col-span-2" : ""
                    }`}
                  >
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/70 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-xs" /> Address
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder={
                        isEditing ? "e.g. Dhaka, Bangladesh" : "Not Set"
                      }
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`input input-bordered w-full transition-all ${
                        isEditing
                          ? "focus:input-primary bg-base-100"
                          : "bg-base-200/50 border-transparent cursor-not-allowed text-base-content/70"
                      }`}
                    />
                  </div>

                  {/* Join Date (Read Only) */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/70 flex items-center gap-2">
                        <FaCalendarAlt className="text-xs" /> Date Joined
                      </span>
                    </label>
                    <input
                      type="text"
                      value={
                        dbUser.createdAt
                          ? new Date(dbUser.createdAt).toDateString()
                          : "N/A"
                      }
                      disabled
                      className="input input-bordered bg-base-200/50 border-transparent cursor-not-allowed text-base-content/60"
                    />
                  </div>
                </form>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-actions justify-end mt-8 pt-6 border-t border-base-200"
                  >
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="btn btn-primary bg-gradient-to-r from-blue-600 to-violet-600 border-none text-white gap-2 px-8 rounded-xl shadow-lg hover:shadow-primary/30"
                    >
                      {isSaving ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <>
                          <FaSave /> Save Changes
                        </>
                      )}
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

export default MyProfile;
