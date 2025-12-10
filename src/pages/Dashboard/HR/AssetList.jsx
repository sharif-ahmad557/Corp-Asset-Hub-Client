import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2"; 
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch Assets Data
  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assets", user?.email, search, filter],
    queryFn: async () => {
      // HR sees their own assets
      const res = await axiosSecure.get(
        `/assets?email=${user.email}&search=${search}&filter=${filter}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;

    try {
      const res = await axiosSecure.delete(`/assets/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Asset Deleted");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
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
        <title>AssetVerse | Asset List</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-primary">
          Asset Inventory{" "}
          <span className="text-sm badge badge-secondary">
            {assets.length} Items
          </span>
        </h2>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <form onSubmit={handleSearch} className="join">
            <input
              name="search"
              className="input input-bordered join-item"
              placeholder="Search Asset..."
            />
            <button className="btn btn-primary join-item">
              <FaSearch />
            </button>
          </form>

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

      {/* Assets Table */}
      <div className="overflow-x-auto shadow-xl rounded-lg border border-base-200">
        <table className="table w-full">
          <thead className="bg-base-200 text-base">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset._id} className="hover:bg-base-100">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={asset.productImage} alt={asset.productName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{asset.productName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      asset.productType === "Returnable"
                        ? "badge-warning"
                        : "badge-info"
                    } badge-outline`}
                  >
                    {asset.productType}
                  </span>
                </td>
                <td className="font-bold text-lg text-center">
                  {asset.productQuantity}
                </td>
                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-ghost btn-sm text-info">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {assets.length === 0 && (
          <div className="text-center p-10 text-gray-500">
            No Assets Found. Add some!
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;
