import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
  FaUserEdit,
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaCrown,
  FaSave,
  FaCamera,
} from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // ফর্ম ডাটা স্টেট
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "AssetVerse Manager",
    email: user?.email || "hr@assetverse.com",
    phone: "+1 (555) 000-0000",
    company: "TechCorp Industries",
    location: "New York, USA",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-12 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-base-content">
              Profile Settings
            </h1>
            <p className="text-base-content/60">
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
                isEditing ? "btn-error" : "btn-primary"
              } gap-2 shadow-lg`}
            >
              {isEditing ? (
                "Cancel Editing"
              ) : (
                <>
                  <FaUserEdit /> Edit Profile
                </>
              )}
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
              {/* Banner Background */}
              <div className="h-32 bg-gradient-to-r from-blue-600 to-violet-600 relative">
                <div className="absolute top-4 right-4 badge badge-accent badge-outline bg-white/10 text-white border-none backdrop-blur-sm">
                  HR Manager
                </div>
              </div>

              <div className="card-body pt-0 items-center text-center relative">
                {/* Profile Image Area */}
                <div className="relative -mt-16 mb-4 group">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 bg-base-100">
                      <img
                        // Logic: ছবি থাকলে দেখাবে, না থাকলে নামের আদ্যক্ষর দিয়ে আইকন বানাবে
                        src={
                          user?.photoURL
                            ? user.photoURL
                            : `https://ui-avatars.com/api/?name=${formData.fullName}&background=0D8ABC&color=fff&size=128`
                        }
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Edit Photo Overlay */}
                  <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 pointer-events-none group-hover:pointer-events-auto">
                    <FaCamera className="text-white text-xl" />
                  </div>
                </div>

                <h2 className="card-title text-2xl">{formData.fullName}</h2>
                <p className="text-base-content/60 flex items-center gap-2 text-sm">
                  <FaEnvelope /> {formData.email}
                </p>

                {/* Quick Stats */}
                <div className="stats stats-vertical lg:stats-horizontal shadow w-full mt-6 bg-base-200/50">
                  <div className="stat place-items-center p-4">
                    <div className="stat-title text-xs uppercase tracking-wide">
                      Assets
                    </div>
                    <div className="stat-value text-primary text-2xl">45</div>
                  </div>
                  <div className="stat place-items-center p-4">
                    <div className="stat-title text-xs uppercase tracking-wide">
                      Team
                    </div>
                    <div className="stat-value text-secondary text-2xl">12</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white shadow-xl mt-8"
            >
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                    <FaCrown className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Premium Plan</h3>
                    <p className="text-xs text-gray-400">
                      Renews on Jan 1, 2025
                    </p>
                  </div>
                </div>
                <progress
                  className="progress progress-warning w-full"
                  value="70"
                  max="100"
                ></progress>
                <div className="flex justify-between text-xs mt-2 text-gray-300">
                  <span>70 Employees Added</span>
                  <span>Limit: 100</span>
                </div>

                {/* 👇 UPGRADE BUTTON AS LINK 👇 */}
                <Link
                  to="/upgrade-package"
                  className="btn btn-sm btn-outline text-white hover:bg-white hover:text-black mt-4 w-full"
                >
                  Upgrade Package
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Edit Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h3 className="font-bold text-xl mb-6 border-b pb-2 border-base-200">
                  Personal Information
                </h3>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaUserEdit className="text-primary" /> Full Name
                      </span>
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

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaEnvelope className="text-primary" /> Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="input input-bordered bg-base-200 cursor-not-allowed text-base-content/60"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaPhoneAlt className="text-primary" /> Phone Number
                      </span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input input-bordered focus:border-primary focus:outline-none disabled:bg-base-200 disabled:text-base-content/60"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaBuilding className="text-primary" /> Company Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input input-bordered focus:border-primary focus:outline-none disabled:bg-base-200 disabled:text-base-content/60"
                    />
                  </div>

                  {/* Location */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" /> Office
                        Location
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input input-bordered focus:border-primary focus:outline-none disabled:bg-base-200 disabled:text-base-content/60"
                    />
                  </div>
                </form>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-actions justify-end mt-8"
                  >
                    <button className="btn btn-primary bg-gradient-to-r from-blue-600 to-violet-600 border-none text-white gap-2">
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

export default MyProfile;
