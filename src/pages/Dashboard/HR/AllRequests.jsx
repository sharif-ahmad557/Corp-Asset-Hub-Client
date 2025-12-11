import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

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

  const handleAction = async (id, status, requesterName) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        toast.success(`Request ${status} for ${requesterName}`);
        refetch(); // Refresh list instantly
      }
    } catch (error) {
      toast.error("Action Failed");
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto my-8 p-4">
      <Helmet>
        <title>AssetVerse | All Requests</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-primary mb-6">
        Asset Requests{" "}
        <span className="badge badge-neutral">{requests.length}</span>
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg border border-base-200">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200">
            <tr>
              <th>Asset</th>
              <th>Requester</th>
              <th>Request Date</th>
              <th>Note</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-base-50">
                <td>
                  <div className="font-bold">{req.assetName}</div>
                  <div className="text-xs opacity-50">{req.assetType}</div>
                </td>
                <td>
                  <div className="font-bold">{req.requesterName}</div>
                  <div className="text-xs opacity-50">{req.requesterEmail}</div>
                </td>
                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                <td className="max-w-xs truncate" title={req.note}>
                  {req.note}
                </td>
                <td>
                  <div
                    className={`badge ${
                      req.requestStatus === "pending"
                        ? "badge-warning"
                        : req.requestStatus === "approved"
                        ? "badge-success text-white"
                        : "badge-error text-white"
                    }`}
                  >
                    {req.requestStatus}
                  </div>
                </td>
                <td className="flex gap-2">
                  {req.requestStatus === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleAction(req._id, "approved", req.requesterName)
                        }
                        className="btn btn-sm btn-success text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleAction(req._id, "rejected", req.requesterName)
                        }
                        className="btn btn-sm btn-error text-white"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm italic">
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="text-center p-10 text-gray-500">
            No pending requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
