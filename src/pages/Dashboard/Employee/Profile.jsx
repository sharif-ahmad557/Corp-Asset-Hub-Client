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
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user, updateUserProfile } = useAuth(); // Added updateUserProfile
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
        // Since we don't have a direct endpoint for single user stats in this context,
        // we use dbUser properties if available or default
        return { label: "Employees", count: dbUser.currentEmployees || 0 };
      } else {
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
  });

  // Update form data when DB data loads
  useEffect(() => {
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

  // Requirement: Editable Profile Information (Req #7)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Update Firebase Profile (Name)
      if (formData.fullName !== user.displayName) {
        await updateUserProfile(formData.fullName, user.photoURL);
      }

      // 2. Update Backend Database
      const updateData = {
        name: formData.fullName,
        phone: formData.phone,
        location: formData.location,
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
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="py-10 lg:py-16 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-base-content">
              {role === "hr" ? "Admin Profile" : "My Profile"}
            </h1>
            <p className="text-base-content/60 mt-1">
              Manage your personal information and account settings.
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
              } gap-2 shadow-sm`}
              disabled={isSaving}
            >
              {isEditing ? (
                <>
                  <FaTimes /> Cancel
                </>
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
            <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-200 h-full">
              <div
                className={`h-32 relative ${
                  role === "hr"
                    ? "bg-gradient-to-r from-blue-600 to-violet-600"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600"
                }`}
              >
                <div className="absolute top-4 right-4 badge badge-neutral bg-black/20 backdrop-blur-md text-white border-none uppercase font-bold tracking-wider text-xs px-3 py-2">
                  {role === "hr" ? (
                    <FaShieldAlt className="mr-1" />
                  ) : (
                    <FaUserTie className="mr-1" />
                  )}
                  {role === "hr" ? "HR Manager" : "Employee"}
                </div>
              </div>

              <div className="card-body pt-0 items-center text-center relative">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4">
                  <div className="avatar">
                    <div
                      className={`w-32 rounded-full ring-4 ring-base-100 bg-base-100 shadow-lg`}
                    >
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
                  {/* Camera icon is visual only for now as per req scope */}
                  <div className="absolute bottom-1 right-1 bg-base-100 rounded-full p-2 shadow-md border border-base-200 text-base-content/70 cursor-pointer hover:text-primary transition-colors">
                    <FaCamera className="text-sm" />
                  </div>
                </div>

                <h2 className="card-title text-2xl font-bold text-base-content">
                  {user?.displayName}
                </h2>
                <p className="text-base-content/60 flex items-center justify-center gap-2 text-sm mb-6 bg-base-200/50 px-3 py-1 rounded-full w-fit mx-auto">
                  <FaEnvelope className="text-xs" /> {user?.email}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-2 w-full gap-4 mb-6">
                  <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                    <div className="text-xs uppercase tracking-wide text-base-content/50 font-bold mb-1">
                      {role === "hr" ? "Team Size" : "Requests"}
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        role === "hr" ? "text-primary" : "text-secondary"
                      }`}
                    >
                      {stats.count || 0}
                    </div>
                  </div>
                  <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                    <div className="text-xs uppercase tracking-wide text-base-content/50 font-bold mb-1">
                      Joined
                    </div>
                    <div className="text-base font-semibold text-base-content/80 mt-1">
                      {dbUser.createdAt
                        ? new Date(dbUser.createdAt).toLocaleDateString(
                            undefined,
                            { month: "short", year: "numeric" }
                          )
                        : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Employee Specific CTA */}
                {role === "employee" && (
                  <div className="w-full space-y-3">
                    <Link
                      to="/my-assets"
                      className="btn btn-outline btn-primary w-full gap-2 rounded-xl"
                    >
                      <FaBoxOpen /> View My Assets
                    </Link>
                  </div>
                )}

                {role === "hr" && (
                  <div className="w-full space-y-3">
                    <Link
                      to="/asset-list"
                      className="btn btn-outline btn-primary w-full gap-2 rounded-xl"
                    >
                      <FaBoxOpen /> Manage Assets
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="card bg-base-100 shadow-xl border border-base-200 h-full">
              <div className="card-body p-6 lg:p-10">
                <div className="flex items-center gap-3 mb-6 border-b border-base-200 pb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <FaUserTie className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-base-content">
                      Personal Information
                    </h3>
                    <p className="text-xs text-base-content/50">
                      Update your personal details here.
                    </p>
                  </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/80">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                      className={`input input-bordered w-full transition-all
                        ${
                          isEditing
                            ? "focus:input-primary bg-base-100"
                            : "bg-base-200/50 border-transparent text-base-content/60 cursor-not-allowed"
                        }
                      `}
                    />
                  </div>

                  {/* Email (Read Only) */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/80">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="input input-bordered w-full bg-base-200/50 border-transparent text-base-content/60 cursor-not-allowed"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/80 flex items-center gap-2">
                        <FaPhoneAlt className="text-xs opacity-70" /> Phone
                        Number
                      </span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder={isEditing ? "+880 1XXX..." : "Not set"}
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`input input-bordered w-full transition-all
                        ${
                          isEditing
                            ? "focus:input-primary bg-base-100"
                            : "bg-base-200/50 border-transparent text-base-content/60 cursor-not-allowed"
                        }
                      `}
                    />
                  </div>

                  {/* Location */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/80 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-xs opacity-70" />{" "}
                        Address
                      </span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder={isEditing ? "Dhaka, Bangladesh" : "Not set"}
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`input input-bordered w-full transition-all
                        ${
                          isEditing
                            ? "focus:input-primary bg-base-100"
                            : "bg-base-200/50 border-transparent text-base-content/60 cursor-not-allowed"
                        }
                      `}
                    />
                  </div>

                  {/* Date of Joining (Read Only) */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/80 flex items-center gap-2">
                        <FaCalendarAlt className="text-xs opacity-70" /> Date
                        Joined
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
                      className="input input-bordered w-full bg-base-200/50 border-transparent text-base-content/60 cursor-not-allowed"
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
                      className="btn btn-primary bg-gradient-to-r from-blue-600 to-violet-600 border-none text-white gap-2 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40"
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

export default Profile;
