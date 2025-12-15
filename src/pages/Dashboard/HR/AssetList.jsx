import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import HrStats from "../../../components/Dashboard/HrStats";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Fetch Assets
  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assets", user?.email, search, filter, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?email=${user.email}&search=${search}&filter=${filter}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  // Delete Asset
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
    setSearch(e.target.search.value);
    setCurrentPage(0);
  };

  const handleNext = () => {
    if (assets.length === itemsPerPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-bars loading-lg text-primary" />
      </div>
    );

  return (
    <div className="container mx-auto my-8 p-4">
      <Helmet>
        <title>AssetVerse | Asset List</title>
      </Helmet>

      {/* Stats */}
      <HrStats />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-primary">Asset Inventory</h2>

        {/* Search + Filter */}
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
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(0);
            }}
            className="select select-bordered"
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-xl rounded-lg border border-base-200 min-h-[400px]">
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
                <td>{currentPage * itemsPerPage + index + 1}</td>

                {/* Product */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={asset.productImage} alt={asset.productName} />
                      </div>
                    </div>
                    <div className="font-bold">{asset.productName}</div>
                  </div>
                </td>

                {/* Type */}
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

                {/* Quantity */}
                <td className="font-bold text-lg text-center">
                  {asset.productQuantity}
                </td>

                {/* Date */}
                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>

                {/* ACTIONS */}
                <td className="flex items-center gap-2">
                  {/* 🔍 View Details */}
                  {/* (Note: Ensure /asset-details/:id route exists in your Router) */}
                  <Link
                    to={`/asset-details/${asset._id}`}
                    className="btn btn-ghost btn-sm text-base-content/70 hover:text-primary tooltip"
                    data-tip="View Details"
                  >
                    <FaEye className="text-lg" />
                  </Link>

                  {/* ✏️ Edit (Fixed Link) */}
                  <Link to={`/assets/update/${asset._id}`}>
                    <button
                      className="btn btn-ghost btn-sm text-info tooltip"
                      data-tip="Update Asset"
                    >
                      <FaEdit />
                    </button>
                  </Link>

                  {/* 🗑 Delete */}
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="btn btn-ghost btn-sm text-error tooltip"
                    data-tip="Delete Asset"
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
            No Assets Found on this page.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="btn btn-outline"
        >
          <FaChevronLeft /> Previous
        </button>

        <span className="btn btn-ghost no-animation">
          Page {currentPage + 1}
        </span>

        <button
          onClick={handleNext}
          disabled={assets.length < itemsPerPage}
          className="btn btn-outline"
        >
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AssetList;
