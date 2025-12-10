import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

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
    
    toast.error(
      "Cancellation logic not implemented in backend yet for safety."
    );
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
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto my-8 p-4">
      <Helmet>
        <title>AssetVerse | My Assets</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">My Assets Status</h2>
        <button onClick={handlePrint} className="btn btn-secondary">
          Print Asset List
        </button>
      </div>

      {/* Printable Area */}
      <div ref={componentRef} className="p-4 bg-white rounded-lg">
        <div className="hidden print:block text-center mb-4">
          <h1 className="text-2xl font-bold">
            AssetVerse - Employee Asset Report
          </h1>
          <p>Employee: {user?.displayName}</p>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th className="print:hidden">Action</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((req) => (
                <tr key={req._id}>
                  <td className="font-bold">{req.assetName}</td>
                  <td>{req.assetType}</td>
                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td>
                    {req.approvalDate
                      ? new Date(req.approvalDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <div
                      className={`badge ${
                        req.requestStatus === "approved"
                          ? "badge-success text-white"
                          : req.requestStatus === "rejected"
                          ? "badge-error text-white"
                          : "badge-warning"
                      }`}
                    >
                      {req.requestStatus}
                    </div>
                  </td>
                  <td className="print:hidden">
                    {req.requestStatus === "pending" && (
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Cancel
                      </button>
                    )}
                    {req.requestStatus === "approved" &&
                      req.assetType === "Returnable" && (
                        <button
                          onClick={() => handleReturn(req._id)}
                          className="btn btn-xs btn-primary"
                        >
                          Return
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
