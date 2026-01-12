import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaTrash, FaUserTie, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import {
  IoSearchOutline,
  IoPeopleOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch My Employees
  const {
    data: employees = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employees/${user.email}`);
      return res.data;
    },
  });

  // Client-side Search Logic
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Remove with SweetAlert
  const handleRemove = async (id, name) => {
    Swal.fire({
      title: "Remove Employee?",
      text: `Are you sure you want to remove ${name} from your team?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/remove-employee/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Removed!", `${name} has been removed.`, "success");
            refetch();
          }
        } catch (err) {
          toast.error("Failed to remove employee.");
        }
      }
    });
  };

  // Avatar Fallback Logic
  const getAvatar = (name, img) => {
    return (
      img ||
      `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=128`
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <Helmet>
        <title>AssetMinder | My Employee List</title>
      </Helmet>

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content flex items-center gap-3">
            <IoPeopleOutline className="text-primary" />
            My Team
            <span className="badge badge-primary badge-outline font-bold">
              {employees.length}
            </span>
          </h2>
          <p className="text-base-content/60 mt-1">
            Manage your team members and their access.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <IoSearchOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered pl-10 w-full focus:input-primary transition-all rounded-xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={emp._id}
              className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="card-body p-6 items-center text-center">
                {/* Avatar */}
                <div className="avatar mb-3">
                  <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={getAvatar(emp.employeeName, emp.employeeImage)}
                      alt={emp.employeeName}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Name & Role */}
                <h2 className="card-title text-xl font-bold text-base-content">
                  {emp.employeeName}
                </h2>
                <div className="badge badge-ghost text-xs font-semibold uppercase tracking-wide">
                  Team Member
                </div>

                {/* Details */}
                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-base-content/70 bg-base-200/50 py-2 rounded-lg">
                    <FaEnvelope className="text-xs" />
                    <span
                      className="truncate max-w-[150px]"
                      title={emp.employeeEmail}
                    >
                      {emp.employeeEmail}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-base-content/50">
                    <FaCalendarAlt />
                    Joined: {new Date(emp.affiliationDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Button */}
                <div className="card-actions justify-center mt-6 w-full">
                  <button
                    onClick={() => handleRemove(emp._id, emp.employeeName)}
                    className="btn btn-outline btn-error btn-sm w-full gap-2 hover:text-white"
                  >
                    <FaTrash /> Remove From Team
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-base-100 rounded-2xl border border-dashed border-base-300">
            <IoAlertCircleOutline className="text-6xl text-base-content/20 mb-4" />
            <h3 className="text-xl font-bold text-base-content/60">
              No Team Members Found
            </h3>
            <p className="text-base-content/40 mt-1 max-w-sm">
              {searchTerm
                ? "No employees match your search."
                : "You haven't added any employees yet. Approve requests to add them."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEmployeeList;
