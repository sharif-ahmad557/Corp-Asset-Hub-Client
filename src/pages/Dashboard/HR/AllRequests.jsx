import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FaSearch,
  FaCheck,
  FaTimes,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IoAlertCircleOutline, IoBriefcaseOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Local State for Features (Search & Pagination)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Requests for HR
  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["hr-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/hr/${user.email}`);
      return res.data;
    },
  });

  // Filter Logic (Client-side search)
  const filteredRequests = requests.filter(
    (req) =>
      req.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requesterEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.assetName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle Action (Approve/Reject)
  const handleAction = async (id, status, requesterName) => {
    // Confirmation for Rejection
    if (status === "rejected") {
      const result = await Swal.fire({
        title: "Reject Request?",
        text: `Are you sure you want to reject the request from ${requesterName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, reject it!",
      });

      if (!result.isConfirmed) return;
    }

    try {
      const res = await axiosSecure.patch(`/requests/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        if (status === "approved") {
          toast.success(`Request Approved for ${requesterName}`);
        } else {
          Swal.fire("Rejected!", "The request has been rejected.", "success");
        }
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Action Failed. Please try again.");
    }
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
        <title>AssetMinder | All Requests</title>
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content flex items-center gap-3">
            <IoBriefcaseOutline className="text-primary" />
            Asset Requests
            <span className="badge badge-primary badge-outline text-sm font-bold">
              {requests.length}
            </span>
          </h2>
          <p className="text-base-content/60 mt-1">
            Manage all asset requests from your employees.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or asset..."
            className="input input-bordered pl-10 w-full focus:input-primary"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden flex flex-col min-h-[400px]">
        <div className="overflow-x-auto flex-grow">
          <table className="table w-full">
            {/* Head */}
            <thead className="bg-base-200/50 text-base-content font-bold uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 pl-6">Asset Details</th>
                <th>Requester</th>
                <th>Request Date</th>
                <th>Note</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {/* Body */}
            <tbody className="divide-y divide-base-200">
              {currentItems.length > 0 ? (
                currentItems.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-base-200/40 transition-colors"
                  >
                    <td className="pl-6">
                      <div className="font-bold text-base-content">
                        {req.assetName}
                      </div>
                      <div className="badge badge-ghost badge-sm mt-1">
                        {req.assetType}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral-focus text-neutral-content rounded-full w-8 h-8 bg-base-300 flex items-center justify-center">
                            <FaUserCircle className="text-xl text-base-content/50" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-base-content">
                            {req.requesterName}
                          </div>
                          <div className="text-xs opacity-60">
                            {req.requesterEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-base-content/70 text-sm">
                      {new Date(req.requestDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="max-w-xs">
                      <div
                        className="truncate text-sm text-base-content/60 italic"
                        title={req.note}
                      >
                        "{req.note || "No notes provided"}"
                      </div>
                    </td>
                    <td>
                      <div
                        className={`badge font-bold text-xs px-3 py-2 ${
                          req.requestStatus === "pending"
                            ? "badge-warning"
                            : req.requestStatus === "approved"
                            ? "badge-success text-white"
                            : req.requestStatus === "returned"
                            ? "badge-info text-white"
                            : "badge-error text-white"
                        }`}
                      >
                        {req.requestStatus.toUpperCase()}
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        {req.requestStatus === "pending" ? (
                          <>
                            <button
                              onClick={() =>
                                handleAction(
                                  req._id,
                                  "approved",
                                  req.requesterName
                                )
                              }
                              className="btn btn-sm btn-success text-white btn-square"
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() =>
                                handleAction(
                                  req._id,
                                  "rejected",
                                  req.requesterName
                                )
                              }
                              className="btn btn-sm btn-error text-white btn-square"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs font-semibold text-base-content/30 uppercase tracking-wide">
                            {req.requestStatus === "approved"
                              ? "Active"
                              : "Closed"}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty State */
                <tr>
                  <td colSpan="6">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <IoAlertCircleOutline className="text-6xl text-base-content/20 mb-4" />
                      <h3 className="text-lg font-bold text-base-content/60">
                        No Requests Found
                      </h3>
                      <p className="text-sm text-base-content/40 mt-1">
                        {searchTerm
                          ? "No results match your search."
                          : "No pending requests at the moment."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredRequests.length > 0 && (
          <div className="p-4 border-t border-base-200 flex justify-between items-center bg-base-50">
            <span className="text-sm text-base-content/60">
              Page {currentPage} of {totalPages}
            </span>
            <div className="join">
              <button
                className="join-item btn btn-sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`join-item btn btn-sm ${
                    currentPage === i + 1 ? "btn-active btn-primary" : ""
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="join-item btn btn-sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
