import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
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

  // 2. Handle Request Submit
  const handleRequest = async (e) => {
    e.preventDefault();
    const note = e.target.note.value;
    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      assetImage: selectedAsset.productImage,
      companyName: "AssetVerse Corp", 
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
      toast.error("Request Failed");
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
        <title>AssetVerse | Request Asset</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-primary">Request Assets</h2>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered"
            placeholder="Search by name..."
          />
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Asset Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="card bg-base-100 shadow-xl border hover:border-primary transition-all"
          >
            <figure className="px-4 pt-4">
              <img
                src={asset.productImage}
                alt={asset.productName}
                className="rounded-xl h-40 object-cover w-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{asset.productName}</h2>
              <div className="badge badge-secondary">{asset.productType}</div>
              <p>Available: {asset.productQuantity}</p>
              <div className="card-actions">
                <button
                  onClick={() => setSelectedAsset(asset)} // Open Modal
                  className="btn btn-primary btn-sm"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL for Request Note */}
      {selectedAsset && (
        <dialog open className="modal modal-bottom sm:modal-middle bg-black/50">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Requesting: {selectedAsset.productName}
            </h3>
            <form onSubmit={handleRequest} className="py-4">
              <div className="form-control">
                <label className="label">Additional Notes</label>
                <textarea
                  name="note"
                  className="textarea textarea-bordered"
                  placeholder="Why do you need this?"
                ></textarea>
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RequestAsset;
