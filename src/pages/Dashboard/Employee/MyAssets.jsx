import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { IoPrintOutline } from "react-icons/io5";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const componentRef = useRef(); // For Printing

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

  // Handle Cancel Request
  const handleCancel = async (id) => {
    // Backend logic implementation required for safety
    toast.error("Cancellation logic requires backend implementation.");
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
      toast.error("Failed to return");
    }
  };

  // Print Function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Asset_List_${user?.displayName}`,
  });

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto my-8 p-4">
      <Helmet>
        <title>AssetVerse | My Assets</title>
      </Helmet>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">My Assets</h2>
          <p className="text-base-content/70">
            Manage and track your requested items
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="btn btn-secondary shadow-lg hover:scale-105 transition-transform"
        >
          <IoPrintOutline className="text-xl" /> Print Asset List
        </button>
      </div>

      {/* Main Content Card - Updated for Theme Consistency */}
      <div
        ref={componentRef}
        className="bg-base-100 rounded-xl shadow-xl border border-base-200 p-6"
      >
        {/* Header for Print View Only */}
        <div className="hidden print:block text-center mb-8 text-black">
          <h1 className="text-3xl font-bold">AssetVerse</h1>
          <h2 className="text-xl text-gray-600">Employee Asset Report</h2>
          <div className="divider my-2"></div>
          <p className="font-bold text-lg">
            Employee Name: {user?.displayName}
          </p>
          <p className="text-sm">Email: {user?.email}</p>
          <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head - Using Theme Colors */}
            <thead className="bg-base-200 text-base-content text-sm uppercase">
              <tr>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th className="print:hidden text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {myRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none"
                >
                  <td className="font-bold text-base-content">
                    {req.assetName}
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {req.assetType}
                    </span>
                  </td>
                  <td className="text-base-content/80">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className="text-base-content/80">
                    {req.approvalDate ? (
                      new Date(req.approvalDate).toLocaleDateString()
                    ) : (
                      <span className="text-gray-400 italic">Pending</span>
                    )}
                  </td>
                  <td>
                    <div
                      className={`badge font-bold ${
                        req.requestStatus === "approved"
                          ? "badge-success text-white"
                          : req.requestStatus === "rejected"
                          ? "badge-error text-white"
                          : "badge-warning text-white"
                      }`}
                    >
                      {req.requestStatus.toUpperCase()}
                    </div>
                  </td>
                  <td className="print:hidden text-center">
                    {req.requestStatus === "pending" && (
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="btn btn-sm btn-outline btn-error hover:text-white"
                      >
                        Cancel
                      </button>
                    )}
                    {req.requestStatus === "approved" &&
                      req.assetType === "Returnable" && (
                        <button
                          onClick={() => handleReturn(req._id)}
                          className="btn btn-sm btn-primary text-white"
                        >
                          Return
                        </button>
                      )}
                    {req.requestStatus === "returned" && (
                      <span className="text-xs text-gray-500 font-medium">
                        Returned
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {myRequests.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-base-content/60">
              You haven't requested any assets yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssets;
