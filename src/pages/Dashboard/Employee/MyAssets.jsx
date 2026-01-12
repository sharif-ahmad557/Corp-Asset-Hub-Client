import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // Better UX for cancellation
import {
  IoPrintOutline,
  IoSearchOutline,
  IoFilterOutline,
  IoCubeOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const componentRef = useRef();

  // Local State for Search & Filter (Feature-Rich Req #5)
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch My Requests
  const {
    data: myRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/my-requests/${user.email}`);
      return res.data;
    },
  });

  // Client-side Filtering Logic
  const filteredRequests = myRequests.filter((req) => {
    const matchesSearch = req.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      statusFilter === "all" || req.requestStatus === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Handle Cancel Request (Production Ready Logic)
  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/requests/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Cancelled!",
              "Your request has been cancelled.",
              "success"
            );
            refetch();
          }
        } catch (err) {
          toast.error("Failed to cancel request. Please try again.");
        }
      }
    });
  };

  // Handle Return Asset
  const handleReturn = async (id) => {
    try {
      const res = await axiosSecure.patch(`/return-asset/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Asset Returned Successfully");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to return asset");
    }
  };

  // Print Function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Asset_Report_${user?.displayName}`,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto my-10 px-4 lg:px-8">
      <Helmet>
        <title>AssetMinder | My Assets</title>
      </Helmet>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">My Assets</h2>
          <p className="text-base-content/60 mt-1">
            Track, manage, and return your requested company assets.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="btn btn-primary shadow-lg shadow-primary/20 gap-2"
        >
          <IoPrintOutline className="text-xl" /> Print Report
        </button>
      </div>

      {/* Controls: Search & Filter (Req #5) */}
      <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <IoSearchOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by asset name..."
            className="input input-bordered w-full pl-10 focus:input-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <IoFilterOutline className="text-base-content/60" />
          <select
            className="select select-bordered w-full md:w-48 focus:select-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="returned">Returned</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Content Card */}
      <div
        ref={componentRef}
        className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden"
      >
        {/* Header for Print View Only */}
        <div className="hidden print:block text-center p-8 mb-4 border-b border-gray-200">
          <h1 className="text-4xl font-bold mb-2">AssetMinder</h1>
          <h2 className="text-xl text-gray-600">
            Employee Asset Inventory Report
          </h2>
          <div className="mt-4 text-left">
            <p className="font-bold">Employee: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p>Generated on: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-base-200/50 text-base-content font-bold uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 pl-6">Asset Name</th>
                <th>Type</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th className="print:hidden text-center pr-6">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-200">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-base-200/40 transition-colors"
                  >
                    <td className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral-focus text-neutral-content rounded-lg w-10 h-10 bg-primary/10 text-primary flex items-center justify-center">
                            <IoCubeOutline className="text-xl" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-base-content">
                            {req.assetName}
                          </div>
                          <div className="text-xs opacity-50 capitalize">
                            {req.assetType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm font-medium ${
                          req.assetType === "Returnable"
                            ? "badge-warning badge-outline"
                            : "badge-ghost"
                        }`}
                      >
                        {req.assetType}
                      </span>
                    </td>
                    <td className="text-base-content/70 text-sm">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </td>
                    <td className="text-base-content/70 text-sm">
                      {req.approvalDate ? (
                        new Date(req.approvalDate).toLocaleDateString()
                      ) : (
                        <span className="text-base-content/30 italic">--</span>
                      )}
                    </td>
                    <td>
                      <div
                        className={`badge font-bold border-none text-white px-3 py-1 ${
                          req.requestStatus === "approved"
                            ? "bg-success"
                            : req.requestStatus === "rejected"
                            ? "bg-error"
                            : req.requestStatus === "returned"
                            ? "bg-gray-500"
                            : "bg-warning"
                        }`}
                      >
                        {req.requestStatus.toUpperCase()}
                      </div>
                    </td>
                    <td className="print:hidden text-center pr-6">
                      {req.requestStatus === "pending" && (
                        <button
                          onClick={() => handleCancel(req._id)}
                          className="btn btn-sm btn-outline btn-error hover:bg-error hover:text-white transition-all"
                        >
                          Cancel
                        </button>
                      )}
                      {req.requestStatus === "approved" &&
                        req.assetType === "Returnable" && (
                          <button
                            onClick={() => handleReturn(req._id)}
                            className="btn btn-sm btn-primary text-white shadow-md shadow-primary/20"
                          >
                            Return
                          </button>
                        )}
                      {req.requestStatus === "returned" && (
                        <span className="text-xs text-success font-bold border border-success px-2 py-1 rounded-md">
                          Returned
                        </span>
                      )}
                      {req.requestStatus === "approved" &&
                        req.assetType === "Non-returnable" && (
                          <span className="text-xs text-base-content/40">
                            No Action
                          </span>
                        )}
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty State Row */
                <tr>
                  <td colSpan="6">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <IoAlertCircleOutline className="text-6xl text-base-content/20 mb-4" />
                      <h3 className="text-lg font-bold text-base-content/60">
                        No Assets Found
                      </h3>
                      <p className="text-sm text-base-content/40 mt-1">
                        {searchTerm || statusFilter !== "all"
                          ? "Try adjusting your search or filters."
                          : "You haven't requested any assets yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
