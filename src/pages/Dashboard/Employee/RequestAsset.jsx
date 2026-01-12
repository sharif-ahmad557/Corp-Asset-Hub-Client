import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaFilter,
  FaBoxOpen,
  FaCalendarAlt,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null); // For Modal

  // 1. Fetch All Available Assets
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets-public", search, filter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?search=${search}&filter=${filter}`
      );
      return res.data;
    },
  });

  // Handle Image Error (No placeholder content rule)
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1600&auto=format&fit=crop";
  };

  // 2. Handle Request Submit
  const handleRequest = async (e) => {
    e.preventDefault();
    const note = e.target.note.value;

    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      assetImage: selectedAsset.productImage,
      // Use asset's company info if available, else omit or handle backend side to avoid dummy text
      companyName: selectedAsset.companyName || "",
      hrEmail: selectedAsset.hrEmail,
      requesterName: user.displayName,
      requesterEmail: user.email,
      requestDate: new Date(),
      note: note,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/request-asset", requestData);
      if (res.data.insertedId) {
        toast.success("Asset Requested Successfully!");
        setSelectedAsset(null); // Close Modal
      }
    } catch (error) {
      console.error(error);
      toast.error("Request Failed. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto my-10 px-4 lg:px-8">
      <Helmet>
        <title>AssetMinder | Request Asset</title>
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            Request Assets
          </h2>
          <p className="text-base-content/60 mt-1">
            Browse available assets and submit your request.
          </p>
        </div>

        {/* Search & Filter (Req #5) */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered pl-10 w-full sm:w-64 focus:input-primary"
              placeholder="Search by name..."
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="select select-bordered pl-10 w-full sm:w-48 focus:select-primary"
              defaultValue=""
            >
              <option value="">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Asset Grid Cards (Req #3: 4 cards per row on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.length > 0 ? (
          assets.map((asset) => {
            const isOutOfStock = parseInt(asset.productQuantity) === 0;

            return (
              <div
                key={asset._id}
                className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col group"
              >
                <figure className="relative h-48 overflow-hidden bg-base-200">
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3">
                    {isOutOfStock ? (
                      <span className="badge badge-error text-white font-bold shadow-sm">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="badge badge-success text-white font-bold shadow-sm">
                        In Stock
                      </span>
                    )}
                  </div>
                  {/* Type Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`badge border-none font-medium text-xs ${
                        asset.productType === "Returnable"
                          ? "badge-warning"
                          : "badge-ghost bg-base-100/80 backdrop-blur-sm"
                      }`}
                    >
                      {asset.productType}
                    </span>
                  </div>
                </figure>

                <div className="card-body p-5 flex-grow">
                  <h2
                    className="card-title text-lg font-bold text-base-content line-clamp-1"
                    title={asset.productName}
                  >
                    {asset.productName}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-base-content/60 mt-1">
                    <FaBoxOpen className="text-primary" />
                    <span>
                      Available Quantity:{" "}
                      <span className="font-bold text-base-content">
                        {asset.productQuantity}
                      </span>
                    </span>
                  </div>

                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>

                  <div className="card-actions mt-4">
                    <button
                      onClick={() => setSelectedAsset(asset)}
                      disabled={isOutOfStock}
                      className="btn btn-primary w-full btn-sm h-10 shadow-md shadow-primary/20"
                    >
                      {isOutOfStock ? "Unavailable" : "Request Asset"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Empty State
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-base-100 rounded-2xl border border-dashed border-base-300">
            <IoAlertCircleOutline className="text-6xl text-base-content/20 mb-4" />
            <h3 className="text-xl font-bold text-base-content/60">
              No Assets Found
            </h3>
            <p className="text-base-content/40 max-w-xs mt-2">
              Try adjusting your search or filter to find what you are looking
              for.
            </p>
          </div>
        )}
      </div>

      {/* MODAL for Request Note */}
      {selectedAsset && (
        <dialog
          open
          className="modal modal-bottom sm:modal-middle bg-black/60 backdrop-blur-sm"
        >
          <div className="modal-box p-0 overflow-hidden rounded-2xl">
            {/* Modal Header */}
            <div className="bg-primary/10 p-6 border-b border-base-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                <FaCheckCircle /> Request Asset
              </h3>
              <button
                onClick={() => setSelectedAsset(null)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <img
                  src={selectedAsset.productImage}
                  onError={handleImageError}
                  className="w-20 h-20 rounded-xl object-cover border border-base-200"
                  alt="Asset"
                />
                <div>
                  <h4 className="font-bold text-base-content text-lg">
                    {selectedAsset.productName}
                  </h4>
                  <div className="badge badge-sm badge-outline mt-1">
                    {selectedAsset.productType}
                  </div>
                </div>
              </div>

              <form onSubmit={handleRequest} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Request Date
                    </span>
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-base-200 rounded-lg text-base-content/70">
                    <FaCalendarAlt />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Additional Notes
                    </span>
                  </label>
                  <textarea
                    name="note"
                    className="textarea textarea-bordered h-24 focus:textarea-primary"
                    placeholder="E.g., I need this for the upcoming project..."
                  ></textarea>
                </div>

                <div className="modal-action mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedAsset(null)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-8">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestAsset;
